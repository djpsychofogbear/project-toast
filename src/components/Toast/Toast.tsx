import React from 'react';
import {
    AlertOctagon,
    AlertTriangle,
    CheckCircle,
    Info,
    X,
} from 'react-feather';

import VisuallyHidden from '../VisuallyHidden';

import styles from './Toast.module.css';

type ToastVariant = 'notice' | 'warning' | 'success' | 'error';

export type ToastProps = {
    id: string;
    variant?: ToastVariant;
    children?: React.ReactNode;
    onDismiss?: () => void;
};

const ICONS_BY_VARIANT = {
    notice: Info,
    warning: AlertTriangle,
    success: CheckCircle,
    error: AlertOctagon,
} as const;

function Toast({
    variant = 'notice',
    children,
    onDismiss,
}: ToastProps): React.ReactElement {
    const IconComponent = ICONS_BY_VARIANT[variant];

    return (
        <div className={`${styles.toast} ${styles[variant]}`}>
            <div className={styles.iconContainer}>
                <IconComponent size={24} />
            </div>
            <p className={styles.content}>
                <VisuallyHidden>{`${variant} -`}</VisuallyHidden>
                {children}
            </p>
            <button
                className={styles.closeButton}
                onClick={onDismiss}
                aria-label="Dismiss message"
                aria-live="off">
                <VisuallyHidden>Dismiss message</VisuallyHidden>
                <X size={24} />
            </button>
        </div>
    );
}

export default Toast;
