"use client";

import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import { useEffect, useState } from "react";
import { TENANT_ID } from "./constants/tenant_id";

type TodoItem = {
  id: string;
  name: string;
  isCompleted: boolean;
};

export default function Home() {
  const [items, setItems] = useState<TodoItem[]>([]);

  const completedItems = items.filter((item) => item.isCompleted === true);
  const uncompletedItems = items.filter((item) => item.isCompleted === false);

  useEffect(() => {
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

    fetchData();
  }, []);

  return (
    <div className="flex flex-col sm:gap-10 gap-6 sm:p-6 p-4">
      <AddTodoForm />
      <TodoList
        completedItems={completedItems}
        uncompletedItems={uncompletedItems}
      />
    </div>
  );
}
