import React, { useState } from "react";
import { EventStopper } from "../../../components";
import { DatagridTabberPosition } from "../../../components/Data/Datagrid/Addons/DatagridTabs";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import Datagrid from "../../../components/Data/Datagrid/Datagrid";
import { useTableQueryClientFilter } from "../../../components/Data/Datagrid/Hooks/useTableQueryClientFilter";
import { Title } from "../../../components/Typography/Title";
import Button from "../../../components/UI/Button/Button";
import { Icon } from "../../../components/UI/Icons/Icon";
import { filterProductColumns } from "../../../lib/testdata/mock";
import { ProductGetModel, getProductsQuery } from "../../../lib/testdata/models";
import { IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import { ProductOrders } from "./ProductOrdersTable";


const DatagridTabsDemo: React.FC = () => {

    const [selected, setSelected] = useState<ProductGetModel | undefined>();

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    const [tabsDirection, setTabsDirection] = useState<DatagridTabberPosition>("right");
    const [enableTabFilters, setEnableTabFilters] = useState(false);
    const [enableTabColumnVisibility, setEnableTabColumnVisibility] = useState(false);

    const toggleTabberPosition = () => {
        const nextPosition = tabsDirection === "right" ? "left" : "right";
        setTabsDirection(nextPosition);
    };

    return (
        <EventStopper>
            <p>Je kan de sidebar ook groter maken door aan de zijkant midden te slepen. Default is de tabpane 400 breed. De min size is 400 en de max 600. Dit kan je ook aanpassen</p>

            <Datagrid
                data={data || []}
                dataRaw={dataRaw}
                total={total || 0}
                loading={status === "pending"}
                onFilterUpdate={setTableOptions}
                collapsibleRowData={ProductOrders}
                toolbarTitle={<Title size="md">Alle products</Title>}
                toolbarBorderBottom={true}
                toolbarPrefixItems={[
                    <Button key="tabber" onClick={toggleTabberPosition}>Tabs naar {tabsDirection === "right" ? "links" : "rechts"}</Button>,
                    <Button key="enableTabFilters" onClick={() => setEnableTabFilters(!enableTabFilters)}>{enableTabFilters === false ? "Enable" : "Disible"} tab filters</Button>,
                    <Button key="enableTabColumnVisibility" onClick={() => setEnableTabColumnVisibility(!enableTabColumnVisibility)}>{enableTabColumnVisibility === false ? "Enable" : "Disible"} column tab column visibility</Button>
                ]}
                toolbarPostfixItems={[
                    <Icon key="icon" icon={IconDefinitions.file_csv} />
                ]}
                enableColumnReorder
                enableColumnResize
                enableStickyHeader
                enableColumnVisibility
                selectedRow={selected}
                rowSingleClickAction={(row) => {
                    setSelected(row)
                    console.log(`Clicked row: ${row.naam}`);
                }}
                rowDoubleClickAction={(row) => {
                    setSelected(row)
                    console.log(`Double clicked row ${row.naam}`);
                }}
                enableTabs
                tabberPosition={tabsDirection}
                enableTabColumnVisibility={enableTabColumnVisibility}
                enableTabFilters={enableTabFilters}
                tabs={[{
                    id: "tabTest",
                    title: "Test",
                    icon: <Icon icon={IconDefinitions.info_circle} size={SizeDefinitions.Small} />
                }
                ]}
                tabPanes={[
                    {
                        tabId: "tabTest",
                        content: (<span>Custom content goes here...</span>),
                        header: {
                            content: "Test tab"
                        }
                    },

                ]}
                properties={filterProductColumns() as any}
            />
        </EventStopper>
    )
}

export default DatagridTabsDemo;