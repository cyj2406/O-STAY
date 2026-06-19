"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "../context/AppContext";
import Input from "../components/Input";

export default function SignupPage() {
  const router = useRouter();
  const { login, showToast } = useApp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Terms state
  const [terms, setTerms] = useState({
    service: false,
    privacy: false,
    marketing: false,
  });

  const handleAllTermsChange = (checked: boolean) => {
    setTerms({
      service: checked,
      privacy: checked,
      marketing: checked,
    });
  };

  const handleIndividualTermChange = (key: keyof typeof terms, checked: boolean) => {
    setTerms((prev) => ({
      ...prev,
      [key]: checked,
    }));
  };

  const isAllChecked = terms.service && terms.privacy && terms.marketing;

  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      showToast("모든 필드를 입력해 주세요.", "error");
      return;
    }

    if (!validateEmail(email)) {
      showToast("올바른 이메일 형식을 입력해 주세요.", "error");
      return;
    }

    if (password !== confirmPassword) {
      showToast("비밀번호가 서로 일치하지 않습니다.", "error");
      return;
    }

    if (!terms.service || !terms.privacy) {
      showToast("필수 약관에 동의하셔야 가입이 가능합니다.", "error");
      return;
    }

    // Simulate successful registration and auto login
    login({
      name: name,
      email: email
    });
    
    showToast("회원가입이 완료되었습니다. 환영합니다!", "success");
    
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  return (
    <div className="w-full min-h-[calc(100vh-100px)] flex items-center justify-center px-4 py-16 bg-[#FAFAFA]">
      <div className="w-full max-w-[420px] bg-white rounded-[32px] p-8 md:p-10 border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col items-center">
        {/* Brand Logo & Subtitle */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Link href="/">
            <img src="/logo-black.svg" className="h-6 w-auto object-contain mb-3.5 hover:opacity-85 transition-opacity" alt="오늘의 스테이" />
          </Link>
          <p className="text-[#888888] text-[12.5px] font-medium tracking-tight">
            나만의 취향이 머무는 특별한 공간을 찾아서
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} noValidate className="w-full flex flex-col gap-4">
          <Input
            label="이름 / 닉네임"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름 또는 닉네임을 입력해 주세요"
            required
          />

          <Input
            label="이메일 주소"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@ostay.com"
            required
          />

          <Input
            label="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="8자 이상의 비밀번호를 입력해 주세요"
            showPasswordToggle
            required
          />

          <Input
            label="비밀번호 확인"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 다시 한번 입력해 주세요"
            showPasswordToggle
            required
          />

          {/* Terms Agreement Panel */}
          <div className="flex flex-col gap-3.5 p-4.5 border border-neutral-100 bg-[#FAFAFA] rounded-2xl mt-1.5">
            {/* All Check */}
            <label className="flex items-center gap-2.5 cursor-pointer pb-3.5 border-b border-neutral-200/50">
              <input
                type="checkbox"
                checked={isAllChecked}
                onChange={(e) => handleAllTermsChange(e.target.checked)}
                className="w-4.5 h-4.5 accent-black rounded border-neutral-350 cursor-pointer"
              />
              <span className="text-[13px] font-semibold text-neutral-900">전체 동의하기</span>
            </label>

            {/* Individual Checks */}
            <div className="flex flex-col gap-3 pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={terms.service}
                  onChange={(e) => handleIndividualTermChange("service", e.target.checked)}
                  className="w-4 h-4 accent-black rounded border-neutral-300 cursor-pointer"
                />
                <span className="text-[12px] font-semibold text-neutral-500 hover:text-black transition-colors">
                  [필수] 이용약관 동의
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={terms.privacy}
                  onChange={(e) => handleIndividualTermChange("privacy", e.target.checked)}
                  className="w-4 h-4 accent-black rounded border-neutral-300 cursor-pointer"
                />
                <span className="text-[12px] font-semibold text-neutral-500 hover:text-black transition-colors">
                  [필수] 개인정보 수집 및 이용 동의
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={terms.marketing}
                  onChange={(e) => handleIndividualTermChange("marketing", e.target.checked)}
                  className="w-4 h-4 accent-black rounded border-neutral-300 cursor-pointer"
                />
                <span className="text-[12px] font-semibold text-neutral-500 hover:text-black transition-colors">
                  [선택] 마케팅 정보 수신 동의
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 bg-black text-white hover:bg-neutral-800 rounded-xl text-[13px] font-semibold tracking-tight transition-colors active:scale-98 duration-150 shadow-md mt-2"
          >
            가입하기
          </button>
        </form>

        {/* Existing account redirect */}
        <div className="flex items-center gap-2 mt-7 text-[12px] font-semibold text-neutral-450">
          <span>이미 계정이 있으신가요?</span>
          <Link href="/login" className="text-black hover:underline font-semibold">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
