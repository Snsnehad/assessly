import { Moon, Sun, UserCircle2 } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { useTheme } from "../hooks/useTheme.jsx";
import { cn } from "../utils/cn";

export default function Navbar({ title, subtitle, brand = "Assessly", navItems = [] }) {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const headerNavItems = navItems.filter((item) => item.to !== "/profile");

  return (
    <header className="sticky top-0 z-30 bg-[#14243e] text-white shadow-sm dark:border-b dark:border-white/10 dark:bg-black">
      <div className="flex min-h-16 items-center gap-4 px-5 sm:px-10">
        <Link to={user?.role === "admin" ? "/admin" : "/assessment"} className="flex shrink-0 items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2f6df6] text-sm font-bold text-white shadow-sm">
            A
          </span>
          <span className="text-base font-semibold tracking-tight text-white">
            {brand}
          </span>
        </Link>

        {headerNavItems.length ? (
          <nav className="hidden items-center gap-1 border-l border-white/15 pl-3 md:flex">
            {headerNavItems.map((item) => {
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/admin" || item.to === "/assessment"}
                  className={({ isActive }) =>
                    cn(
                      "inline-flex h-9 items-center px-2 text-sm font-medium transition",
                      isActive
                        ? "text-white"
                        : "text-[#6f86ad] hover:text-white"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        ) : null}

        <div className="ml-auto hidden min-w-0 flex-col items-end lg:flex">
          <span className="truncate text-sm font-semibold leading-5 text-white">
            {title}
          </span>
          {subtitle ? (
            <span className="truncate text-xs leading-4 text-[#7f94b8]">
              {subtitle}
            </span>
          ) : null}
        </div>

        <div className="flex items-center gap-3 lg:ml-0">
          <span className="hidden items-center gap-2 text-sm text-[#6f86ad] sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Autosaved
          </span>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2c486f] bg-[#1b355a] text-[#9fb6d8] transition hover:border-[#5d78a3] hover:text-white"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          {user?.role === "user" ? (
            <Link
              to="/profile"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2c486f] bg-[#1b355a] text-xs font-semibold text-[#9fb6d8] transition hover:border-[#5d78a3] hover:text-white"
              aria-label="Profile"
            >
              {user?.name
                ? user.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()
                : <UserCircle2 className="h-4 w-4" />}
            </Link>
          ) : null}
        </div>
      </div>

      {headerNavItems.length ? (
        <nav className="flex gap-1 overflow-x-auto border-t border-white/10 px-5 py-2 md:hidden">
          {headerNavItems.map((item) => {
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/admin" || item.to === "/assessment"}
                className={({ isActive }) =>
                  cn(
                    "inline-flex h-9 shrink-0 items-center px-3 text-sm font-medium transition",
                    isActive
                      ? "text-white"
                      : "text-[#7f94b8] hover:text-white"
                  )
                }
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      ) : null}
    </header>
  );
}
