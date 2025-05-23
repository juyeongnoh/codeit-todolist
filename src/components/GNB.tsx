"use client";

import Link from "next/link";

export default function GNB() {
  return (
    <nav className="h-[60px] bg-white flex justify-center border-b border-b-slate-200 py-2.5">
      <div className="w-full px-6 xl:max-w-[1280px]">
        <Link href="/">
          <picture>
            <source media="(min-width: 640px)" srcSet="/logo/Size=Large.svg" />
            <img src="/logo/Size=Small.svg" alt="logo" />
          </picture>
        </Link>
      </div>
    </nav>
  );
}
