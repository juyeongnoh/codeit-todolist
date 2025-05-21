const CUSTOM_SHADOW = "shadow-[4px_3.5px_0px_0_#0F172A]";

export default function Search() {
  return (
    <input
      type="text"
      placeholder="할 일을 입력해주세요"
      className={`focus:text-slate-900 text-slate-500 bg-slate-100 rounded-3xl py-4 px-6 outline-none w-full border-2 border-slate-900 box-border ${CUSTOM_SHADOW}`}
    />
  );
}
