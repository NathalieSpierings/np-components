import React, { useState } from "react";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import Datagrid from "../../../components/Data/Datagrid/Datagrid";
import { useTableQueryClientFilter } from "../../../components/Data/Datagrid/Hooks/useTableQueryClientFilter";
import { filterProductColumns } from "../../../lib/testdata/mock";
import { ProductGetModel, getProductsQuery } from "../../../lib/testdata/models";


const ColumnVisibilityDemo: React.FC = () => {

   const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    return (

        <>
            <p>Kies een kolom om aan of uit te zetten in het menu</p>

            <Datagrid
                localStorageKey="dg-column-visibiltiy"
                data={data || []}
                dataRaw={dataRaw}
                total={total || 0}
                loading={status === "pending"}
                onFilterUpdate={setTableOptions}
                enableColumnVisibility
                enableColumnMenu
                enableColumnMenuColumnVisibility
                 properties={filterProductColumns() as any}
            />
        </>
    )
}

export default ColumnVisibilityDemo;