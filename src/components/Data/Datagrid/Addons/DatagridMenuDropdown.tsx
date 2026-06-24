import React, { ReactElement, ReactNode, useState } from "react";
import { IconDefinitions, SizeDefinitions } from "../../../../lib/utils/definitions";
import { Dropdown } from "../../../Forms/Dropdown/Dropdown";
import { DropdownMenu } from "../../../Forms/Dropdown/DropdownMenu";
import Icon from "../../../UI/Icons/Icon/Icon";
import { DatagridSortConfig } from "../Config/DatagridSort";
import { DatagridColumnRuntime } from "../Datagrid";

interface DatagridMenuDropdownProps<TData> {
    column: DatagridColumnRuntime<TData>;
    sort?: DatagridSortConfig;
    setSort: React.Dispatch<React.SetStateAction<DatagridSortConfig | undefined>>;
    updateColumnState: (
        prop: string,
        update: Partial<Pick<DatagridColumnRuntime<TData>, "width" | "visible" | "pinned">>
    ) => void;
    resetColumns: () => void;
    renderColumnChooser: () => ReactNode;
    enableColumnChooserInDropdown?: boolean;
}



export function DatagridMenuDropdown<TData>({
    column,
    sort,
    setSort,
    updateColumnState,
    resetColumns,
    renderColumnChooser,
    enableColumnChooserInDropdown,
}: Readonly<DatagridMenuDropdownProps<TData>>): ReactElement {

    const [open, setOpen] = useState(false);
  

    const menuItems = [
        {
            icon: <Icon icon={IconDefinitions.arrow_up} size={SizeDefinitions.Small} />,
            label: "Sorteer oplopend",
            selected: sort?.prop === column.prop && sort.order === "asc",
            onClick: () => setSort({ prop: column.prop, order: "asc" }),
        },
        {
            icon: <Icon icon={IconDefinitions.arrow_down} size={SizeDefinitions.Small} />,
            label: "Sorteer aflopend",
            selected: sort?.prop === column.prop && sort.order === "desc",
            onClick: () => setSort({ prop: column.prop, order: "desc" }),
        },
        { divider: true },
        {
            icon: <Icon icon={IconDefinitions.pin} size={SizeDefinitions.Small} />,
            label: "Pin column",
            items: [
                {
                    icon: column.pinned === null
                        ? <Icon icon={IconDefinitions.checkmark} size={SizeDefinitions.Small} />
                        : undefined,
                    label: <span>Niet vastzetten</span>,
                    selected: column.pinned === null,
                    onClick: () => updateColumnState(column.prop, { pinned: null }),
                },
                {
                    icon: column.pinned === "left"
                        ? <Icon icon={IconDefinitions.checkmark} size={SizeDefinitions.Small} />
                        : undefined,
                    label: <span>Links vastzetten</span>,
                    selected: column.pinned === "left",
                    onClick: () => updateColumnState(column.prop, { pinned: "left" }),
                },
                {
                    icon: column.pinned === "right"
                        ? <Icon icon={IconDefinitions.checkmark} size={SizeDefinitions.Small} />
                        : undefined,
                    label: <span>Rechts vastzetten</span>,
                    selected: column.pinned === "right",
                    onClick: () => updateColumnState(column.prop, { pinned: "right" }),
                },
            ],
        },
        {
            label: "Autosize",
            onClick: () =>
                updateColumnState(column.prop, {
                    width: Math.max(120, column.title.length * 20),
                }),
        },
        { divider: true },
        {
            label: "Reset kolommen",
            onClick: resetColumns,
        },
    ];

    const tabs = [
        { id: "tabMenu", title: "Menu" },
        ...(enableColumnChooserInDropdown
            ? [{ id: "tabColumns", title: "Kolommen" }]
            : []),
    ];

    const tabPanes = [
        {
            tabId: "tabMenu",
            content: <DropdownMenu items={menuItems} />,
        },
        ...(enableColumnChooserInDropdown
            ? [{
                tabId: "tabColumns",
                content: renderColumnChooser(),
            }]
            : []),
    ];

    return (
        <Dropdown
            isOpen={open}
            onOpenChange={setOpen}
            dropdownToggle={{
                label: (
                    <Icon
                        icon={IconDefinitions.ellipsis_h}
                        size={SizeDefinitions.Small}
                    />
                ),
            }}
            tabs={tabs}
            tabPanes={tabPanes}
        />
    );
}

export default DatagridMenuDropdown;
