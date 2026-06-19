"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Sparkles } from "lucide-react";
import Link from "next/link";

type StayType = {
  id: number;
  title: string;
  location: string;
  subtitle: string;
  desc: string;
  image: string;
  tags: string[];
  category: string;
  price: string;
  size: string;
  rating: string;
};

const mockStays: StayType[] = [
  {
    id: 1,
    title: "성수동 빈티지 스테이",
    location: "서울 성수 근처",
    subtitle: "여백이 편안한 공간, 군더더기 없는 하루",
    desc: "앤틱 가구와 레트로 소품으로 가득 찬 빈티지 감성의 독채.",
    image: "/blueprint-5.jpg",
    tags: ["원목", "조명", "빈티지", "소형 (~30㎡)"],
    category: "빈티지",
    price: "180,000원",
    size: "45㎡",
    rating: "4.8"
  },
  {
    id: 2,
    title: "해운대 오션 브리즈 스테이",
    location: "부산 해운대 근처",
    subtitle: "포근한 소재와 은은한 조명감이 살아 있는 공간",
    desc: "소박한 조화와 은은한 감성이 살아있는 공간.",
    image: "/blueprint-6.jpg",
    tags: ["소파", "린넨", "미니멀 & 심플", "중형 (30~50㎡)", "#0F172A"],
    category: "미니멀 & 심플",
    price: "210,000원",
    size: "52㎡",
    rating: "4.9"
  },
  {
    id: 3,
    title: "서촌 한옥 스테이",
    location: "서울 종로 서촌",
    subtitle: "고즈넉한 대청마루에서 느끼는 전통의 쉼",
    desc: "수백 년의 세월을 간직한 대들보와 현대식 편리함이 공존하는 공간",
    image: "/blueprint-7.jpg",
    tags: ["원목", "의자", "클래식 & 앤틱", "대형 (50㎡~)", "#854D0E"],
    category: "내추럴",
    price: "240,000원",
    size: "60㎡",
    rating: "4.7"
  },
  {
    id: 4,
    title: "제주 돌담 스테이",
    location: "제주 한림읍",
    subtitle: "현무암 돌담 안에서 즐기는 따뜻한 프라이빗 스파",
    desc: "제주의 옛 감성을 온전히 살리면서 내부엔 아늑한 욕조와 프리미엄 우드 테이블을 배치한 공간",
    image: "/blueprint-8.jpg",
    tags: ["라탄", "욕조", "내추럴", "대형 (50㎡~)", "#F1E6D2"],
    category: "내추럴",
    price: "280,000원",
    size: "70㎡",
    rating: "4.9"
  }
];

function RecommendationContent() {
  const searchParams = useSearchParams();
  const tagsParam = searchParams.get("tags") || "";
  const selectedTags = tagsParam ? tagsParam.split(",") : [];

  const [aiComment, setAiComment] = useState<string | null>(null);
  const [isLoadingComment, setIsLoadingComment] = useState(true);

  useEffect(() => {
    let isActive = true;
    setIsLoadingComment(true);
    fetch("/api/ai-comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tags: tagsParam ? tagsParam.split(",") : [] }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isActive) setAiComment(data.comment);
      })
      .catch(() => {
        if (isActive) setAiComment(null);
      })
      .finally(() => {
        if (isActive) setIsLoadingComment(false);
      });
    return () => {
      isActive = false;
    };
  }, [tagsParam]);

  // Filter stays based on chosen tags.
  // If stay contains at least one of the tags, or we show all if tag matching is loose. Let's filter to stays that have at least one matching tag, or show a subset.
  const filteredStays = mockStays.filter((stay) => {
    if (selectedTags.length === 0) return true;
    return stay.tags.some((tag) => selectedTags.includes(tag) || selectedTags.some(sel => tag.toLowerCase().includes(sel.toLowerCase())));
  });

  const displayStays = filteredStays.length > 0 ? filteredStays : mockStays;

  return (
    <div className="w-full max-w-[1360px] px-8 py-20 min-h-screen flex flex-col">
      {/* Header */}
      <div className="mb-12">
        <span className="text-[11px] font-semibold text-[#888888] tracking-widest block mb-3 uppercase">Taste Curation Results</span>
        <h2 className="text-[32px] font-semibold text-neutral-900 tracking-tight">취향 큐레이션 추천 결과</h2>
        <p className="text-neutral-400 text-[14px] mt-2">사용자님의 취향 태그를 분석하여 가장 어울리는 공간을 추천해 드립니다.</p>
      </div>

      {/* Selected Tags / Filter Chips */}
      {selectedTags.length > 0 && (
        <div className="mb-16">
          <h4 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-3.5">선택한 취향 태그</h4>
          <div className="flex flex-wrap gap-2.5">
            {selectedTags.map((tag) => {
              // check if color code
              const isColor = tag.startsWith("#") && tag.length === 7;
              return (
                <div 
                  key={tag} 
                  className="flex items-center gap-2 px-4.5 py-2 bg-neutral-900 text-white rounded-full text-[12.5px] font-semibold"
                >
                  {isColor && (
                    <span 
                      className="w-3 h-3 rounded-full border border-white/20" 
                      style={{ backgroundColor: tag }} 
                    />
                  )}
                  <span>{tag}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* AI 취향 분석 코멘트 */}
      {(isLoadingComment || aiComment) && (
        <div className="mb-12 bg-neutral-50 border border-neutral-100 rounded-[28px] p-7 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-4.5 h-4.5" />
          </div>
          <div className="flex-1">
            <h4 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-1.5">AI 취향 분석</h4>
            {isLoadingComment ? (
              <p className="text-[13.5px] text-neutral-400 font-medium animate-pulse">취향 분석 중...</p>
            ) : (
              <p className="text-[13.5px] text-neutral-700 font-medium leading-relaxed">{aiComment}</p>
            )}
          </div>
        </div>
      )}

      {/* Grid of matches */}
      <div>
        <h3 className="text-[18px] font-semibold text-neutral-900 mb-8 tracking-tight">추천 매칭 스테이 ({displayStays.length})</h3>
        
        {displayStays.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-24 text-neutral-400">
            <span className="text-4xl mb-4">🔍</span>
            <p className="text-[14px] font-semibold">조건에 맞는 스테이를 찾지 못했습니다.</p>
            <p className="text-[12px] text-neutral-300 mt-1">다른 취향 태그로 다시 큐레이션을 시도해 보세요.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {displayStays.map((stay) => (
              <Link 
                key={stay.id} 
                href="/explore" 
                className="bg-white rounded-3xl overflow-hidden flex flex-col cursor-pointer group border border-neutral-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-[#F8F9FA] aspect-[4/3] flex items-center justify-center p-8 transition-colors group-hover:bg-neutral-100/70 relative">
                  <img src={stay.image} className="max-h-full object-contain max-w-full group-hover:scale-[1.03] transition-transform duration-300" alt="" />
                  <span className="absolute top-4 left-4 bg-black text-white text-[9.5px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    ★ {stay.rating}
                  </span>
                </div>
                <div className="py-6 px-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] text-[#A1A1A1] font-semibold uppercase tracking-widest block mb-1.5">{stay.location}</span>
                    <h3 className="text-[17px] font-semibold text-neutral-900 tracking-tight mb-2.5">{stay.title}</h3>
                    <p className="text-neutral-500 text-[12.5px] font-medium leading-relaxed mb-4">{stay.subtitle}</p>
                    
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {stay.tags.map((tag) => (
                        <span key={tag} className="text-[11px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                    <span className="text-[15px] font-semibold text-neutral-900">{stay.price}</span>
                    <span className="text-[11px] text-neutral-400 font-semibold">{stay.size}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function RecommendationPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-[14px] text-neutral-400 font-medium">큐레이션 추천 결과 분석 중...</div>
      </div>
    }>
      <RecommendationContent />
    </Suspense>
  );
}
