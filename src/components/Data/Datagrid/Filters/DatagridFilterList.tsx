import { useMemo, useState } from "react";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../../lib/utils/definitions";
import Button from "../../../UI/Button/Button";
import Collection, { CollectionItem } from "../../../UI/Collection/Collection";
import Icon from "../../../UI/Icons/Icon/Icon";
import { DatagridRowConfig } from "../Config/DatagridRowConfig";
import { DatagridColumnFilterValue, isActiveColumnFilter, setColumnFilterValue } from "./DatagridColumnFilter";
import DatagridFilterEditor from "./DatagridFilterEditor";

export interface DatagridFilterListProps<TData> {
    dataRaw?: TData[];
    columns: DatagridRowConfig<TData>[];
    columnFilters: Record<string, DatagridColumnFilterValue | undefined>;
    setColumnFilters: React.Dispatch<React.SetStateAction<Record<string, DatagridColumnFilterValue | undefined>>>;
}

export default function DatagridFilterList<TData>({
    dataRaw,
    columns,
    columnFilters,
    setColumnFilters,
}: Readonly<DatagridFilterListProps<TData>>) {

    const [activeItem, setActiveItem] = useState<string | undefined>();

    const collectionItems = useMemo<CollectionItem[]>(() => {
        // Filters van verborgen kolommen blijven werken; ze worden grijs onderaan de lijst getoond
        const isHidden = (column: DatagridRowConfig<TData>) => column.visible === false;

        const filterColumns = columns
            .filter((column) => column.filter)
            .sort((a, b) => Number(isHidden(a)) - Number(isHidden(b)));

        return filterColumns.map((column) => {
            const value = columnFilters[column.prop];
            const active = isActiveColumnFilter(value);
            const hidden = isHidden(column);

            const setFilterValue = (next: DatagridColumnFilterValue | undefined) =>
                setColumnFilters((current) => setColumnFilterValue(current, column.prop, next));

            return {
                id: column.prop,
                defaultOpen: active,
                active: active,
                content: {
                    content: (
                        <div
                            className={[
                                "datagrid__filter__collection__item",
                                hidden ? "datagrid__filter__collection__item--hidden" : ""
                            ].join(" ")}
                            title={hidden ? "Kolom is verborgen" : undefined}
                        >
                            <span>{column.title ?? column.prop}</span>

                            {active && (
                                <span className="datagrid__filter__collection__item--active" />
                            )}
                        </div>
                    )
                },
                collapsibleArrowPosition: "left",
                collapsibleContent: (
                    <>
                        <div className="datagrid__filter__collection__content">
                            <DatagridFilterEditor column={column} dataRaw={dataRaw} value={value} onChange={setFilterValue} />
                        </div>

                        {active && (
                            <div className="datagrid__filter__collection__footer">
                                <Button onClick={() => setFilterValue(undefined)} variant="ghost" color={ColorDefinitions.RoseDark} size={SizeDefinitions.Small}>
                                    <Icon icon={IconDefinitions.funnel_cross} />
                                    Filter wissen
                                </Button>
                            </div>
                        )}
                    </>
                ),
            };
        });
    }, [columns, columnFilters, dataRaw, setColumnFilters]);

    return (
        <Collection
            borderColor={ColorDefinitions.Surface}
            items={collectionItems}
            compact
            collectionCss="datagrid__filter__collection"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
        />
    );
}
