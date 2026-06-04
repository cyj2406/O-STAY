"use client";

import React, { createContext, useContext, useState } from "react";

export type CartItemType = {
  id: number;
  title: string;
  location: string;
  price: number;
  priceStr: string;
  image: string;
  dates: string;
  guests: number;
};

type AppContextType = {
  cartItems: CartItemType[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;
  activePanel: "none" | "search" | "mypage" | "cart";
  setActivePanel: React.Dispatch<React.SetStateAction<"none" | "search" | "mypage" | "cart">>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  recentSearches: string[];
  setRecentSearches: React.Dispatch<React.SetStateAction<string[]>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  showQuizModal: boolean;
  setShowQuizModal: React.Dispatch<React.SetStateAction<boolean>>;
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
      guests: 2
    },
    {
      id: 2,
      title: "포근한 소재와 은은한 조명감이 살아 있는 공간",
      location: "부산 해운대 근처",
      price: 210000,
      priceStr: "₩210,000",
      image: "/blueprint-2.jpg",
      dates: "2026.06.15 - 06.16 (1박)",
      guests: 2
    }
  ]);
  const [activePanel, setActivePanel] = useState<"none" | "search" | "mypage" | "cart">("none");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [recentSearches, setRecentSearches] = useState(["성수동", "한옥", "빈티지"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showQuizModal, setShowQuizModal] = useState(false);

  return (
    <AppContext.Provider value={{
      cartItems, setCartItems,
      activePanel, setActivePanel,
      isLoggedIn, setIsLoggedIn,
      recentSearches, setRecentSearches,
      searchQuery, setSearchQuery,
      showQuizModal, setShowQuizModal
    }}>
      {children}
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
