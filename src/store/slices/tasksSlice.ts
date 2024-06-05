import { createSlice, PayloadAction, Middleware } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import { v4 as uuidv4 } from "uuid";

export interface ITasksState {
  id?: string;
  name: string;
  description?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const initialState: ITasksState[] = JSON.parse(
  localStorage.getItem("tasks") || "[]"
);

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<
        Omit<ITasksState, "active" | "id" | "createdAt" | "updatedAt">
      >
    ) => {
      const now = new Date().toISOString();
      state.push({
        ...action.payload,
        id: uuidv4(),
        active: false,
        createdAt: now,
        updatedAt: now,
      });
    },

    editTask: (
      state,
      action: PayloadAction<
        Omit<ITasksState, "active" | "createdAt" | "updatedAt">
      >
    ) => {
      state.forEach((task) => {
        if (task.id === action.payload.id) {
          task.name = action.payload.name;
          task.description = action.payload.description;
          task.updatedAt = new Date().toISOString();
        }
      });
    },

    activeTask: (state, action: PayloadAction<string>) => {
      state.forEach((task) => {
        if (task.id === action.payload) {
          task.active = !task.active;
          task.updatedAt = new Date().toISOString();
        }
      });
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      return state.filter((task) => task.id !== action.payload);
    },

    resetTasks: () => {
      return [];
    },
  },
});

export const { addTask, resetTasks, deleteTask, activeTask, editTask } =
  tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export const tasksMiddleware: Middleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    const result = next(action);
    if (
      addTask.match(action) ||
      resetTasks.match(action) ||
      activeTask.match(action) ||
      editTask.match(action)
    ) {
      localStorage.setItem("tasks", JSON.stringify(getState().tasks));
    }

    if (deleteTask.match(action)) {
      localStorage.setItem(
        "tasks",
        JSON.stringify(
          getState().tasks.filter(
            (task: { id: string }) => task.id !== action.payload
          )
        )
      );
    }

    return result;
  };

export default tasksSlice.reducer;
