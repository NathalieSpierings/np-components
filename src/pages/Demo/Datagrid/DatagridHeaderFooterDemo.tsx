import React, { memo, useState } from "react";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import Datagrid from "../../../components/Data/Datagrid/Datagrid";
import { useTableQueryClientFilter } from "../../../components/Data/Datagrid/Hooks/useTableQueryClientFilter";
import Detailgrid from "../../../components/Data/Detailgrid/Detailgrid";
import Title from "../../../components/Typography/Title/Title";
import Button from "../../../components/UI/Button/Button";
import Icon from "../../../components/UI/Icons/Icon/Icon";
import { defaultOrderColumns, defaultProductColumns } from "../../../lib/testdata/mock";
import { OrderGetModel, ProductGetModel, getOrdersForProduct, getProductsQuery } from "../../../lib/testdata/models";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import ContentItem from "../../../components/UI/ContentItem/ContentItem";
import { ProductOrders } from "./ProductOrdersTable";


const DatagridHeaderFooterDemo: React.FC = () => {

     const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    return (
        <>
        <p>De master grid heeft footercontent die onder de pager geplaatst wordt als de pager niet inside-table is geplaatst.</p>
        <p>Binnen de tabel kan je ook header en footer content plaatsen. Mocht de datagrid uitgebreid worden met totalen of grouping dan is hier dus rekening mee gehouden qua ruimte. Je kan er elke content in plaatsen. </p>
        <Datagrid
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            toolbarTitle={<Title size="md">All products</Title>}
            toolbarBorderBottom={true}
            toolbarPrefixItems={[
                <Button key="create" onClick={() => alert('Create')}>
                    <Icon icon={IconDefinitions.plus} />
                    Toevoegen
                </Button>
            ]}
            collapsibleRowData={ProductOrders}
            
          
            tableHeaderContent={(<span>Table header content goes here... Hier kan later bijv. column grouping in als we dit maken of een externe zoekbalk of iets dergelijkst </span>)}
            tableFooterContent={(<span>Table footer content goes here... Hier kan later bijv. rij totalen in of iets anders </span>)}
            footerContent={(<span>Footer content goes here... Denk aan bijv. totalen of andere beschrijvingen</span>)}
            properties={defaultProductColumns() as any}
        />
        </>
    )
}

export default DatagridHeaderFooterDemo;