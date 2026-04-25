import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 px-4 py-10 dark:bg-slate-950">
      <div className="absolute inset-0 bg-grid bg-grid opacity-60" />
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="relative w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
