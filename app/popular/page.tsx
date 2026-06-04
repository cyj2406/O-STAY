"use client";

import React from "react";
import Link from "next/link";

export default function PopularPage() {
  const popularStays = [
    {
      id: 3,
      title: "서촌 한옥 스테이",
      location: "서울 종로 서촌",
      subtitle: "고즈넉한 대청마루에서 느끼는 전통의 쉼",
      desc: "수백 년의 세월을 간직한 대들보와 현대식 편리함이 공존하는 프리미엄 한옥 공간",
      image: "/blueprint-1.jpg",
      tags: ["#한옥", "#서촌마을", "#다도"],
      price: "240,000원",
      size: "60㎡",
      badge: "★ BEST"
    },
    {
      id: 4,
      title: "제주 돌담 스테이",
      location: "제주 한림읍",
      subtitle: "현무암 돌담 안에서 즐기는 따뜻한 프라이빗 스파",
      desc: "제주의 옛 감성을 온전히 살리면서 내부엔 아늑한 욕조와 프리미엄 우드 테이블을 배치한 공간",
      image: "/blueprint-2.jpg",
      tags: ["#독채", "#야외스파", "#제주감성"],
      price: "280,000원",
      size: "70㎡",
      badge: "★ HOT"
    },
    {
      id: 5,
      title: "양평 포레스트 하우스",
      location: "경기 양평군",
      subtitle: "푸른 숲속에 둘러싸인 미니멀 디자인 하우스",
      desc: "탁 트인 숲의 전경을 감상할 수 있는 통유리창과 모던한 가구가 인상적인 공간",
      image: "/blueprint-1.jpg",
      tags: ["#숲뷰", "#불멍", "#통유리"],
      price: "220,000원",
      size: "58㎡",
      badge: "★ POPULAR"
    }
  ];

  return (
    <div className="w-full max-w-[1360px] px-8 py-20 min-h-screen flex flex-col">
      <div className="mb-16">
        <span className="text-[11px] font-semibold text-[#888888] tracking-widest block mb-3 uppercase">Weekly Hot</span>
        <h2 className="text-[32px] font-semibold text-neutral-900 tracking-tight">인기 스테이</h2>
        <p className="text-neutral-400 text-[14px] mt-2">이번 주 가장 높은 예약률과 평점을 기록한 최고의 스테이 리스트입니다.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {popularStays.map((stay) => (
          <Link 
            key={stay.id} 
            href="/explore" 
            className="bg-white rounded-3xl overflow-hidden flex flex-col cursor-pointer group border border-neutral-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="bg-[#F8F9FA] aspect-[4/3] flex items-center justify-center p-8 rounded-t-3xl transition-colors group-hover:bg-neutral-100/70 relative">
              <img src={stay.image} className="max-h-full object-contain max-w-full group-hover:scale-[1.03] transition-transform duration-300" alt="" />
              <span className="absolute top-4 left-4 bg-black text-white text-[9.5px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                {stay.badge}
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
    </div>
  );
}
