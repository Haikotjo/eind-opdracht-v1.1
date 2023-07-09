import { useEffect } from 'react';

// De useIdleTimer hook voert een actie uit na een bepaalde periode van inactiviteit.
const useIdleTimer = (action, delay) => {
    let timerId = null;

    // De resetTimer functie reset de timer elke keer als er een activiteit is.
    const resetTimer = () => {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(action, delay);
    }

    useEffect(() => {
        // Voeg event listeners toe voor verschillende gebruikersactiviteiten.
        // Wanneer een van deze activiteiten plaatsvindt, wordt de timer gereset.
        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('mousedown', resetTimer);
        window.addEventListener('click', resetTimer);
        window.addEventListener('keypress', resetTimer);
        window.addEventListener('scroll', resetTimer);
        resetTimer();

        return () => {
            // Als de component wordt ontkoppeld, ruim dan de timer en event listeners op.
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
