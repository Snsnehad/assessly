export default function ProgressBar({ value }) {
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
      <div
        className="h-full rounded-full bg-gradient-to-r from-brand-500 via-brand-600 to-accent-500 transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
