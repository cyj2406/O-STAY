"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#1A1C1E] text-neutral-400 py-20 px-8 flex justify-center border-t border-neutral-800 mt-[200px] mt-auto">
      <div className="w-full max-w-[1360px] grid md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            {/* Invert black logo to display white logo in footer */}
            <img 
              src="/logo-black.svg" 
              className="h-6 w-auto object-contain" 
              style={{ filter: "invert(1) brightness(10)" }}
              alt="오늘의 스테이" 
            />
          </div>
          <p className="text-[12px] text-neutral-500 leading-[2] tracking-tight">
            보이는 정보가 아닌 오직 취향으로만.
            <br />
            당신의 하루를 더 설레게 만들 새로운 숙박 경험.
          </p>
        </div>
        <div>
          <h4 className="text-white text-[13px] font-semibold uppercase tracking-wider mb-5">서비스</h4>
          <ul className="text-[12px] space-y-3">
            <li><a href="/explore" className="hover:text-white transition-colors">취향탐색</a></li>
            <li><a href="#" className="hover:text-white transition-colors">예약조회</a></li>
            <li><a href="/host" className="hover:text-white transition-colors">블라인드 호스트 지원</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-[13px] font-semibold uppercase tracking-wider mb-5">고객센터</h4>
          <ul className="text-[12px] space-y-3">
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">1:1 문의</a></li>
            <li><a href="#" className="hover:text-white transition-colors">이용약관</a></li>
          </ul>
        </div>
        <div className="col-span-full pt-10 border-t border-neutral-800 text-[11px] text-neutral-600 flex justify-between">
          <span>&copy; 2026 BLIND OSTAY. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-neutral-400 transition-colors">Instagram</a>
            <a href="#" className="hover:text-neutral-400 transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
