"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "../../context/AppContext";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { Calendar, Users } from "lucide-react";

export default function CheckoutCompletePage() {
  const router = useRouter();
  const { lastOrder } = useApp();
  const canRender = useRequireAuth();

  // A refresh remounts AppProvider and wipes the in-memory lastOrder, since
  // order data isn't persisted — bounce straight to the main page instead of
  // showing a completion screen with nothing to show.
  useEffect(() => {
    if (canRender && !lastOrder) {
      router.replace("/");
    }
  }, [canRender, lastOrder, router]);

  if (!canRender || !lastOrder) {
    return null;
  }

  const paymentMethodLabel =
    lastOrder.paymentMethod === "card"
      ? "신용/체크카드"
      : lastOrder.paymentMethod === "bank"
      ? "무통장 입금"
      : "간편결제";

  const handleViewReservations = () => {
    router.push("/mypage");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-16 bg-[#FAFAFA]">
      <div className="bg-white max-w-[480px] w-full rounded-[32px] p-8 border border-neutral-200/80 shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-250">
        <div className="w-16 h-16 bg-neutral-900 text-white rounded-full flex items-center justify-center text-2xl mb-6 animate-bounce">
          🎉
        </div>

        <h3 className="text-[22px] font-semibold text-neutral-900 tracking-tight mb-2">
          예약이 확정되었어요
        </h3>
        <p className="text-[13px] text-neutral-500 font-medium mb-6">
          선택하신 공간과의 설레는 여행이 확정되었습니다.<br />
          체크인 가이드 및 숙소 실명은 회원 정보의 이메일로 전송되었습니다.
        </p>

        <div className="w-full bg-neutral-50 rounded-2xl p-5 border border-neutral-100 flex flex-col gap-3 text-[12.5px] text-left mb-5 font-semibold">
          <div className="flex justify-between pb-2.5 border-b border-neutral-200/40">
            <span className="text-neutral-400">예약 번호</span>
            <span className="text-neutral-900 font-mono">{lastOrder.orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">예약자명</span>
            <span className="text-neutral-900">{lastOrder.name}</span>
          </div>
        </div>

        {/* 예약 스테이 요약: 스테이명 / 날짜 / 인원 / 결제 금액 */}
        <div className="w-full flex flex-col gap-3 mb-5">
          {lastOrder.items.map((item) => (
            <div
              key={item.id}
              className="w-full bg-neutral-50 rounded-2xl p-4 border border-neutral-100 flex flex-col gap-2 text-left"
            >
              <h4 className="text-[13px] font-semibold text-neutral-900 truncate">{item.title}</h4>
              <div className="flex items-center gap-3 text-[11px] text-neutral-500 font-semibold">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-neutral-400" />
                  {item.dates}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-neutral-400" />
                  인원 {item.guests}명
                </span>
              </div>
              <div className="flex justify-end text-[12.5px] font-bold text-neutral-900">{item.priceStr}</div>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-between items-baseline mb-6 px-1">
          <span className="text-[13px] font-bold text-neutral-700">최종 결제 금액</span>
          <span className="text-[20px] font-black text-black">
            ₩{lastOrder.finalPrice.toLocaleString()}{" "}
            <span className="text-[11px] font-semibold text-neutral-400">({paymentMethodLabel})</span>
          </span>
        </div>

        <div className="w-full flex gap-3">
          <button
            onClick={handleViewReservations}
            className="flex-1 h-12 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 rounded-xl font-bold text-[13px] tracking-tight transition-all active:scale-[0.98]"
          >
            예약 내역 보기
          </button>
          <button
            onClick={() => router.push("/")}
            className="flex-1 h-12 bg-black text-white hover:bg-neutral-800 rounded-xl font-bold text-[13px] tracking-tight shadow-md transition-all active:scale-[0.98]"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
