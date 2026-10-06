import { memo, useState } from "react";
import { defaultOrderColumns } from "../../../../lib/testdata/mock";
import { getOrdersForProduct, OrderGetModel, ProductGetModel } from "../../../../lib/testdata/models";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../../lib/utils/definitions";
import EventStopper from "../../../Base/EventStopper/EventStopper";
import Button from "../../../UI/Button/Button";
import ContentItem from "../../../UI/ContentItem/ContentItem";
import Drawer from "../../../UI/Drawer/Drawer";
import Icon from "../../../UI/Icons/Icon/Icon";
import Tooltip from "../../../UI/Tooltip/Tooltip";
import Detailgrid from "../../Detailgrid/Detailgrid";
import { DatagridGetDataArguments } from "../Config/DatagridData";
import { useTableQueryClientFilter } from "../Hooks/useTableQueryClientFilter";

/**
 * Nested orders table with a details drawer (double click or eye icon).
 * Used as collapsibleRowData in the NestedDetails / DetailsAndNestedDetails stories.
 */
const ProductOrdersNestedTable = ({ productId }: { productId: string }) => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<OrderGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getOrdersForProduct(productId),
        filters: tableOptions
    });

    const [selectedItem, setSelectedItem] = useState<OrderGetModel>();
    const [drawerOpen, setDrawerOpen] = useState<boolean | null>(false);
    const [checkedItems, setCheckedItems] = useState<OrderGetModel[]>([]);

    const handleSingleClick = (item: OrderGetModel) => {
        if (drawerOpen) {
            // Drawer is already open so load new data
            setSelectedItem(item);
        }
    };

    const handleDoubleClick = (item: OrderGetModel) => {
        setSelectedItem(item);
        setDrawerOpen(true);
    };

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
                        action: (item) => { handleDoubleClick(item); }
                    }]}
                />
            </EventStopper>
        </>
    );
};

export const ProductOrdersWithDetails = memo(({ item }: { item: ProductGetModel }) => (
    <ProductOrdersNestedTable productId={item.id.toString()} />
));
