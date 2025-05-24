"use client";

import { TENANT_ID } from "@/app/constants/tenant_id";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CheckListProps = {
  id: string;
  label: string;
  checked: boolean;
};

export default function CheckList({ id, label, checked }: CheckListProps) {
  const router = useRouter();

  const checkTodo = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${TENANT_ID}/items/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: label,
        memo: "",
        imageUrl: "",
        isCompleted: !checked,
      }),
    });

    router.refresh();
  };

  return (
    <Link
      href={`/items/${id}`}
      className={`flex items-center gap-4 px-3 py-2 border-2 border-slate-900 rounded-full ${
        checked ? "bg-violet-100" : "bg-white"
      }`}
    >
      <div
        className={`w-8 h-8 border-2 rounded-full flex justify-center items-center ${
          checked ? "bg-violet-600" : "bg-yellow-50"
        }`}
        onClick={checkTodo}
      >
        {checked && <img src="/ic/check_white.svg" alt="checked" />}
      </div>
      <div className={`${checked && "line-through"}`}>{label}</div>
    </Link>
  );
}
