"use client";

import React, { useState } from "react";

export default function HostPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-[1360px] px-8 py-20 min-h-screen flex flex-col items-center">
      <div className="text-center mb-16 max-w-[800px]">
        <span className="text-[11px] font-semibold text-[#888888] tracking-widest block mb-3 uppercase">Host Partnership</span>
        <h2 className="text-[32px] font-semibold text-neutral-900 tracking-tight">블라인드 호스트 신청</h2>
        <p className="text-neutral-500 text-[14px] mt-4 leading-relaxed">
          오늘의 스테이는 공간의 유명세나 위치보다 공간을 구성하는 가구와 오브제, 
          그리고 그 안에 담긴 호스트의 독창적인 스토리와 철학을 더 중요하게 생각합니다. 
          게스트에게 잊지 못할 취향 매칭 숙박 경험을 선물해 보세요.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 max-w-[1000px] w-full items-start">
        {/* Info side */}
        <div className="space-y-10">
          <div>
            <h3 className="text-[18px] font-semibold text-neutral-900 mb-3">왜 오늘의 스테이 호스트인가요?</h3>
            <p className="text-neutral-500 text-[13px] leading-relaxed">
              자극적인 마케팅이나 사진 경쟁 없이, 오직 잘 기획된 평면 도면과 무드 정보만을 통해 
              진정한 취향 매니아가 매칭됩니다. 공간의 퀄리티를 있는 그대로 이해하는 멋진 게스트들과 만나보세요.
            </p>
          </div>
          <div>
            <h3 className="text-[18px] font-semibold text-neutral-900 mb-3">간단한 3단계 파트너십 프로세스</h3>
            <ol className="text-neutral-500 text-[13px] space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-semibold text-[11px] shrink-0">1</span>
                <span>파트너십 신청서 접수 및 기본 공간 정보 기재</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-semibold text-[11px] shrink-0">2</span>
                <span>공간 도면(Blueprint) 생성 및 스타일 큐레이션 검수 진행</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-semibold text-[11px] shrink-0">3</span>
                <span>플랫폼 공식 런칭 및 블라인드 매칭 예약 오픈</span>
              </li>
            </ol>
          </div>
        </div>

        {/* Apply form */}
        <div className="bg-[#F8F9FA] p-10 rounded-[32px] border border-neutral-100/60 shadow-sm w-full">
          {submitted ? (
            <div className="text-center py-12">
              <span className="text-4xl block mb-4">✨</span>
              <h4 className="text-[17px] font-semibold text-neutral-900 mb-2">호스트 신청이 완료되었습니다!</h4>
              <p className="text-neutral-400 text-[12px] leading-relaxed">
                신청해 주신 연락처와 이메일로 3영업일 이내에 담당자가 제안서 양식과 함께 개별 연락을 드리겠습니다.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h4 className="text-[16px] font-semibold text-neutral-900 mb-2">파트너십 신청서</h4>
              <div>
                <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest block mb-2">호스트 성함 / 업체명</label>
                <input 
                  type="text" 
                  required 
                  placeholder="예: 홍길동"
                  className="w-full h-11 px-4 bg-white border border-neutral-200 focus:border-neutral-400 rounded-xl text-[13px] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest block mb-2">이메일 주소</label>
                <input 
                  type="email" 
                  required 
                  placeholder="example@ostay.com"
                  className="w-full h-11 px-4 bg-white border border-neutral-200 focus:border-neutral-400 rounded-xl text-[13px] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest block mb-2">공간 위치 (지역)</label>
                <input 
                  type="text" 
                  required 
                  placeholder="예: 서울 종로구 또는 제주 구좌읍"
                  className="w-full h-11 px-4 bg-white border border-neutral-200 focus:border-neutral-400 rounded-xl text-[13px] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest block mb-2">공간 한 줄 소개</label>
                <textarea 
                  required 
                  placeholder="공간에 담긴 취향이나 스타일 특징을 적어주세요."
                  rows={3}
                  className="w-full p-4 bg-white border border-neutral-200 focus:border-neutral-400 rounded-xl text-[13px] focus:outline-none resize-none"
                />
              </div>
              <button 
                type="submit"
                className="w-full h-12 bg-black hover:bg-neutral-800 text-white rounded-xl text-[13px] font-semibold transition-colors shadow-md active:scale-95 duration-150"
              >
                파트너십 신청 완료하기
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
