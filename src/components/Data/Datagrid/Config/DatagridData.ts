import { DatagridColumnFilterValue } from "../Filters/DatagridColumnFilter";
import { PaginationData } from "../Pagination";
import { DatagridRowConfig } from "./DatagridRowConfig";
import { DatagridSortConfig } from "./DatagridSort";

export type ColumnFilters<TData> = Partial<
    Record<Extract<keyof TData, string>, DatagridColumnFilterValue>
>;

export interface DatagridGetDataArguments<TData> {
    searchTerm: string;
    sort: DatagridSortConfig | undefined;
    propertyConfigs?: DatagridRowConfig<TData>[];
    pagination: PaginationData;
    columnFilters: ColumnFilters<TData>;
}

export type FilterUpdateFunc<TData> = (
    args: DatagridGetDataArguments<TData>
) => void;

