export default function GNB() {
  return (
    <div className="h-[60px] bg-white flex justify-center border-b border-b-slate-200 py-2.5">
      <div className="w-full px-6 md:max-w-7xl xl:max-w-[1280px]">
        <picture>
          <source media="(min-width: 744px)" srcSet="/logo/Size=Large.svg" />
          <source media="(min-width: 375px)" srcSet="/logo/Size=Small.svg" />
          <img src="/logo/Size=Large.svg" alt="logo" />
        </picture>
      </div>
    </div>
  );
}
