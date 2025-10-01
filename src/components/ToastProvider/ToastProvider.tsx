import React from 'react';
import  { ToastProps } from '../Toast';

export type ToastVariant = 'notice' | 'warning' | 'success' | 'error';

type ToastContext = {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, 'id'>) => void;
  dismissToast: (id: string) => void;
};

export const ToastContext = React.createContext<ToastContext | undefined>(undefined);

// Provider
export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const addToast = (toast: Omit<ToastProps, 'id'>) => {
    // create a new toast with the toast object passed and a random id
    const newToast = { ...toast, id: crypto.randomUUID() };
    // cur
    setToasts(prevToasts => [...prevToasts, newToast]);
  };

  const dismissToast = (id: string) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

  

// Custom Hook wrapping error boilerplate
export function useToast() {
  const context = React.useContext(ToastContext);
  
  if (context === undefined) {
    throw new Error(
      'useToast must be used within a ToastProvider'
    );
  }
  
  return context;
}

// function ToastProvider({ children }) {
//   const [toasts, setToasts] = React.useState([]);

//   function createToast(message, variant) {
//     const nextToasts = [
//       ...toasts,
//       {
//         id: crypto.randomUUID(),
//         message,
//         variant,
//       },
//     ];

//     setToasts(nextToasts);
//   }

//   function dismissToast(id) {
//     const nextToasts = toasts.filter((toast) => {
//       return toast.id !== id;
//     });
//     setToasts(nextToasts);
//   }

//   return (
//     <ToastContext.Provider
//       value={{
//         toasts,
//         createToast,
//         dismissToast,
//       }}
//     >
//       {children}
//     </ToastContext.Provider>
//   );
// }

// export default ToastProvider;