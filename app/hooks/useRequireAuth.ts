"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "../context/AppContext";

// Guards a client page behind login. Returns true once it's safe to render
// the protected content (auth check resolved AND the user is logged in).
export function useRequireAuth() {
  const { isLoggedIn, isAuthReady, showToast } = useApp();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthReady || isLoggedIn) return;
    showToast("로그인이 필요한 서비스입니다.", "error");
    router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
  }, [isAuthReady, isLoggedIn, pathname, router, showToast]);

  return isAuthReady && isLoggedIn;
}
