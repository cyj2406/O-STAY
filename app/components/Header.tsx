"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X, Search } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [showPromoBanner, setShowPromoBanner] = useState(true);
  
  const {
    cartItems,
    setCartItems,
    activePanel,
    setActivePanel,
    isLoggedIn,
    setIsLoggedIn,
    recentSearches,
    setRecentSearches,
    searchQuery,
    setSearchQuery,
    setShowQuizModal
  } = useApp();

  const togglePanel = (panel: "none" | "search" | "mypage" | "cart") => {
    setActivePanel(activePanel === panel ? "none" : panel);
  };

  const addSearchQuery = (query: string) => {
    if (query && !recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches.slice(0, 4)]);
    }
  };

  // Helper function to check active nav link
  const getNavLinkClass = (path: string) => {
    const isActive = pathname === path;
    return `hover:text-black transition-colors py-1.5 relative ${
      isActive ? "text-black border-b-2 border-black pb-[4px]" : "text-neutral-500"
    }`;
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* PROMO BANNER */}
      {showPromoBanner && (
        <div className="w-full bg-[#F3F5F7] h-11 px-8 flex items-center justify-between z-50 text-[12px] text-[#141718] border-b border-neutral-200/60 transition-all">
          <div />
          <div className="flex items-center gap-1.5 font-semibold tracking-tight">
            <img src="/ticket-percent.svg" className="w-5 h-5 object-contain mr-1" alt="" />
            <span>오늘의 스테이 그랜드 오픈 — 첫 예약 10% 웰컴 쿠폰 발급 중!</span>
            <a href="#" className="text-[#377DFF] underline flex items-center gap-0.5 ml-1">
              쿠폰 받기
              <span className="text-[10px] font-semibold">&gt;</span>
            </a>
          </div>
          <button 
            onClick={() => setShowPromoBanner(false)}
            className="p-1 hover:bg-neutral-200/60 rounded-full transition-colors"
            aria-label="닫기"
          >
            <X className="w-4 h-4 text-[#343839]" />
          </button>
        </div>
      )}

      {/* HEADER */}
      <header className="w-full max-w-[1360px] bg-white px-8 py-6 flex items-center justify-between z-40 border-b border-neutral-100/80 relative">
        {/* Logo */}
        <Link href="/" className="flex items-center cursor-pointer hover:opacity-85 transition-opacity" onClick={() => setActivePanel("none")}>
          <img src="/logo-black.svg" className="h-6 w-auto object-contain" alt="오늘의 스테이" />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-12 text-[14px] font-semibold tracking-tight">
          <Link href="/explore" className={getNavLinkClass("/explore")}>스테이 탐색</Link>
          <Link href="/popular" className={getNavLinkClass("/popular")}>인기 스테이</Link>
          <Link href="/reviews" className={getNavLinkClass("/reviews")}>블라인드 후기</Link>
          <Link href="/host" className={getNavLinkClass("/host")}>호스트 신청</Link>
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-5 relative">
          <button 
            onClick={() => togglePanel("search")}
            className={`p-1.5 rounded-full transition-colors ${activePanel === "search" ? "bg-neutral-100" : "hover:bg-neutral-50"}`} 
            aria-label="검색"
          >
            <img src="/search.svg" className="w-6 h-6 object-contain" alt="검색" />
          </button>
          <button 
            onClick={() => togglePanel("mypage")}
            className={`p-1.5 rounded-full transition-colors ${activePanel === "mypage" ? "bg-neutral-100" : "hover:bg-neutral-50"}`} 
            aria-label="프로필"
          >
            <img src="/user-circle.svg" className="w-6 h-6 object-contain" alt="프로필" />
          </button>
          <button 
            onClick={() => togglePanel("cart")}
            className={`p-1.5 rounded-full transition-colors ${activePanel === "cart" ? "bg-neutral-100" : "hover:bg-neutral-50"}`} 
            aria-label="장바구니"
          >
            <img src="/shopping-bag.svg" className="w-6 h-6 object-contain" alt="장바구니" />
          </button>

          {/* MY PAGE DROPDOWN */}
          {activePanel === "mypage" && (
            <div className="absolute right-0 top-12 w-64 bg-white border border-neutral-200/80 rounded-2xl shadow-xl p-5 z-[90] flex flex-col gap-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-3 pb-3.5 border-b border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-lg">
                  👤
                </div>
                <div>
                  <h4 className="text-[13px] font-semibold text-neutral-900">
                    {isLoggedIn ? "김취향 님" : "로그인이 필요합니다"}
                  </h4>
                  <span className="text-[10px] text-neutral-400 font-semibold">
                    {isLoggedIn ? "taste_master@ostay.com" : "원활한 서비스를 위해 로그인하세요"}
                  </span>
                </div>
              </div>

              {isLoggedIn ? (
                <div className="flex flex-col gap-2.5 text-[12px] font-semibold text-neutral-600">
                  <a href="#" className="hover:text-black transition-colors py-1 flex justify-between items-center">
                    <span>예약 내역</span>
                    <span className="text-[10px] bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded-full">1건</span>
                  </a>
                  <a href="#" className="hover:text-black transition-colors py-1 flex justify-between items-center">
                    <span>찜한 스테이</span>
                    <span className="text-[10px] bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded-full">2건</span>
                  </a>
                  <a href="#" className="hover:text-black transition-colors py-1">후기 관리</a>
                  <a href="#" className="hover:text-black transition-colors py-1">계정 설정</a>
                  <button 
                    onClick={() => setIsLoggedIn(false)}
                    className="w-full h-9 border border-neutral-200 hover:bg-neutral-50 rounded-xl text-[11px] font-semibold text-neutral-500 mt-2 transition-all active:scale-95"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsLoggedIn(true)}
                  className="w-full h-10 bg-black text-white hover:bg-neutral-800 rounded-xl text-[12px] font-semibold transition-all active:scale-95"
                >
                  로그인 / 회원가입
                </button>
              )}
            </div>
          )}
        </div>

        {/* SEARCH INTERACTIVE PANEL */}
        {activePanel === "search" && (
          <div className="absolute left-0 right-0 top-[73px] bg-white border-b border-neutral-200 shadow-lg p-8 z-[80] flex justify-center animate-in slide-in-from-top-2 duration-200">
            <div className="w-full max-w-[800px] flex flex-col gap-6">
              {/* Search Bar Input */}
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="원하시는 숙소명, 지역, 스타일 키워드를 입력해보세요."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addSearchQuery(searchQuery);
                      setSearchQuery("");
                      setActivePanel("none");
                      router.push("/explore");
                    }
                  }}
                  className="w-full h-12 pl-12 pr-6 border border-neutral-200 focus:border-neutral-400 rounded-xl text-[13px] font-medium focus:outline-none"
                />
                <Search className="absolute left-4 w-5 h-5 text-neutral-400 pointer-events-none" />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 p-1 hover:bg-neutral-100 rounded-full"
                  >
                    <X className="w-4 h-4 text-neutral-400" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-8 text-[12px]">
                {/* Recent Searches */}
                <div>
                  <h4 className="font-semibold text-neutral-400 mb-3 uppercase tracking-wider">최근 검색어</h4>
                  <div className="flex flex-col gap-2">
                    {recentSearches.map((keyword, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1 border-b border-neutral-50">
                        <button 
                          onClick={() => {
                            setActivePanel("none");
                            router.push("/explore");
                          }}
                          className="hover:text-black text-neutral-700 font-semibold"
                        >
                          {keyword}
                        </button>
                        <button 
                          onClick={() => setRecentSearches(recentSearches.filter((x) => x !== keyword))}
                          className="p-0.5 hover:bg-neutral-100 rounded"
                        >
                          <X className="w-3.5 h-3.5 text-neutral-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended keywords */}
                <div>
                  <h4 className="font-semibold text-neutral-400 mb-3 uppercase tracking-wider">추천 검색어</h4>
                  <div className="flex flex-wrap gap-2">
                    {["#원목", "#빈티지", "#한옥", "#독채", "#오피스 공간", "#스파", "#감성숙소"].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          setActivePanel("none");
                          router.push("/explore");
                        }}
                        className="px-3.5 py-1.5 bg-[#F4F4F5] hover:bg-neutral-200 rounded-full text-neutral-600 font-semibold transition-all text-[11px]"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* CART / RESERVATION SLIDE PANEL */}
      {activePanel === "cart" && (
        <>
          {/* Dimmed backdrop for Cart Slide Panel */}
          <div 
            onClick={() => setActivePanel("none")} 
            className="fixed inset-0 bg-black/40 z-[95] backdrop-blur-[1px]" 
          />
          <div className="fixed top-0 right-0 bottom-0 w-[420px] bg-white shadow-2xl border-l border-neutral-200 z-[100] p-8 flex flex-col justify-between animate-in slide-in-from-right duration-250">
            <div className="flex flex-col h-[calc(100%-110px)]">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-100">
                <h3 className="text-[18px] font-semibold text-neutral-900 flex items-center gap-2">
                  장바구니
                  <span className="text-[12px] bg-neutral-100 text-neutral-600 px-2.5 py-0.5 rounded-full font-semibold">
                    {cartItems.length}
                  </span>
                </h3>
                <button 
                  onClick={() => setActivePanel("none")}
                  className="p-1 hover:bg-neutral-100 rounded-full transition-colors"
                  aria-label="닫기"
                >
                  <X className="w-5 h-5 text-neutral-500" />
                </button>
              </div>

              {/* Stays List */}
              {cartItems.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-20 text-neutral-400">
                  <span className="text-4xl mb-4">🛒</span>
                  <p className="text-[13px] font-semibold">장바구니에 담긴 숙소가 없습니다.</p>
                  <p className="text-[11px] text-neutral-300 mt-1">마음에 드는 스테이를 찾아 담아보세요!</p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border border-neutral-100 rounded-xl items-start bg-white hover:border-neutral-200 transition-colors">
                      <img 
                        src={item.image} 
                        className="w-16 h-16 object-cover bg-neutral-50 border border-neutral-100 rounded-lg flex-shrink-0" 
                        alt="" 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-[13.5px] font-semibold text-neutral-900 truncate">
                            {item.title}
                          </h4>
                          <button 
                            onClick={() => setCartItems(cartItems.filter((x) => x.id !== item.id))}
                            className="text-neutral-400 hover:text-neutral-600 text-[11px] font-semibold transition-colors flex-shrink-0"
                            title="삭제"
                          >
                            삭제
                          </button>
                        </div>
                        
                        <div className="mt-1.5 text-[11px] text-neutral-500 font-medium space-y-0.5">
                          <p>{item.location}</p>
                          <p>{item.dates} · 인원 {item.guests}명</p>
                        </div>

                        <div className="mt-3 flex items-center justify-between pt-2 border-t border-neutral-50">
                          <span className="text-[11px] text-neutral-400 font-semibold">예약 요금</span>
                          <span className="text-[13.5px] font-semibold text-neutral-900">{item.priceStr}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-neutral-100 bg-white">
              <div className="flex flex-col gap-2 mb-5">
                <div className="flex justify-between items-center text-[13px] font-semibold text-neutral-500">
                  <span>총 선택 숙소</span>
                  <span className="text-neutral-900 font-semibold">{cartItems.length}개</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[14px] font-semibold text-neutral-800">예상 결제 금액</span>
                  <span className="text-[20px] font-semibold text-black">
                    ₩{cartItems.reduce((acc, curr) => acc + curr.price, 0).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setCartItems([])}
                  disabled={cartItems.length === 0}
                  className="flex-1 h-11 border border-neutral-200 hover:bg-neutral-50 disabled:opacity-50 disabled:hover:bg-white rounded-xl text-[12px] font-semibold text-neutral-600 transition-colors"
                >
                  모두 삭제
                </button>
                <button 
                  onClick={() => {
                    setActivePanel("none");
                    router.push("/explore");
                  }}
                  disabled={cartItems.length === 0}
                  className="flex-[2] h-11 bg-black text-white hover:bg-neutral-800 disabled:opacity-50 disabled:hover:bg-black rounded-xl text-[12px] font-semibold shadow-md active:scale-95 transition-all"
                >
                  예약하기
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
