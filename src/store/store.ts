import { configureStore } from "@reduxjs/toolkit";
import tasksReducer, { tasksMiddleware } from "./slices/tasksSlice";
import usersReducer from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
