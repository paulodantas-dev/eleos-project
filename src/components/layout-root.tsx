import { Outlet } from "react-router-dom";
import { NavBar } from "./nav-bar";

export function LayoutRoot() {
  return (
    <div className="flex size-full min-h-screen min-w-full flex-col">
      <NavBar />
      <main className="flex grow">
        <Outlet />
      </main>
    </div>
  );
}
