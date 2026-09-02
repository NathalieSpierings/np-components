import React, { useState } from "react";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import Datagrid, { DatagridRowActionsPosition } from "../../../components/Data/Datagrid/Datagrid";
import { useTableQueryClientFilter } from "../../../components/Data/Datagrid/Hooks/useTableQueryClientFilter";
import Title from "../../../components/Typography/Title/Title";
import Button from "../../../components/UI/Button/Button";
import Icon from "../../../components/UI/Icons/Icon/Icon";
import Tooltip from "../../../components/UI/Tooltip/Tooltip";
import { defaultProductColumns } from "../../../lib/testdata/mock";
import { ProductGetModel, getProductsQuery } from "../../../lib/testdata/models";
import { ColorDefinitions, IconDefinitions } from "../../../lib/utils/definitions";


const RowActionsDemo: React.FC = () => {

     const [selected, setSelected] = useState<ProductGetModel | undefined>();
    const [actionsPosition, setActionsPosition] = useState<DatagridRowActionsPosition>('right');

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });


    const toggleActionsPosition = () => {
        const nextPosition = actionsPosition === "right" ? "left" : "right";
        setActionsPosition(nextPosition);
    };

    return (
        <Datagrid
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            toolbarTitle={<Title size="md">Alle products</Title>}
            toolbarBorderBottom={true}
            toolbarPrefixItems={[

                <Button key="actions" onClick={toggleActionsPosition}>Actions naar {actionsPosition === "right" ? "links" : "rechts"}</Button>,

            ]}
            toolbarPostfixItems={[
                <Icon key="icon" icon={IconDefinitions.file_csv} />
            ]}


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
            rowActionPosition={actionsPosition}
            rowActions={[{
                icon: <Tooltip content="Bekijk"><Icon icon={IconDefinitions.eye} hover={true} iconCss="pointer" /></Tooltip>,
                action: (item) => { alert(`Bekijk order ${item.naam}`) }
            },
            {
                icon: <Tooltip content="Verwijder"><Icon icon={IconDefinitions.bin} color={ColorDefinitions.Red} hover={true} iconCss="pointer" /></Tooltip>,
                action: (item) => { alert(`Verwijder order ${item.naam}`) }
            }]}
        />
    )
}

export default RowActionsDemo;