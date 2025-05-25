"use client";

import { useEffect, useState } from "react";
import { TENANT_ID } from "./constants/tenant_id";
import Search from "@/components/Search";
import AddButton from "@/components/AddButton";
import CheckList from "@/components/CheckList";
import toast from "react-hot-toast";

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

    toast.promise(
      async () => {
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
      },
      {
        loading: "할 일 추가 중...",
        success: "할 일이 추가되었습니다.",
        error: "할 일을 추가하는 데 실패했습니다.",
      }
    );
  };

  const checkTodo = async (id: string, isCompleted: boolean) => {
    toast.promise(
      async () => {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/${TENANT_ID}/items/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              isCompleted: !isCompleted,
            }),
          }
        );

        fetchData();
      },
      {
        loading: "할 일 상태 변경 중...",
        success: "할 일 상태가 변경되었습니다.",
        error: "할 일 상태 변경에 실패했습니다.",
      }
    );
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
            {uncompletedItems.length > 0 ? (
              uncompletedItems.map((item) => (
                <CheckList
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  isCompleted={item.isCompleted}
                  checkTodo={checkTodo}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 lg:mt-12">
                <img
                  src="/img/empty-todo-fallback.svg"
                  alt="empty todo"
                  className="sm:w-[240px] w-[120px]"
                />
                <div className="text-center font-bold text-slate-400">
                  할 일이 없어요.
                  <br />
                  TODO를 새롭게 추가해주세요!
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <img src="/img/done.svg" alt="todo" className="self-start" />
          <div className="flex flex-col gap-4">
            {completedItems.length > 0 ? (
              completedItems.map((item) => (
                <CheckList
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  isCompleted={item.isCompleted}
                  checkTodo={checkTodo}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 lg:mt-12">
                <img
                  src="/img/empty-done-fallback.svg"
                  alt="empty todo"
                  className="sm:w-[240px] w-[120px]"
                />
                <div className="text-center font-bold text-slate-400">
                  아직 다 한 일이 없어요.
                  <br />
                  해야 할 일을 체크해보세요!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
