import React, { memo, useState } from "react";
import { Button, ContentItem, Datagrid, Detailgrid, Icon, Tooltip } from "../../../components";
import EventStopper from "../../../components/Base/EventStopper/EventStopper";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import { useTableQueryClientFilter } from "../../../components/Data/Datagrid/Hooks/useTableQueryClientFilter";
import Drawer from "../../../components/UI/Drawer/Drawer";
import { defaultOrderColumns, defaultProductColumns } from "../../../lib/testdata/mock";
import { OrderGetModel, ProductGetModel, getOrdersForProduct, getProductsQuery } from "../../../lib/testdata/models";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";

const ProductOrdersNestedTable = ({ productId }: { productId: string }) => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<OrderGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getOrdersForProduct(productId),
        filters: tableOptions
    });

    const [selectedItem, setSelectedItem] = useState<OrderGetModel>();
    const [drawerOpen, setDrawerOpen] = useState<boolean | null>(false);
    const [checkedItems, setCheckedItems] = useState<OrderGetModel[]>([]);

    // Event handlers for single and double click on a row
    const handleSingleClick = (item: OrderGetModel) => {
        if (drawerOpen) {
            // Drawer is already open so load new data
            setSelectedItem(item);
        }
    }

    const handleDoubleClick = (item: OrderGetModel) => {
        setSelectedItem(item);
        setDrawerOpen(true);
    }

    return (
        <>
            {selectedItem && (
                <EventStopper>
                    <Drawer
                        title="Details"
                        open={drawerOpen}
                        openDrawer={setDrawerOpen}
                        useOverlay={false}>
                                {selectedItem.klantNaam}
                    </Drawer>
                </EventStopper>
            )}

            <EventStopper>
                <Detailgrid
                    localStorageKey="gridNested"
                    data={data || []}
                    dataRaw={dataRaw}
                    total={total || 0}
                    loading={status === "pending"}
                    onFilterUpdate={setTableOptions}
                    enableColumnResize
                    enableColumnReorder
                    enableColumnVisibility
                    enableColumnMenuColumnVisibility
                    enableColumnMenu
                    enableColumnPinning
                    selectedRow={selectedItem}
                    rowSingleClickAction={handleSingleClick}
                    rowDoubleClickAction={handleDoubleClick}
                    properties={defaultOrderColumns() as any}
                    enableCheckboxes={true}
                    checkedItems={checkedItems}
                    onRowsChecked={setCheckedItems}
                    enableTableInfo={checkedItems.length > 0}
                    tableInfoContent={
                        <ContentItem item={{
                            id: '1',
                            content: <div>U heeft <span className="bold text-red">{checkedItems.length}</span> {checkedItems.length === 1 ? "bestand" : "bestanden"} {" "} geselecteerd</div>,
                            postfix: (
                                <Button
                                    variant="ghost"
                                    color={ColorDefinitions.Blue}
                                    onClick={() =>
                                        console.log(`Download ${checkedItems.length} bestanden`)
                                    }
                                >
                                    <Icon icon={IconDefinitions.cloud_download} position="left" size={SizeDefinitions.Medium} />
                                    Downloaden
                                </Button>)
                        }} />
                    }
                    rowActionPosition="left"
                    rowActions={[{
                        icon: <Tooltip content="Details"><Icon icon={IconDefinitions.eye} hover={true} /></Tooltip>,
                        action: (item) => { handleDoubleClick(item) }
                    }]}
                />
            </EventStopper>
        </>
    );
};

export const ProductOrdersNested = memo(({ item }: { item: ProductGetModel }) => (
    <ProductOrdersNestedTable productId={item.id.toString()} />
)
);

const DatagridNestedDetailsDemo: React.FC = () => {

    const [selected, setSelected] = useState<ProductGetModel | undefined>();

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
            collapsibleRowData={ProductOrdersNested}
            enableColumnPinning
            enableColumnVisibility
            enableColumnMenu
            enableColumnMenuColumnVisibility
            enableCompactView
            enableColumnReorder
            enableColumnResize
            enableStickyHeader
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
        />
    )
}

export default DatagridNestedDetailsDemo;