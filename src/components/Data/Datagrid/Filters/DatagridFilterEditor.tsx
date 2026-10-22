import { useMemo } from "react";
import Search from "../../../Base/Search/Search";
import Multiselect, { MultiselectItem } from "../../../Forms/Multiselect/Multiselect";
import { Select } from "../../../Forms/Select/Select";
import { DatagridColumnFilterType, DatagridColumnFilterValue, DatagridFilterOperator, getFilterOptions } from "./DatagridColumnFilter";
import { DatagridFilterProvider, DatagridFilterProviderProps, useDatagridFilter } from "./DatagridFilterContext";
import { getDefaultOperator, getOperators } from "./DatagridFilterOperators";

export interface DatagridFilterEditorProps<TData> extends Omit<DatagridFilterProviderProps<TData>, "children"> {
    /**
     * Extra CSS-class voor de zoekvelden van tekst-, nummer- en datumfilters.
     * Wordt niet gebruikt bij select-filters of een customPicker.
     */
    searchCss?: string;
}

/**
 * Invoer voor één kolomfilter: de customPicker als die is opgegeven, anders de standaard invoer voor het filtertype.
 * Stelt de filtercontext in, zodat een customPicker useDatagridFilter() kan gebruiken.
 */ 
export default function DatagridFilterEditor<TData>({ searchCss, ...providerProps }: Readonly<DatagridFilterEditorProps<TData>>) {
    return (
        <DatagridFilterProvider {...providerProps}>
            <DatagridFilterInput searchCss={searchCss} />
        </DatagridFilterProvider>
    );
}

function DatagridFilterInput({ searchCss }: Readonly<Pick<DatagridFilterEditorProps<unknown>, "searchCss">>) {
    const { filter } = useDatagridFilter();

    if (filter.customPicker) {
        return filter.customPicker;
    }

    if (filter.type === "select") {
        return <DatagridSelectFilter />;
    }

    return <DatagridOperatorFilter type={filter.type} searchCss={searchCss} />;
}

function DatagridSelectFilter() {
    const { filter, dataRaw, value, setValue } = useDatagridFilter();

    const multiselectItems = useMemo<MultiselectItem[]>(() => {
        return getFilterOptions(filter, dataRaw).map((option) => ({
            id: option.value,
            content: option.label
        }));
    }, [filter, dataRaw]);

    return (
        <Multiselect
            items={multiselectItems}
            selected={value?.values ?? []}
            onSelectionChange={(selected) => {
                const values = selected.map(String);

                setValue(values.length > 0 ? { values } : undefined);
            }}
            selectMultiple={filter.multiSelect ?? false}
            enableSearch
            enableCheckAll={filter.multiSelect ?? false}
        />
    );
}

interface DatagridOperatorFilterProps extends Pick<DatagridFilterEditorProps<unknown>, "searchCss"> {
    /**
     * Het filtertype, los doorgegeven zodat TypeScript weet dat het geen select-filter is.
     */
    type: Exclude<DatagridColumnFilterType, "select">;
}

function DatagridOperatorFilter({ type, searchCss }: Readonly<DatagridOperatorFilterProps>) {
    const { value, setValue } = useDatagridFilter();

    const update = (patch: Partial<DatagridColumnFilterValue>) => {
        setValue({
            operator: value?.operator ?? getDefaultOperator(type),
            ...value,
            ...patch,
        });
    };

    const isBlankOperator = value?.operator === "blank" || value?.operator === "notBlank";
    const isBetweenOperator = value?.operator === "between";

    return (
        <>
            <div>
                <Select
                    small
                    value={value?.operator ?? getDefaultOperator(type) ?? ""}
                    defaultLabel="Kies filter..."
                    onValueChange={(operator) =>
                        update({
                            operator: operator as DatagridFilterOperator,
                            value: "",
                            valueTo: "",
                        })
                    }
                >
                    {getOperators(type).map((operator) => (
                        <option key={operator.value} value={operator.value}>
                            {operator.label}
                        </option>
                    ))}
                </Select>
            </div>

            {!isBlankOperator && (
                <Search
                    css={searchCss}
                    type={type}
                    value={value?.value ?? ""}
                    placeholder="Zoeken..."
                    onChange={(text) => update({ value: text })}
                />
            )}

            {isBetweenOperator && (
                <Search
                    css={searchCss}
                    type={type}
                    value={value?.valueTo ?? ""}
                    placeholder="Tot en met..."
                    onChange={(text) => update({ valueTo: text })}
                />
            )}
        </>
    );
}
