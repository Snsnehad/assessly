import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { createContext, useContext, useMemo, useState } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const api = useMemo(
    () => ({
      notify(message) {
        const id = crypto.randomUUID();
        setToasts((current) => [...current, { id, message }]);
        setTimeout(() => {
          setToasts((current) => current.filter((toast) => toast.id !== id));
        }, 2600);
      },
    }),
    []
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="fixed right-4 top-4 z-50 flex w-full max-w-sm flex-col gap-3">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-card flex items-center gap-3 px-4 py-3"
            >
              <CheckCircle2 className="h-5 w-5 text-accent-500" />
              <p className="flex-1 text-sm text-slate-700 dark:text-slate-200">
                {toast.message}
              </p>
              <button
                type="button"
                onClick={() =>
                  setToasts((current) =>
                    current.filter((item) => item.id !== toast.id)
                  )
                }
              >
                <X className="h-4 w-4 text-slate-400" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
