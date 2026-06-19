const FALLBACK_COMMENT =
  "당신의 취향에는 차분하고 아늑한 분위기의 스테이가 어울려요. 마음에 드는 공간을 찾아 특별한 하루를 보내보세요.";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const tags = body?.tags;

  if (!Array.isArray(tags) || tags.length === 0) {
    return Response.json({ comment: FALLBACK_COMMENT });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json({ comment: FALLBACK_COMMENT });
  }

  try {
    const prompt = `사용자의 취향 태그: ${tags.join(", ")}

위 취향 태그를 분석해서, "당신의 취향에는 이런 스테이가 어울려요" 같은 따뜻하고 다정한 어투로 추천 코멘트를 2~3문장으로 작성해 주세요. 코멘트 본문 외 다른 말은 출력하지 마세요.`;

    const geminiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!geminiRes.ok) {
      return Response.json({ comment: FALLBACK_COMMENT });
    }

    const data = await geminiRes.json();
    const comment = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    return Response.json({ comment: comment || FALLBACK_COMMENT });
  } catch {
    return Response.json({ comment: FALLBACK_COMMENT });
  }
}
