import React, { useMemo, useState } from "react";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../../lib/utils/definitions";
import Multiselect, { MultiselectItemType } from "../../../Forms/Multiselect/Multiselect";
import { Select } from "../../../Forms/Select/Select";
import Button from "../../../UI/Button/Button";
import Collection, { CollectionItemType } from "../../../UI/Collection/Collection";
import Icon from "../../../UI/Icons/Icon/Icon";
import { DatagridRowConfig } from "../Config/DatagridRowConfig";
import { DatagridColumnFilterValue, DatagridFilterOption, isActiveColumnFilter } from "./DatagridColumnFilter";
import { getOperators } from "./DatagridFilterOperators";
import Search from "../../../Base/Search/Search";

export interface DatagridFilterListProps<TData> {
    dataRaw?: TData[];
    columns: DatagridRowConfig<TData>[];
    columnFilters: Record<string, DatagridColumnFilterValue | undefined>;
    setColumnFilters: React.Dispatch<
        React.SetStateAction<Record<string, DatagridColumnFilterValue | undefined>>
    >;
}

export default function DatagridFilterList<TData>({
    dataRaw,
    columns,
    columnFilters,
    setColumnFilters,
}: Readonly<DatagridFilterListProps<TData>>) {
    const [activeItem, setActiveItem] = useState<string | undefined>();

    const filterColumns = useMemo(
        () => columns.filter((column) => column.filter),
        [columns]
    );

    const setFilterValue = (
        prop: string,
        value: DatagridColumnFilterValue | undefined
    ) => {
        setColumnFilters((current) => {
            const next = { ...current };

            if (!value || !isActiveColumnFilter(value)) {
                delete next[prop];
            } else {
                next[prop] = value;
            }

            return next;
        });
    };

    const collectionItems = useMemo<CollectionItemType[]>(() => {
        return filterColumns.map((column) => {
            const filter = column.filter;
            const value = columnFilters[column.prop];
            const active = isActiveColumnFilter(value);

            if (!filter) {
                return undefined;
            }

            const options: DatagridFilterOption[] =
                filter.options ??
                (filter.optionsSource && dataRaw
                    ? filter.optionsSource(dataRaw).map((item) =>
                        filter.mapOption
                            ? filter.mapOption(item)
                            : {
                                label: String(item),
                                value: String(item),
                            }
                    )
                    : []);

            const multiselectItems: MultiselectItemType[] = options.map((option) => ({
                id: option.value,
                content: option.label,
            }));

            const update = (patch: Partial<DatagridColumnFilterValue>) => {
                setFilterValue(column.prop, {
                    ...value,
                    ...patch,
                });
            };

            const clear = () => setFilterValue(column.prop, undefined);

            const isBlankOperator =
                value?.operator === "blank" || value?.operator === "notBlank";

            const isBetweenOperator = value?.operator === "between";

            return {
                id: column.prop,
                defaultOpen: active,
                active: active,
                content: (
                    <div className="datagrid__filter__collection__item">
                        <span>{column.title ?? column.prop}</span>

                        {active && (
                            <span className="datagrid__filter__collection__item--active" />
                        )}
                    </div>
                ),
                collapsibleArrowPosition: "left",
                collapsibleContent: (
                    <>
                        <div className="datagrid__filter__collection__content">
                            {filter.type === "select" ? (
                                <Multiselect
                                    items={multiselectItems}
                                    selected={value?.values ?? []}
                                    setSelected={(selected) =>
                                        setFilterValue(column.prop, {
                                            values: selected,
                                        })
                                    }
                                    collectionSelectMultiple={filter.multiSelect ?? false}
                                    showSearch
                                    showCheckAll={filter.multiSelect ?? false}
                                />
                            ) : (
                                <>
                                    <Select
                                        small
                                        value={value?.operator ?? ""}
                                        defaultLabel="Kies filter..."
                                        onValueChange={(operator) =>
                                            update({
                                                operator: operator as any,
                                                value: "",
                                                valueTo: "",
                                            })
                                        }
                                    >
                                        {getOperators(filter.type).map((operator) => (
                                            <option
                                                key={operator.value}
                                                value={operator.value}
                                            >
                                                {operator.label}
                                            </option>
                                        ))}
                                    </Select>

                                    {!isBlankOperator && (
                                        <Search
                                            type={filter.type}
                                            value={value?.value ?? ""}
                                            placeholder="Zoeken..."
                                            onChange={(text) =>
                                                update({
                                                    value: text,
                                                })
                                            }
                                        />
                                    )}

                                    {isBetweenOperator && (
                                        <Search
                                            type={filter.type}
                                            value={value?.valueTo ?? ""}
                                            placeholder="Tot en met..."
                                            onChange={(text) =>
                                                update({
                                                    valueTo: text,
                                                })
                                            }
                                        />
                                    )}
                                </>
                            )}
                        </div>

                        {active && (
                            <div className="datagrid__filter__collection__footer">
                                <Button onClick={clear} size={SizeDefinitions.Small}>
                                    <Icon icon={IconDefinitions.funnel_cross} />
                                    Filter wissen
                                </Button>
                            </div>
                        )}
                    </>
                ),
            };
        }).filter(Boolean) as CollectionItemType[];
    }, [filterColumns, columnFilters, dataRaw, setColumnFilters]);

    return (
        <Collection
            borderColor={ColorDefinitions.Surface}
            items={collectionItems}
            hoverable
            compact
            collectionCss="datagrid__filter__collection"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
        />
    );
}