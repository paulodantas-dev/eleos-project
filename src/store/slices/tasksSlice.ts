import { createSlice, PayloadAction, Middleware } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";

interface ITasksState {
  name: string;
  description?: string;
  active?: boolean;
}

const initialState: ITasksState[] = JSON.parse(
  localStorage.getItem("tasks") || "[]"
);

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<ITasksState, "active">>) => {
      state.push({ ...action.payload, active: false });
    },
    resetTasks: () => initialState,
  },
});

export const { addTask, resetTasks } = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export const tasksMiddleware: Middleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    const result = next(action);
    if (addTask.match(action) || resetTasks.match(action)) {
      localStorage.setItem("tasks", JSON.stringify(getState().tasks));
    }
    return result;
  };

export default tasksSlice.reducer;
