export type DatagridColumnFilterType =
    | "text"
    | "number"
    | "date"
    | "select";

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

export type DatagridFilterOperator =
    | DatagridTextFilterOperator
    | DatagridNumberFilterOperator
    | DatagridDateFilterOperator;

export interface DatagridFilterOption {
    label: string;
    value: string;
}

export interface DatagridColumnFilterConfig<TData = any> {
    type: DatagridColumnFilterType;
    multiSelect?: boolean;
    options?: DatagridFilterOption[];
    optionsSource?: (data: TData[]) => any[];
    mapOption?: (value: any) => DatagridFilterOption;
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
