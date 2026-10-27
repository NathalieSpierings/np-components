import { useCallback, useEffect, useRef, useState } from "react";
import { useDebouncedValue } from "./useDebouncedValue";


 // General search term of the Datagrid (controlled when externalSearchTerm is given).
 // Returns the current term, the debounced (trimmed) term for onFilterUpdate and a change handler.
 export function useDatagridSearchTerm(
    externalSearchTerm: string | undefined,
    onSearchTermChange: ((term: string) => void) | undefined,
    debounce: number,
    onChange: () => void
) {
    const isControlled = externalSearchTerm !== undefined;
    const [internalSearchTerm, setInternalSearchTerm] = useState("");
    const searchTerm = isControlled ? externalSearchTerm : internalSearchTerm;
    const debouncedSearchTerm = useDebouncedValue(searchTerm.trim(), debounce);

    const handleSearchChange = useCallback((term: string) => {
        if (!isControlled) {
            setInternalSearchTerm(term);
        }

        onSearchTermChange?.(term);
    }, [isControlled, onSearchTermChange]);

    const isFirstSync = useRef(true);
    useEffect(() => {
        if (isFirstSync.current) {
            isFirstSync.current = false;
            return;
        }

        onChange();
    }, [debouncedSearchTerm, onChange]);

    return { searchTerm, debouncedSearchTerm, handleSearchChange };
}
