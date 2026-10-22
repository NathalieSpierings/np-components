import type { ReactElement } from "react";
import type { NestedKeyOf } from "../Config/DatagridRowConfig";
import { getNestedValue } from "../Helpers/datagridTypeHelpers";

export type DatagridColumnFilterType = "text" | "number" | "date" | "select";

export type DatagridTextFilterOperator =
    | "contains"
    | "notContains"
    | "equals"
    | "notEquals"
    | "beginsWith"
    | "endsWith"
    | "blank"
    | "notBlank";

export type DatagridNumberFilterOperator =
    | "equals"
    | "notEquals"
    | "greaterThan"
    | "greaterThanOrEqual"
    | "lessThan"
    | "lessThanOrEqual"
    | "between"
    | "blank"
    | "notBlank";

export type DatagridDateFilterOperator =
    | "equals"
    | "notEquals"
    | "before"
    | "after"
    | "between"
    | "blank"
    | "notBlank";

export type DatagridFilterOperator = | DatagridTextFilterOperator | DatagridNumberFilterOperator | DatagridDateFilterOperator;

export interface DatagridFilterOption {
    label: string;
    value: string;
}


export interface DatagridColumnFilterConfig<TData = any, TOption = unknown> {
    type: DatagridColumnFilterType;
    multiSelect?: boolean;
    options?: DatagridFilterOption[];
    /**
     * Bron voor de keuzes van een select-filter.
     * - Veldnaam (bijv. "followers"): de keuzes worden uit de rijen gehaald; arrays worden platgemaakt.
     * - Array (bijv. users van een endpoint): deze lijst wordt gebruikt als keuzes.
     */
    dataSource?: NestedKeyOf<TData> | TOption[];
    /**
     * Zet een item om naar { label, value }. Nodig bij objecten.
     * Wordt ook gebruikt om de waarden in de rij te vergelijken met de gekozen filterwaarden.
     */
    mapOption?: (value: TOption) => DatagridFilterOption;

    /**
     * Custom component voor het kiezen van een filterwaarde.
     * Vervangt de standaard invoer. Gebruik useDatagridFilter() in dit component
     * om de huidige waarde te lezen en te wijzigen.
     */
    customPicker?: ReactElement;
}

export interface DatagridColumnFilterValue {
    operator?: DatagridFilterOperator;
    value?: string;
    valueTo?: string;
    values?: string[];
}

export function isActiveColumnFilter(
    filter: DatagridColumnFilterValue | undefined
): filter is DatagridColumnFilterValue {
    if (!filter) return false;

    if (filter.values?.length) return true;

    if (filter.operator === "blank" || filter.operator === "notBlank") {
        return true;
    }

    if (filter.operator === "between") {
        return !!filter.value && !!filter.valueTo;
    }

    return !!filter.value;
}


// Geeft een nieuwe filter-record terug waarin de waarde van één kolom is gezet (undefined verwijdert hem).
export function setColumnFilterValue(
    current: Record<string, DatagridColumnFilterValue | undefined>,
    prop: string,
    value: DatagridColumnFilterValue | undefined
): Record<string, DatagridColumnFilterValue | undefined> {
    if (!value) {
        const { [prop]: _, ...rest } = current;
        return rest;
    }

    return { ...current, [prop]: value };
}

// True when at least one of the column filters is active.
export function hasActiveColumnFilters(
    filters?: Partial<Record<string, DatagridColumnFilterValue | undefined>>
): boolean {
    return Object.values(filters ?? {}).some(isActiveColumnFilter);
}

export function getUniqueFilterOptions(
    options: DatagridFilterOption[]
): DatagridFilterOption[] {
    return Array.from(
        new Map(
            options.map((option) => [
                option.value,
                option
            ])
        ).values()
    );
}


// Bouwt de keuzes voor een select-filter op uit options of dataSource.
// Dubbele waarden worden verwijderd en de keuzes worden gesorteerd op label.
export function getFilterOptions<TData>(
    filter: DatagridColumnFilterConfig<TData, any>,
    dataRaw?: TData[]
): DatagridFilterOption[] {
    if (filter.options) {
        return getUniqueFilterOptions(filter.options);
    }

    const { dataSource } = filter;
    let items: unknown[] = [];

    if (Array.isArray(dataSource)) {
        items = dataSource;
    } else if (dataSource && dataRaw) {
        items = dataRaw.flatMap(row => {
            const value: unknown = getNestedValue(row, dataSource);

            if (Array.isArray(value)) {
                return value;
            }

            return value == null ? [] : [value];
        });
    }

    const options = items.map(item =>
        filter.mapOption
            ? filter.mapOption(item)
            : { label: String(item), value: String(item) }
    );

    return getUniqueFilterOptions(options)
        .sort((a, b) => a.label.localeCompare(b.label));
}
