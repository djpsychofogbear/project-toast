import React from 'react';

import Button from '../Button';
import { type ToastVariant, useToast } from '../ToastProvider/ToastProvider';
import ToastShelf from '../ToastShelf';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS: ToastVariant[] = [
    'notice',
    'warning',
    'success',
    'error',
];
const VARIANT_RADIO_GROUP_NAME = 'variant';

function ToastPlayground(): React.ReactElement {
    const [variant, setVariant] = React.useState<ToastVariant>('notice');
    const [message, setMessage] = React.useState<string>('');
    const { toasts, addToast, dismissToast, clearToasts } = useToast();

    const handleVariantChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setVariant(event.target.value as ToastVariant);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addToast({ variant, children: message });
        setMessage('');
        setVariant('notice');
    };

    const handleMessageChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setMessage(event.target.value);
    };

    React.useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                clearToasts();
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className={styles.wrapper}>
            <header>
                <img
                    alt="Cute toast mascot"
                    src="/toast.png"
                />
                <h1>Toast Playground</h1>
            </header>

            <ToastShelf
                toasts={toasts}
                onDismiss={dismissToast}
            />

            <form
                className={styles.controlsWrapper}
                onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <label
                        htmlFor="message"
                        className={styles.label}
                        style={{ alignSelf: 'baseline' }}>
                        Message
                    </label>
                    <div className={styles.inputWrapper}>
                        <textarea
                            id="message"
                            className={styles.messageInput}
                            value={message}
                            onChange={handleMessageChange}
                        />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.label}>Variant</div>
                    <div
                        className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
                        {VARIANT_OPTIONS.map(radioVariant => (
                            <label
                                htmlFor={`${VARIANT_RADIO_GROUP_NAME}-${radioVariant}`}
                                key={`${radioVariant}-key`}>
                                <input
                                    id={`${VARIANT_RADIO_GROUP_NAME}-${radioVariant}`}
                                    type="radio"
                                    name={VARIANT_RADIO_GROUP_NAME}
                                    value={radioVariant}
                                    checked={variant === radioVariant}
                                    onChange={handleVariantChange}
                                />
                                {radioVariant}
                            </label>
                        ))}
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.label} />
                    <div
                        className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
                        <Button type="submit">Pop Toast!</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ToastPlayground;
