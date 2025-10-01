import React from 'react';
import { ToastProps } from '../Toast';

export type ToastVariant = 'notice' | 'warning' | 'success' | 'error';

type ToastContext = {
    toasts: ToastProps[];
    addToast: (toast: Omit<ToastProps, 'id'>) => void;
    dismissToast: (id: string) => void;
    clearToasts: () => void;
};

export const ToastContext = React.createContext<ToastContext | undefined>(
    undefined
);

// Provider
export default function ToastProvider({
    children,
}: {
    children: React.ReactNode;
}) {
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

    const clearToasts = () => {
        setToasts([]);
    };

    return (
        <ToastContext.Provider
            value={{ toasts, addToast, dismissToast, clearToasts }}>
            {children}
        </ToastContext.Provider>
    );
}

// Custom Hook wrapping error boilerplate
export function useToast() {
    const context = React.useContext(ToastContext);

    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }

    return context;
}
