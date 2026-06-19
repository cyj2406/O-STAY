"use client";

import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useApp } from "./context/AppContext";

type StayType = {
  id: number;
  title: string;
  location: string;
  subtitle: string;
  desc: string;
  image: string;
  tags: string[];
  category: string;
  rating: number;
  price?: string;
  size?: string;
};

export default function Home() {
  const { setShowQuizModal, wishlist, toggleWish } = useApp();

  const popularStays: StayType[] = [
    {
      id: 3,
      title: "서촌 한옥 스테이",
      location: "서울 종로 서촌",
      subtitle: "고즈넉한 대청마루에서 느끼는 전통의 쉼",
      desc: "수백 년의 세월을 간직한 대들보와 현대식 편리함이 공존하는 프리미엄 한옥 공간",
      image: "/blueprint-5.jpg",
      tags: ["#한옥", "#서촌마을", "#다도"],
      category: "내추럴",
      rating: 4.7,
      price: "240,000원",
      size: "60㎡"
    },
    {
      id: 4,
      title: "제주 돌담 스테이",
      location: "제주 한림읍",
      subtitle: "현무암 돌담 안에서 즐기는 따뜻한 프라이빗 스파",
      desc: "제주의 옛 감성을 온전히 살리면서 내부엔 아늑한 욕조와 프리미엄 우드 테이블을 배치한 공간",
      image: "/blueprint-6.jpg",
      tags: ["#독채", "#야외스파", "#제주감성"],
      category: "내추럴",
      rating: 4.9,
      price: "280,000원",
      size: "70㎡"
    },
    {
      id: 5,
      title: "양평 포레스트 하우스",
      location: "경기 양평군",
      subtitle: "푸른 숲속에 둘러싸인 미니멀 디자인 하우스",
      desc: "탁 트인 숲의 전경을 감상할 수 있는 통유리창과 모던한 가구가 인상적인 공간",
      image: "/blueprint-7.jpg",
      tags: ["#숲뷰", "#불멍", "#통유리"],
      category: "모던",
      rating: 4.6,
      price: "220,000원",
      size: "58㎡"
    }
  ];

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* HERO SECTION */}
      <section className="w-full max-w-[1360px] pt-48 pb-36 px-8 flex flex-col items-center justify-center">
        <div className="text-center leading-[1.5] tracking-tight">
          <h1 className="text-[54px] md:text-[76px] lg:text-[92px] font-semibold text-neutral-900 select-none">
            단순한{" "}
            <img src="/lamp.svg" className="h-[60px] md:h-[84px] lg:h-[102px] w-auto inline-block align-middle mx-2 hover:scale-105 transition-transform duration-200" alt="" />
            {" "}숙소가{" "}
            <img src="/sofa.svg" className="h-[60px] md:h-[84px] lg:h-[102px] w-auto inline-block align-middle mx-2 hover:scale-105 transition-transform duration-200" alt="" />
            {" "}아닌,
            <br />
            <img src="/table.svg" className="h-[60px] md:h-[84px] lg:h-[102px] w-auto inline-block align-middle mx-2 hover:scale-105 transition-transform duration-200" alt="" />
            {" "}나만의 취향이 담긴{" "}
            <img src="/table-tall.svg" className="h-[52px] md:h-[74px] lg:h-[90px] w-auto inline-block align-middle mx-2 hover:scale-105 transition-transform duration-200" alt="" />
            <br />
            특별한 스테이{" "}
            <img src="/chair.svg" className="h-[60px] md:h-[84px] lg:h-[102px] w-auto inline-block align-middle mx-2 hover:scale-105 transition-transform duration-200" alt="" />
            {" "}오늘의 스테이!
          </h1>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="w-full bg-[#F3F4F6] py-32 flex flex-col items-center justify-center px-8 border-y border-neutral-200/50">
        <div className="max-w-[840px] text-center">
          <h2 className="text-[28px] font-semibold text-neutral-900 tracking-tight mb-8 leading-snug">
            보이는 정보가 아닌, 오직 취향으로만
          </h2>
          <p className="text-neutral-500 text-[15px] font-medium leading-[2.5] tracking-tight">
            오늘의 스테이는 브랜드의 색을 앞세우기보다 당신의 공간과 취향이 더 잘 드러나도록 돕습니다.
            <br />
            당신이 남긴 스크랩 데이터를 기반으로 아직 알지 못했던 완벽한 휴식 공간을 블라인드로 매칭해 드립니다.
          </p>
        </div>
      </section>

      {/* DATA ROOM SECTION */}
      <section className="w-full max-w-[1360px] pt-32 pb-0 px-8 flex flex-col items-center">
        <div className="text-center mb-16">
          <span className="text-[11px] font-semibold text-[#888888] tracking-widest block mb-3 uppercase">Taste Data Analysis</span>
          <h2 className="text-[26px] font-semibold text-neutral-900 tracking-tight mb-4">
            당신의 데이터로 그려낸 가상의 방
          </h2>
          <p className="text-neutral-400 text-[13px] font-medium tracking-tight">
            기획안의 실루엣 모티브를 활용하여, 사용자의 취향이 반영된 가구들이 모여 하나의 방을 이루는 과정을 보여줍니다.
          </p>
        </div>

        {/* Collage Display Area */}
        <div className="relative w-full max-w-[800px] mb-12 flex items-center justify-center overflow-hidden">
          <img 
            src="/data-room.png" 
            className="w-full h-auto object-contain pointer-events-none select-none" 
            alt="가상의 방 취향 데이터 분석 그래픽" 
          />
        </div>

        {/* Action Button */}
        <button 
          onClick={() => setShowQuizModal(true)}
          className="h-13 px-10 bg-black text-white hover:bg-neutral-800 rounded-full font-semibold text-[13.5px] tracking-tight flex items-center gap-2 transition-all active:scale-95 duration-150 shadow-md"
        >
          내 취향으로 스테이 찾기
          <span className="text-[12px] font-light">&gt;</span>
        </button>
      </section>


      {/* LIFESTYLE SECTION: 인기 스테이 (EXPANSION, spaced 200px apart) */}
      <section className="w-full max-w-[1360px] mt-[200px] py-32 px-8 border-t border-neutral-100/80">
        <div className="text-center mb-16">
          <h2 className="text-[28px] font-semibold text-neutral-900 tracking-tight mb-4">최근 주목받는 공간들</h2>
          <p className="text-neutral-400 text-[14px] font-medium tracking-tight">이달 가장 예약률이 높았던 핫 플레이스들을 만나보세요</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10 max-w-[1200px] mx-auto">
          {popularStays.map((stay) => (
            <Link href="/explore" key={stay.id} className="bg-white rounded-3xl overflow-hidden flex flex-col cursor-pointer group">
              <div className="bg-[#F8F9FA] aspect-[4/3] flex items-center justify-center p-8 rounded-3xl border border-neutral-100 transition-all duration-300 group-hover:bg-neutral-100/70 shadow-sm relative">
                <img src={stay.image} className="max-h-full object-contain max-w-full group-hover:scale-[1.03] transition-transform duration-300" alt="" />
                <span className="absolute top-4 left-4 bg-black text-white text-[9.5px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  ★ {stay.id === 3 ? "BEST" : stay.id === 4 ? "SPACIOUS" : "FOREST"}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWish({
                      id: stay.id,
                      title: stay.title,
                      location: stay.location,
                      image: stay.image,
                      rating: stay.rating,
                      tags: stay.tags,
                      price: stay.price ?? "",
                      size: stay.size ?? ""
                    });
                  }}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-sm transition-colors z-10"
                  aria-label="찜하기"
                >
                  <Heart className={`w-4 h-4 ${wishlist.some((w) => w.id === stay.id) ? "fill-red-500 text-red-500" : "text-neutral-400"}`} />
                </button>
              </div>
              <div className="py-6 px-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] text-[#A1A1A1] font-semibold uppercase tracking-widest block mb-1.5">{stay.location}</span>
                  <h3 className="text-[17px] font-semibold text-neutral-900 tracking-tight mb-2.5">{stay.title}</h3>
                  <p className="text-neutral-500 text-[12.5px] font-medium leading-relaxed mb-4">{stay.subtitle}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <span className="text-[14px] font-semibold text-neutral-900">{stay.price}</span>
                  <span className="text-[11px] text-neutral-400 font-semibold">{stay.size}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* LIFESTYLE SECTION: 블라인드 스테이 이용 방법 (EXPANSION, spaced 200px apart) */}
      <section className="w-full max-w-[1360px] mt-[200px] px-8 flex flex-col items-center">
        <div className="text-center mb-16">
          <h2 className="text-[28px] font-semibold text-neutral-900 tracking-tight mb-4">블라인드 스테이 이용 방법</h2>
          <p className="text-neutral-400 text-[14px] font-medium tracking-tight">취향만을 기반으로 더 설레는 숙박을 경험하는 세 단계 프로세스</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 max-w-[1080px] mx-auto text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#F3F4F6] flex items-center justify-center text-2xl font-semibold text-neutral-800 mb-6">
              1
            </div>
            <h3 className="text-[17px] font-semibold text-neutral-900 mb-3">나의 취향 분석</h3>
            <p className="text-neutral-500 text-[12.5px] font-medium leading-[1.8] tracking-tight">좋아하는 오브제, 재질, 색감을 골라 나의 세부 취향 프로필을 완성하세요.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#F3F4F6] flex items-center justify-center text-2xl font-semibold text-neutral-800 mb-6">
              2
            </div>
            <h3 className="text-[17px] font-semibold text-neutral-900 mb-3">블라인드 매칭 제안</h3>
            <p className="text-neutral-500 text-[12.5px] font-medium leading-[1.8] tracking-tight">분석 결과에 따른 취향 부합 공간들의 실루엣 도면과 스펙 가이드를 제공받습니다.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#F3F4F6] flex items-center justify-center text-2xl font-semibold text-neutral-800 mb-6">
              3
            </div>
            <h3 className="text-[17px] font-semibold text-neutral-900 mb-3">설레는 출발 및 만남</h3>
            <p className="text-neutral-500 text-[12.5px] font-medium leading-[1.8] tracking-tight">결정이 완료되면 체크인 전에 숙소 위치와 상세 주소를 받아 여행을 완성하세요.</p>
          </div>
        </div>
      </section>

      {/* REVIEW SECTION (spaced 200px apart) */}
      <section className="w-full max-w-[1360px] mt-[200px] py-12 px-8 border-t border-neutral-100/80 mb-[200px]">
        <div className="text-center mb-16">
          <h2 className="text-[26px] font-semibold text-neutral-900 tracking-tight mb-3">
            먼저 다녀온 사람들의 기록
          </h2>
          <p className="text-neutral-400 text-[13px] font-medium tracking-tight">
            사진 스포일러 없이, 그날의 감상만 전합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-[1080px] mx-auto">
          {/* Card 1 */}
          <div className="bg-[#F8F9FA] p-9 rounded-[28px] flex flex-col justify-between min-h-[240px] border border-neutral-100/60 shadow-sm hover:shadow-md transition-shadow">
            <div>
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#1A1C1E] text-white font-semibold text-[10px] mb-6">
                기대 이상이었어요
              </span>
              <p className="text-neutral-800 text-[13px] font-semibold leading-[2] mb-6">
                “정돈된 무드를 좋아하면 무조건 만족할 공간이었어요. 문을 여는 순간 느껴지는 향기부터 합격!”
              </p>
            </div>
            <div className="text-[11.5px] font-semibold text-neutral-400">
              <span className="text-neutral-800">김*지 님</span> · 미니멀 & 심플 예약
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#F8F9FA] p-9 rounded-[28px] flex flex-col justify-between min-h-[240px] border border-neutral-100/60 shadow-sm hover:shadow-md transition-shadow">
            <div>
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#1A1C1E] text-white font-semibold text-[10px] mb-6">
                사진보다 분위기가 좋았어요
              </span>
              <p className="text-neutral-800 text-[13px] font-semibold leading-[2] mb-6">
                “생각보다 훨씬 더 따뜻했고, 힌트에서 봤던 조명이 정말 예뻤습니다. 다 안 보고 가길 잘했어요.”
              </p>
            </div>
            <div className="text-[11.5px] font-semibold text-neutral-400">
              <span className="text-neutral-800">김*지 님</span> · 클래식 & 앤틱 예약
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#F8F9FA] p-9 rounded-[28px] flex flex-col justify-between min-h-[240px] border border-neutral-100/60 shadow-sm hover:shadow-md transition-shadow">
            <div>
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#1A1C1E] text-white font-semibold text-[10px] mb-6">
                취향에 잘 맞았어요
              </span>
              <p className="text-neutral-800 text-[13px] font-semibold leading-[2] mb-6">
                “낯선 매력이란 말이 딱 맞네요. 평소에 가보지 않던 스타일인데, 큐레이션을 믿고 갔다가 대만족했습니다.”
              </p>
            </div>
            <div className="text-[11.5px] font-semibold text-neutral-400">
              <span className="text-neutral-800">이*영 님</span> · 유니크 예약
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
