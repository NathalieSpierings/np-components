import React, { useState } from "react";
import { DatagridSidebarPosition } from "../../../components/Data/Datagrid/Addons/DatagridSidebar";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import Datagrid from "../../../components/Data/Datagrid/Datagrid";
import { useTableQueryClientFilter } from "../../../components/Data/Datagrid/Hooks/useTableQueryClientFilter";
import { Title } from "../../../components/Typography/Title";
import Button from "../../../components/UI/Button/Button";
import { Icon } from "../../../components/UI/Icons/Icon";
import { filterProductColumns } from "../../../lib/testdata/mock";
import { ProductGetModel, getProductsQuery } from "../../../lib/testdata/models";
import { ColorDefinitions, IconDefinitions } from "../../../lib/utils/definitions";
import { ProductOrders } from "./ProductOrdersTable";


const DatagridSidebarDemo: React.FC = () => {

   const [selected, setSelected] = useState<ProductGetModel | undefined>();
    const [sidebarDirection, setSidebarDirection] = useState<DatagridSidebarPosition>("right");

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    const toggleSidebarPosition = () => {
        const nextPosition = sidebarDirection === "right" ? "left" : "right";
        setSidebarDirection(nextPosition);
    };

    return (
        <>
            <p>Dubbel klik op een rij om de sidebar te openen. Je kan de sidebar ook groter maken door aan de zijkant midden te slepen. Default is de sidebar 400 breed. De min size is 280 en de max side 600. Dit kan je ook aanpassen</p>
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
        </>
    )
}

export default DatagridSidebarDemo;