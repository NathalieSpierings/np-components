import React, { useState } from "react";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import Datagrid from "../../../components/Data/Datagrid/Datagrid";
import { useTableQueryClientFilter } from "../../../components/Data/Datagrid/Hooks/useTableQueryClientFilter";
import Title from "../../../components/Typography/Title/Title";
import { filterProductColumns } from "../../../lib/testdata/mock";
import { ProductGetModel, getProductsQuery } from "../../../lib/testdata/models";

/**
 * General search: searches in all columns (including hidden ones).
 * Multiple words: every word must occur somewhere in the row, e.g. "tuin stoel".
 */
const DatagridSearchDemo: React.FC = () => {

    
    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    return (
        <Datagrid
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            properties={filterProductColumns() as any}
            enableFiltersInHeader
            toolbarTitle={<Title size="md">Producten</Title>}
            enableSearch
            searchPlaceholder="Zoeken in alle kolommen..."
        />
    );
};

export default DatagridSearchDemo;
