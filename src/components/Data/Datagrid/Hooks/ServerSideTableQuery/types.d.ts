import type { DatagridRowConfig, NestedKeyOf } from "../../Config/DatagridRowConfig";


 //Determines the allowed operations (from Promeetec.ServerSideTableQuery)
export type DatagridColumnFilterTypeServer = "text" | "number" | "date" | "singleSelect" | "multiSelect";


 //Result of an endpoint using Promeetec.ServerSideTableQuery
interface ServersideTableQueryResult<T> {
    items: T[];
    totalCount: number;
}


 //Information on an allowed value, as given by Promeetec.ServerSideTableQuery
interface ServersideTableQueryValue<T> {
    value: T,
    // (null/undefined: no label, the value is shown instead)
    label?: string | null,
}


 //Information on an allowed filter operation, as given by Promeetec.ServerSideTableQuery
interface ServersideTableQueryFilterColumn<TValue> {
    // Datatype of column, determines allowed operations
    columnFilterType: DatagridColumnFilterTypeServer
     
    // Valid values including a description. Used for enum-like filtervalues.
    // null/undefined = no restriction on the values (Not the same as an empty list: no values are allowed)
    allowedValues?: ServersideTableQueryValue<TValue>[] | null
}


 //Server-provided information on Promeetec.ServerSideTableQuery config-endpoint
interface ServersideTableQueryConfig<T> {
    // True if a global search is allowed (General search-bar above tabel)
    canSearch: boolean;

    // Properties allowed for sorting
    sortProperties: (NestedKeyOf<T>)[];

    // Columns allowed for filtering, maps to allowed values + operations
    filterOperations: {
        [K in NestedKeyOf<T>]?: ServersideTableQueryFilterColumn<NestedValue<T, K>>;
    };
}

export { 
    ServersideTableQueryResult, 
    ServersideTableQueryValue, 
    ServersideTableQueryFilterColumn,
    ServersideTableQueryConfig
}