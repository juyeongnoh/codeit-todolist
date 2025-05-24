const CUSTOM_SHADOW = "shadow-[4px_3.5px_0px_0_#0F172A]";

export default function EditButton({
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`flex gap-0.5 justify-center items-center border-2 border-slate-900 rounded-3xl w-40 h-14 disabled:bg-slate-200 bg-lime-300 font-bold ${CUSTOM_SHADOW} cursor-pointer`}
      {...props}
    >
      <img src="/ic/check.svg" alt="check" />
      <span>수정 완료</span>
    </button>
  );
}
