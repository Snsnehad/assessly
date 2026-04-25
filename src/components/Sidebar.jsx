import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "../utils/cn";

export default function Sidebar({ items, brand = "Assessly" }) {
  const [open, setOpen] = useState(false);

  const content = (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="px-5 py-6">
        <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-sky-500 p-4 text-white shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">Platform</p>
          <p className="mt-2 text-2xl font-semibold">{brand}</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin" || item.to === "/dashboard"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                  isActive
                    ? "bg-brand-600 text-white shadow-card"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                )
              }
              onClick={() => setOpen(false)}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
      <div className="px-5 py-6 text-xs text-slate-400">Phase 1 frontend demo</div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-40 rounded-2xl border border-slate-200 bg-white p-3 shadow-card dark:border-slate-800 dark:bg-slate-900 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <aside className="sticky top-0 hidden h-screen w-72 self-start border-r border-slate-200 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 lg:block">
        {content}
      </aside>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/40 lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.aside
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -24, opacity: 0 }}
              className="h-full w-72 bg-white dark:bg-slate-950"
              onClick={(event) => event.stopPropagation()}
            >
              {content}
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
