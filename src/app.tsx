import { TaskForm, TaskList } from "./components";

export function App() {
  return (
    <div className="grid min-h-screen grid-cols-2">
      <TaskForm />
      <TaskList />
    </div>
  );
}
