
import { useMemo } from 'react';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { normalizeDate } from '../../../../lib/helpers/helpers';
import { DatagridGetDataArguments } from '../Config/DatagridData';
import { DatagridColumnFilterValue, isActiveColumnFilter } from '../Filters/DatagridColumnFilter';
import { defaultSearch, defaultSort } from '../Helpers/datagridDataManipulation';


export interface UseDatagridQueryProps<TData> {
    queryFn: UseQueryOptions<TData[], unknown, TData[], any[]>;
    filters: DatagridGetDataArguments<TData> | null;
}

export type Status = "error" | "success" | "pending";

const sameDay = (dateA: Date, dateB: Date): boolean => {
    return (
        dateA.getFullYear() === dateB.getFullYear() &&
        dateA.getMonth() === dateB.getMonth() &&
        dateA.getDate() === dateB.getDate()
    );
};

const getDateTime = (value: unknown): number | null => {
    const date = normalizeDate(value);

    if (!date) {
        return null;
    }

    return date.setHours(0, 0, 0, 0);
};
const matchesTextFilter = (
    rawVal: unknown,
    filter: DatagridColumnFilterValue
): boolean => {
    const text = String(rawVal).toLowerCase();
    const value = String(filter.value ?? "").toLowerCase();

    switch (filter.operator) {
        case "contains":
            return text.includes(value);

        case "notContains":
            return !text.includes(value);

        case "equals":
            return text === value;

        case "notEquals":
            return text !== value;

        case "beginsWith":
            return text.startsWith(value);

        case "endsWith":
            return text.endsWith(value);

        default:
            return true;
    }
};

const matchesNumberFilter = (
    rawVal: unknown,
    filter: DatagridColumnFilterValue
): boolean => {
    const numberValue = Number(rawVal);
    const value = Number(filter.value);
    const valueTo = Number(filter.valueTo);

    if (Number.isNaN(numberValue)) {
        return false;
    }

    switch (filter.operator) {
        case "equals":
            return numberValue === value;

        case "notEquals":
            return numberValue !== value;

        case "greaterThan":
            return numberValue > value;

        case "greaterThanOrEqual":
            return numberValue >= value;

        case "lessThan":
            return numberValue < value;

        case "lessThanOrEqual":
            return numberValue <= value;

        case "between":
            return numberValue >= value && numberValue <= valueTo;

        default:
            return true;
    }
};

const matchesDateFilter = (
    rawVal: unknown,
    filter: DatagridColumnFilterValue
): boolean => {
    const itemDate = normalizeDate(rawVal);
    const filterDate = normalizeDate(filter.value);

    if (!itemDate || !filterDate) {
        return false;
    }

    const itemTime = getDateTime(itemDate);
    const filterTime = getDateTime(filterDate);
    const filterTimeTo = getDateTime(filter.valueTo);

    if (itemTime == null || filterTime == null) {
        return false;
    }

    switch (filter.operator) {
        case "equals":
            return sameDay(itemDate, filterDate);

        case "notEquals":
            return !sameDay(itemDate, filterDate);

        case "before":
            return itemTime < filterTime;

        case "after":
            return itemTime > filterTime;

        case "between":
            if (filterTimeTo == null) {
                return false;
            }

            return itemTime >= filterTime && itemTime <= filterTimeTo;

        default:
            return true;
    }
};

const matchesSelectFilter = (
    rawVal: unknown,
    filter: DatagridColumnFilterValue
): boolean => {
    const selectedValues = filter.values ?? [];

    if (selectedValues.length === 0) {
        return true;
    }

    return selectedValues.some(
        (value) =>
            String(rawVal).toLowerCase() === String(value).toLowerCase()
    );
};



const filterData = <TData>(
    data: TData[] | undefined,
    filters: DatagridGetDataArguments<TData> | null
): [TData[], number] => {

    if (!filters) {
        return [data || [], data?.length || 0];
    }

    const {
        searchTerm,
        sort,
        propertyConfigs,
        pagination,
        columnFilters,
    } = filters;

    let filtered = data || [];

    // Search
    if (searchTerm) {
        filtered = defaultSearch(filtered, searchTerm, propertyConfigs);
    }

    // Column filters
    if (columnFilters) {

        const entries = Object.entries(columnFilters) as [
            string,
            DatagridColumnFilterValue | undefined
        ][];

       for (const [key, filter] of entries) {
        
            if (!isActiveColumnFilter(filter)) {
                continue;
            }

            const colConfig = propertyConfigs?.find((p) => p.prop === key);
            const filterType = colConfig?.filter?.type ?? "text";

            filtered = filtered.filter((item) => {
                const rawVal = (item as any)[key];

                if (filter.operator === "blank") {
                    return rawVal == null || String(rawVal).trim() === "";
                }

                if (filter.operator === "notBlank") {
                    return rawVal != null && String(rawVal).trim() !== "";
                }

                if (rawVal == null) {
                    return false;
                }

                if (filterType === "select") {
                    return matchesSelectFilter(rawVal, filter);
                }

                if (filterType === "text") {
                    return matchesTextFilter(rawVal, filter);
                }

                if (filterType === "number") {
                    return matchesNumberFilter(rawVal, filter);
                }

                if (filterType === "date") {
                    return matchesDateFilter(rawVal, filter);
                }

                return true;
            });
        }
    }

    // Sorting
    if (sort) {
        filtered = defaultSort(filtered, sort, propertyConfigs);
    }

    // Pagination
    const total = filtered.length;
    const start = (pagination.page - 1) * pagination.perPage;
    const end = pagination.page * pagination.perPage;
    const paged = filtered.slice(start, Math.min(total, end));

    return [paged, total];
};

function useDatagridQueryClientFilter<TData>({
    queryFn,
    filters
}: UseDatagridQueryProps<TData>): [TData[], TData[], number, Status] {

    const { data: dataRaw, status } = useQuery(queryFn);
    const [data, total] = useMemo(() => filterData(dataRaw, filters), [dataRaw, filters]);

    return [dataRaw ?? [], data, total, status as Status];
}

export default useDatagridQueryClientFilter;
