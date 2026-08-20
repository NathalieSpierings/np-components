import React, { useState } from "react";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import Datagrid from "../../../components/Data/Datagrid/Datagrid";
import { useTableQueryClientFilter } from "../../../components/Data/Datagrid/Hooks/useTableQueryClientFilter";
import Title from "../../../components/Typography/Title/Title";
import { Button } from "../../../components/UI/Button";
import { ContentItem } from "../../../components/UI/ContentItem";
import Icon from "../../../components/UI/Icons/Icon/Icon";
import { defaultProductColumns } from "../../../lib/testdata/mock";
import { ProductGetModel, getProductsQuery } from "../../../lib/testdata/models";
import { ColorDefinitions, IconDefinitions } from "../../../lib/utils/definitions";

const DatagridTableInfoDemo: React.FC = () => {

   const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    const [tableInfoVisible, setTableInfoVisible] = useState(true);


    return (
        <Datagrid
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            toolbarTitle={<Title size="md">All products</Title>}
            toolbarPrefixItems={[
                <Button key="create" onClick={() => alert('Create')}>
                    <Icon icon={IconDefinitions.plus} />
                    Toevoegen
                </Button>
            ]}
            enableCompactView={true}
            enableTableInfo={tableInfoVisible}
            tableInfoContent={
                <ContentItem item={{
                    id: '1',
                    content: <div>U heeft een of meerdere <b>filters</b> ingesteld.</div>,
                    postfix: (
                        <Button variant="ghost" color={ColorDefinitions.SurfaceLight} onClick={() => setTableInfoVisible(false)}>
                            <Icon icon={IconDefinitions.funnel_cross} position="left" />
                            Filter wissen
                        </Button>)
                }} />
            }
            properties={defaultProductColumns() as any}
        />


    )
}
export default DatagridTableInfoDemo;