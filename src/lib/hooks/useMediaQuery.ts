import { useEffect, useState } from "react";

/** Whether the media query matches right now. `false` where `matchMedia` is not available (e.g. in tests). */
export const matchesMediaQuery = (query: string) => globalThis.matchMedia?.(query).matches ?? false;

/** Whether the media query matches, e.g. `useMediaQuery("(max-width: 768px)")`. Updates when that changes. */
export function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(() => matchesMediaQuery(query));

    useEffect(() => {
        const mediaQuery = globalThis.matchMedia?.(query);

        if (!mediaQuery) {
            return;
        }

        setMatches(mediaQuery.matches);

        const handleChange = (event: MediaQueryListEvent) => setMatches(event.matches);

        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [query]);

    return matches;
}
