import { Bell, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme.jsx";

export default function Navbar({ title, subtitle }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          {subtitle ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
          ) : null}
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 px-3 py-2 dark:border-slate-800 md:flex">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              className="bg-transparent text-sm outline-none"
              placeholder="Search..."
            />
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-2xl border border-slate-200 p-3 dark:border-slate-800"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            className="rounded-2xl border border-slate-200 p-3 dark:border-slate-800"
          >
            <Bell className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
