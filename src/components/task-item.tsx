import { Button, Checkbox, IconButton, Paper } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material/";
import { cn } from "@/utils";
import { format } from "date-fns";
import { useState } from "react";
import { ITasksState } from "@/store/slices/tasksSlice";
import { DeleteTaskDialog } from "./delete-task-dialog";
import { EditTaskDialog } from "./edit-task-dialog";

interface TaskItemProps {
  task: ITasksState;
  openDeleteDialog: boolean;
  openEditDialog: boolean;
  onOpenEditDialog: () => void;
  onOpenDeleteDialog: () => void;
  onCloseDialog: () => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, name: string, description: string) => void;
  onActivateTask: (id: string) => void;
}

export function TaskItem({
  openDeleteDialog,
  openEditDialog,
  task,
  onActivateTask,
  onCloseDialog,
  onDeleteTask,
  onEditTask,
  onOpenDeleteDialog,
  onOpenEditDialog,
}: TaskItemProps) {
  const [seeMore, setSeeMore] = useState(false);

  const toggleSeeMore = () => setSeeMore((prev) => !prev);

  return (
    <>
      <Paper
        elevation={4}
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "1rem",
          gap: "0.5rem",
          backgroundColor: task.active ? "#cbd5e1" : "#f1f5f9",
        }}
      >
        <div>
          <Checkbox
            checked={task.active}
            onChange={() => onActivateTask(task.id!)}
          />
        </div>
        <div className="flex grow flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2
              className={cn(
                "text-lg font-semibold text-purple-500",
                task.active && "line-through"
              )}
            >
              {task.name}
            </h2>

            <span className="text-xs text-slate-400">
              {format(task.updatedAt!, "MM/dd/yyyy")}
            </span>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <p
              className={cn(
                "max-w-52 truncate text-xs text-slate-400 md:max-w-md lg:max-w-52 xl:max-w-80 2xl:max-w-lg",
                seeMore ? "whitespace-normal" : "whitespace-nowrap"
              )}
            >
              {task.description}
            </p>
            <Button
              variant="text"
              size="small"
              sx={{
                fontSize: "0.75rem",
                textTransform: "capitalize",
                display:
                  task.description && task.description.length > 100
                    ? "block"
                    : "none",
              }}
              onClick={toggleSeeMore}
            >
              {seeMore ? "See Less" : "See More"}
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <IconButton color="error" onClick={onOpenDeleteDialog}>
            <DeleteIcon />
          </IconButton>

          <IconButton color="info" onClick={onOpenEditDialog}>
            <EditIcon />
          </IconButton>
        </div>
      </Paper>
      <DeleteTaskDialog
        open={openDeleteDialog}
        onClose={onCloseDialog}
        onConfirm={() => {
          onDeleteTask(task.id!);
          onCloseDialog();
        }}
        title={"Are you sure you want to delete this task?"}
        description={
          "This action cannot be undone. This will permanently delete the task and all of its data."
        }
      />
      <EditTaskDialog
        open={openEditDialog}
        onConfirm={onEditTask}
        onClose={onCloseDialog}
        id={task.id!}
        name={task.name}
        description={task.description || ""}
      />
    </>
  );
}
