import { useState, useEffect } from 'react';

// The useDebounce hook delays changes in value by the specified delay.
export default function useDebounce(value, delay) {
    // This state is updated after the delay has passed.
    const [debouncedValue, setDebouncedValue] = useState(value);

    // useEffect is used to set up a timer for the delay.
    useEffect(
        () => {
            // Set up the timer.
            const handler = setTimeout(() => {
                // Update the state after the delay.
                setDebouncedValue(value);
            }, delay);

            // Clean up the timer if the value or the delay changes.
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay] // Re-run this effect if the value or the delay changes.
    );

    return debouncedValue;
}
