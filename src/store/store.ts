import { configureStore } from "@reduxjs/toolkit";
import tasksReducer, { tasksMiddleware } from "./slices/tasksSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
