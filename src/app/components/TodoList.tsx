"use client";

import CheckList from "@/components/CheckList";

type TodoItem = {
  id: string;
  name: string;
  isCompleted: boolean;
};

interface TodoListProps {
  completedItems: TodoItem[];
  uncompletedItems: TodoItem[];
}

export default function TodoList({
  completedItems,
  uncompletedItems,
}: TodoListProps) {
  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <div className="flex flex-col gap-4">
        <img src="/img/todo.svg" alt="todo" className="self-start" />
        <div className="flex flex-col gap-4">
          {uncompletedItems.map((item) => (
            <CheckList
              key={item.id}
              id={item.id}
              label={item.name}
              checked={item.isCompleted}
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
              label={item.name}
              checked={item.isCompleted}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
