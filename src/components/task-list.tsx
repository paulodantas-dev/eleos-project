import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  activeTask,
  deleteTask,
  resetTasks,
  selectTasks,
} from "@/store/slices/tasksSlice";
import { TaskItem } from "./task-item";
import { Button } from "@mui/material";
import { useState } from "react";
import { DeleteTaskDialog } from "./delete-task-dialog";

export function TaskList() {
  const [deleteSingleTask, setDeleteSingleTask] = useState(false);
  const [deleteAllTasksDialog, setDeleteAllTasksDialog] = useState(false);
  const [editTask, setEditTask] = useState(false);

  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
  };

  const handleActivateTask = (id: string) => {
    dispatch(activeTask(id));
  };

  const handleEditTask = (id: string, name: string, description: string) => {
    console.log(id, name, description);
  };

  const handleClearTasks = () => {
    dispatch(resetTasks());
    setDeleteAllTasksDialog(false);
  };

  if (!tasks.length) {
    return (
      <div className="flex flex-col px-4 py-8">
        <h1 className="text-2xl font-bold text-purple-500">
          Eleos - Task List
        </h1>

        <div className="flex grow items-center justify-center">
          <span className=" text-lg text-slate-400">
            No tasks found. Add a new task to get started.
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex max-h-[calc(100vh-4.5rem)] flex-col gap-8 overflow-y-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-purple-500">
            Eleos - Task List
          </h1>

          <Button variant="text" onClick={() => setDeleteAllTasksDialog(true)}>
            Clear all tasks
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              openDeleteDialog={deleteSingleTask}
              openEditDialog={editTask}
              onOpenEditDialog={() => setEditTask(true)}
              onOpenDeleteDialog={() => setDeleteSingleTask(true)}
              onCloseDialog={() => {
                setDeleteSingleTask(false);
                setEditTask(false);
              }}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
              onActivateTask={handleActivateTask}
            />
          ))}
        </div>
      </div>
      <DeleteTaskDialog
        open={deleteAllTasksDialog}
        onClose={() => setDeleteAllTasksDialog(false)}
        onConfirm={handleClearTasks}
        title="Delete all tasks"
        description="Are you sure you want to delete all tasks?"
      />
    </>
  );
}
