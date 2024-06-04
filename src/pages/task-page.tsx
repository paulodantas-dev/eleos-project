import { TaskForm, TaskList } from "../components";

export function TaskPage() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
      <TaskForm />
      <TaskList />
    </div>
  );
}
