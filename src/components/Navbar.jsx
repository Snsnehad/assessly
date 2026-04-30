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
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95">
      <div className="flex min-h-16 items-center gap-4 px-4 sm:px-6">
        <Link to={user?.role === "admin" ? "/admin" : "/assessment"} className="flex shrink-0 items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-sm font-bold text-white shadow-sm">
            A
          </span>
          <span className="text-base font-semibold tracking-tight text-slate-950 dark:text-white">
            {brand}
          </span>
        </Link>

        {headerNavItems.length ? (
          <nav className="hidden items-center gap-1 md:flex">
            {headerNavItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/admin" || item.to === "/assessment"}
                  className={({ isActive }) =>
                    cn(
                      "inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium transition",
                      isActive
                        ? "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-200"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                    )
                  }
                >
                  {Icon ? <Icon className="h-4 w-4" /> : null}
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        ) : null}

        <div className="ml-auto hidden min-w-0 flex-col border-l border-slate-200 pl-4 dark:border-slate-800 lg:flex">
          <span className="truncate text-sm font-semibold leading-5 text-slate-900 dark:text-white">
            {title}
          </span>
          {subtitle ? (
            <span className="truncate text-xs leading-4 text-slate-500 dark:text-slate-400">
              {subtitle}
            </span>
          ) : null}
        </div>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 transition hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-900"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          {user?.role === "user" ? (
            <Link
              to="/profile"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 transition hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-900"
              aria-label="Profile"
            >
              <UserCircle2 className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </div>

      {headerNavItems.length ? (
        <nav className="flex gap-1 overflow-x-auto border-t border-slate-200 px-4 py-2 dark:border-slate-800 md:hidden">
          {headerNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/admin" || item.to === "/assessment"}
                className={({ isActive }) =>
                  cn(
                    "inline-flex h-9 shrink-0 items-center gap-2 rounded-xl px-3 text-sm font-medium transition",
                    isActive
                      ? "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-200"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
                  )
                }
              >
                {Icon ? <Icon className="h-4 w-4" /> : null}
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      ) : null}
    </header>
  );
}
