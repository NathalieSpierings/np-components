import React, { useMemo } from "react";
import { ColorDefinitions, IconDefinitions } from "../../../../lib/utils/definitions";
import { Dropdown } from "../../../Forms/Dropdown/Dropdown";
import { DropdownSearch } from "../../../Forms/Dropdown/DropdownSearch";
import Multiselect, { MultiselectItemType } from "../../../Forms/Multiselect/Multiselect";
import { Select } from "../../../Forms/Select/Select";
import Icon from "../../../UI/Icons/Icon/Icon";
import { DatagridRowConfig } from "../Config/DatagridRowConfig";
import { DatagridColumnFilterValue, DatagridFilterOption, isActiveColumnFilter } from "./DatagridColumnFilter";
import { getOperators } from "./DatagridFilterOperators";
import { Search } from "../../../Base/Search/Search";

export interface DatagridFilterDropdownProps<TData> {
    column: DatagridRowConfig<TData>;
    dataRaw?: TData[];
    value?: DatagridColumnFilterValue;
    onChange: (value: DatagridColumnFilterValue | undefined) => void;
    enableDropdownToggleLabel?: boolean;
}

export default function DatagridFilterDropdown<TData>({
    column,
    dataRaw,
    value,
    onChange,
    enableDropdownToggleLabel = false
}: Readonly<DatagridFilterDropdownProps<TData>>) {
    const filter = column.filter;

    const options = useMemo<DatagridFilterOption[]>(() => {
        if (!filter) return [];

        if (filter.options) return filter.options;

        if (filter.optionsSource && dataRaw) {
            return filter.optionsSource(dataRaw).map((item) =>
                filter.mapOption
                    ? filter.mapOption(item)
                    : { label: String(item), value: String(item) }
            );
        }

        return [];
    }, [filter, dataRaw]);

    if (!filter) return null;

    const multiselectItems: MultiselectItemType[] = options.map((option) => ({
        id: option.value,
        content: option.label,
    }));

    const update = (patch: Partial<DatagridColumnFilterValue>) => {
        onChange({
            ...value,
            ...patch,
        });
    };

    const clear = () => onChange(undefined);

    const isBlankOperator = value?.operator === "blank" || value?.operator === "notBlank";
    const isBetweenOperator = value?.operator === "between";

    const active = isActiveColumnFilter(value);

    return (
        <Dropdown  
            dropdownToggle={{
                prefix: (<Icon icon={IconDefinitions.filter} color={active ? ColorDefinitions.Primary : undefined} />),
                label:  enableDropdownToggleLabel ? column.title : undefined,                
            }}        
        >
            <div className="datagrid__filter__dropdown">
                {filter.type === "select" ? (
                    <Multiselect
                        items={multiselectItems}
                        selected={value?.values ?? []}
                        setSelected={(selected) =>
                            onChange({
                                values: selected,
                            })
                        }
                        collectionSelectMultiple={filter.multiSelect ?? false}
                        showSearch
                        showCheckAll={filter.multiSelect ?? false}
                    />
                ) : (
                    <>
                        <div>

                            <Select small
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
                                    <option key={operator.value} value={operator.value}>
                                        {operator.label}
                                    </option>
                                ))}
                            </Select>

                        </div>

                        {!isBlankOperator && (
                            <Search
                                css="dropdown__search"
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
                                css="dropdown__search"
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
        </Dropdown>
    );
}