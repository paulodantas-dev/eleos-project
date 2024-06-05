import { Button, Checkbox, IconButton, Paper } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material/";
import { cn } from "@/utils";
import { format } from "date-fns";
import { useState } from "react";

interface TaskItemProps {
  task: {
    id?: string | undefined;
    name: string;
    description?: string | undefined;
    active?: boolean | undefined;
    updatedAt?: Date | undefined;
  };
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string) => void;
  onActivateTask: (id: string) => void;
}

export function TaskItem({
  task,
  onDeleteTask,
  onEditTask,
  onActivateTask,
}: TaskItemProps) {
  const [seeMore, setSeeMore] = useState(false);

  const toggleSeeMore = () => setSeeMore((prev) => !prev);

  return (
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
        <IconButton color="error" onClick={() => onDeleteTask(task.id!)}>
          <DeleteIcon />
        </IconButton>

        <IconButton color="info" onClick={() => onEditTask(task.id!)}>
          <EditIcon />
        </IconButton>
      </div>
    </Paper>
  );
}
