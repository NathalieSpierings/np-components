import React, { useState } from "react";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import Datagrid from "../../../components/Data/Datagrid/Datagrid";
import { useTableQueryClientFilter } from "../../../components/Data/Datagrid/Hooks/useTableQueryClientFilter";
import { filterProductColumns } from "../../../lib/testdata/mock";
import { ProductGetModel, getProductsQuery } from "../../../lib/testdata/models";

// Demo: filteren op een kolom met een array-waarde (tags).
// De filteropties worden via optionsSource uit de data zelf opgehaald.
  const ARRAY_DEMO_COLUMNS = new Set(["id", "sku", "naam", "categorie", "merk", "status", "tags"]);

const ColumnFilterArrayDemo: React.FC = () => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    const columns = filterProductColumns().filter(column => ARRAY_DEMO_COLUMNS.has(column.prop));

    return (
        <Datagrid
            localStorageKey="dg-column-filter-array"
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            enableFiltersInHeader
            properties={columns as any}
        />
    )
}

export default ColumnFilterArrayDemo;
