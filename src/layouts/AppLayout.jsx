import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AppLayout({ navItems, title, subtitle, brand }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar title={title} subtitle={subtitle} brand={brand} navItems={navItems} />
      <main className="w-full flex-1 px-4 py-6 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}
