import { useEffect } from 'react';

// The useIdleTimer hook performs an action after a certain period of inactivity.
const useIdleTimer = (action, delay) => {
    let timerId = null;

    // The resetTimer function resets the timer every time there is activity.
    const resetTimer = () => {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(action, delay);
    }

    useEffect(() => {
        // Add event listeners for various user activities.
        // When any of these activities occur, the timer is reset.
        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('mousedown', resetTimer);
        window.addEventListener('click', resetTimer);
        window.addEventListener('keypress', resetTimer);
        window.addEventListener('scroll', resetTimer);
        resetTimer();

        return () => {
            // If the component is unmounted, clean up the timer and event listeners.
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
