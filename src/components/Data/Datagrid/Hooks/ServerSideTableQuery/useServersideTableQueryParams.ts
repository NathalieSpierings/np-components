import { useState } from "react";
import type { DatagridGetDataArguments } from "../../Config/DatagridData";
import type { DatagridColumnFilterValue, DatagridFilterOperator } from "../../Filters/DatagridColumnFilter";

const filterValueProps : (keyof DatagridColumnFilterValue)[] = (["value", "valueTo", "values", "operator"]);
const IsFilterValue = (object : unknown): object is Required<Pick<DatagridColumnFilterValue, "operator">> &
             DatagridColumnFilterValue => {
    return typeof(object) === "object" && object != null && filterValueProps.some(prop => Object.hasOwn(object, prop))
};

const isDefined = <T>(value: T | null | undefined): value is T =>
  value != null;


// Parameters that should be added to GET-request to apply filters on the server (Promeetec.ServerSideTableQuery)

const getServersideTableQueryParams = <TData>(filters : DatagridGetDataArguments<TData> | null) : URLSearchParams => {
    const params = new URLSearchParams();

    if (filters == null) {
        return params;
    }

    if (filters.searchTerm != null && filters.searchTerm.length > 0) {
        params.set("searchterm", String(filters.searchTerm))
    }

    if (filters.sort != null) {
        params.set("sort.property", String(filters.sort.prop))
        params.set("sort.order", String(filters.sort.order))
    }

    if (filters.pagination != null) {
        params.set("pagination.page", String(filters.pagination.page))
        params.set("pagination.perpage", String(filters.pagination.perPage))
    }

    for (const [prop, filterValue] of Object.entries(filters.columnFilters)) {
        if (IsFilterValue(filterValue)) {
            params.set(`columnfilter.${prop}.operator`, filterValue.operator ?? "oneOf");
            const values = [filterValue.value, filterValue.valueTo, ...filterValue.values??[]].filter(isDefined);
            for (const value of values) {
                params.append(`columnfilter.${prop}.values`, value);
            }
        }
    }

    return params;
};

// Inverse function of getServersideTableQueryParams, primarily exists for testing but might be usefull for something
const getDatagridGetDataArguments = <TData>(
    params: URLSearchParams
): DatagridGetDataArguments<TData> => {
    const columnFilters: Record<string, DatagridColumnFilterValue> = {};

    for (const [key, operator] of params.entries()) {
        const match = new RegExp(/^columnfilter\.(.+)\.operator$/).exec(key);

        if (match == null) {
            continue;
        }

        const prop = match[1];
        const values = params.getAll(`columnfilter.${prop}.values`);
        const filterOperator = operator as DatagridFilterOperator | "oneOf";

        switch (filterOperator) {
            case "blank":
            case "notBlank":
                columnFilters[prop] = { operator: filterOperator };
                break;

            case "between":
                columnFilters[prop] = {
                    operator: filterOperator,
                    value: String(values[0]),
                    valueTo: String(values[1]),
                };
                break;
            
            case "oneOf": 
                columnFilters[prop] = {
                    values: values,
                };
                break;

            default:
                columnFilters[prop] = {
                    operator: filterOperator,
                    value: String(values[0]),
                };
                break;
        }
    }

    const sortProperty = params.get("sort.property");
    const sortOrder = params.get("sort.order");

    const page = params.get("pagination.page");
    const perPage = params.get("pagination.perpage");

    return {
        searchTerm: params.get("searchterm") ?? "",
        sort:
            sortProperty != null && sortOrder != null
                ? {
                      prop: sortProperty as keyof TData,
                      order: sortOrder as NonNullable<
                          DatagridGetDataArguments<TData>["sort"]
                      >["order"],
                  }
                : { 
                    prop: "id",
                    order: "asc",
                } as any,
        pagination:
            page != null && perPage != null
                ? {
                      page: Number(page),
                      perPage: Number(perPage),
                  }
                : { page: 1, perPage: 25 },

        columnFilters:
            columnFilters,
    };
};


// Build a query-request to apply table filters with Promeetec.ServerSideTableQuery
// This hook can be used to bypass the useServersideTableQuery-hook if you want to controll your own config.
const useServersideTableQueryParams = <TData>() => {
    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<TData> | null>(null);
    const queryParameters = getServersideTableQueryParams(tableOptions);
    

    return {
        // onFilterUpdate to be passed to DataGrid 
        onFilterUpdate: setTableOptions, 

        // Query parameters, can be passed to an html client for using Promeetec.ServerSideTableQuery 
        queryParameters
    }
}

export { getServersideTableQueryParams, getDatagridGetDataArguments }
export default useServersideTableQueryParams;