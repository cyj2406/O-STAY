"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";

export type CartItemType = {
  id: number;
  title: string;
  location: string;
  price: number;
  priceStr: string;
  image: string;
  dates: string;
  guests: number;
  rating: number;
  tags: string[];
};

export type UserType = {
  name: string;
  email: string;
} | null;

export type ToastType = {
  message: string;
  type: "success" | "error" | "info";
} | null;

export type CompletedOrder = {
  orderNumber: string;
  name: string;
  items: CartItemType[];
  finalPrice: number;
  paymentMethod: string;
  paidAt: string;
  status: string;
};

export type OrderType = CompletedOrder | null;

export type WishedStay = {
  id: number;
  title: string;
  location: string;
  image: string;
  rating: number;
  tags: string[];
  price: string;
  size: string;
};

type AppContextType = {
  cartItems: CartItemType[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;
  lastOrder: OrderType;
  setLastOrder: React.Dispatch<React.SetStateAction<OrderType>>;
  orders: CompletedOrder[];
  setOrders: React.Dispatch<React.SetStateAction<CompletedOrder[]>>;
  wishlist: WishedStay[];
  toggleWish: (stay: WishedStay) => void;
  activePanel: "none" | "search" | "mypage" | "cart";
  setActivePanel: React.Dispatch<React.SetStateAction<"none" | "search" | "mypage" | "cart">>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthReady: boolean;
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  login: (userData: { name: string; email: string }) => void;
  logout: () => void;
  recentSearches: string[];
  setRecentSearches: React.Dispatch<React.SetStateAction<string[]>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  showQuizModal: boolean;
  setShowQuizModal: React.Dispatch<React.SetStateAction<boolean>>;
  toast: ToastType;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItemType[]>([
    {
      id: 1,
      title: "여백이 편안한 공간, 군더더기 없는 하루",
      location: "서울 성수 근처",
      price: 180000,
      priceStr: "₩180,000",
      image: "/blueprint-1.jpg",
      dates: "2026.06.12 - 06.13 (1박)",
      guests: 2,
      rating: 4.8,
      tags: ["원목", "조용한", "채광 좋은", "우드 톤"]
    },
    {
      id: 2,
      title: "포근한 소재와 은은한 조명감이 살아 있는 공간",
      location: "부산 해운대 근처",
      price: 210000,
      priceStr: "₩210,000",
      image: "/blueprint-2.jpg",
      dates: "2026.06.15 - 06.16 (1박)",
      guests: 2,
      rating: 4.9,
      tags: ["포근한", "빔프로젝터", "욕조", "린넨"]
    }
  ]);
  const [lastOrder, setLastOrder] = useState<OrderType>(null);
  const [orders, setOrders] = useState<CompletedOrder[]>([]);
  const [wishlist, setWishlist] = useState<WishedStay[]>([]);
  const [activePanel, setActivePanel] = useState<"none" | "search" | "mypage" | "cart">("none");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [user, setUser] = useState<UserType>(null);
  const [recentSearches, setRecentSearches] = useState(["성수동", "한옥", "빈티지"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showQuizModal, setShowQuizModal] = useState(false);
  
  // Toast state
  const [toast, setToast] = useState<ToastType>(null);

  // Sync state from localStorage after mount
  useEffect(() => {
    const storedUser = localStorage.getItem("ostay_user");
    const storedLoggedIn = localStorage.getItem("ostay_isLoggedIn");
    if (storedUser && storedLoggedIn === "true") {
      try {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
  }, []);

  useEffect(() => {
    const storedOrders = localStorage.getItem("ostay_orders");
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (e) {
        console.error("Failed to parse stored orders", e);
      }
    }
  }, []);

  // Skip the first run — it fires with the default `[]` before the load
  // effect above has applied any stored orders, and would otherwise
  // immediately overwrite localStorage with an empty array.
  const ordersLoadedRef = useRef(false);
  useEffect(() => {
    if (!ordersLoadedRef.current) {
      ordersLoadedRef.current = true;
      return;
    }
    localStorage.setItem("ostay_orders", JSON.stringify(orders));
  }, [orders]);

  // Google login goes through Supabase's own session (persisted by the Supabase
  // client itself), so this only ever reads it — it never writes to the
  // "ostay_user"/"ostay_isLoggedIn" keys owned by the mock login below.
  // isAuthReady flips once the initial session check resolves, so route guards
  // can tell "confirmed logged out" apart from "still checking" and avoid
  // bouncing an already-logged-in user before their session loads.
  useEffect(() => {
    const applySession = (session: Session | null) => {
      if (!session?.user) return;
      const { user: supaUser } = session;
      setUser({
        name: supaUser.user_metadata?.full_name || supaUser.user_metadata?.name || supaUser.email || "구글 사용자",
        email: supaUser.email || "",
      });
      setIsLoggedIn(true);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      applySession(session);
      setIsAuthReady(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        applySession(session);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setIsLoggedIn(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Mock email/password session boundary — Google login will go through Supabase's
  // own session instead, so don't duplicate persistence by writing it here too.
  // Stable via useCallback: consumers (e.g. route guards) depend on these in
  // effect arrays, and a recreated function each render would re-fire them.
  const login = useCallback((userData: { name: string; email: string }) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("ostay_user", JSON.stringify(userData));
    localStorage.setItem("ostay_isLoggedIn", "true");
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("ostay_user");
    localStorage.removeItem("ostay_isLoggedIn");
    supabase.auth.signOut();
  }, []);

  const showToast = useCallback((message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
  }, []);

  const toggleWish = useCallback((stay: WishedStay) => {
    setWishlist((prev) =>
      prev.some((s) => s.id === stay.id)
        ? prev.filter((s) => s.id !== stay.id)
        : [...prev, stay]
    );
  }, []);

  // Auto hide toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <AppContext.Provider value={{
      cartItems, setCartItems,
      lastOrder, setLastOrder,
      orders, setOrders,
      wishlist, toggleWish,
      activePanel, setActivePanel,
      isLoggedIn, setIsLoggedIn,
      isAuthReady,
      user, setUser,
      login, logout,
      recentSearches, setRecentSearches,
      searchQuery, setSearchQuery,
      showQuizModal, setShowQuizModal,
      toast, showToast
    }}>
      {children}
      {/* Premium Global Toast UI component */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] animate-in fade-in slide-in-from-bottom-4 duration-250">
          <div className={`px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-2.5 border text-[13px] font-semibold ${
            toast.type === "error"
              ? "bg-red-50 border-red-100 text-red-650"
              : toast.type === "info"
              ? "bg-neutral-900 border-neutral-800 text-white"
              : "bg-white border-neutral-100 text-neutral-800"
          }`}>
            {toast.type === "error" && <span className="text-red-500">⚠️</span>}
            {toast.type === "success" && <span className="text-green-500">✓</span>}
            {toast.type === "info" && <span className="text-blue-400">ℹ</span>}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
