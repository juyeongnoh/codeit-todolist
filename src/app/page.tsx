import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";

export default async function Home() {
  return (
    <div className="flex flex-col sm:gap-10 gap-6 sm:p-6 p-4">
      <AddTodoForm />
      <TodoList />
    </div>
  );
}
