"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function TasteModal() {
  const router = useRouter();
  const { showQuizModal, setShowQuizModal } = useApp();

  const [selectedObjects, setSelectedObjects] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("");

  if (!showQuizModal) return null;

  const toggleQuizItem = (
    item: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (list.includes(item)) {
      setList(list.filter((x) => x !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleQuizSubmit = () => {
    // Collect all selected tags
    const allTags = [
      ...selectedObjects,
      ...selectedMaterials,
      ...selectedMoods,
      ...selectedColors,
      ...(selectedSize ? [selectedSize] : [])
    ];

    if (allTags.length === 0) {
      alert("최소 1개 이상의 취향을 선택해 주세요.");
      return;
    }

    setShowQuizModal(false);
    
    // Redirect to recommendation page with selected tags as comma-separated query string
    const queryStr = encodeURIComponent(allTags.join(","));
    router.push(`/recommendation?tags=${queryStr}`);
  };

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowQuizModal(false);
        }
      }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-4 animate-in fade-in-50"
    >
      <div className="bg-white w-full max-w-[600px] rounded-[32px] overflow-hidden shadow-2xl relative border border-neutral-100 flex flex-col animate-in zoom-in-95 duration-200 p-10">
        {/* Close Button */}
        <button 
          onClick={() => setShowQuizModal(false)}
          className="absolute right-8 top-8 p-2 hover:bg-neutral-100 rounded-full transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5 text-neutral-500" />
        </button>

        {/* Modal Header */}
        <div className="mb-10">
          <h3 className="text-[22px] font-semibold text-neutral-900 tracking-tight">취향 태그로 시작하기</h3>
          <p className="text-neutral-400 text-[13px] font-medium tracking-tight mt-2">좋아하는 오브제, 재질, 무드를 골라보세요</p>
        </div>

        {/* Tags categories */}
        <div className="flex-1 flex flex-col gap-8 overflow-y-auto max-h-[420px] pr-2">
          
          {/* Category: Object */}
          <div>
            <h4 className="text-[10.5px] font-semibold text-neutral-400 uppercase tracking-widest mb-4">오브제</h4>
            <div className="flex flex-wrap gap-2.5">
              {["소파", "의자", "침대", "조명", "거울", "그림", "식물", "욕조", "책장", "러그"].map((obj) => {
                const isSelected = selectedObjects.includes(obj);
                return (
                  <button
                    key={obj}
                    onClick={() => toggleQuizItem(obj, selectedObjects, setSelectedObjects)}
                    className={`h-9.5 px-4.5 rounded-full text-[12.5px] font-semibold transition-all border ${
                      isSelected
                        ? "bg-black border-black text-white"
                        : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    {obj}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category: Material */}
          <div>
            <h4 className="text-[10.5px] font-semibold text-neutral-400 uppercase tracking-widest mb-4">재질</h4>
            <div className="flex flex-wrap gap-2.5">
              {["원목", "린넨", "가죽", "벨벳", "황동", "대리석", "코튼", "라탄"].map((mat) => {
                const isSelected = selectedMaterials.includes(mat);
                return (
                  <button
                    key={mat}
                    onClick={() => toggleQuizItem(mat, selectedMaterials, setSelectedMaterials)}
                    className={`h-9.5 px-4.5 rounded-full text-[12.5px] font-semibold transition-all border ${
                      isSelected
                        ? "bg-black border-black text-white"
                        : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    {mat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category: Mood */}
          <div>
            <h4 className="text-[10.5px] font-semibold text-neutral-400 uppercase tracking-widest mb-4">무드</h4>
            <div className="flex flex-wrap gap-2.5">
              {["미니멀 & 심플", "내추럴", "클래식 & 앤틱", "빈티지", "유니크"].map((mood) => {
                const isSelected = selectedMoods.includes(mood);
                return (
                  <button
                    key={mood}
                    onClick={() => toggleQuizItem(mood, selectedMoods, setSelectedMoods)}
                    className={`h-9.5 px-5.5 rounded-full text-[12.5px] font-semibold transition-all border ${
                      isSelected
                        ? "bg-black border-black text-white"
                        : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    {mood}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category: Color */}
          <div>
            <h4 className="text-[10.5px] font-semibold text-neutral-400 uppercase tracking-widest mb-4">컬러</h4>
            <div className="flex items-center gap-3 flex-wrap">
              {[
                "#962828", // Dark red
                "#854D0E", // Brown
                "#0F172A", // Dark navy
                "#C2410C", // Orange-brown
                "#1D4ED8", // Royal blue
                "#064E3B", // Dark green
                "#F1E6D2", // Cream/beige
                "#D98FB5", // Pink-mauve
                "#857F17"  // Olive-green
              ].map((color) => {
                const isSelected = selectedColors.includes(color);
                return (
                  <button
                    key={color}
                    onClick={() => toggleQuizItem(color, selectedColors, setSelectedColors)}
                    className={`w-9.5 h-9.5 rounded-full border transition-all ${
                      isSelected 
                        ? "scale-110 ring-2 ring-offset-2 ring-black" 
                        : "border-black/5 hover:scale-105"
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label="Color choice"
                  />
                );
              })}
            </div>
          </div>

          {/* Category: Size */}
          <div>
            <h4 className="text-[10.5px] font-semibold text-neutral-400 uppercase tracking-widest mb-4">크기</h4>
            <div className="flex flex-wrap gap-2.5">
              {["소형 (~30㎡)", "중형 (30~50㎡)", "대형 (50㎡~)"].map((sz) => {
                const isSelected = selectedSize === sz;
                return (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(isSelected ? "" : sz)}
                    className={`h-9.5 px-5.5 rounded-full text-[12.5px] font-semibold transition-all border ${
                      isSelected
                        ? "bg-black border-black text-white"
                        : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Match Find Button */}
        <div className="mt-10 pt-8 border-t border-neutral-100">
          <button 
            onClick={handleQuizSubmit}
            className="w-full h-13 bg-black hover:bg-neutral-800 text-white rounded-2xl font-semibold text-[14px] tracking-tight flex items-center justify-center transition-colors active:scale-95 duration-150 shadow-md"
          >
            취향으로 스테이 찾기
          </button>
        </div>

      </div>
    </div>
  );
}
