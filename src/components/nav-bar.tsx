import { cn } from "@/utils";
import Logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";

export function NavBar() {
  const location = useLocation();

  const activeLink = (path: string) => {
    return (
      location.pathname === path &&
      "text-purple-500 font-bold hover:text-purple-500"
    );
  };

  return (
    <div className="z-10 flex items-center justify-between px-5 py-3 shadow-md lg:px-10">
      <div className="relative h-10 w-auto">
        <Link to="/">
          <img src={Logo} alt="logo" className="h-full" />
        </Link>
      </div>
      <nav>
        <ul className="flex items-center gap-8">
          <li
            className={cn(
              "text-slate-950 transition-colors hover:text-purple-300",
              activeLink("/")
            )}
          >
            <Link to="/">Tasks</Link>
          </li>
          <li
            className={cn(
              "text-slate-950 transition-colors hover:text-purple-300",
              activeLink("/users")
            )}
          >
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
