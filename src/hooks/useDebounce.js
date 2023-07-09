import { useState, useEffect } from 'react';

// De useDebounce hook vertraagt veranderingen in waarde met de opgegeven vertraging.
export default function useDebounce(value, delay) {
    // Deze state wordt bijgewerkt nadat de vertraging is verstreken.
    const [debouncedValue, setDebouncedValue] = useState(value);

    // useEffect wordt gebruikt om een timer in te stellen voor de vertraging.
    useEffect(
        () => {
            // Zet de timer op.
            const handler = setTimeout(() => {
                // Werk de state bij na de vertraging.
                setDebouncedValue(value);
            }, delay);

            // Ruim de timer op als de waarde of de vertraging verandert.
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay] // Herhaal dit effect als de waarde of de vertraging verandert.
    );

    return debouncedValue;
}
