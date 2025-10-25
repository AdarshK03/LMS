// src/hooks/use-toast.js
import * as React from "react";
import { Toast } from "@/components/ui/toast";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

let count = 0;
let toastTimeouts = new Map();

const addToasts = (toasts, toast) => {
  return [...toasts, toast].slice(-TOAST_LIMIT);
};

export const ToastContext = React.createContext({
  toasts: [],
  setToasts: () => {},
});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  return (
    <ToastContext.Provider value={{ toasts, setToasts }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export const toast = {
  show({ title, description, variant = "default" }) {
    const id = count++;
    const newToast = { id, title, description, variant };

    const context = globalThis.__toast_context;
    if (!context) {
      console.warn("No toast context found. Make sure ToastProvider wraps your app.");
      return;
    }

    context.setToasts((prev) => addToasts(prev, newToast));

    const timeout = setTimeout(() => {
      context.setToasts((prev) => prev.filter((t) => t.id !== id));
      toastTimeouts.delete(id);
    }, TOAST_REMOVE_DELAY);

    toastTimeouts.set(id, timeout);
  },
};
