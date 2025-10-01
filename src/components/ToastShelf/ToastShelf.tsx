import React from 'react';

import Toast, { type ToastProps } from '../Toast';
import styles from './ToastShelf.module.css';

function ToastShelf({
    toasts,
    onDismiss,
}: {
    toasts: ToastProps[];
    onDismiss: (id: string) => void;
}): React.ReactElement {
    return (
        <ol
            className={styles.wrapper}
            role="region"
            aria-live="polite"
            aria-label="Notification">
            {toasts.map(toast => {
                if (!toast.children) {
                    return null;
                }
                return (
                    <li
                        className={styles.toastWrapper}
                        key={`${toast.variant}-${toast.id}`}>
                        <Toast
                            variant={toast.variant}
                            onDismiss={() => onDismiss(toast.id)}
                            id={toast.id}>
                            {toast.children}
                        </Toast>
                    </li>
                );
            })}
        </ol>
    );
}

export default ToastShelf;
