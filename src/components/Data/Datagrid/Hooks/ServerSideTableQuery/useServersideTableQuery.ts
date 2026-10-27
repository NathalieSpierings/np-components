import type { DatagridGetDataArguments } from "../../Config/DatagridData";
import type { DatagridRowConfig } from "../../Config/DatagridRowConfig";
import type { DatagridColumnFilterConfig } from "../../Filters/DatagridColumnFilter";
import type { ServersideTableQueryConfig, ServersideTableQueryFilterColumn, ServersideTableQueryResult } from "./types";

import { useCallback, useEffect, useState } from "react";
import serverToClientColumnFilterTypeMap from "./serverToClientColumnFilterTypeMap";
import { getServersideTableQueryParams } from "./useServersideTableQueryParams";


// Convert the filter info from the server format to the client format
const serverToClientColumnFilterInfo = <TValue,>(server: ServersideTableQueryFilterColumn<TValue>): DatagridColumnFilterConfig => {
    return {
        ...serverToClientColumnFilterTypeMap[server.columnFilterType],
        options: server.allowedValues?.map(a => ({
            label: a.label ?? String(a.value),
            value: String(a.value)
        })),
    };
}


// Apply the allowed operations as provided by Promeetec.ServerSideTableQuery to given column settings
const ApplyConfigToTable = <TData,>(config: ServersideTableQueryConfig<TData>, data: DatagridRowConfig<TData>[]) => {
    return data.map(d => {
        let result = { ...d };

        if (config.sortProperties.includes(d.prop)) {
            result.sortable = true;
            result.sort = undefined;
        }

        if (d.prop in config.filterOperations && config.filterOperations[d.prop] != null) {
            result.filter = serverToClientColumnFilterInfo(config.filterOperations[d.prop]!)
        }
        return result;
    });
}


// Main entrypoint for usage of Promeetec.ServerSideQuery, fetch data from the server and populate settings for DataGrid based on retrieved info
const useServersideTableQuery = <TData, TError = unknown>(

    //  Method that fetches the /config-endpoint defined by serverside library
    fetchConfig: () => Promise<ServersideTableQueryConfig<TData>>,


    // Method that fetches the query-endpoint defined by serverside library.
    // (Fetches the data and total amount of items) 
    fetchData: (queryParameters: URLSearchParams) => Promise<ServersideTableQueryResult<TData>>,


    // Config object for Datagrid.
    // Should not have sort- and filter-data (A new object with sort- and filter-data is returned by this ook)
    dataRowConfig: DatagridRowConfig<TData>[]
) => {
    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<TData> | null>(null);
    const [config, setConfig] = useState<ServersideTableQueryConfig<TData> | null>(null);
    const [data, setData] = useState<ServersideTableQueryResult<TData>>({ totalCount: 0, items: [] });

    const [configLoading, setConfigLoading] = useState(true);
    const [dataLoading, setDataLoading] = useState(true);

    const [configError, setConfigError] = useState<TError | null>(null);
    const [dataError, setDataError] = useState<TError | null>(null);

    // Incremented by refetch, to fetch the data again with the same query parameters
    const [refetchCount, setRefetchCount] = useState(0);
    const refetch = useCallback(() => setRefetchCount(count => count + 1), []);

    // Fetch the table configuration once.
    useEffect(() => {
        let cancelled = false;

        setConfigLoading(true);
        setConfigError(null);

        fetchConfig()
            .then(result => {
                if (!cancelled) {
                    setConfig(result);
                }
            })
            .catch(error => {
                if (!cancelled) {
                    setConfigError(error as TError);
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setConfigLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, []);

    // Fetch data whenever the query parameters change (or refetch is called).
    useEffect(() => {
        // Wait for the table to report its options (DataGrid does so when mounted): without pagination,
        // the server would return the whole table
        if (tableOptions?.pagination == null) {
            return;
        }

        const queryParameters = getServersideTableQueryParams(tableOptions);
        let cancelled = false;

        setDataLoading(true);
        setDataError(null);

        fetchData(queryParameters)
            .then(result => {
                if (!cancelled) {
                    setData(result);
                }
            })
            .catch(error => {
                if (!cancelled) {
                    setDataError(error as TError);
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setDataLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [tableOptions, refetchCount]);

    const transformedDataRowConfig = config
        ? ApplyConfigToTable(config, dataRowConfig)
        : [];

    return {
        // onFilterUpdate-update to be passed to DataGrid
        onFilterUpdate: setTableOptions,

        // Fetch the data again with the current table options (e.g. after the data was changed)
        refetch,

        //  Table-data, actual data items to return
        data: config ? data.items : [],

        // Total count of data-items excluding filters
        total: config ? data.totalCount : 0,

        // Transformed dataRowConfig, includes allowed filters and storts retrieved from sever
        dataRowConfig: transformedDataRowConfig,

        // true if the data is still loading (implies data, totalCount, and dataRowConfig are empty)
        isLoading: configLoading || dataLoading,

        //Error, if any (otherwise null)
        error: configError ?? dataError ?? null,
    };
};

export { ApplyConfigToTable }
export default useServersideTableQuery;