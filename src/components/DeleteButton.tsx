const CUSTOM_SHADOW = "shadow-[4px_3.5px_0px_0_#0F172A]";

export default function DeleteButton({
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`flex gap-0.5 text-white justify-center items-center border-2 border-slate-900 rounded-3xl w-40 h-14 bg-rose-500 font-bold ${CUSTOM_SHADOW} cursor-pointer`}
      {...props}
    >
      <img src="/ic/X.svg" alt="check" />
      <span>삭제하기</span>
    </button>
  );
}
