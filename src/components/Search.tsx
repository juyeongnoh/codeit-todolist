/**
 * Search
 * 메인 페이지에서 할 일을 추가할 때 사용하는 Input 컴포넌트입니다.
 * Figma에 표시된 이름(Search)을 그대로 사용했습니다.
 */

"use client";

export default function Search({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="text"
      placeholder="할 일을 입력해주세요"
      className="focus:text-slate-900 text-slate-500 bg-slate-100 rounded-3xl h-14 px-6 outline-none w-full border-2 border-slate-900 box-border shadow-[4px_3.5px_0px_0_#0F172A]"
      {...props}
    />
  );
}
