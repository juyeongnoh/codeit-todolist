"use client";

import AddButton from "@/components/AddButton";
import Search from "@/components/Search";
import { useState } from "react";
import { TENANT_ID } from "../constants/tenant_id";
import { useRouter } from "next/navigation";

export default function AddTodoForm() {
  const [text, setText] = useState("");
  const router = useRouter();

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${TENANT_ID}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: text,
      }),
    });

    router.refresh();
  };

  return (
    <form className="flex gap-4 items-center" onSubmit={addTodo}>
      <Search value={text} onChange={(e) => setText(e.target.value)} />
      <AddButton type="submit" />
    </form>
  );
}
