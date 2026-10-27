import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../../lib/utils/definitions";
import Dropdown from "../../../Forms/Dropdown/Dropdown";
import Button from "../../../UI/Button/Button";
import Icon from "../../../UI/Icons/Icon/Icon";
import Tooltip from "../../../UI/Tooltip/Tooltip";
import { DatagridRowConfig } from "../Config/DatagridRowConfig";
import { DatagridColumnFilterValue, isActiveColumnFilter } from "./DatagridColumnFilter";
import DatagridFilterEditor from "./DatagridFilterEditor";

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

    if (!column.filter) {
        return null;
    }

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
                            <Button variant="ghost" color={ColorDefinitions.Rose30} onClick={() => onChange(undefined)} size={SizeDefinitions.Small} >
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
                <DatagridFilterEditor column={column} dataRaw={dataRaw} value={value} onChange={onChange} searchCss="dropdown__search" />
            </div>
        </Dropdown>
    );
}
