"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useApp } from "../../context/AppContext";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { cancelReservation, findReservation, formatDateLabel, formatPaidAt, getStayStatus, parseStayDates } from "../utils";

const SERVICE_FEE = 15000;

export default function ReservationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { orders, setOrders, showToast } = useApp();
  const canRender = useRequireAuth();

  if (!canRender) {
    return null;
  }

  const reservation = findReservation(orders, id);

  if (!reservation) {
    return (
      <div className="w-full max-w-[1280px] mx-auto px-8 py-32 flex flex-col items-center justify-center text-center min-h-screen">
        <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center text-3xl mb-6 shadow-sm border border-neutral-100">
          🔍
        </div>
        <h2 className="text-[24px] font-semibold text-neutral-900 tracking-tight mb-2">예약을 찾을 수 없어요</h2>
        <p className="text-neutral-400 text-[14px] font-medium tracking-tight mb-8 max-w-sm">
          요청하신 예약 정보가 존재하지 않거나 이미 취소되었습니다.
        </p>
        <Link
          href="/mypage"
          className="h-12 px-8 bg-black text-white hover:bg-neutral-800 rounded-full font-semibold text-[13px] tracking-tight flex items-center gap-2 transition-all active:scale-95 duration-150"
        >
          예약 내역으로 돌아가기
          <span className="text-[11px] font-light">&gt;</span>
        </Link>
      </div>
    );
  }

  const { order, item } = reservation;
  const stayStatus = getStayStatus(item.dates);
  const parsedDates = parseStayDates(item.dates);
  const checkinLabel = parsedDates ? formatDateLabel(parsedDates.checkin) : "-";
  const checkoutLabel = parsedDates ? formatDateLabel(parsedDates.checkout) : "-";
  const nights = parseInt(item.dates.match(/(\d+)박/)?.[1] || "1", 10);
  const nightlyRate = Math.round(item.price / nights);
  const totalPaid = item.price + SERVICE_FEE;

  const handleCancel = () => {
    if (typeof window !== "undefined" && !window.confirm("이 예약을 취소하시겠습니까?")) return;
    cancelReservation(setOrders, order.orderNumber, item.id);
    showToast("예약이 취소되었습니다.", "success");
    router.push("/mypage");
  };

  return (
    <div className="w-full max-w-[1280px] px-8 py-10 flex flex-col min-h-screen mx-auto">
      {/* Breadcrumb & Back */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-[12px] text-neutral-400 font-semibold tracking-tight flex items-center gap-1.5">
          <span>마이페이지</span>
          <span>&gt;</span>
          <span>예약 내역</span>
          <span>&gt;</span>
          <span className="text-neutral-800">{item.title}</span>
        </div>
        <Link
          href="/mypage"
          className="text-[13px] font-semibold text-neutral-500 hover:text-black flex items-center gap-1"
        >
          ← 목록으로 돌아가기
        </Link>
      </div>

      {/* Main Detail Grid Layout */}
      <div className="grid lg:grid-cols-12 gap-16 items-start mb-24">
        {/* Left Side: Floor plan image */}
        <div className="lg:col-span-7 bg-[#F8F9FA] aspect-[4/3] rounded-[32px] border border-neutral-100 flex items-center justify-center p-12 relative overflow-hidden shadow-sm">
          <img src={item.image} className="max-h-full object-contain max-w-full" alt={item.title} />
          <span className="absolute top-5 left-5 bg-black text-white text-[10px] font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
            ★ {item.rating}
          </span>
        </div>

        {/* Right Side: Info panel */}
        <div className="lg:col-span-5 flex flex-col bg-white p-8 rounded-[28px]">
          {/* Stay info */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <span className="text-[11px] text-[#A1A1A1] font-semibold uppercase tracking-widest">{item.location}</span>
            <span className={`text-[10.5px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${stayStatus.badgeClass}`}>
              {stayStatus.label}
            </span>
          </div>
          <h1 className="text-[26px] font-semibold text-neutral-900 tracking-tight mb-4">{item.title}</h1>
          <div className="flex flex-wrap gap-1.5 mb-8 pb-8 border-b border-neutral-100">
            {item.tags.map((tag) => (
              <span key={tag} className="text-[11px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md font-medium">
                {tag}
              </span>
            ))}
          </div>

          {/* Reservation info */}
          <div className="flex flex-col gap-5 mb-8 pb-8 border-b border-neutral-100">
            <h3 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">예약 정보</h3>

            <div className="flex items-center justify-between text-[13px]">
              <span className="text-neutral-400 font-semibold">예약번호</span>
              <span className="text-neutral-800 font-mono font-semibold">{order.orderNumber}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest">체크인</label>
                <div className="h-12 px-4 bg-[#F8F9FA] border border-neutral-200 rounded-xl text-[13px] font-semibold text-neutral-800 flex items-center">
                  {checkinLabel}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest">체크아웃</label>
                <div className="h-12 px-4 bg-[#F8F9FA] border border-neutral-200 rounded-xl text-[13px] font-semibold text-neutral-800 flex items-center">
                  {checkoutLabel}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[13px]">
              <span className="text-neutral-400 font-semibold">인원</span>
              <span className="text-neutral-800 font-semibold">{item.guests}명</span>
            </div>
          </div>

          {/* Payment info */}
          <div className="flex flex-col gap-3 mb-8 pb-8 border-b border-neutral-100">
            <h3 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-1">결제 정보</h3>

            <div className="flex justify-between items-center text-[12.5px] font-semibold text-neutral-500">
              <span>1박 요금</span>
              <span>₩{nightlyRate.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-[12.5px] font-semibold text-neutral-500">
              <span>박 수</span>
              <span>{nights}박</span>
            </div>
            <div className="flex justify-between items-center text-[12.5px] font-semibold text-neutral-500">
              <span>서비스 수수료</span>
              <span>₩{SERVICE_FEE.toLocaleString()}</span>
            </div>

            <div className="border-t border-neutral-100 pt-3 mt-1 flex justify-between items-baseline">
              <span className="text-[14px] font-bold text-neutral-800">총 결제 금액</span>
              <span className="text-[20px] font-black text-black">₩{totalPaid.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-[12px] text-neutral-400 font-semibold mt-1">
              <span>결제일시</span>
              <span className="text-neutral-600">{formatPaidAt(order.paidAt)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Link
              href="/mypage"
              className="flex-1 h-12 border border-neutral-200 hover:bg-neutral-50 text-neutral-600 rounded-xl text-[13px] font-semibold flex items-center justify-center transition-all active:scale-95"
            >
              목록으로 돌아가기
            </Link>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 h-12 bg-black text-white hover:bg-neutral-800 rounded-xl text-[13px] font-semibold transition-all active:scale-95 shadow-md"
            >
              예약 취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
