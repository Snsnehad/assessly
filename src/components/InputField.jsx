import { cn } from "../utils/cn";

export default function InputField({
  label,
  error,
  type = "text",
  className,
  ...props
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </span>
      <input
        type={type}
        className={cn(
          "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white",
          className
        )}
        {...props}
      />
      {error ? <p className="text-xs text-rose-500">{error}</p> : null}
    </label>
  );
}
