import React, { useState } from "react";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import Datagrid from "../../../components/Data/Datagrid/Datagrid";
import { useTableQueryClientFilter } from "../../../components/Data/Datagrid/Hooks/useTableQueryClientFilter";
import { defaultProductColumns } from "../../../lib/testdata/mock";
import { ProductGetModel, getProductsQuery } from "../../../lib/testdata/models";


const ColumnResizeDemo: React.FC = () => {

   const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });
    
    return (

        <>
            <p>Hover over een kolom om met de griphandle de kolom breedte te wijzigen </p>
            <p>Het menu bevat een autosize kolommen optie. Deze brengt de kolom weer terug naar zijn oorspronkelijke breedte.</p>
            <p>De menu optie reset kolommen zet alle kolommen terug naar zijn default waardes qua breedte en volgorde en zichtbaarheid.</p>
            <Datagrid
                localStorageKey="dg-column-resize"
                data={data || []}
                dataRaw={dataRaw}
                total={total || 0}
                loading={status === "pending"}
                onFilterUpdate={setTableOptions}
                enableColumnResize
                enableColumnMenu
                 properties={defaultProductColumns() as any}
            />
        </>
    )
}

export default ColumnResizeDemo;