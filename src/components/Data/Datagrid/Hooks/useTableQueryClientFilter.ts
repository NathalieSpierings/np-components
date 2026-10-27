
import { useMemo } from 'react';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { normalizeDate } from '../../../../lib/helpers/helpers';
import { DatagridGetDataArguments } from '../Config/DatagridData';
import { DatagridColumnFilterConfig, DatagridColumnFilterValue, DatagridFilterOption, isActiveColumnFilter } from '../Filters/DatagridColumnFilter';
import { defaultSearch, defaultSort } from '../Helpers/datagridDataManipulation';
import { NestedKeyOf } from '../Config/DatagridRowConfig';
import { getNestedValue } from '../Helpers/datagridTypeHelpers';

export type Status = "error" | "success" | "pending";

export type PreparedFilter<TData> = {
    key: NestedKeyOf<TData>;
    type: "text" | "number" | "date" | "select";
    operator: DatagridColumnFilterValue["operator"];
    value?: string | number | null;
    valueTo?: number | null;
    values?: string[];
    mapOption?: (value: any) => DatagridFilterOption;
};

const getDateTime = (value: unknown): number | null => {
    const date = normalizeDate(value);

    if (!date) {
        return null;
    }

    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    ).getTime();
};


const matchesTextFilter = (
    rawVal: unknown,
    filter: PreparedFilter<any>
): boolean => {
    const text = String(rawVal).toLowerCase();
    const value = String(filter.value ?? "");

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
    filter: PreparedFilter<any>
): boolean => {
    const numberValue = Number(rawVal);
    const value = filter.value as number;
    const valueTo = filter.valueTo;

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
            return valueTo != null &&
                numberValue >= value &&
                numberValue <= valueTo;

        default:
            return true;
    }
};

const matchesDateFilter = (
    rawVal: unknown,
    filter: PreparedFilter<any>
): boolean => {
    const itemTime = getDateTime(rawVal);

    if (itemTime == null) {
        return false;
    }

    const filterTime = filter.value as number;
    const filterTimeTo = filter.valueTo;

    switch (filter.operator) {
        case "equals":
            return itemTime === filterTime;

        case "notEquals":
            return itemTime !== filterTime;

        case "before":
            return itemTime < filterTime;

        case "after":
            return itemTime > filterTime;

        case "between":
            return filterTimeTo != null &&
                itemTime >= filterTime &&
                itemTime <= filterTimeTo;

        default:
            return true;
    }
};

// Bij objecten (bijv. een UserModel in een array) bepaalt mapOption de waarde,
// zodat het filter dezelfde waarde vergelijkt als de optie in de dropdown.
const toSelectValue = (item: unknown, filter: PreparedFilter<any>): string => {
    if (filter.mapOption && item != null && typeof item === "object") {
        return String(filter.mapOption(item).value).toLowerCase();
    }

    return String(item).toLowerCase();
};

const matchesSelectFilter = (
    rawVal: unknown,
    filter: PreparedFilter<any>
): boolean => {
    const selectedValues = filter.values ?? [];

    if (selectedValues.length === 0) {
        return true;
    }

    if (Array.isArray(rawVal)) {
        return rawVal.some(item =>
            selectedValues.includes(toSelectValue(item, filter))
        );
    }

    return selectedValues.includes(toSelectValue(rawVal, filter));
};

const prepareFilter = <TData>(
    key: NestedKeyOf<TData>,
    filter: DatagridColumnFilterValue,
    type: "text" | "number" | "date" | "select",
    filterConfig?: DatagridColumnFilterConfig<TData, any>
): PreparedFilter<TData> => {
    // A list of values means "one of" these values, for every type of column (as Promeetec.ServerSideTableQuery's oneOf)
    if (filter.values?.length && filter.operator === undefined) {
        return {
            key,
            type: "select",
            operator: undefined,
            values: filter.values.map(value => String(value).toLowerCase()),
            mapOption: filterConfig?.mapOption
        };
    }

    switch (type) {
        case "text":
            return {
                key,
                type,
                operator: filter.operator,
                value: String(filter.value ?? "").toLowerCase()
            };

        case "number":
            return {
                key,
                type,
                operator: filter.operator,
                value: Number(filter.value),
                valueTo:
                    filter.operator === "between"
                        ? Number(filter.valueTo)
                        : null
            };

        case "date":
            return {
                key,
                type,
                operator: filter.operator,
                value: getDateTime(filter.value),
                valueTo:
                    filter.operator === "between"
                        ? getDateTime(filter.valueTo)
                        : null
            };

        case "select":
            return {
                key,
                type,
                operator: filter.operator,
                values: (filter.values ?? []).map(value =>
                    String(value).toLowerCase()
                ),
                mapOption: filterConfig?.mapOption
            };
    }
};

const prepareFilters = <TData>(
    filters: DatagridGetDataArguments<TData>
): PreparedFilter<TData>[] => {
    const { columnFilters, propertyConfigs } = filters;

    if (!columnFilters) {
        return [];
    }

    const propertyConfigMap = new Map(
        propertyConfigs?.map(property => [
            property.prop,
            property
        ])
    );

    const entries = Object.entries(columnFilters) as [
        NestedKeyOf<TData>,
        DatagridColumnFilterValue | undefined
    ][];

    const preparedFilters: PreparedFilter<TData>[] = [];

    for (const [key, filter] of entries) {
        if (!isActiveColumnFilter(filter)) {
            continue;
        }

        const columnConfig = propertyConfigMap.get(key);
        const type = columnConfig?.filter?.type ?? "text";

        preparedFilters.push(
            prepareFilter(key, filter, type, columnConfig?.filter)
        );
    }

    return preparedFilters;
};

const matchesPreparedFilter = <TData>(
    item: TData,
    filter: PreparedFilter<TData>
): boolean => {
    const rawVal = getNestedValue(item, filter.key);

    if (filter.operator === "blank") {
        return rawVal == null ||
            String(rawVal).trim() === "";
    }

    if (filter.operator === "notBlank") {
        return rawVal != null &&
            String(rawVal).trim() !== "";
    }

    if (rawVal == null) {
        return false;
    }

    switch (filter.type) {
        case "select":
            return matchesSelectFilter(rawVal, filter);

        case "text":
            return matchesTextFilter(rawVal, filter);

        case "number":
            return matchesNumberFilter(rawVal, filter);

        case "date":
            return matchesDateFilter(rawVal, filter);

        default:
            return true;
    }
};

const filterData = <TData>(
    data: TData[] | undefined,
    filters: DatagridGetDataArguments<TData> | null
): [TData[], number] => {

    if (!filters) {
        return [[], data?.length ?? 0];
    }


    const { searchTerm, sort, propertyConfigs, pagination } = filters;
    let filtered = data ?? [];

    // Search
    if (searchTerm) {
        filtered = defaultSearch(filtered, searchTerm, propertyConfigs);
    }

    // Column filters
    const preparedFilters = prepareFilters(filters);

    if (preparedFilters.length > 0) {
        filtered = filtered.filter(item =>
            preparedFilters.every(filter => matchesPreparedFilter(item, filter))
        );
    }

    // Sorting
    if (sort) {
        filtered = defaultSort(filtered, sort, propertyConfigs);
    }

    // Pagination
    const total = filtered.length;
    const start = (pagination.page - 1) * pagination.perPage;
    const end = start + pagination.perPage;
    const paged = filtered.slice(start, Math.min(total, end));

    return [paged, total];
};

export interface UseTableQueryProps<TData> {
    queryFn: UseQueryOptions<TData[], unknown, TData[], any[]>;
    filters: DatagridGetDataArguments<TData> | null;
    enabled?: boolean;
}

function useTableQueryClientFilter<TData>({
    queryFn,
    filters,
    enabled = true
}: UseTableQueryProps<TData>): [TData[], TData[], number, Status] {

    const { data: dataRaw, status } = useQuery({
        ...queryFn,
        enabled
    });

    const [data, total] = useMemo(() =>
        filterData(dataRaw, filters),
        [dataRaw, filters]);

    return [dataRaw ?? [], data, total, status];
}


export { useTableQueryClientFilter, filterData as filterDataTable };