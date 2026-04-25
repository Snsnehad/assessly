import { cn } from "../utils/cn";

export default function Stepper({ steps, currentStep }) {
  return (
    <div className="flex flex-wrap gap-3">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={cn(
            "flex min-w-[160px] items-center gap-3 rounded-2xl border px-4 py-3 text-sm",
            index <= currentStep
              ? "border-brand-200 bg-brand-50 text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-100"
              : "border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
          )}
        >
          <span
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold",
              index <= currentStep
                ? "bg-brand-600 text-white"
                : "bg-slate-100 text-slate-500 dark:bg-slate-800"
            )}
          >
            {index + 1}
          </span>
          <div>
            <p className="font-medium">{step.title}</p>
            <p className="text-xs opacity-80">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
