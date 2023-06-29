import { useEffect } from 'react';
 const useIdleTimer = (action, delay) => {
    let timerId = null;

    const resetTimer = () => {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(action, delay);
    }

    useEffect(() => {
        // Voeg event listeners toe voor verschillende gebruikersactiviteiten
        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('mousedown', resetTimer);
        window.addEventListener('click', resetTimer);
        window.addEventListener('keypress', resetTimer);
        window.addEventListener('scroll', resetTimer);
        resetTimer();

        return () => {
            if (timerId) {
                clearTimeout(timerId);
            }
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('mousedown', resetTimer);
            window.removeEventListener('click', resetTimer);
            window.removeEventListener('keypress', resetTimer);
            window.removeEventListener('scroll', resetTimer);
        }
    }, []);
}

export default useIdleTimer;
