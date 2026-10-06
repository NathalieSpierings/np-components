import React, { useState } from "react";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import Datagrid from "../../../components/Data/Datagrid/Datagrid";
import { useTableQueryClientFilter } from "../../../components/Data/Datagrid/Hooks/useTableQueryClientFilter";
import { defaultProductColumns } from "../../../lib/testdata/mock";
import { ProductMetOrdersModel, getProductsWithOrdersQuery } from "../../../lib/testdata/models";
import { ProductOrdersNested } from "./DatagridNestedDetailsDemo";


const DatagridNestedDemo: React.FC = () => {

    const [selected, setSelected] = useState<ProductMetOrdersModel | undefined>();

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductMetOrdersModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsWithOrdersQuery(),
        filters: tableOptions
    });

    return (

        <Datagrid
            getRowKey={(row) => `${row.sku}-${row.id}`}
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            collapsibleRowData={ProductOrdersNested}
            hasCollapsibleRow={(product) =>
                product.orders.length > 0
            }
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