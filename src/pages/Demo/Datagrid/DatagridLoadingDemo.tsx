import React, { useState } from "react";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import Datagrid from "../../../components/Data/Datagrid/Datagrid";
import { useTableQueryClientFilter } from "../../../components/Data/Datagrid/Hooks/useTableQueryClientFilter";
import Title from "../../../components/Typography/Title/Title";
import Button from "../../../components/UI/Button/Button";
import Icon from "../../../components/UI/Icons/Icon/Icon";
import { defaultProductColumns } from "../../../lib/testdata/mock";
import { ProductGetModel, getProductsQuery } from "../../../lib/testdata/models";
import { IconDefinitions } from "../../../lib/utils/definitions";
import { ProductOrders } from "./ProductOrdersTable";

const DatagridLoadingDemo: React.FC = () => {

   const [loading, setLoading] = useState<boolean>(false);

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
            loading={loading}
            onFilterUpdate={setTableOptions}
            toolbarTitle={<Title size="md">Alle products</Title>}
            toolbarBorderBottom={true}
            toolbarPrefixItems={[
                <Button key="loadingEnabler" onClick={() => setLoading(!loading)}> {loading === false ? "Enable" : "Disable"} loading</Button>,
            ]}
            toolbarPostfixItems={[
                <Icon key="download" icon={IconDefinitions.file_csv} />
            ]}
            collapsibleRowData={ProductOrders}
           properties={defaultProductColumns() as any}
        />
    )
}

export default DatagridLoadingDemo;