import React from "react";
import { DatagridRowConfig } from "../Config/DatagridRowConfig";
import DatagridFilterDropdown from "./DatagridFilterDropdown";
import { DatagridColumnFilterValue } from "./DatagridColumnFilter";

export interface DatagridFiltersProps<TData> {
    dataRaw?: TData[];
    properties?: DatagridRowConfig<TData>[];
    columnFilters: Record<string, DatagridColumnFilterValue | undefined>;
    setColumnFilters: React.Dispatch<
        React.SetStateAction<
            Record<string, DatagridColumnFilterValue | undefined>
        >
    >;
    enableDropdownToggleLabel?: boolean;
}

function DatagridFilters<TData>({
    dataRaw,
    properties,
    columnFilters,
    setColumnFilters,
    enableDropdownToggleLabel
}: Readonly<DatagridFiltersProps<TData>>) {
    if (!properties) {
        return null;
    }

    const filterColumns = properties.filter((p) => p.filter);

    return (
        <>
            {filterColumns.map((column) => (
                <DatagridFilterDropdown
                    enableDropdownToggleLabel={enableDropdownToggleLabel}
                    key={column.prop}
                    column={column}
                    dataRaw={dataRaw}
                    value={columnFilters[column.prop]}
                    onChange={(value) =>
                        setColumnFilters((current) => {
                            const next = { ...current };

                            if (!value) {
                                delete next[column.prop];
                            } else {
                                next[column.prop] = value;
                            }

                            return next;
                        })
                    }
                />
            ))}
        </>
    );
}

export default DatagridFilters;