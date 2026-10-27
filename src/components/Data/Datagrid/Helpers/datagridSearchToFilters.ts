import { ColumnFilters } from "../Config/DatagridData";
import { DatagridRowConfig, NestedKeyOf } from "../Config/DatagridRowConfig";
import { DatagridColumnFilterValue } from "../Filters/DatagridColumnFilter";
import { getNestedValue } from "./datagridTypeHelpers";
import { getSearchableColumns, getSearchableTexts } from "./datagridDataManipulation";

export type SearchToFiltersStrategy =
    // Filter on the column with the most hits (default) 
    | "bestColumn"
    // Filter on the first column (in order of `columns`/properties) that has hits 
    | "firstMatch";

export interface SearchToFiltersOptions<TData> {
    // Columns to search in, in order of preference. Default: all searchable columns. 
    columns?: NestedKeyOf<TData>[];
    strategy?: SearchToFiltersStrategy;
}

export interface SearchToFiltersColumnHits<TData> {
    column: NestedKeyOf<TData>;
    rows: TData[];
}

export interface SearchToFiltersResult<TData> {
    // Column filters to pass to the Datagrid. Empty when nothing was found. 
    filters: ColumnFilters<TData>;
    // Unique rows that match in any of the searched columns 
    matchedRows: TData[];
    // Hits per searched column 
    hitsPerColumn: SearchToFiltersColumnHits<TData>[];
    // The column the filter was set on 
    column?: NestedKeyOf<TData>;
}


 // Builds a column filter for `column` that matches `term`, based on the column's filter type.
 // - text (default): contains
 // - number: equals (when the term is numeric)
 // - select: the option value(s) found in the matching rows
 // - date: not supported (returns undefined), use the general search instead
 
const createFilterForColumn = <TData>(
    column: DatagridRowConfig<TData>,
    term: string,
    rows: TData[]
): DatagridColumnFilterValue | undefined => {

    switch (column.filter?.type ?? "text") {
        case "number":
            return Number.isNaN(Number(term)) ? undefined : { operator: "equals", value: term };

        case "select": {
            const values = Array.from(new Set(
                rows
                    .map(row => getNestedValue(row, column.prop))
                    .filter(value => value != null)
                    .map(String)
            ));
            return values.length ? { values } : undefined;
        }

        case "date":
            return undefined;

        case "text":
        default:
            return { operator: "contains", value: term };
    }
};


 // Translates a search term into Datagrid column filters.
 //
 // Column filters are combined with AND, so a filter is only set on ONE column
 // (chosen by `strategy`). Use `matchedRows` to e.g. select the row directly
 // when there is exactly one hit.
 //
 // @example
 // const result = getColumnFiltersFromSearch(dataRaw, "bike", columns, { columns: ["naam", "sku"] });
 // setFilters(result.filters);
 
export function getColumnFiltersFromSearch<TData>(
    data: TData[] | undefined,
    searchTerm: string,
    properties: DatagridRowConfig<TData>[],
    options: SearchToFiltersOptions<TData> = {}
): SearchToFiltersResult<TData> {

    const term = searchTerm.trim();
    const lower = term.toLowerCase();
    const rows = data ?? [];

    const empty: SearchToFiltersResult<TData> = { filters: {}, matchedRows: [], hitsPerColumn: [] };

    if (!term) {
        return empty;
    }

    const searchable = getSearchableColumns(properties);
    const columns = options.columns
        ? options.columns
            .map(prop => searchable.find(column => column.prop === prop))
            .filter((column): column is DatagridRowConfig<TData> => !!column)
        : searchable;

    const hitsPerColumn: SearchToFiltersColumnHits<TData>[] = columns.map(column => ({
        column: column.prop,
        rows: rows.filter(row =>
            getSearchableTexts(row, column).some(text => text.toLowerCase().includes(lower))
        )
    }));

    const matchedRows = Array.from(new Set(hitsPerColumn.flatMap(hit => hit.rows)));

    if (matchedRows.length === 0) {
        return { ...empty, hitsPerColumn };
    }

    // Candidates in order of preference
    const candidates = hitsPerColumn
        .map((hit, index) => ({ hit, index }))
        .filter(({ hit }) => hit.rows.length > 0);

    if (options.strategy !== "firstMatch") {
        candidates.sort((a, b) => b.hit.rows.length - a.hit.rows.length || a.index - b.index);
    }

    for (const { hit, index } of candidates) {
        const filter = createFilterForColumn(columns[index], term, hit.rows);

        if (filter) {
            const filters: ColumnFilters<TData> = {};
            filters[hit.column] = filter;
            return { filters, matchedRows, hitsPerColumn, column: hit.column };
        }
    }

    return { ...empty, matchedRows, hitsPerColumn };
}
