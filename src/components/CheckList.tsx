"use client";

import Link from "next/link";

type CheckListProps = {
  id: string;
  name: string;
  isCompleted: boolean;
  checkTodo: (id: string, isCompleted: boolean) => Promise<void>;
};

export default function CheckList({
  id,
  name,
  isCompleted,
  checkTodo,
}: CheckListProps) {
  return (
    <Link
      href={`/items/${id}`}
      className={`flex items-center gap-4 px-3 py-2 border-2 border-slate-900 rounded-full ${
        isCompleted ? "bg-violet-100" : "bg-white"
      }`}
    >
      <div
        className={`w-8 h-8 border-2 rounded-full flex justify-center items-center ${
          isCompleted ? "bg-violet-600" : "bg-yellow-50"
        }`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          checkTodo(id, isCompleted);
        }}
      >
        {isCompleted && <img src="/ic/check_white.svg" alt="checked" />}
      </div>
      <div className={`${isCompleted && "line-through"}`}>{name}</div>
    </Link>
  );
}
