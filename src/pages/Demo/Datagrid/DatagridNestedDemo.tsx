import React, { useState } from "react";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import Datagrid from "../../../components/Data/Datagrid/Datagrid";
import { useTableQueryClientFilter } from "../../../components/Data/Datagrid/Hooks/useTableQueryClientFilter";
import { defaultProductColumns } from "../../../lib/testdata/mock";
import { ProductGetModel, getProductsQuery } from "../../../lib/testdata/models";
import { ProductOrders } from "./ProductOrdersTable";


const DatagridNestedDemo: React.FC = () => {

     const [selected, setSelected] = useState<ProductGetModel | undefined>();

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
            collapsibleRowData={ProductOrders}
        initialPageSize={10}
             enableColumnPinning
            enableColumnVisibility
            enableColumnMenu
            enableColumnMenuColumnVisibility

            enableCompactView
            enableColumnReorder
            enableColumnResize
            enableStickyHeader
            selectedRow={selected}
            rowSingleClickAction={(row) => {
                setSelected(row)
                console.log(`Clicked row: ${row.naam}`);
            }}
            rowDoubleClickAction={(row) => {
                setSelected(row)
                console.log(`Double clicked row ${row.naam}`);
            }}
           properties={defaultProductColumns() as any}
        />
    )
}

export default DatagridNestedDemo;