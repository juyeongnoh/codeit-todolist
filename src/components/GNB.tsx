/**
 * GNB
 * 전역 네비게이션 바 컴포넌트입니다.
 */

"use client";

import Link from "next/link";

export default function GNB() {
  return (
    <nav className="h-[60px] bg-white flex justify-center border-b border-b-slate-200 py-2.5">
      <div className="w-full sm:px-6 px-4 xl:max-w-[1280px]">
        <Link href="/">
          <picture className="inline-block">
            <source media="(min-width: 640px)" srcSet="/logo/logo-large.svg" />
            <img src="/logo/logo-small.svg" alt="logo" />
          </picture>
        </Link>
      </div>
    </nav>
  );
}
