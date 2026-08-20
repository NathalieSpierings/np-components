import React, { FC, useState } from "react";
import { Button, Datagrid, DatagridGetDataArguments, Icon, Title, Tooltip, useTableQueryClientFilter } from "../../../../components";
import { filterProductColumns } from "../../../../lib/testdata/mock";
import { ProductGetModel, getProductsForTest1Query } from "../../../../lib/testdata/models";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../../lib/utils/definitions";
import { ProductOrders } from "../ProductOrdersTable";

export interface DatagridTest1Props {
    tableOptions: DatagridGetDataArguments<ProductGetModel> | null;
    setTableOptions: (
        next: DatagridGetDataArguments<ProductGetModel>
    ) => void;
}

const properties = filterProductColumns();

const DatagridTest1: FC<DatagridTest1Props> = ({
    tableOptions,
    setTableOptions,
}) => {

    const [selected, setSelected] = useState<ProductGetModel | undefined>();
    const [checkedItems, setCheckedItems] = useState<ProductGetModel[]>([]);

    const [dataRaw, data, total, status] =
        useTableQueryClientFilter({
            queryFn: getProductsForTest1Query(),
            filters: tableOptions,
        });

    return (
        <Datagrid
            localStorageKey="datagrid-test1"
            data={data}
            dataRaw={dataRaw}
            total={total}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            properties={properties as any}
            enableRowHover
            enableSummaryRow
            toolbarTitle={<Title size="md">All products</Title>}
            toolbarBorderBottom={true}
            toolbarPostfixItems={[
                <Button key="download" onClick={() => alert('Create')}>
                    <Icon icon={IconDefinitions.file_csv} />
                    Export
                </Button>
            ]}

            enableCompactView
            enableColumnReorder
            enableColumnResize
            enableColumnVisibility
            enableColumnPinning
            enableStickyHeader
            enableTableInfo={checkedItems.length > 0}
            enableFiltersInHeader
            enableColumnMenu
            enableColumnMenuColumnVisibility
            enableSidebar
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
            }}
            enableTabs
            tabberPosition="right"
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
            collapsibleRowData={ProductOrders}
            selectedRow={selected}
            rowSingleClickAction={(row) => {
                setSelected(row)
                console.log(`Clicked row: `, row.naam);
            }}
            rowDoubleClickAction={(row) => {
                setSelected(row)
                console.log(`Dobule clicked row`, row.naam);
            }}
            enableCheckboxes
            checkedItems={checkedItems}
            onRowsChecked={setCheckedItems}           
            rowActions={[{
                icon: <Tooltip content="Bekijk"><Icon icon={IconDefinitions.eye} hover={true} iconCss="pointer" /></Tooltip>,
                action: (item) => { alert(`Bekijk order ${item.naam}`) }
            },
            {
                icon: <Tooltip content="Verwijder"><Icon icon={IconDefinitions.bin} hover={true} iconCss="pointer" /></Tooltip>,
                action: (item) => { alert(`Verwijder order ${item.naam}`) }
            }]}
        />
    )
}

export default React.memo(DatagridTest1);