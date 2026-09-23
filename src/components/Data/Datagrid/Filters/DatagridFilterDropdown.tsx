import { useMemo } from "react";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../../lib/utils/definitions";
import Search from "../../../Base/Search/Search";
import Dropdown from "../../../Forms/Dropdown/Dropdown";
import Multiselect, { MultiselectItem } from "../../../Forms/Multiselect/Multiselect";
import { Select } from "../../../Forms/Select/Select";
import Button from "../../../UI/Button/Button";
import Icon from "../../../UI/Icons/Icon/Icon";
import Tooltip from "../../../UI/Tooltip/Tooltip";
import { DatagridRowConfig } from "../Config/DatagridRowConfig";
import { DatagridColumnFilterValue, DatagridFilterOption, getUniqueFilterOptions, isActiveColumnFilter } from "./DatagridColumnFilter";
import { getDefaultOperator, getOperators } from "./DatagridFilterOperators";

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
        if (!filter) {
            return [];
        }

        if (filter.options) {
            return getUniqueFilterOptions(filter.options);
        }

        if (filter.optionsSource && dataRaw) {
            return filter.optionsSource(dataRaw).map((item) =>
                filter.mapOption
                    ? filter.mapOption(item)
                    : {
                        label: String(item),
                        value: String(item)
                    }
            );
        }

        return [];
    }, [filter, dataRaw]);

    const multiselectItems = useMemo<MultiselectItem[]>(() => {
        return options.map((option) => ({
            id: option.value,
            content: option.label
        }));
    }, [options]);

    if (!filter) {
        return null;
    }

    const defaultOperator = getDefaultOperator(filter.type);

    const update = (
        patch: Partial<DatagridColumnFilterValue>
    ) => {
        onChange({
            operator: value?.operator ?? defaultOperator,
            ...value,
            ...patch,
        });
    };


    const clear = () => {
        onChange(undefined);
    };



    const isBlankOperator =
        value?.operator === "blank" ||
        value?.operator === "notBlank";

    const isBetweenOperator =
        value?.operator === "between";

    const active = isActiveColumnFilter(value);

    return (
        <Dropdown
            dropdownToggle={{
                prefix: (<Icon icon={IconDefinitions.filter} color={active ? ColorDefinitions.Primary : undefined} />),
                label: enableDropdownToggleLabel ? column.title : undefined,
            }}
            dropdownFooter={{
                content: (
                    <div>
                        <Tooltip content="Filter wissen">
                            <Button variant="ghost" color={ColorDefinitions.Rose30} onClick={clear} size={SizeDefinitions.Small} >
                                <Icon icon={IconDefinitions.funnel_cross} />
                                Filter wissen
                            </Button>
                        </Tooltip>
                    </div>
                ),
                border: true
            }}

        >
            <div className="datagrid__filter__dropdown">
                {filter.type === "select" ? (
                    <Multiselect
                        items={multiselectItems}
                        selected={value?.values ?? []}
                        onSelectionChange={(selected) => {
                            const values = selected.map(String);

                            onChange(
                                values.length > 0 ? { values } : undefined
                            );
                        }}
                        selectMultiple={
                            filter.multiSelect ?? false
                        }
                        enableSearch
                        enableCheckAll={filter.multiSelect ?? false}
                    />
                ) : (
                    <>
                        <div>
                            <Select
                                small
                                value={value?.operator ?? getDefaultOperator(filter.type) ?? ""}
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
