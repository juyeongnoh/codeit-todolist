export default function AddButton({
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="bg-slate-200 rounded-3xl sm:w-40 w-14 h-14 py-4 flex gap-1 items-center justify-center shadow-[4px_3.5px_0px_0_#0F172A] shrink-0 border-slate-900 border-2 cursor-pointer"
      {...props}
    >
      <img src="/ic/plus_black.svg" />
      <div className="hidden sm:block">추가하기</div>
    </button>
  );
}
