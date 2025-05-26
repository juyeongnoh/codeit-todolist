/**
 * CheckListDetail
 * 상세 보기 페이지에서 제목과 완료 여부를 표시하는 컴포넌트입니다.
 *
 * 특이사항
 * - 부모로부터 setter 함수를 받아와서 상태를 변경합니다.
 * - 제목이 변경될 때마다 input 요소의 너비를 자동으로 조정하기 위해 span 요소의 너비를 참조합니다.
 */

"use client";

import { useEffect, useRef } from "react";

type CheckListDetailProps = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  isCompleted: boolean;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CheckListDetail({
  name,
  setName,
  isCompleted,
  setIsCompleted,
}: CheckListDetailProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  useEffect(() => {
    if (spanRef.current && inputRef.current && name.length > 0) {
      inputRef.current.style.width = `${
        spanRef.current.getBoundingClientRect().width
      }px`;
    }
  }, [name.length]);

  return (
    <div
      className={`flex items-center justify-center h-16 gap-4 px-3 border-2 border-slate-900 rounded-3xl ${
        isCompleted ? "bg-violet-100" : "bg-white"
      }`}
    >
      <div
        onClick={() => setIsCompleted(!isCompleted)}
        className={`w-8 h-8 border-2 rounded-full flex justify-center items-center ${
          isCompleted ? "bg-violet-600" : "bg-yellow-50"
        }`}
      >
        {isCompleted && <img src="/ic/check_white.svg" alt="checked" />}
      </div>

      <span
        ref={spanRef}
        className="font-bold text-xl invisible absolute -z-10"
      >
        {name}
      </span>

      <input
        type="text"
        ref={inputRef}
        className="font-bold text-xl underline focus:outline-none"
        value={name}
        onChange={handleChange}
      />
    </div>
  );
}
