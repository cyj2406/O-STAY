"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  showPasswordToggle?: boolean;
}

export default function Input({
  label,
  type = "text",
  showPasswordToggle = false,
  className = "",
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPasswordToggle && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1.5 w-full relative">
      {label && (
        <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest pl-1">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          type={inputType}
          className={`h-12 w-full px-4 rounded-xl border border-neutral-200 focus:border-neutral-450 text-[13px] font-medium placeholder:text-neutral-350 focus:outline-none transition-colors ${
            isPassword && showPasswordToggle ? "pr-11" : ""
          } ${className}`}
          {...props}
        />
        {isPassword && showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-600 transition-colors"
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
}
