import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "./context/AppContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TasteModal from "./components/TasteModal";

export const metadata: Metadata = {
  title: "오늘의 스테이 | 나만의 취향이 담긴 특별한 공간",
  description: "단순한 숙소가 아닌, 나만의 취향이 담긴 특별한 스테이를 매칭해 드립니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-white text-[#1A1C1E] font-sans antialiased selection:bg-neutral-100">
        <AppProvider>
          <Header />
          <main className="flex-1 flex flex-col items-center">{children}</main>
          <Footer />
          <TasteModal />
        </AppProvider>
      </body>
    </html>
  );
}
