import React from 'react';

function useKeydownListener(key: string, callback: () => void) {
    const callbackRef = React.useRef(callback);
    React.useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === key) {
                callbackRef.current();
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [key]);
}

export { useKeydownListener };
