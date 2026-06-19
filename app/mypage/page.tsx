"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Users } from "lucide-react";
import { useApp } from "../context/AppContext";
import { useRequireAuth } from "../hooks/useRequireAuth";

// "2026.06.15 - 06.16 (1박)" -> { checkin: Date, checkout: Date }. The
// end date in this app's date strings omits the year (assumed same as start).
function parseStayDates(datesStr: string): { checkin: Date; checkout: Date } | null {
  const match = datesStr.match(/^(\d{4})\.(\d{2})\.(\d{2})\s*-\s*(\d{2})\.(\d{2})/);
  if (!match) return null;
  const [, y, m1, d1, m2, d2] = match;
  const year = Number(y);
  return {
    checkin: new Date(year, Number(m1) - 1, Number(d1)),
    checkout: new Date(year, Number(m2) - 1, Number(d2)),
  };
}

function getStayStatus(datesStr: string) {
  const parsed = parseStayDates(datesStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (parsed && parsed.checkout < today) {
    return { label: "이용 완료", badgeClass: "bg-neutral-100 text-neutral-500" };
  }
  return { label: "이용 예정", badgeClass: "bg-[#377DFF]/10 text-[#377DFF]" };
}

function formatPaidAt(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function MyPage() {
  const { orders, setOrders, showToast } = useApp();
  const canRender = useRequireAuth();

  if (!canRender) {
    return null;
  }

  // Flatten every completed order into one reservation row per booked stay,
  // most recent order first.
  const reservations = [...orders].reverse().flatMap((order) =>
    order.items.map((item) => ({ orderNumber: order.orderNumber, paidAt: order.paidAt, item }))
  );

  const handleCancelReservation = (orderNumber: string, itemId: number) => {
    if (typeof window !== "undefined" && !window.confirm("이 예약을 취소하시겠습니까?")) return;
    setOrders((prev) =>
      prev
        .map((order) =>
          order.orderNumber === orderNumber
            ? { ...order, items: order.items.filter((i) => i.id !== itemId) }
            : order
        )
        .filter((order) => order.items.length > 0)
    );
    showToast("예약이 취소되었습니다.", "success");
  };

  return (
    <div className="w-full max-w-[1360px] px-8 py-20 min-h-screen mx-auto">
      <div className="mb-16">
        <span className="text-[11px] font-semibold text-[#888888] tracking-widest block mb-3 uppercase">My Page</span>
        <h2 className="text-[32px] font-semibold text-neutral-900 tracking-tight">예약 내역</h2>
        <p className="text-neutral-400 text-[14px] mt-2">결제가 완료된 스테이를 한눈에 확인하세요.</p>
      </div>

      {reservations.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center text-center py-24">
          <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center text-3xl mb-6 shadow-sm border border-neutral-100">
            🛏️
          </div>
          <h2 className="text-[24px] font-semibold text-neutral-900 tracking-tight mb-2">아직 예약한 스테이가 없어요</h2>
          <p className="text-neutral-400 text-[14px] font-medium tracking-tight mb-8 max-w-sm">
            나만의 취향에 맞는 스테이를 탐색하고 첫 예약을 완료해 보세요.
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
        <div className="flex flex-col gap-5">
          {reservations.map(({ orderNumber, paidAt, item }, idx) => {
            const stayStatus = getStayStatus(item.dates);
            return (
              <article
                key={`${orderNumber}-${item.id}-${idx}`}
                className="bg-white rounded-3xl overflow-hidden border border-neutral-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Floor-plan thumbnail */}
                  <div className="relative w-full h-28 sm:w-28 sm:h-28 flex-shrink-0 bg-[#F8F9FA] flex items-center justify-center p-3 sm:border-r border-b sm:border-b-0 border-neutral-100">
                    <img src={item.image} className="max-h-full object-contain max-w-full" alt="" />
                    <span className="absolute top-2 left-2 bg-black text-white text-[8.5px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      ★ {item.rating}
                    </span>
                  </div>

                  {/* Reservation info */}
                  <div className="flex-1 p-6 flex flex-col sm:flex-row sm:items-center gap-5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`text-[10.5px] font-semibold px-2.5 py-1 rounded-full ${stayStatus.badgeClass}`}>
                          {stayStatus.label}
                        </span>
                        <span className="text-[11px] text-[#A1A1A1] font-semibold uppercase tracking-widest">
                          {item.location}
                        </span>
                      </div>
                      <h3 className="text-[16px] font-semibold text-neutral-900 tracking-tight mb-2">{item.title}</h3>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {item.tags.map((tag) => (
                          <span key={tag} className="text-[11px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 text-[12px] text-neutral-500 font-semibold mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                          {item.dates}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-neutral-400" />
                          인원 {item.guests}명
                        </span>
                      </div>

                      {/* Transaction info */}
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 pt-3 border-t border-neutral-100 text-[12px] font-semibold">
                        <span className="text-neutral-400">
                          예약번호 <span className="text-neutral-700 font-mono">{orderNumber}</span>
                        </span>
                        <span className="text-neutral-400">
                          결제 금액 <span className="text-neutral-900">{item.priceStr}</span>
                        </span>
                        <span className="text-neutral-400">
                          결제일시 <span className="text-neutral-700">{formatPaidAt(paidAt)}</span>
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex sm:flex-col gap-2.5 w-full sm:w-auto sm:flex-shrink-0">
                      <Link
                        href="/explore"
                        className="flex-1 sm:flex-none h-10 px-5 bg-black text-white hover:bg-neutral-800 rounded-xl text-[12px] font-semibold flex items-center justify-center transition-all active:scale-95 whitespace-nowrap"
                      >
                        예약 상세 보기
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleCancelReservation(orderNumber, item.id)}
                        className="flex-1 sm:flex-none h-10 px-5 border border-neutral-200 hover:bg-neutral-50 text-neutral-500 rounded-xl text-[12px] font-semibold transition-all active:scale-95 whitespace-nowrap"
                      >
                        예약 취소
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
