import React, { memo, useState } from "react";
import { Button, ContentItem, DatagridGetDataArguments, Detailgrid, Icon, useTableQueryClientFilter } from "../../../components";
import { defaultOrderColumns } from "../../../lib/testdata/mock";
import { getOrdersForProduct, OrderGetModel, ProductMetOrdersModel } from "../../../lib/testdata/models";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";

const ProductOrdersNestedTable = ({ productId }: { productId: string }) => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<OrderGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getOrdersForProduct(productId),
        filters: tableOptions
    });

    const [selected, setSelected] = useState<OrderGetModel | undefined>();
    const [checkedItems, setCheckedItems] = useState<OrderGetModel[]>([]);
    
    return (
        <Detailgrid
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}            
            variant="nested"
            enableColumnResize
            enableColumnReorder
            enableStickyHeader
            enableSummaryRow
            enableColumnPinning
            enableColumnVisibility
            enableColumnMenu
            enableColumnMenuColumnVisibility
            selectedRow={selected}
            rowSingleClickAction={(row) => {
                setSelected(row)
                console.log(`Clicked row: nested row ${row.klantNaam}`);
            }}
            rowDoubleClickAction={(row) => {
                setSelected(row)
                console.log(`Double clicked nested row ${row.klantNaam}`);
            }}
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
        />
    );
};

export const ProductOrdersNested = memo(({ item }: { item: ProductMetOrdersModel }) => (
    <ProductOrdersNestedTable productId={item.id.toString()}/>
)
);