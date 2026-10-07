import type { DatagridRowConfig, NestedKeyOf } from "../../Config/DatagridRowConfig";


 //Determines the allowed operations (from Promeetec.ServerSideTableQuery)
export type DatagridColumnFilterTypeServer = "text" | "number" | "date" | "singleSelect" | "multiSelect";


 //Result of an endpoint using Promeetec.ServerSideTableQuery
interface ServersideTableQueryResult<T> {
    Items: T[];
    TotalCount: number;
}


 //Information on an allowed value, as given by Promeetec.ServerSideTableQuery
interface ServersideTableQueryValue<T> {
    value: T,
    label?: string,
}


 //Information on an allowed filter operation, as given by Promeetec.ServerSideTableQuery
interface ServersideTableQueryFilterColumn<TValue> {
    // Datatype of column, determines allowed operations
    columnFilterType: DatagridColumnFilterTypeServer
     
     //Valid values including a description. Used for enum-like filtervalues (Optional, empty = undefined)    
    allowedValues: ServersideTableQueryValue<TValue>[]
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