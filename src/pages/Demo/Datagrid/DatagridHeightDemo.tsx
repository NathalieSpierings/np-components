import React, { useState } from "react";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import Datagrid, { DatagridHeight } from "../../../components/Data/Datagrid/Datagrid";
import { useTableQueryClientFilter } from "../../../components/Data/Datagrid/Hooks/useTableQueryClientFilter";
import { Title } from "../../../components/Typography/Title";
import Button from "../../../components/UI/Button/Button";
import { Icon } from "../../../components/UI/Icons/Icon";
import { filterProductColumns } from "../../../lib/testdata/mock";
import { ProductGetModel, getProductsQuery } from "../../../lib/testdata/models";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import { ProductOrders } from "./ProductOrdersTable";

const DatagridHeightDemo: React.FC = () => {

    const [selected, setSelected] = useState<ProductGetModel | undefined>();

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });


    const [fullHeight, setFullHeight] = useState(false);
    

    
    return (
        <>
            <fieldset className="fieldset">
                <dl className="description-list description-list--colon  ">
                    <dt>Naam</dt>
                    <dd className="">Test organisatie edms 01 (4486) (4486)</dd>
                    <dt>AGB-code onderneming</dt>
                    <dd className="">98098352</dd>
                </dl>
            </fieldset>

            <Datagrid 
                fullHeight={fullHeight}
                data={data || []}
                dataRaw={dataRaw}
                total={total || 0}
                loading={status === "pending"}
                onFilterUpdate={setTableOptions}
                properties={filterProductColumns() as any}
                collapsibleRowData={ProductOrders}
                initialPageSize={10}
                enableCompactView
                enableSummaryRow
                enableRowHover
                enableStickyHeader
                enableFiltersInHeader
                enableColumnReorder
                enableColumnResize
                enableColumnVisibility
                enableColumnPinning
                enableColumnMenu
                enableColumnMenuColumnVisibility
                tableHeaderContent={<Title size="xs">Alle products table</Title>}
                toolbarTitle={<Title size="md">Alle products</Title>}
                toolbarBorderBottom={true}
                toolbarPrefixItems={[
                    <Button key="height" onClick={() => setFullHeight(!fullHeight)}>{fullHeight ? "default" : "full"} height</Button>

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
                enableTabs
                tabberPosition={"right"}
                enableTabColumnVisibility
                enableTabFilters
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
                sidebarPosition={"right"}
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

            />
        </>
    )
}

export default DatagridHeightDemo;