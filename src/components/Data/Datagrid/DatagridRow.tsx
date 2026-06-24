import React, { ReactElement, ReactNode } from "react";
import { DatagridColumnRuntime, DatagridRowActionsPosition } from "./Datagrid";
import { DatagridAction } from "./Config/DatagridAction";
import Icon from "../../UI/Icons/Icon/Icon";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import Checkbox from "../../Forms/Checkbox/Checkbox";
import { AnimatePresence, motion } from "framer-motion";

export interface DatagridRowProps<TData extends { id: string | number }> {
    item: TData;
    selected: boolean;
    expanded: boolean;

    visibleColumns: DatagridColumnRuntime<TData>[];
    gridTemplateColumns: string;

    rowActions: DatagridAction<TData>[];
    rowActionPosition: DatagridRowActionsPosition;

    checkedItems: TData[];
    useCheckboxes: boolean;

    collapsibleRowData?: (item: TData) => ReactElement;

    rowSingleClickAction?: (item: TData) => void;
    rowDoubleClickAction?: (item: TData) => void;
    onRowsChecked?: (checkedItems: TData[]) => void;

    resizing: {
        prop: string;
        startX: number;
        startWidth: number;
    } | null;

    renderValue: (
        item: TData,
        column: DatagridColumnRuntime<TData>
    ) => ReactNode;

    getPinnedStyle: (
        column: DatagridColumnRuntime<TData>
    ) => React.CSSProperties;

    toggleCollapsibleRow: (id: string | number) => void;
}

export function DatagridRow<TData extends { id: string | number; }>({
    item,
    visibleColumns,
    renderValue,
    gridTemplateColumns,
    rowActions,
    rowActionPosition,
    expanded,

    checkedItems,
    useCheckboxes,
    onRowsChecked,
    selected,
    rowSingleClickAction,
    rowDoubleClickAction,
    resizing,
    getPinnedStyle,

    collapsibleRowData,
    toggleCollapsibleRow,


}: Readonly<DatagridRowProps<TData>>): ReactElement {

      // Checkbox handling
    const handleCheckedItems = (items: TData[]) => {
        onRowsChecked?.(items);
    };
    
  
    return (
        <div key={item.id}>
            <div                
                className={["datagrid__grid__row", selected ? "selected" : ""].join(" ")}
                style={{ gridTemplateColumns }}
                role="button"
                tabIndex={0}
                onClick={() => rowSingleClickAction?.(item)}
                onDoubleClick={() => rowDoubleClickAction?.(item)}
                onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        rowSingleClickAction?.(item);
                    }
                }}
            >

                {collapsibleRowData && (
                    <div className="datagrid__grid__cell datagrid__grid__cell--center">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleCollapsibleRow(item.id);
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            {expanded ? (
                                <Icon
                                    icon={IconDefinitions.angle_down}
                                    size={SizeDefinitions.Small}
                                    hoverBackground={ColorDefinitions.SurfaceLight}
                                />
                            ) : (
                                <Icon
                                    icon={IconDefinitions.angle_right}
                                    size={SizeDefinitions.Small}
                                    hoverBackground={ColorDefinitions.SurfaceLight}
                                />
                            )}
                        </button>
                    </div>
                )}


                {onRowsChecked && (
                    <div className="datagrid__grid__cell datagrid__grid__cell--center">
                        <Checkbox color={ColorDefinitions.Accent}
                            checked={checkedItems.some((x) => x.id === item.id)}
                            onChange={
                                useCheckboxes
                                    ? (checked) =>
                                        handleCheckedItems(
                                            checked
                                                ? [...checkedItems, item]
                                                : checkedItems.filter((x) => x.id !== item.id)
                                        )
                                    : undefined
                            } />
                    </div>
                )}

                {/* Row actions */}
                {rowActions.length > 0 && rowActionPosition === 'left' && (
                    <div className="datagrid__grid__cell">
                        {rowActions.map((action, index) => {
                            const disabled = action.disabled?.(item) ?? false;

                            if (action.element) {
                                return (
                                    <React.Fragment key={action.label ?? index}>
                                        {action.element(item)}
                                    </React.Fragment>
                                );
                            }

                            return (
                                <button
                                    key={action.label ?? index}
                                    type="button"
                                    disabled={disabled}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        action.action?.(item, async () => undefined);
                                    }}
                                >
                                    {action.icon}
                                    {action.label}
                                </button>
                            );
                        })}
                    </div>
                )}


                {visibleColumns.map((column) => (
                    <div key={`${item.id}-${column.prop}`}
                        className={[
                            "datagrid__grid__cell",
                            column.pinned === "left" ? "datagrid__grid__cell--pinned-left" : "",
                            column.pinned === "right" ? "datagrid__grid__cell--pinned-right" : "",
                            resizing?.prop === column.prop ? "datagrid__grid--resizing" : ""
                        ].join(" ")}
                        data-column-key={column.prop}
                        style={getPinnedStyle(column)}
                    >
                        {renderValue(item, column)}
                    </div>
                ))}

                {/* Row actions */}
                {rowActions.length > 0 && rowActionPosition === 'right' && (
                    <div className="datagrid__grid__cell datagrid__grid__cell--right">
                        {rowActions.map((action, index) => {
                            const disabled = action.disabled?.(item) ?? false;

                            if (action.element) {
                                return (
                                    <React.Fragment key={action.label ?? index}>
                                        {action.element(item)}
                                    </React.Fragment>
                                );
                            }

                            return (
                                <button
                                    key={action.label ?? index}
                                    type="button"
                                    disabled={disabled}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        action.action?.(item, async () => undefined);
                                    }}
                                >
                                    {action.icon}
                                    {action.label}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            <AnimatePresence initial={false}>
                {expanded && collapsibleRowData && (
                    <div className="expanded-row">
                        <div >
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                style={{ overflow: "hidden" }}
                                className="expanded-row__container"
                            >
                                {collapsibleRowData(item)}
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}