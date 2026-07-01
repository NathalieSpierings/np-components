import { AnimatePresence, motion } from "framer-motion";
import React, { ReactElement, ReactNode } from "react";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../../lib/utils/definitions";
import Checkbox from "../../../Forms/Checkbox/Checkbox";
import Icon from "../../../UI/Icons/Icon/Icon";
import { DatagridAction } from "../Config/DatagridAction";
import { DatagridColumnRuntime, DatagridRenderedColumn } from "../Datagrid";

export interface DatagridRowProps<TData extends { id: string | number }> {
    item: TData;
    selected: boolean;
    expanded: boolean;
    rowActions: DatagridAction<TData>[];
    renderedColumns: DatagridRenderedColumn<TData>[];
    gridTemplateColumns: string;
    checkedItems?: TData[];
    onRowsChecked?: (checkedItems: TData[]) => void;
    useCheckboxes: boolean;
    collapsibleRowData?: (item: TData) => ReactElement;
    toggleCollapsibleRow: (id: string | number) => void;
    rowSingleClickAction?: (item: TData) => void;
    rowDoubleClickAction?: (item: TData) => void;
    resizing: {
        prop: string;
        startX: number;
        startWidth: number;
    } | null;
 renderColumnValue: (item: TData, column: DatagridColumnRuntime<TData>) => ReactNode;
    firstPinnedRight?: string;
    lastPinnedLeft?: string;
    getPinnedStyle: (column: DatagridRenderedColumn<TData>) => React.CSSProperties;
}

export function DatagridRow<TData extends { id: string | number; }>({
    item,
    selected,
    expanded,
    rowActions,
    renderedColumns,
    gridTemplateColumns,   
    useCheckboxes,
    checkedItems = [],
    onRowsChecked,
    collapsibleRowData,
    toggleCollapsibleRow,
    rowSingleClickAction,
    rowDoubleClickAction,
    resizing,
    renderColumnValue,
    firstPinnedRight,
    lastPinnedLeft,
    getPinnedStyle,

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

                {renderedColumns.map((renderedColumn) => {

                    let pinnedClass = "";
                    if (renderedColumn.pinned === "left") {
                        pinnedClass = "datagrid__grid__cell--pinned-left";
                    } else if (renderedColumn.pinned === "right") {
                        pinnedClass = "datagrid__grid__cell--pinned-right";
                    }

                     if (onRowsChecked && renderedColumn.type === "checkbox") {
                        return (
                            <div
                                key={`${item.id}-${renderedColumn.key}`}
                                data-column-key={renderedColumn.key}
                                className={[
                                    "datagrid__grid__cell",
                                    "datagrid__grid__cell--center",
                                    pinnedClass,
                                ].filter(Boolean).join(" ")}
                                style={getPinnedStyle(renderedColumn)}
                            >
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
                        );
                    }

                    if (renderedColumn.type === "collapsible") {
                        return (
                            <div
                                key={`${item.id}-${renderedColumn.key}`}
                                data-column-key={renderedColumn.key}
                                className={[
                                    "datagrid__grid__cell",
                                    "datagrid__grid__cell--center",
                                    pinnedClass,
                                ].filter(Boolean).join(" ")}
                                style={getPinnedStyle(renderedColumn)}
                            >
                                <button
                                    type="button"
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
                        );
                    }                   

                    if (rowActions.length > 0 && renderedColumn.type === "rowActions") {
                        return (
                            <div
                                key={`${item.id}-${renderedColumn.key}`}
                                data-column-key={renderedColumn.key}
                                className={[
                                    "datagrid__grid__cell",
                                    renderedColumn.pinned === "right" ? "datagrid__grid__cell--right" : "",
                                    pinnedClass,
                                ].filter(Boolean).join(" ")}
                                style={getPinnedStyle(renderedColumn)}
                            >
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
                        );
                    }

                    const column = renderedColumn.column;

                    if (!column) {
                        return null;
                    }

                    const css = [
                        "datagrid__grid__cell",
                        pinnedClass,
                        column.prop === lastPinnedLeft ? "datagrid__grid__cell--pinned-left--last" : "",
                        column.prop === firstPinnedRight ? "datagrid__grid__cell--pinned-right--first" : "",
                        resizing?.prop === column.prop ? "datagrid__grid--resizing" : "",
                    ].filter(Boolean).join(" ");

                    return (
                        <div
                            key={`${item.id}-${renderedColumn.key}`}
                            className={css}
                            data-column-key={renderedColumn.key}
                            style={getPinnedStyle(renderedColumn)}
                        >
                            {renderColumnValue(item, column)}
                        </div>
                    );

                })}

            </div>

            <AnimatePresence initial={false}>
                {expanded && collapsibleRowData && (
                    <div className="datagrid__grid__collapsible">
                        <div >
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                style={{ overflow: "hidden" }}
                                className="datagrid__grid__collapsible__row"
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