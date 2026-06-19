"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "../context/AppContext";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { ChevronLeft, CreditCard, ShieldCheck, Check, Calendar, Users, Info, Sparkles, Loader2 } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, setCartItems, setLastOrder, setOrders, showToast } = useApp();
  const canRender = useRequireAuth();

  // Form states
  const [name, setName] = useState("김취향");
  const [phone, setPhone] = useState("010-1234-5678");
  const [email, setEmail] = useState("taste_master@ostay.com");
  const [requests, setRequests] = useState("");
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  // Coupon state
  const [useWelcomeCoupon, setUseWelcomeCoupon] = useState(false);

  // Payment method state — starts unselected so missing-selection validation can fire
  const [paymentMethod, setPaymentMethod] = useState<"" | "card" | "kakao" | "naver" | "bank">("");

  // Card details (if card selected)
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  // Agreement states
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeRefund, setAgreeRefund] = useState(false);
  const [agreeAll, setAgreeAll] = useState(false);

  // Mock payment processing state
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculations
  const basePrice = cartItems.reduce((acc, curr) => acc + curr.price, 0);
  const serviceFee = basePrice > 0 ? 15000 : 0;
  const discount = useWelcomeCoupon ? Math.round(basePrice * 0.1) : 0;
  const finalPrice = basePrice + serviceFee - discount;

  const handleAgreeAllChange = (checked: boolean) => {
    setAgreeAll(checked);
    setAgreeTerms(checked);
    setAgreeRefund(checked);
  };

  const handleSubAgreementChange = (type: "terms" | "refund", checked: boolean) => {
    if (type === "terms") {
      setAgreeTerms(checked);
      setAgreeAll(checked && agreeRefund);
    } else {
      setAgreeRefund(checked);
      setAgreeAll(agreeTerms && checked);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isProcessing) return;

    const nameInvalid = !name.trim();
    const phoneInvalid = !phone.trim();
    setNameError(nameInvalid);
    setPhoneError(phoneInvalid);
    if (nameInvalid || phoneInvalid) {
      showToast("예약자 정보를 입력해 주세요.", "error");
      return;
    }

    if (!paymentMethod) {
      showToast("결제 수단을 선택해 주세요.", "error");
      return;
    }

    if (paymentMethod === "card" && (!cardNumber || !cardExpiry || !cardCvc)) {
      showToast("카드 결제 정보를 입력해 주세요.", "error");
      return;
    }

    if (!agreeTerms || !agreeRefund) {
      showToast("필수 약관에 동의해 주세요.", "error");
      return;
    }

    setIsProcessing(true);

    // Mock payment processing delay — no backend yet
    setTimeout(() => {
      const generatedOrderNum = "OS-" + Math.floor(10000000 + Math.random() * 90000000);
      const newOrder = {
        orderNumber: generatedOrderNum,
        name,
        items: cartItems,
        finalPrice,
        paymentMethod,
        paidAt: new Date().toISOString(),
        status: "결제완료",
      };
      setLastOrder(newOrder);
      setOrders((prev) => [...prev, newOrder]);
      setCartItems([]);
      setIsProcessing(false);
      // replace (not push) so the back button can't return to a stale
      // payment form and trigger a duplicate submission
      router.replace("/checkout/complete");
    }, 1200);
  };

  if (!canRender) {
    return null;
  }

  if (cartItems.length === 0) {
    return (
      <div className="w-full max-w-[1360px] mx-auto px-8 py-32 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center text-3xl mb-6 shadow-sm border border-neutral-100">
          🛒
        </div>
        <h2 className="text-[24px] font-semibold text-neutral-900 tracking-tight mb-2">장바구니가 비어 있습니다</h2>
        <p className="text-neutral-400 text-[14px] font-medium tracking-tight mb-8 max-w-sm">
          결제할 숙소가 선택되지 않았습니다. 메인이나 탐색 메뉴에서 매력적인 숙소를 먼저 담아보세요.
        </p>
        <Link 
          href="/explore" 
          className="h-12 px-8 bg-black text-white hover:bg-neutral-800 rounded-full font-semibold text-[13px] tracking-tight flex items-center gap-2 transition-all active:scale-95 duration-150"
        >
          스테이 둘러보기
          <span className="text-[11px] font-light">&gt;</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center bg-white min-h-screen">
      {/* PAGE CONTAINER */}
      <div className="w-full max-w-[1360px] px-8 py-12 flex flex-col">
        
        {/* Back navigation & Page Title */}
        <div className="flex flex-col gap-4 mb-10">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-1.5 text-[12px] font-semibold text-neutral-500 hover:text-black transition-colors w-fit"
          >
            <ChevronLeft className="w-4 h-4" />
            이전으로
          </button>
          <h1 className="text-[32px] font-semibold text-neutral-900 tracking-tight">예약 및 결제</h1>
        </div>

        {/* TWO-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: FORMS & DETAILS (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            
            {/* Section 1: Guest Information */}
            <div className="border border-neutral-200/80 rounded-3xl p-8 bg-white shadow-sm flex flex-col gap-6">
              <h2 className="text-[18px] font-semibold text-neutral-900 tracking-tight pb-4 border-b border-neutral-100 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-[12px] flex items-center justify-center font-bold">1</span>
                예약자 정보
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-semibold text-neutral-600">예약자 성함</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (nameError) setNameError(false);
                    }}
                    placeholder="성함을 입력하세요"
                    className={`h-11 px-4 border rounded-xl text-[13px] font-medium focus:outline-none transition-colors ${
                      nameError ? "border-red-400 focus:border-red-400" : "border-neutral-200 focus:border-neutral-400"
                    }`}
                  />
                  {nameError && <span className="text-[11px] font-semibold text-red-500">성함을 입력해 주세요.</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-semibold text-neutral-600">휴대폰 번호</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (phoneError) setPhoneError(false);
                    }}
                    placeholder="010-0000-0000"
                    className={`h-11 px-4 border rounded-xl text-[13px] font-medium focus:outline-none transition-colors ${
                      phoneError ? "border-red-400 focus:border-red-400" : "border-neutral-200 focus:border-neutral-400"
                    }`}
                  />
                  {phoneError && <span className="text-[11px] font-semibold text-red-500">연락처를 입력해 주세요.</span>}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-semibold text-neutral-600">이메일 주소</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="h-11 px-4 border border-neutral-200 focus:border-neutral-400 rounded-xl text-[13px] font-medium focus:outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-[12px] font-semibold text-neutral-600">호스트에게 남기는 요청사항 (선택)</label>
                  <span className="text-[10px] text-neutral-400 font-semibold">{requests.length}/200자</span>
                </div>
                <textarea 
                  value={requests} 
                  onChange={(e) => setRequests(e.target.value.slice(0, 200))}
                  placeholder="체크인 예정 시간이나 추가 요청 등이 있다면 입력해주세요."
                  rows={3}
                  className="p-4 border border-neutral-200 focus:border-neutral-400 rounded-xl text-[13px] font-medium focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>

            {/* Section 2: Welcome Coupon Benefit */}
            <div className="border border-neutral-200/80 rounded-3xl p-8 bg-white shadow-sm flex flex-col gap-4">
              <h2 className="text-[18px] font-semibold text-neutral-900 tracking-tight pb-4 border-b border-neutral-100 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-[12px] flex items-center justify-center font-bold">2</span>
                할인 혜택 적용
              </h2>
              
              <div 
                onClick={() => setUseWelcomeCoupon(!useWelcomeCoupon)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex justify-between items-center select-none ${
                  useWelcomeCoupon 
                    ? "bg-[#F3F8FF] border-[#377DFF] shadow-sm" 
                    : "bg-[#F8F9FA] border-neutral-200/60 hover:border-neutral-300"
                }`}
              >
                <div className="flex gap-4 items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${useWelcomeCoupon ? "bg-[#377DFF]/10 text-[#377DFF]" : "bg-neutral-200/60 text-neutral-500"}`}>
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[14px] font-semibold text-neutral-900">첫 예약 10% 웰컴 쿠폰</span>
                    <span className="text-[11px] text-neutral-500 font-medium mt-0.5">신규 회원 첫 결제 전용 할인 쿠폰</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`text-[14px] font-semibold ${useWelcomeCoupon ? "text-[#377DFF]" : "text-neutral-500"}`}>
                    -₩{Math.round(basePrice * 0.1).toLocaleString()}원
                  </span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                    useWelcomeCoupon ? "bg-[#377DFF] border-[#377DFF] text-white" : "border-neutral-300 bg-white"
                  }`}>
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Payment Method Selection */}
            <div className="border border-neutral-200/80 rounded-3xl p-8 bg-white shadow-sm flex flex-col gap-6">
              <h2 className="text-[18px] font-semibold text-neutral-900 tracking-tight pb-4 border-b border-neutral-100 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-[12px] flex items-center justify-center font-bold">3</span>
                결제 수단 선택
              </h2>

              {/* Payment Method Chips (same selected/unselected pattern as the taste tag chips) */}
              <div role="radiogroup" className="flex flex-wrap gap-2.5">
                {[
                  { id: "card", label: "신용/체크카드", icon: "💳" },
                  { id: "kakao", label: "카카오페이", icon: "Kpay" },
                  { id: "naver", label: "네이버페이", icon: "Npay" },
                  { id: "bank", label: "무통장 입금", icon: "🏦" }
                ].map((method) => {
                  const isSelected = paymentMethod === method.id;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`h-9.5 px-4.5 rounded-full text-[12.5px] font-semibold transition-all border flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-black border-black text-white"
                          : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                      }`}
                    >
                      <span className="text-[12px]">{method.icon}</span>
                      <span>{method.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Detailed Payment Inputs depending on type */}
              {paymentMethod === "card" && (
                <div className="mt-4 p-5 bg-[#F8F9FA] rounded-2xl border border-neutral-100 flex flex-col gap-4 animate-in fade-in duration-150">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11.5px] font-semibold text-neutral-600">카드 번호</label>
                    <input 
                      type="text" 
                      placeholder="0000 - 0000 - 0000 - 0000"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/[^0-9]/g, "").slice(0, 16))}
                      className="h-11 px-4 bg-white border border-neutral-200 focus:border-neutral-400 rounded-xl text-[13px] font-medium tracking-wider focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[11.5px] font-semibold text-neutral-600">유효 기간 (MM/YY)</label>
                      <input 
                        type="text" 
                        placeholder="MM / YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
                        className="h-11 px-4 bg-white border border-neutral-200 focus:border-neutral-400 rounded-xl text-[13px] font-medium text-center focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[11.5px] font-semibold text-neutral-600">CVC (카드 뒷면 3자리)</label>
                      <input 
                        type="password" 
                        placeholder="***"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value.replace(/[^0-9]/g, "").slice(0, 3))}
                        className="h-11 px-4 bg-white border border-neutral-200 focus:border-neutral-400 rounded-xl text-[13px] font-medium text-center tracking-widest focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {["kakao", "naver"].includes(paymentMethod) && (
                <div className="mt-4 p-5 bg-[#F8F9FA] rounded-2xl border border-neutral-100 flex items-center justify-between animate-in fade-in duration-150">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">⚡</span>
                    <span className="text-[13px] font-semibold text-neutral-700">
                      {paymentMethod === "kakao" ? "카카오페이" : "네이버페이"} 간편결제 창으로 안전하게 이동합니다.
                    </span>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-neutral-400" />
                </div>
              )}

              {paymentMethod === "bank" && (
                <div className="mt-4 p-5 bg-[#F8F9FA] rounded-2xl border border-neutral-100 flex flex-col gap-3 animate-in fade-in duration-150">
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="font-semibold text-neutral-500">입금 은행</span>
                    <span className="font-semibold text-neutral-900">신한은행 100-343-921342 (주)오늘의스테이</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px] pt-2 border-t border-neutral-200/40">
                    <span className="font-semibold text-neutral-500">입금 기한</span>
                    <span className="font-semibold text-red-500">예약 완료 후 2시간 이내 미입금 시 자동 취소</span>
                  </div>
                </div>
              )}
            </div>

            {/* Section 4: Refund Policy & Agreement */}
            <div className="border border-neutral-200/80 rounded-3xl p-8 bg-white shadow-sm flex flex-col gap-6">
              <h2 className="text-[18px] font-semibold text-neutral-900 tracking-tight pb-4 border-b border-neutral-100 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-[12px] flex items-center justify-center font-bold">4</span>
                약관 및 정책 동의
              </h2>

              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 text-[11.5px] text-neutral-500 font-medium leading-[1.8] space-y-1.5">
                <div className="flex gap-2 items-start text-neutral-800 font-semibold mb-1">
                  <Info className="w-4 h-4 text-neutral-600 flex-shrink-0 mt-0.5" />
                  <span>예약 취소 및 환불 안내</span>
                </div>
                <p>· 예약 확정 후 24시간 이내 무료 취소 가능합니다.</p>
                <p>· 체크인 7일 전까지 취소 시 100% 환불 가능합니다.</p>
                <p>· 체크인 3일 전 취소 시 50% 환불, 그 이후 취소 및 노쇼(No-Show)는 환불 불가합니다.</p>
                <p>· 오늘의 스테이는 블라인드 매칭 특성상 결제 및 매칭 완료 즉시 숙소 실명이 공개되며, 이후 취소 규정은 위 조건에 맞춰 엄격히 적용됩니다.</p>
              </div>

              <div className="flex flex-col gap-3.5 pt-2 select-none">
                {/* Select All */}
                <label className="flex items-center gap-3 cursor-pointer pb-3 border-b border-neutral-100">
                  <input 
                    type="checkbox" 
                    checked={agreeAll}
                    onChange={(e) => handleAgreeAllChange(e.target.checked)}
                    className="w-4 h-4 rounded text-black border-neutral-300 focus:ring-black accent-black"
                  />
                  <span className="text-[13.5px] font-bold text-neutral-900">모두 동의합니다</span>
                </label>

                {/* Sub Agreement 1 */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={agreeTerms}
                    onChange={(e) => handleSubAgreementChange("terms", e.target.checked)}
                    className="w-4 h-4 rounded text-black border-neutral-300 focus:ring-black accent-black"
                  />
                  <span className="text-[12.5px] font-semibold text-neutral-600">
                    개인정보 수집 및 제3자 제공 동의 <span className="text-[#377DFF] font-bold">(필수)</span>
                  </span>
                </label>

                {/* Sub Agreement 2 */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={agreeRefund}
                    onChange={(e) => handleSubAgreementChange("refund", e.target.checked)}
                    className="w-4 h-4 rounded text-black border-neutral-300 focus:ring-black accent-black"
                  />
                  <span className="text-[12.5px] font-semibold text-neutral-600">
                    예약 취소 및 환불 정책 동의 <span className="text-[#377DFF] font-bold">(필수)</span>
                  </span>
                </label>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: STICKY ORDER SUMMARY (lg:col-span-5) */}
          <div className="lg:col-span-5 lg:sticky lg:top-8">
            <div className="border border-neutral-200/80 bg-[#F8F9FA] rounded-[28px] p-6 shadow-sm flex flex-col gap-6">
              
              <div>
                <h3 className="text-[16px] font-bold text-neutral-900 mb-4 pb-3 border-b border-neutral-200/60">
                  예약 숙소 및 결제 상세
                </h3>

                {/* Cart Stays List */}
                <div className="flex flex-col gap-4 max-h-[420px] overflow-y-auto pr-1">
                  {cartItems.map((item) => {
                    const nights = parseInt(item.dates.match(/(\d+)박/)?.[1] || "1", 10);
                    const nightlyRate = Math.round(item.price / nights);
                    return (
                      <div key={item.id} className="flex gap-3.5 pb-4 border-b border-neutral-200/40 last:border-0 last:pb-0">
                        <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border border-neutral-200/40 bg-neutral-100">
                          <img
                            src={item.image}
                            className="w-full h-full object-cover"
                            alt=""
                          />
                          <span className="absolute top-1.5 left-1.5 bg-black text-white text-[8.5px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            ★ {item.rating}
                          </span>
                        </div>
                        <div className="flex-grow min-w-0 flex flex-col justify-between">
                          <div>
                            <span className="text-[9.5px] text-[#A1A1A1] font-semibold uppercase tracking-widest block mb-0.5">
                              {item.location}
                            </span>
                            <h4 className="text-[12.5px] font-semibold text-neutral-900 truncate">
                              {item.title}
                            </h4>
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {item.tags.map((tag) => (
                                <span key={tag} className="text-[9.5px] bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded-md font-medium">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-[10.5px] text-neutral-500 font-semibold flex flex-col gap-0.5 mt-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-neutral-400" />
                              {item.dates}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3 text-neutral-400" />
                              인원 {item.guests}명
                            </span>
                          </div>
                          <div className="flex justify-between items-center mt-2.5">
                            <span className="text-[10px] text-neutral-400 font-semibold">
                              1박 ₩{nightlyRate.toLocaleString()} × {nights}박
                            </span>
                            <span className="text-[12.5px] font-bold text-neutral-900">{item.priceStr}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-neutral-200/60 pt-4 flex flex-col gap-3">
                <div className="flex justify-between items-center text-[12.5px] font-semibold text-neutral-500">
                  <span>선택 숙소 ({cartItems.length}개)</span>
                  <span>₩{basePrice.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center text-[12.5px] font-semibold text-neutral-500">
                  <span>서비스 수수료</span>
                  <span>₩{serviceFee.toLocaleString()}</span>
                </div>

                {useWelcomeCoupon && (
                  <div className="flex justify-between items-center text-[12.5px] font-semibold text-[#377DFF]">
                    <span>웰컴 쿠폰 10% 할인</span>
                    <span>-₩{discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="border-t border-neutral-200/80 pt-4 mt-1 flex justify-between items-baseline">
                  <span className="text-[14px] font-bold text-neutral-800">최종 결제 금액</span>
                  <span className="text-[24px] font-black text-black">
                    ₩{finalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Pay Action Button */}
              <button
                type="submit"
                onClick={handlePaymentSubmit}
                disabled={isProcessing}
                className="w-full h-13 bg-black text-white hover:bg-neutral-800 disabled:opacity-70 disabled:hover:bg-black rounded-2xl font-bold text-[14px] tracking-tight flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    결제 중...
                  </>
                ) : (
                  <>₩{finalPrice.toLocaleString()} 결제하기</>
                )}
              </button>

              <p className="text-center text-[10.5px] text-neutral-400 font-semibold leading-relaxed px-2">
                오늘의 스테이는 안전한 PG 결제 대행 시스템을 통해 금융 정보를 암호화하여 처리하고 있습니다.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
