import React, { useState } from "react";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import Datagrid from "../../../components/Data/Datagrid/Datagrid";
import { useTableQueryClientFilter } from "../../../components/Data/Datagrid/Hooks/useTableQueryClientFilter";
import { defaultProductColumns } from "../../../lib/testdata/mock";
import { ProductGetModel, getProductsQuery } from "../../../lib/testdata/models";
import { ProductOrders } from "./ProductOrdersTable";


const DatagridSelectedRowDemo: React.FC = () => {

     const [selected, setSelected] = useState<ProductGetModel | undefined>();

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    return (
        <>
            <p>Bekijk de console om de klik acties te zien</p>
            <Datagrid
                data={data || []}
                dataRaw={dataRaw}
                total={total || 0}
                loading={status === "pending"}
                onFilterUpdate={setTableOptions}
                collapsibleRowData={ProductOrders}
                selectedRow={selected}
                rowSingleClickAction={(row) => {
                    setSelected(row)
                    alert(`Clicked row: ${row.naam}`);
                }}
                rowDoubleClickAction={(row) => {
                    setSelected(row)
                    alert(`Double clicked row ${row.naam}`);
                }}
                properties={defaultProductColumns() as any}
            />
        </>
    )
}

export default DatagridSelectedRowDemo;