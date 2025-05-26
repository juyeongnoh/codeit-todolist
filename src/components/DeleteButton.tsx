/**
 * DeleteButton
 * 상세보기 페이지에서 사용하는 "삭제하기" 버튼 컴포넌트입니다.
 */

"use client";

export default function DeleteButton({
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="flex gap-0.5 text-white justify-center items-center border-2 border-slate-900 rounded-3xl w-40 h-14 bg-rose-500 font-bold cursor-pointer shadow-[4px_3.5px_0px_0_#0F172A]"
      {...props}
    >
      <img src="/ic/X.svg" alt="check" />
      <span>삭제하기</span>
    </button>
  );
}
