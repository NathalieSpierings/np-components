import React, { memo, useState } from "react";
import { defaultProductColumns } from "../../../../lib/testdata/mock";
import { getShopProductenQuery, ShopMetProductenModel, ShopProductModel } from "../../../../lib/testdata/models";
import EventStopper from "../../../Base/EventStopper/EventStopper";
import Detailgrid from "../../Detailgrid/Detailgrid";
import { DatagridGetDataArguments } from "../Config/DatagridData";
import { useTableQueryClientFilter } from "../Hooks/useTableQueryClientFilter";

const ShopProductsNestedTable = ({ shopId }: { shopId: number }) => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ShopProductModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getShopProductenQuery(shopId),
        filters: tableOptions
    });

    const [selected, setSelected] = useState<ShopProductModel | undefined>();

    return (
        <EventStopper>
            <Detailgrid
                getRowKey={(p) => `${p.shopId}-${p.id}`}
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
                rowSingleClickAction={(row: ShopProductModel) => setSelected(row)}
                properties={defaultProductColumns() as any}
            />
        </EventStopper>
    );
};

export const ShopProductsNested = memo(({ item }: { item: ShopMetProductenModel }) => (
    <ShopProductsNestedTable shopId={item.id} />
));
