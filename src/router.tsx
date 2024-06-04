import { createBrowserRouter } from "react-router-dom";
import { NotFoundPage, TaskPage, UserPage, UsersPage } from "./pages";
import { LayoutRoot } from "./components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutRoot />,
    children: [
      {
        path: "/",
        element: <TaskPage />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/users/:id",
        element: <UserPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
