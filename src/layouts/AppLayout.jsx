import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AppLayout({ navItems, title, subtitle, brand }) {
  return (
    <div className="min-h-screen bg-[#eef3f9] text-slate-950 dark:bg-black dark:text-slate-100">
      <Navbar title={title} subtitle={subtitle} brand={brand} navItems={navItems} />
      <main className="w-full flex-1">
        <Outlet />
      </main>
    </div>
  );
}
