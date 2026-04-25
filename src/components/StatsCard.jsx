import { motion } from "framer-motion";

export default function StatsCard({ icon: Icon, label, value, change, tone = "brand" }) {
  const toneClass =
    tone === "emerald"
      ? "bg-accent-50 text-accent-600 dark:bg-accent-500/10"
      : "bg-brand-50 text-brand-600 dark:bg-brand-500/10";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-card rounded-[28px] p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className={`rounded-2xl p-3 ${toneClass}`}>
          <Icon className="h-5 w-5" />
        </div>
        {change ? (
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {change}
          </span>
        ) : null}
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </motion.div>
  );
}
