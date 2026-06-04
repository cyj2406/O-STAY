"use client";

import React, { useState, useEffect } from "react";
import { Star, Heart, X } from "lucide-react";
import { useApp } from "../context/AppContext";

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
  reviews: string;
};

export default function ExplorePage() {
  const [selectedStay, setSelectedStay] = useState<StayType | null>(null);
  const [guests, setGuests] = useState(2);
  const [isWished, setIsWished] = useState(false);
  const [detailTab, setDetailTab] = useState<"intro" | "products" | "structure" | "reviews">("reviews");

  const { cartItems, setCartItems } = useApp();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedStay]);

  const stays: StayType[] = [
    {
      id: 1,
      title: "성수동 빈티지 스테이",
      location: "서울 성수 근처",
      subtitle: "여백이 편안한 공간, 군더더기 없는 하루",
      desc: "앤틱 가구와 레트로 소품으로 가득 찬 빈티지 감성의 독채. 성수동 골목길 뷰와 따뜻한 조명이 어우러진 공간.",
      image: "/blueprint-1.jpg",
      tags: ["#원목", "#조용한", "#채광 좋은", "#우드 톤"],
      category: "미니멀 & 심플",
      price: "180,000원",
      size: "45㎡",
      rating: "4.8",
      reviews: "127"
    },
    {
      id: 2,
      title: "해운대 오션 브리즈 스테이",
      location: "부산 해운대 근처",
      subtitle: "포근한 소재와 은은한 조명감이 살아 있는 공간",
      desc: "소박한 조화와 은은한 감성이 살아있는 공간. 창문을 열면 시원한 바다 내음이 느껴지는 감성 가득한 하루.",
      image: "/blueprint-2.jpg",
      tags: ["#포근한", "#빔프로젝터", "#욕조", "#린넨"],
      category: "미니멀 & 심플",
      price: "210,000원",
      size: "52㎡",
      rating: "4.9",
      reviews: "98"
    },
    {
      id: 3,
      title: "서촌 한옥 스테이",
      location: "서울 종로 서촌",
      subtitle: "고즈넉한 대청마루에서 느끼는 전통의 쉼",
      desc: "수백 년의 세월을 간직한 대들보와 현대식 편리함이 공존하는 프리미엄 한옥 공간",
      image: "/blueprint-1.jpg",
      tags: ["#한옥", "#서촌마을", "#다도", "#원목"],
      category: "내추럴",
      price: "240,000원",
      size: "60㎡",
      rating: "4.7",
      reviews: "64"
    },
    {
      id: 4,
      title: "제주 돌담 스테이",
      location: "제주 한림읍",
      subtitle: "현무암 돌담 안에서 즐기는 따뜻한 프라이빗 스파",
      desc: "제주의 옛 감성을 온전히 살리면서 내부엔 아늑한 욕조와 프리미엄 우드 테이블을 배치한 공간",
      image: "/blueprint-2.jpg",
      tags: ["#독채", "#야외스파", "#제주감성", "#라탄"],
      category: "내추럴",
      price: "280,000원",
      size: "70㎡",
      rating: "4.9",
      reviews: "112"
    }
  ];

  const handleAddToCart = (stay: StayType) => {
    const isAlreadyInCart = cartItems.some((item) => item.id === stay.id);
    if (isAlreadyInCart) {
      alert("이미 장바구니에 담긴 숙소입니다.");
      return;
    }

    const priceNum = parseInt(stay.price.replace(/[^0-9]/g, ""), 10);
    const newItem = {
      id: stay.id,
      title: stay.title,
      location: stay.location,
      price: priceNum,
      priceStr: `₩${priceNum.toLocaleString()}`,
      image: stay.image,
      dates: "2026.06.12 - 06.13 (1박)",
      guests: guests
    };

    setCartItems([...cartItems, newItem]);
    alert(`${stay.title}가 장바구니에 담겼습니다.`);
  };

  if (selectedStay) {
    return (
      <div className="w-full max-w-[1280px] px-8 py-10 flex flex-col min-h-screen">
        {/* Breadcrumb & Back */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-[12px] text-neutral-400 font-semibold tracking-tight flex items-center gap-1.5">
            <span>홈</span>
            <span>&gt;</span>
            <span>스테이 탐색</span>
            <span>&gt;</span>
            <span className="text-neutral-800">{selectedStay.title}</span>
          </div>
          <button 
            onClick={() => setSelectedStay(null)}
            className="text-[13px] font-semibold text-neutral-500 hover:text-black flex items-center gap-1"
          >
            ← 목록으로 돌아가기
          </button>
        </div>

        {/* Main Detail Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-16 items-start mb-24">
          
          {/* Left Side: Blueprint Carousel Box */}
          <div className="lg:col-span-7 bg-[#F8F9FA] aspect-[4/3] rounded-[32px] border border-neutral-100 flex items-center justify-center p-12 relative overflow-hidden shadow-sm">
            <img src={selectedStay.image} className="max-h-full object-contain max-w-full" alt="Floor plan" />
          </div>

          {/* Right Side: Sticky Booking Sidebar */}
          <div className="lg:col-span-5 flex flex-col lg:sticky lg:top-[60px] bg-white p-8 rounded-[28px]">
            {/* Rating */}
            <div className="flex items-center gap-1.5 text-[12px] font-semibold text-neutral-800 mb-3.5">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="text-[#888888] ml-1">{selectedStay.reviews}개 후기</span>
            </div>

            {/* Title */}
            <h1 className="text-[30px] font-semibold text-neutral-900 tracking-tight mb-4">{selectedStay.title}</h1>
            
            {/* Desc */}
            <p className="text-neutral-500 text-[13px] font-medium leading-[1.9] tracking-tight mb-8">
              {selectedStay.desc}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-neutral-100">
              <span className="text-[28px] font-semibold text-neutral-900">{selectedStay.price}</span>
              <span className="text-neutral-400 text-[13px] font-medium">/ 박</span>
            </div>

            {/* Reservation Selectors */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest">체크인</label>
                <div className="h-12 px-4 bg-white border border-neutral-200 rounded-xl text-[13px] font-semibold text-neutral-800 flex items-center">
                  2026 - 06 - 12
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest">체크아웃</label>
                <div className="h-12 px-4 bg-white border border-neutral-200 rounded-xl text-[13px] font-semibold text-neutral-800 flex items-center">
                  2026 - 06 - 13
                </div>
              </div>
            </div>

            {/* Guests Count Selector */}
            <div className="flex flex-col gap-2 mb-8">
              <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest">인원</label>
              <div className="h-12 px-5 bg-[#F8F9FA] rounded-xl flex items-center justify-between text-[14px] font-semibold">
                <button 
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-9 h-9 rounded-full hover:bg-neutral-200 flex items-center justify-center font-semibold text-[18px] text-neutral-600 transition-colors"
                >
                  -
                </button>
                <span>{guests}명</span>
                <button 
                  onClick={() => setGuests(guests + 1)}
                  className="w-9 h-9 rounded-full hover:bg-neutral-200 flex items-center justify-center font-semibold text-[18px] text-neutral-600 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Booking Buttons */}
            <div className="flex gap-4 mb-8 pb-8 border-b border-neutral-100">
              <button 
                onClick={() => setIsWished(!isWished)}
                className={`flex-1 h-13 rounded-xl border flex items-center justify-center gap-1.5 text-[13px] font-semibold transition-all ${
                  isWished 
                    ? "border-red-200 bg-red-50 text-red-500" 
                    : "border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                <Heart className={`w-4 h-4 ${isWished ? "fill-current" : ""}`} />
                <span>위시리스트</span>
              </button>
              <button 
                onClick={() => handleAddToCart(selectedStay)}
                className="flex-[2] h-13 bg-black text-white hover:bg-neutral-800 rounded-xl text-[13px] font-semibold transition-colors active:scale-95 duration-150 shadow-md"
              >
                장바구니 담기
              </button>
            </div>

            {/* Spec Items Grid */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-[13px]">
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 font-semibold">공간</span>
                <span className="text-neutral-800 font-semibold">독채 / 아파트</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 font-semibold">면적</span>
                <span className="text-neutral-800 font-semibold">{selectedStay.size}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 font-semibold">스타일</span>
                <span className="text-neutral-800 font-semibold">{selectedStay.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 font-semibold">최대인원</span>
                <span className="text-neutral-800 font-semibold">2인</span>
              </div>
            </div>

          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="w-full border-b border-neutral-150 flex items-center gap-12 mb-12 text-[15px] font-semibold text-neutral-450">
          <button 
            onClick={() => setDetailTab("intro")}
            className={`py-5 border-b-2 transition-all ${detailTab === "intro" ? "border-black text-black" : "border-transparent hover:text-neutral-700"}`}
          >
            공간소개
          </button>
          <button 
            onClick={() => setDetailTab("products")}
            className={`py-5 border-b-2 transition-all ${detailTab === "products" ? "border-black text-black" : "border-transparent hover:text-neutral-700"}`}
          >
            제품
          </button>
          <button 
            onClick={() => setDetailTab("structure")}
            className={`py-5 border-b-2 transition-all ${detailTab === "structure" ? "border-black text-black" : "border-transparent hover:text-neutral-700"}`}
          >
            구조
          </button>
          <button 
            onClick={() => setDetailTab("reviews")}
            className={`py-5 border-b-2 transition-all ${detailTab === "reviews" ? "border-black text-black" : "border-transparent hover:text-neutral-700"}`}
          >
            후기
          </button>
        </div>

        {/* Tab Contents */}
        <div className="w-full pb-20">
          {detailTab === "intro" && (
            <div className="max-w-[840px] text-[#4A4D50] text-[14px] font-medium leading-[2.4] tracking-tight">
              <p className="mb-6">
                {selectedStay.title}는 시간이 멈춘 듯한 클래식하고 고풍스러운 인테리어가 매력적인 아늑한 공간입니다. 
                엄선된 빈티지 원목 서랍장부터 세월의 무게가 느껴지는 전신거울과 테이블 램프 등 모든 소품 하나하나 정성스럽게 연출되었습니다.
              </p>
              <p>
                가공되지 않은 나무 향과 은은한 불빛이 만드는 특유의 따뜻하고 안락한 분위기 속에서 바쁜 도심의 흐름을 잊고 온전한 나만의 온기와 휴식을 즐겨보세요.
              </p>
            </div>
          )}

          {detailTab === "products" && (
            <div className="flex flex-col gap-16">
              {/* Section 1 */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[19px] font-semibold text-neutral-900 tracking-tight">우리 집엔 매일 나무가 숨 쉰다</h3>
                    <p className="text-[#888888] text-[12px] font-medium mt-1">공간을 채우는 은은한 나무 향기와 흔들림 없는 견고함</p>
                  </div>
                  <a href="https://ohou.se" target="_blank" rel="noopener noreferrer" className="h-9 px-5 border border-neutral-200 hover:bg-neutral-50 rounded-xl text-[12px] font-semibold text-neutral-600 flex items-center justify-center gap-1 transition-all">
                    더보기 <span className="text-[10px] font-light">↗</span>
                  </a>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-8">
                  {[
                    { brand: "까사미아", name: "빈티지 원목 6단 서랍장 월넛", price: "389,000원", rating: "4.8", reviews: "15,234", img: "/prod-drawer.jpg" },
                    { brand: "베스트리빙", name: "애슐리 원목 전신거울 7colors", price: "57,900원", rating: "4.6", reviews: "33,152", img: "/prod-mirror.jpg" },
                    { brand: "이지파파", name: "클래식 빈티지 협탁 서랍장 세트", price: "57,000원", rating: "4.5", reviews: "1,945", img: "/prod-bedside.jpg" },
                    { brand: "미엔우드", name: "폭좁은틈새장 미니수납장", price: "28,900원", rating: "4.8", reviews: "563", img: "/prod-shelf.jpg" },
                    { brand: "오크빌", name: "오테카 원목 책상 1200", price: "148,000원", rating: "4.5", reviews: "5,245", img: "/prod-desk.jpg" }
                  ].map((prod, idx) => (
                    <div key={idx} className="bg-white rounded-2xl overflow-hidden flex flex-col border border-neutral-100 hover:shadow-lg transition-all duration-300">
                      <div className="bg-white aspect-square flex items-center justify-center relative overflow-hidden">
                        <img src={prod.img} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[#888888] text-[10px] font-semibold block mb-1">{prod.brand}</span>
                          <h4 className="text-neutral-900 text-[12px] font-semibold leading-snug line-clamp-2 mb-2">{prod.name}</h4>
                          <span className="text-neutral-900 text-[13px] font-semibold">{prod.price}</span>
                        </div>
                        <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-col gap-2.5">
                          <div className="flex items-center gap-1 text-[10px] font-semibold text-neutral-800">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                            <span>{prod.rating}</span>
                            <span className="text-neutral-400">({prod.reviews})</span>
                          </div>
                          <a href="https://ohou.se" target="_blank" rel="noopener noreferrer" className="w-full h-8 bg-[#1A1C1E] text-white hover:bg-neutral-800 rounded-lg text-[10.5px] font-semibold flex items-center justify-center gap-0.5 transition-colors">
                            오늘의집에서 보기 <span className="text-[8.5px] font-light">↗</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {detailTab === "structure" && (
            <div className="flex flex-col gap-4 max-w-[840px]">
              <h3 className="text-[19px] font-semibold text-neutral-950 mb-4">공간 구조</h3>
              {[
                { num: "1", title: "메인 룸", desc: "고풍스러운 가구와 따뜻한 조명이 어우러진 휴식 공간", area: "22㎡" },
                { num: "2", title: "침실", desc: "편안한 퀸사이즈 침대와 감성적인 침구", area: "13㎡" },
                { num: "3", title: "욕실 & 스파", desc: "피로를 풀 수 있는 고급형 욕조 시스템", area: "10㎡" }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#F8F9FA] rounded-2xl p-6 border border-neutral-100/80 flex items-center justify-between text-[13.5px] shadow-sm">
                  <div className="flex items-center gap-6">
                    <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center font-semibold text-[12px] shrink-0">
                      {item.num}
                    </span>
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-0.5">{item.title}</h4>
                      <p className="text-neutral-500 font-medium text-[12.5px] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <span className="text-neutral-400 font-semibold shrink-0 text-[12.5px]">{item.area}</span>
                </div>
              ))}
            </div>
          )}

          {detailTab === "reviews" && (
            <div className="max-w-[920px]">
              <div className="flex flex-col gap-6 pb-8 border-b border-neutral-150 mb-8">
                <div>
                  <h3 className="text-[19px] font-semibold text-neutral-950">후기</h3>
                  <div className="flex items-center gap-2 text-[13px] text-neutral-700 font-semibold mt-1.5">
                    <div className="flex items-center text-amber-400">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current text-neutral-200" />
                    </div>
                    <span>{selectedStay.rating} / 5</span>
                    <span className="text-neutral-300 font-normal">·</span>
                    <span className="text-neutral-400">{selectedStay.reviews}개 후기</span>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {[
                  { author: "김지수", rating: 5, date: "2026년 3월 15일", content: "정말 특별한 공간이었어요. 아늑하고 프라이빗해서 머무는 내내 힐링했습니다." },
                  { author: "박민준", rating: 5, date: "2026년 2월 28일", content: "처음엔 주소를 몰라서 신기했는데 가보니 대만족이었습니다! 꼭 다시 오고 싶어요." }
                ].map((rev, idx) => (
                  <div key={idx} className="pb-8 border-b border-neutral-100 flex gap-6 items-start text-[13.5px]">
                    <div className="w-11 h-11 rounded-full bg-neutral-100 flex items-center justify-center text-[16px] font-semibold text-neutral-400 shrink-0">
                      👤
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-neutral-900">{rev.author}</h4>
                        <span className="text-[#888888] font-medium text-[12px]">{rev.date}</span>
                      </div>
                      <div className="flex items-center text-amber-400 mb-3">
                        {Array.from({ length: 5 }).map((_, sIdx) => (
                          <Star key={sIdx} className={`w-3.5 h-3.5 ${sIdx < rev.rating ? "fill-current" : "text-neutral-200"}`} />
                        ))}
                      </div>
                      <p className="text-neutral-700 font-medium leading-[2.1] mb-4">{rev.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1360px] px-8 py-20 min-h-screen">
      <div className="mb-16">
        <span className="text-[11px] font-semibold text-[#888888] tracking-widest block mb-3 uppercase">Ostay Curation</span>
        <h2 className="text-[32px] font-semibold text-neutral-900 tracking-tight">취향을 담은 스테이 탐색</h2>
        <p className="text-neutral-400 text-[14px] mt-2">오늘의집 스타일 감성과 도면을 바탕으로 나에게 어울리는 스테이를 만나보세요.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {stays.map((stay) => (
          <article 
            key={stay.id} 
            onClick={() => setSelectedStay(stay)}
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
          </article>
        ))}
      </div>
    </div>
  );
}
