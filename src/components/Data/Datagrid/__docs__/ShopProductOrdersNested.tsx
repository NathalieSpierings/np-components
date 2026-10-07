import React, { memo, useState } from "react";
import { defaultOrderColumns } from "../../../../lib/testdata/mock";
import { OrderGetModel, ShopProductModel } from "../../../../lib/testdata/models";
import EventStopper from "../../../Base/EventStopper/EventStopper";
import Detailgrid from "../../Detailgrid/Detailgrid";
import { DatagridGetDataArguments } from "../Config/DatagridData";
import { useTableQueryClientFilter } from "../Hooks/useTableQueryClientFilter";

const ShopProductOrdersNestedTable = ({ product }: { product: ShopProductModel }) => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<OrderGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: {
            queryKey: ["ShopProductOrders", product.shopId, product.id],
            queryFn: async (): Promise<OrderGetModel[]> => product.orders
        },
        filters: tableOptions
    });

    const [selected, setSelected] = useState<OrderGetModel | undefined>();

    return (
        <EventStopper>
            <Detailgrid
                data={data || []}
                dataRaw={dataRaw}
                total={total || 0}
                loading={status === "pending"}
                onFilterUpdate={setTableOptions}
                variant="nested"
                enableColumnResize
                enableColumnVisibility
                enableColumnMenu
                selectedRow={selected}
                rowSingleClickAction={(row: OrderGetModel) => setSelected(row)}
                properties={defaultOrderColumns() as any}
            />
        </EventStopper>
    );
};

export const ShopProductOrdersNested = memo(({ item }: { item: ShopProductModel }) => (
    <ShopProductOrdersNestedTable product={item} />
));
