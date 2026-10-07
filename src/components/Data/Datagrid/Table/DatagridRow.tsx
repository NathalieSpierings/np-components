import { AnimatePresence, motion } from "framer-motion";
import React, { ReactElement } from "react";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../../lib/utils/definitions";
import Checkbox from "../../../Forms/Checkbox/Checkbox";
import Icon from "../../../UI/Icons/Icon/Icon";
import Tooltip from "../../../UI/Tooltip/Tooltip";
import { DatagridAction } from "../Config/DatagridAction";
import { DatagridRenderedColumn } from "../Datagrid";
import { DatagridTableProps } from "./DatagridTable";


export type DatagridRowInheritedProps<
    TData extends { id: string | number }
> = Pick<
    DatagridTableProps<TData>,
    | "rowActions"
    | "renderedColumns"
    | "checkedItems"
    | "onRowsChecked"
    | "useCheckboxes"
    | "collapsibleRowData"
    | "hasCollapsibleRow"
    | "toggleCollapsibleRow"
    | "rowSingleClickAction"
    | "rowDoubleClickAction"
    | "resizing"
    | "renderColumnValue"
    | "firstPinnedRight"
    | "lastPinnedLeft"
    | "getPinnedStyle"
    | "lastColumnIndex"
>;

export interface DatagridRowProps<
    TData extends { id: string | number }
> extends DatagridRowInheritedProps<TData> {
    item: TData;
    // Unique identity of this row (getRowKey(item) or item.id)
    rowKey: string | number;
    resolveRowKey: (row: TData) => string | number;
    selected: boolean;
    expanded: boolean;
}

export type RenderDataCellContext<TData extends { id: string | number }> =
    Pick<
        DatagridRowProps<TData>,
        | "item"
        | "resizing"
        | "renderColumnValue"
        | "firstPinnedRight"
        | "lastPinnedLeft"
        | "getPinnedStyle"
        | "lastColumnIndex"
    >;



export function DatagridRow<
    TData extends { id: string | number }
>({
    item,
    rowKey,
    resolveRowKey,
    selected,
    expanded,
    rowActions,
    renderedColumns,
    useCheckboxes,
    checkedItems = [],
    onRowsChecked,
    collapsibleRowData,
    hasCollapsibleRow,
    toggleCollapsibleRow,
    rowSingleClickAction,
    rowDoubleClickAction,
    resizing,
    renderColumnValue,
    firstPinnedRight,
    lastPinnedLeft,
    getPinnedStyle,
    lastColumnIndex
}: Readonly<DatagridRowProps<TData>>): ReactElement {

    const canCollapse =
        !!collapsibleRowData &&
        (hasCollapsibleRow?.(item) ?? true);

    return (
        <>
            <div
                className={[
                    "datagrid__row",
                    selected
                        ? "datagrid__row--selected"
                        : ""
                ].filter(Boolean).join(" ")}
                role="none"
                onClick={() => rowSingleClickAction?.(item)}
                onDoubleClick={() => rowDoubleClickAction?.(item)}
                onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        rowSingleClickAction?.(item);
                    }
                }}
            >
                {renderedColumns.map(
                    (renderedColumn, index) => {

                        if (useCheckboxes && onRowsChecked && renderedColumn.type === "checkbox") {
                            return renderCheckbox(
                                renderedColumn,
                                item,
                                rowKey,
                                resolveRowKey,
                                checkedItems,
                                onRowsChecked,
                                getPinnedStyle
                            );
                        }

                        if (renderedColumn.type === "collapsible") {
                            if (!canCollapse) {
                                return renderEmptyCollapsibleCell(
                                    renderedColumn,
                                    item,
                                    getPinnedStyle
                                );
                            }

                            return renderCollapsible(
                                renderedColumn,
                                item,
                                rowKey,
                                expanded,
                                toggleCollapsibleRow,
                                getPinnedStyle
                            );
                        }

                        if (rowActions.length > 0 && renderedColumn.type === "rowActions") {
                            return renderRowActions(
                                renderedColumn,
                                index,
                                item,
                                rowActions,
                                lastColumnIndex,
                                getPinnedStyle
                            );
                        }

                        return renderDataCell(
                            renderedColumn,
                            index,
                            {
                                item,
                                resizing,
                                renderColumnValue,
                                firstPinnedRight,
                                lastPinnedLeft,
                                getPinnedStyle,
                                lastColumnIndex
                            }
                        );
                    }
                )}
            </div>

            <AnimatePresence initial={false}>
                {canCollapse && expanded && collapsibleRowData && (
                    <div className="datagrid__row datagrid__row--collapsible"
                    >
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                                duration: 0.25,
                                ease: "easeInOut"
                            }}
                            style={{ overflow: "hidden" }}
                            className="datagrid__collapsible"
                        >
                            <div className="datagrid__collapsible__content">
                                {React.createElement(collapsibleRowData, { item })}
                            </div>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </>
    );
}


function getPinnedClass<TData>(
    renderedColumn: DatagridRenderedColumn<TData>
): string {
    if (renderedColumn.pinned === "left") {
        return "datagrid__cell--pinned-left";
    }

    if (renderedColumn.pinned === "right") {
        return "datagrid__cell--pinned-right";
    }

    return "";
}

function renderCheckbox<TData extends { id: string | number }>(
    renderedColumn: DatagridRenderedColumn<TData>,
    item: TData,
    rowKey: string | number,
    resolveRowKey: (row: TData) => string | number,
    checkedItems: TData[],
    onRowsChecked: (checkedItems: TData[]) => void,
    getPinnedStyle: (
        column: DatagridRenderedColumn<TData>
    ) => React.CSSProperties
): ReactElement {

    const checked = checkedItems.some(
        (checkedItem) => resolveRowKey(checkedItem) === rowKey
    );

    const handleChange = (isChecked: boolean) => {
        const nextCheckedItems = isChecked
            ? [...checkedItems, item]
            : checkedItems.filter(
                (checkedItem) => resolveRowKey(checkedItem) !== rowKey
            );

        onRowsChecked(nextCheckedItems);
    };

    return (
        <button
            type="button"
            key={`${item.id}-${renderedColumn.key}`}
            data-column-key={renderedColumn.key}
            className={[
                "datagrid__cell",
                "datagrid__cell--center",
                getPinnedClass(renderedColumn)
            ].filter(Boolean).join(" ")}
            style={getPinnedStyle(renderedColumn)}
            onClick={(event) => event.stopPropagation()}
        >
            <Checkbox
                color={ColorDefinitions.Accent}
                checked={checked}
                onChange={handleChange}
            />
        </button>
    );
}

function renderEmptyCollapsibleCell<TData extends { id: string | number }>(
    renderedColumn: DatagridRenderedColumn<TData>,
    item: TData,
    getPinnedStyle: (
        column: DatagridRenderedColumn<TData>
    ) => React.CSSProperties
): ReactElement {

    return (
        <div
            key={`${item.id}-${renderedColumn.key}`}
            data-column-key={renderedColumn.key}
            className={[
                "datagrid__cell",
                "datagrid__cell--center",
                getPinnedClass(renderedColumn)
            ].filter(Boolean).join(" ")}
            style={getPinnedStyle(renderedColumn)}
        >
            <Icon size={SizeDefinitions.Small} />
        </div>
    );
}

function renderCollapsible<TData extends { id: string | number }>(
    renderedColumn: DatagridRenderedColumn<TData>,
    item: TData,
    rowKey: string | number,
    expanded: boolean,
    toggleCollapsibleRow: (id: string | number) => void,
    getPinnedStyle: (
        column: DatagridRenderedColumn<TData>
    ) => React.CSSProperties
): ReactElement {
    return (
        <div
            key={`${item.id}-${renderedColumn.key}`}
            data-column-key={renderedColumn.key}
            className={[
                "datagrid__cell",
                "datagrid__cell--center",
                getPinnedClass(renderedColumn)
            ].filter(Boolean).join(" ")}
            style={getPinnedStyle(renderedColumn)}
        >
            <button
                type="button"
                onClick={(event) => {
                    event.stopPropagation();
                    toggleCollapsibleRow(rowKey);
                }}
                style={{ cursor: "pointer" }}
            >
                <Icon
                    icon={
                        expanded
                            ? IconDefinitions.angle_down
                            : IconDefinitions.angle_right
                    }
                    size={SizeDefinitions.Small}
                    hoverBackground={ColorDefinitions.SurfaceLight}
                />
            </button>
        </div>
    );
}

function renderRowActions<TData extends { id: string | number }>(
    renderedColumn: DatagridRenderedColumn<TData>,
    index: number,
    item: TData,
    rowActions: DatagridAction<TData>[],
    lastColumnIndex: number,
    getPinnedStyle: (
        column: DatagridRenderedColumn<TData>
    ) => React.CSSProperties
): ReactElement {
    return (
        <div
            key={`${item.id}-${renderedColumn.key}`}
            data-column-key={renderedColumn.key}
            className={[
                "datagrid__cell",
                renderedColumn.pinned === "right"
                    ? "datagrid__cell--right"
                    : "",
                index === lastColumnIndex
                    ? "datagrid__cell--last-column"
                    : "",
                getPinnedClass(renderedColumn)
            ].filter(Boolean).join(" ")}
            style={getPinnedStyle(renderedColumn)}
        >
            {rowActions.map((action, actionIndex) => {
                const disabled =
                    action.disabled?.(item) ?? false;

                if (action.element) {
                    return (
                        <React.Fragment
                            key={action.label ?? actionIndex}
                        >
                            {action.element(item)}
                        </React.Fragment>
                    );
                }

                return (
                    <button
                        key={action.label ?? actionIndex}
                        type="button"
                        disabled={disabled}
                        onClick={(event) => {
                            event.stopPropagation();
                            action.action?.(item);
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

function renderDataCell<TData extends { id: string | number }>(
    renderedColumn: DatagridRenderedColumn<TData>,
    index: number,
    context: RenderDataCellContext<TData>
): ReactElement | null {
    const {
        item,
        resizing,
        renderColumnValue,
        firstPinnedRight,
        lastPinnedLeft,
        getPinnedStyle,
        lastColumnIndex
    } = context;

    const column = renderedColumn.column;

    if (!column) {
        return null;
    }

    const css = [
        "datagrid__cell",
        index === lastColumnIndex ? "datagrid__cell--last-column" : "",
        getPinnedClass(renderedColumn),
        column.prop === lastPinnedLeft ? "datagrid__cell--pinned-left--last" : "", column.prop === firstPinnedRight
            ? "datagrid__cell--pinned-right--first" : "", resizing?.prop === column.prop
            ? "datagrid--resizing" : ""
    ].filter(Boolean).join(" ");

    const value = (
        <div className="datagrid__cell__content__label">
            {renderColumnValue(item, column)}
        </div>
    );

    return (
        <div
            key={`${item.id}-${renderedColumn.key}`}
            className={css}
            data-column-key={renderedColumn.key}
            style={getPinnedStyle(renderedColumn)}
        >
            <div className="datagrid__cell__content">
                {column.showTooltip ? (
                    <Tooltip
                        overflowTooltip
                        content={column.tooltipContent ?? undefined}
                    >
                        {value}
                    </Tooltip>
                ) : (
                    value
                )}
            </div>
        </div>
    );
}
