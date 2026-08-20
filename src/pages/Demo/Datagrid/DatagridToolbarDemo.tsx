import React, { useState } from "react";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import Datagrid from "../../../components/Data/Datagrid/Datagrid";
import { useTableQueryClientFilter } from "../../../components/Data/Datagrid/Hooks/useTableQueryClientFilter";
import Toggle from "../../../components/Forms/Toggle/Toggle";
import Title from "../../../components/Typography/Title/Title";
import { Button } from "../../../components/UI/Button";
import Icon from "../../../components/UI/Icons/Icon/Icon";
import { defaultProductColumns } from "../../../lib/testdata/mock";
import { ProductGetModel, getProductsQuery } from "../../../lib/testdata/models";
import { ColorDefinitions, IconDefinitions } from "../../../lib/utils/definitions";

const DatagridToolbarDemo: React.FC = () => {

    const [toggleChecked, setToggleChecked] = useState(true);

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
            toolbarTitle={<Title size="md">All products</Title>}
            toolbarBorderBottom={true}
            toolbarPrefixItems={[
                <Button key="create" onClick={() => alert('Create')}>
                    <Icon icon={IconDefinitions.plus} />
                    Toevoegen
                </Button>
            ]}
            toolbarPostfixItems={[
                <Toggle key="toggle"
                    color={ColorDefinitions.Primary}
                    label="Gearchiveerd verbergen"
                    checked={toggleChecked}
                    onChange={setToggleChecked}
                    labelPosition="left"
                />
            ]}
            enableCompactView={true}
            properties={defaultProductColumns() as any}
        />
    )
}

export default DatagridToolbarDemo;