import React, { useMemo, useState } from "react";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../../lib/utils/definitions";
import Multiselect, { MultiselectItem, MultiselectItemId } from "../../../Forms/Multiselect/Multiselect";
import { Select } from "../../../Forms/Select/Select";
import Button from "../../../UI/Button/Button";
import Collection, { CollectionItem } from "../../../UI/Collection/Collection";
import Icon from "../../../UI/Icons/Icon/Icon";
import { DatagridRowConfig } from "../Config/DatagridRowConfig";
import { DatagridColumnFilterValue, DatagridFilterOperator, DatagridFilterOption, getUniqueFilterOptions, isActiveColumnFilter } from "./DatagridColumnFilter";
import { getDefaultOperator, getOperators } from "./DatagridFilterOperators";
import Search from "../../../Base/Search/Search";

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

            if (!value) {
                delete next[prop];
            } else {
                next[prop] = value;
            }

            return next;
        });
    };

    const collectionItems = useMemo<CollectionItem[]>(() => {
        return filterColumns.map((column) => {
            const filter = column.filter;

            if (!filter) {
                return undefined;
            }

            const value = columnFilters[column.prop];
            const active = isActiveColumnFilter(value);

            const options: DatagridFilterOption[] = getUniqueFilterOptions(
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
                    : [])
            );

            const multiselectItems: MultiselectItem[] = options.map(option => ({
                id: option.value,
                content: {
                    content: option.label
                }
            }));

            const defaultOperator = getDefaultOperator(filter.type);

            const update = (patch: Partial<DatagridColumnFilterValue>) => {
                setFilterValue(column.prop, {
                    operator: value?.operator ?? defaultOperator,
                    ...value,
                    ...patch,
                });
            };

            const clear = () => setFilterValue(column.prop, undefined);


            const isBlankOperator = value?.operator === "blank" || value?.operator === "notBlank";
            const isBetweenOperator = value?.operator === "between";

            const selectedValues: MultiselectItemId[] = value?.values ?? [];

            return {
                id: column.prop,
                defaultOpen: active,
                active: active,
                content: {
                    content: (
                        <div className="datagrid__filter__collection__item">
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
                            {filter.type === "select" ? (
                                <Multiselect
                                    items={multiselectItems}
                                    selected={selectedValues}
                                    onSelectionChange={(selected) => {
                                        const values = selected.map(String);

                                        setFilterValue(
                                            column.prop,
                                            selected.length > 0 ? { values } : undefined
                                        )
                                    }
                                    }
                                    selectMultiple={filter.multiSelect ?? false}
                                    enableSearch
                                    enableCheckAll={filter.multiSelect ?? false}
                                />
                            ) : (
                                <>
                                    <Select
                                        small
                                        value={value?.operator ?? defaultOperator ?? ""}
                                        defaultLabel="Kies filter..."
                                        onValueChange={(operator) =>
                                            update({
                                                operator: operator as DatagridFilterOperator,
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
                                <Button onClick={clear} variant="ghost" color={ColorDefinitions.Rose30} size={SizeDefinitions.Small}>
                                    <Icon icon={IconDefinitions.funnel_cross} />
                                    Filter wissen
                                </Button>
                            </div>
                        )}
                    </>
                ),
            };
        }).filter(Boolean) as CollectionItem[];
    }, [filterColumns, columnFilters, dataRaw]);

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