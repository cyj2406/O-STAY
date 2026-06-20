"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useApp } from "../context/AppContext";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "../components/Input";
import { supabase } from "@/lib/supabase";
import { FcGoogle } from "react-icons/fc";

// Only ever redirect to an internal path — guards against an open redirect
// via a crafted `?redirect=` query value.
const isSafeRedirect = (path: string | null): path is string =>
  !!path && path.startsWith("/") && !path.startsWith("//");

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, showToast } = useApp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if email format is invalid or password is empty
    if (!email || !password || !validateEmail(email)) {
      showToast("이메일과 비밀번호를 확인해 주세요.", "error");
      return;
    }
    
    // Simulate successful login
    login({
      name: "김취향",
      email: email
    });
    
    showToast("성공적으로 로그인되었습니다.", "success");

    // Return to the page that required login, else previous page, else main page
    const redirectTarget = searchParams.get("redirect");
    setTimeout(() => {
      if (isSafeRedirect(redirectTarget)) {
        router.push(redirectTarget);
      } else if (typeof window !== "undefined" && window.history.length > 1) {
        router.back();
      } else {
        router.push("/");
      }
    }, 500);
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
  };

  return (
    <div className="w-full min-h-[calc(100vh-100px)] flex items-center justify-center px-4 py-16 bg-[#FAFAFA]">
      <div className="w-full max-w-[420px] bg-white rounded-[32px] p-8 md:p-10 border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col items-center">
        {/* Brand Logo & Subtitle */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Link href="/">
            <img src="/logo-black.svg" className="h-6 w-auto object-contain mb-3.5 hover:opacity-85 transition-opacity" alt="오늘의 스테이" />
          </Link>
          <p className="text-[#888888] text-[12.5px] font-normal tracking-tight">
            나만의 취향이 머무는 특별한 공간을 찾아서
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} noValidate className="w-full flex flex-col gap-4">
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
            placeholder="비밀번호를 입력해 주세요"
            showPasswordToggle
            required
          />

          {/* Login Button */}
          <button
            type="submit"
            className="w-full h-12 bg-black text-white hover:bg-neutral-800 rounded-xl text-[13px] font-semibold tracking-tight transition-colors active:scale-98 duration-150 shadow-md mt-2"
          >
            로그인
          </button>
        </form>

        {/* Links Area */}
        <div className="flex items-center gap-3.5 my-6 text-[12px] font-medium text-neutral-400">
          <Link href="/signup" className="hover:text-black transition-colors">
            회원가입
          </Link>
          <span className="w-px h-3 bg-neutral-200" />
          <a href="#" className="hover:text-black transition-colors">
            비밀번호 찾기
          </a>
        </div>

        {/* Divider */}
        <div className="w-full flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-neutral-100" />
          <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest">
            간편 로그인
          </span>
          <div className="flex-1 h-px bg-neutral-100" />
        </div>

        {/* Social Logins */}
        <div className="w-full flex justify-center">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full h-11 bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 rounded-xl text-[12.5px] font-semibold flex items-center justify-center gap-2.5 transition-colors active:scale-98 duration-150"
          >
            <FcGoogle className="w-4.5 h-4.5" />
            Google로 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
