/**
 * EditButton
 * 상세보기 페이지에서 사용하는 "수정 완료" 버튼 컴포넌트입니다.
 */

"use client";

export default function EditButton({
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="flex gap-0.5 justify-center items-center border-2 border-slate-900 rounded-3xl w-40 h-14 disabled:bg-slate-200 bg-lime-300 font-bold cursor-pointer shadow-[4px_3.5px_0px_0_#0F172A]"
      {...props}
    >
      <img src="/ic/check.svg" alt="check" />
      <span>수정 완료</span>
    </button>
  );
}
