export function SkeletonCard() {
  return (
    <div className="glass-card animate-pulse p-6">
      <div className="mb-4 h-4 w-24 rounded-full bg-slate-200 dark:bg-slate-800" />
      <div className="mb-3 h-8 w-2/3 rounded-full bg-slate-200 dark:bg-slate-800" />
      <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}

export default function Loader() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
    </div>
  );
}
