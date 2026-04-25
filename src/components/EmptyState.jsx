import { FileSearch } from "lucide-react";

export default function EmptyState({
  title = "Nothing here yet",
  description = "Once data is available, it will appear here.",
}) {
  return (
    <div className="glass-card flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-4 rounded-3xl bg-brand-50 p-4 text-brand-600 dark:bg-brand-500/10">
        <FileSearch className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}
