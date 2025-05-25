"use client";

import { useEffect, useState } from "react";
import { TENANT_ID } from "./constants/tenant_id";
import Search from "@/components/Search";
import AddButton from "@/components/AddButton";
import CheckList from "@/components/CheckList";

type TodoItem = {
  id: string;
  name: string;
  isCompleted: boolean;
};

export default function Home() {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [input, setInput] = useState<string>("");

  const completedItems: TodoItem[] = items.filter(
    (item) => item.isCompleted === true
  );

  const uncompletedItems: TodoItem[] = items.filter(
    (item) => item.isCompleted === false
  );

  const fetchData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${TENANT_ID}/items`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    setItems(data);
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (input.length === 0) return;

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${TENANT_ID}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: input,
      }),
    });

    setInput("");
    fetchData();
  };

  const checkTodo = async (id: string, isCompleted: boolean) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${TENANT_ID}/items/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isCompleted: !isCompleted,
      }),
    });

    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col sm:gap-10 gap-6 sm:p-6 p-4">
      <form className="flex gap-4 items-center" onSubmit={addTodo}>
        <Search value={input} onChange={(e) => setInput(e.target.value)} />
        <AddButton type="submit" disabled={input.length === 0} />
      </form>
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <img src="/img/todo.svg" alt="todo" className="self-start" />
          <div className="flex flex-col gap-4">
            {uncompletedItems.map((item) => (
              <CheckList
                key={item.id}
                id={item.id}
                name={item.name}
                isCompleted={item.isCompleted}
                checkTodo={checkTodo}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <img src="/img/done.svg" alt="todo" className="self-start" />
          <div className="flex flex-col gap-4">
            {completedItems.map((item) => (
              <CheckList
                key={item.id}
                id={item.id}
                name={item.name}
                isCompleted={item.isCompleted}
                checkTodo={checkTodo}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
