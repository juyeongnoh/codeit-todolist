import CheckList from "@/components/CheckList";
import { TENANT_ID } from "../constants/tenant_id";

type Item = {
  id: string;
  name: string;
  isCompleted: boolean;
};

export default async function TodoList() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${TENANT_ID}/items?page=1&pageSize=10`
  );

  const items: Item[] = await res.json();

  const completedItems = items.filter(
    (item: Item) => item.isCompleted === true
  );

  const uncompletedItems = items.filter(
    (item: Item) => item.isCompleted === false
  );

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
