import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { ColumnFilters } from "../Config/DatagridData";
import { DatagridColumnFilterValue } from "../Filters/DatagridColumnFilter";

export type DatagridFilterState = Record<string, DatagridColumnFilterValue | undefined>;

/**
 * Column filter state of the Datagrid.
 * - Controlled when onColumnFiltersChange is given (the parent owns the state)
 * - Uncontrolled otherwise (the grid takes over externalColumnFilters when its reference changes)
 */
export function useDatagridColumnFilters<TData>(
    externalColumnFilters: ColumnFilters<TData> | undefined,
    onColumnFiltersChange: ((filters: ColumnFilters<TData>) => void) | undefined,
    onChange: () => void
) {
    const isControlled = onColumnFiltersChange !== undefined;
    const [internalFilters, setInternalFilters] = useState<DatagridFilterState>(
        () => (externalColumnFilters ?? {}) as DatagridFilterState
    );

    const columnFilters: DatagridFilterState = isControlled
        ? (externalColumnFilters ?? {}) as DatagridFilterState
        : internalFilters;

    const columnFiltersRef = useRef(columnFilters);
    columnFiltersRef.current = columnFilters;

    const onColumnFiltersChangeRef = useRef(onColumnFiltersChange);
    onColumnFiltersChangeRef.current = onColumnFiltersChange;

    // Same signature as a React state setter, so DatagridHead / DatagridFilterList keep working unchanged
    const setColumnFilters = useCallback<Dispatch<SetStateAction<DatagridFilterState>>>((action) => {
        const next = typeof action === "function" ? action(columnFiltersRef.current) : action;
        columnFiltersRef.current = next;

        if (onColumnFiltersChangeRef.current) {
            onColumnFiltersChangeRef.current(next as ColumnFilters<TData>);
        } else {
            setInternalFilters(next);
        }

        onChange();
    }, [onChange]);

    // Uncontrolled: take over externally set filters (undefined clears them)
    const isFirstSync = useRef(true);
    useEffect(() => {
        if (isFirstSync.current) {
            isFirstSync.current = false;
            return;
        }

        if (!isControlled) {
            setInternalFilters((externalColumnFilters ?? {}) as DatagridFilterState);
        }

        onChange();
    }, [externalColumnFilters, isControlled, onChange]);

    return { columnFilters, setColumnFilters };
}
