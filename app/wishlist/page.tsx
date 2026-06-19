"use client";

import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useApp } from "../context/AppContext";
import { useRequireAuth } from "../hooks/useRequireAuth";

export default function WishlistPage() {
  const { wishlist, toggleWish } = useApp();
  const canRender = useRequireAuth();

  if (!canRender) {
    return null;
  }

  return (
    <div className="w-full max-w-[1360px] px-8 py-20 min-h-screen mx-auto">
      <div className="mb-16">
        <span className="text-[11px] font-semibold text-[#888888] tracking-widest block mb-3 uppercase">My Page</span>
        <h2 className="text-[32px] font-semibold text-neutral-900 tracking-tight">찜한 스테이</h2>
        <p className="text-neutral-400 text-[14px] mt-2">마음에 담아둔 스테이를 다시 확인하고 예약을 이어가세요.</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center text-center py-24">
          <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center text-3xl mb-6 shadow-sm border border-neutral-100">
            🤍
          </div>
          <h2 className="text-[24px] font-semibold text-neutral-900 tracking-tight mb-2">아직 찜한 스테이가 없어요</h2>
          <p className="text-neutral-400 text-[14px] font-medium tracking-tight mb-8 max-w-sm">
            나만의 취향에 맞는 스테이를 탐색하고 마음에 드는 공간을 찜해보세요.
          </p>
          <Link
            href="/explore"
            className="h-12 px-8 bg-black text-white hover:bg-neutral-800 rounded-full font-semibold text-[13px] tracking-tight flex items-center gap-2 transition-all active:scale-95 duration-150"
          >
            스테이 둘러보기
            <span className="text-[11px] font-light">&gt;</span>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {wishlist.map((stay) => (
            <article
              key={stay.id}
              className="bg-white rounded-3xl overflow-hidden flex flex-col border border-neutral-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="bg-[#F8F9FA] aspect-[4/3] flex items-center justify-center p-8 relative">
                <img src={stay.image} className="max-h-full object-contain max-w-full" alt="" />
                <span className="absolute top-4 left-4 bg-black text-white text-[9.5px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  ★ {stay.rating}
                </span>
                <button
                  type="button"
                  onClick={() => toggleWish(stay)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-sm transition-colors"
                  aria-label="찜 해제"
                >
                  <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                </button>
              </div>
              <div className="py-6 px-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] text-[#A1A1A1] font-semibold uppercase tracking-widest block mb-1.5">
                    {stay.location}
                  </span>
                  <h3 className="text-[17px] font-semibold text-neutral-900 tracking-tight mb-2.5">{stay.title}</h3>
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
      )}
    </div>
  );
}
