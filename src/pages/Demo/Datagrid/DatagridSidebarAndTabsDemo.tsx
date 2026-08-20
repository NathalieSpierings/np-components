import React, { useState } from "react";
import { DatagridSidebarPosition } from "../../../components/Data/Datagrid/Addons/DatagridSidebar";
import { DatagridTabberPosition } from "../../../components/Data/Datagrid/Addons/DatagridTabs";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import Datagrid from "../../../components/Data/Datagrid/Datagrid";
import { useTableQueryClientFilter } from "../../../components/Data/Datagrid/Hooks/useTableQueryClientFilter";
import { Title } from "../../../components/Typography/Title";
import Button from "../../../components/UI/Button/Button";
import { Icon } from "../../../components/UI/Icons/Icon";
import { filterProductColumns } from "../../../lib/testdata/mock";
import { ProductGetModel, getProductsQuery } from "../../../lib/testdata/models";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import { ProductOrders } from "./ProductOrdersTable";


const DatagridSidebarAndTabsDemo: React.FC = () => {

    const [selected, setSelected] = useState<ProductGetModel | undefined>();

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    const [tabsDirection, setTabsDirection] = useState<DatagridTabberPosition>("right");
    const [enableTabFilters, setEnableTabFilters] = useState(false);
    const [enableTabColumnVisibility, setEnableTabColumnVisibility] = useState(false);
    const [sidebarDirection, setSidebarDirection] = useState<DatagridSidebarPosition>("right");

    const toggleTabberPosition = () => {
        const nextPosition = tabsDirection === "right" ? "left" : "right";
        setTabsDirection(nextPosition);
    };

    const toggleSidebarPosition = () => {
        const nextPosition = sidebarDirection === "right" ? "left" : "right";
        setSidebarDirection(nextPosition);
    };

    return (

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
                <Button key="enableTabColumnVisibility" onClick={() => setEnableTabColumnVisibility(!enableTabColumnVisibility)}>{enableTabColumnVisibility === false ? "Enable" : "Disible"} column tab column visibility</Button>,
                <Button key="sidebar" onClick={toggleSidebarPosition}>Sidebar naar {sidebarDirection === "right" ? "links" : "rechts"}</Button>

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
            },
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

            enableSidebar
            sidebarPosition={sidebarDirection}
            sidebar={{
                header: {
                    content: "Product details",
                    borderColor: ColorDefinitions.Surface,
                },
                content: ({ item }) => {
                    if (!item) {
                        return <div>Selecteer een rij</div>;
                    }

                    return (
                        <div>
                            <h3>{item.naam}</h3>
                            <p>SKU: {item.sku}</p>
                            <p>Prijs: € {item.prijs}</p>
                            <p>Categorie: {item.categorie}</p>
                        </div>
                    );
                },
                footer: {
                    content: <Button>Opslaan</Button>,
                    borderColor: ColorDefinitions.Surface,
                },
            }}
            properties={filterProductColumns() as any}
        />
    )
}

export default DatagridSidebarAndTabsDemo;