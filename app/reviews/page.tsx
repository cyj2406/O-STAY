"use client";

import React from "react";
import { Star } from "lucide-react";

export default function ReviewsPage() {
  const reviews = [
    {
      author: "김지수",
      stay: "미니멀 & 심플 예약",
      rating: 5,
      date: "2026년 3월 15일",
      badge: "기대 이상이었어요",
      content: "“정돈된 무드를 좋아하면 무조건 만족할 공간이었어요. 문을 여는 순간 느껴지는 향기부터 합격! 가구 배치도 너무 잘 되어 있어서 하루 종일 머물고 싶었습니다.”"
    },
    {
      author: "김민지",
      stay: "클래식 & 앤틱 예약",
      rating: 5,
      date: "2026년 2월 28일",
      badge: "사진보다 분위기가 좋았어요",
      content: "“생각보다 훨씬 더 따뜻했고, 힌트에서 봤던 조명이 정말 예뻤습니다. 다 안 보고 가길 잘했어요. 도면으로 볼 때와 직접 머물 때의 감동이 다릅니다.”"
    },
    {
      author: "이서영",
      stay: "유니크 예약",
      rating: 4,
      date: "2026년 1월 20일",
      badge: "취향에 잘 맞았어요",
      content: "“낯선 매력이란 말이 딱 맞네요. 평소에 가보지 않던 스타일인데, 큐레이션을 믿고 갔다가 대만족했습니다. 블라인드 매칭 시스템의 매력에 푹 빠졌습니다.”"
    },
    {
      author: "최현우",
      stay: "내추럴 한옥 예약",
      rating: 5,
      date: "2025년 12월 31일",
      badge: "완벽한 연말이었어요",
      content: "“연말에 아내와 방문했는데 정말 고요하고 한적해서 오랜만에 속 깊은 대화를 나눴습니다. 웰컴 티와 컵 오브제 하나하나까지 정갈하게 큐레이션된 느낌입니다.”"
    }
  ];

  return (
    <div className="w-full max-w-[1360px] px-8 py-20 min-h-screen flex flex-col">
      <div className="mb-16">
        <span className="text-[11px] font-semibold text-[#888888] tracking-widest block mb-3 uppercase">Guest Stories</span>
        <h2 className="text-[32px] font-semibold text-neutral-900 tracking-tight">블라인드 후기</h2>
        <p className="text-neutral-400 text-[14px] mt-2">오늘의 스테이를 먼저 경험한 게스트들이 작성한 진솔한 휴식의 기록입니다.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-[1080px] mx-auto">
        {reviews.map((rev, idx) => (
          <div 
            key={idx} 
            className="bg-[#F8F9FA] p-9 rounded-[28px] flex flex-col justify-between min-h-[260px] border border-neutral-100/60 shadow-sm hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#1A1C1E] text-white font-semibold text-[10px]">
                  {rev.badge}
                </span>
                <div className="flex items-center text-amber-400">
                  {Array.from({ length: 5 }).map((_, sIdx) => (
                    <Star 
                      key={sIdx} 
                      className={`w-3.5 h-3.5 ${sIdx < rev.rating ? "fill-current" : "text-neutral-200"}`} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-neutral-800 text-[13px] font-semibold leading-[2] mb-6">
                {rev.content}
              </p>
            </div>
            <div className="text-[11.5px] font-semibold text-neutral-400 flex justify-between items-center">
              <div>
                <span className="text-neutral-800">{rev.author} 님</span> · {rev.stay}
              </div>
              <span>{rev.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
