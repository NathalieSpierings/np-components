import { useEffect, useState } from "react";

// Returns `value` after it has not changed for `delay` ms.
// A delay of 0 (or less) returns the value immediately.
 export function useDebouncedValue<T>(value: T, delay = 300): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        if (delay <= 0) {
            setDebounced(value);
            return;
        }

        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return delay <= 0 ? value : debounced;
}
