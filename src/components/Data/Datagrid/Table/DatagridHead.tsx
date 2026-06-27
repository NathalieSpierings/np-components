import React, { ReactElement, ReactNode, RefObject, useState } from "react";
import DatagridMenuDropdown from "../Addons/DatagridMenuDropdown";
import { DatagridAction } from "../Config/DatagridAction";
import { DatagridSortConfig } from "../Config/DatagridSort";
import { DatagridColumnRuntime, DatagridRenderedColumn, DatagridRowActionsPosition } from "../Datagrid";
import Checkbox from "../../../Forms/Checkbox/Checkbox";
import { ColorDefinitions } from "../../../../lib/utils/definitions";
import { DatagridColumnFilterValue } from "../Filters/DatagridColumnFilter";
import DatagridFilterDropdown from "../Filters/DatagridFilterDropdown";


export interface DatagridHeadProps<TData> {
    gridRef: React.RefObject<HTMLDivElement | null>;
    data: TData[];
    dataRaw?: TData[];
    rowActions: DatagridAction<TData>[];
    rowActionPosition?: DatagridRowActionsPosition,
    enableColumnResize: boolean;
    enableColumnReorder: boolean;
    enableStickyHeader?: boolean;
    enableMenuOptionsInHeader?: boolean;
    enableMenuOptionColumnChooser?: boolean;
    enableFiltersInHeader?: boolean;
    checkedItems?: TData[];
    onRowsChecked?: (checkedItems: TData[]) => void;
    useCheckboxes: boolean;
    collapsibleRowData?: (item: TData) => ReactElement;
    sort?: DatagridSortConfig;
    setSort: React.Dispatch<React.SetStateAction<DatagridSortConfig | undefined>>;
    renderedColumns: DatagridRenderedColumn<TData>[];
    gridTemplateColumns: string;
    resizing: {
        prop: string;
        startX: number;
        startWidth: number;
    } | null;
    setResizing: React.Dispatch<
        React.SetStateAction<{
            prop: string;
            startX: number;
            startWidth: number;
        } | null>
    >;
    setColumns: React.Dispatch<React.SetStateAction<DatagridColumnRuntime<TData>[]>>;
    updateColumnState: (
        prop: string,
        update: Partial<
            Pick<DatagridColumnRuntime<TData>, "width" | "visible" | "pinned">
        >
    ) => void;
    resetColumns: () => void;
    renderColumnChooser: () => ReactNode;
    createDragPreview: (label: string) => void;
    moveDragPreview: (event: DragEvent | React.DragEvent) => void;
    removeDragPreview: () => void;
    dragProp: React.RefObject<string | null>;
    lastDragTargetProp: React.RefObject<string | null>;
    firstPinnedRight?: string;
    lastPinnedLeft?: string;
    getPinnedStyle: (column: DatagridRenderedColumn<TData>) => React.CSSProperties;
    columnFilters: Record<string, DatagridColumnFilterValue | undefined>;
    setColumnFilters: React.Dispatch<React.SetStateAction<Record<string, DatagridColumnFilterValue | undefined>>>;
}

export function DatagridHead<TData>({
    gridRef,
    data,
    dataRaw,
    rowActions,
    rowActionPosition,
    enableColumnResize,
    enableColumnReorder,
    enableStickyHeader,
    enableMenuOptionsInHeader,
    enableMenuOptionColumnChooser,
    enableFiltersInHeader,
    checkedItems = [],
    onRowsChecked,
    useCheckboxes,
    collapsibleRowData,
    sort,
    setSort,
    renderedColumns,
    gridTemplateColumns,
    resizing,
    setResizing,
    setColumns,
    updateColumnState,
    resetColumns,
    renderColumnChooser,
    createDragPreview,
    moveDragPreview,
    removeDragPreview,
    dragProp,
    lastDragTargetProp,
    firstPinnedRight,
    lastPinnedLeft,
    getPinnedStyle,
    columnFilters,
    setColumnFilters,
}: Readonly<DatagridHeadProps<TData>>): ReactElement {

    const [dropdownResetKey, setDropdownResetKey] = useState(0);

    const closeHeaderDropdowns = () => {
        setDropdownResetKey((current) => current + 1);
    };

    const handleSorting = (prop: string) => {
        setSort(
            sort?.prop === prop
                ? { prop, order: sort.order === "asc" ? "desc" : "asc" }
                : { prop, order: "asc" }
        );
    };

    const startResize = (
        event: React.PointerEvent<HTMLSpanElement>,
        column: DatagridColumnRuntime<TData>
    ) => {
        event.preventDefault();
        event.stopPropagation();

        closeHeaderDropdowns();

        event.currentTarget.setPointerCapture?.(event.pointerId);

        setResizing({
            prop: column.prop,
            startX: event.clientX,
            startWidth: column.width,
        });
    };

    const getColumnRects = () => {
        const rects = new Map<string, DOMRect>();

        gridRef.current
            ?.querySelectorAll<HTMLElement>(".datagrid__grid__hcell")
            .forEach((cell) => {
                const key = cell.dataset.columnKey;

                if (key) {
                    rects.set(key, cell.getBoundingClientRect());
                }
            });

        return rects;
    };

    const animateColumnReorder = (previousRects: Map<string, DOMRect>) => {
        const cells = gridRef.current?.querySelectorAll<HTMLElement>(
            ".datagrid__grid__hcell, .datagrid__grid__cell"
        );

        cells?.forEach((cell) => {
            const key = cell.dataset.columnKey;
            if (!key) return;

            const previous = previousRects.get(key);
            if (!previous) return;

            const current = cell.getBoundingClientRect();
            const deltaX = previous.left - current.left;

            if (!deltaX) return;

            cell.animate(
                [
                    { transform: `translateX(${deltaX}px)` },
                    { transform: "translateX(0)" },
                ],
                {
                    duration: 180,
                    easing: "cubic-bezier(.2, 0, .2, 1)",
                }
            );
        });
    };

    const moveColumnBefore = (draggedProp: string, targetProp: string) => {
        if (draggedProp === targetProp) return;

        closeHeaderDropdowns();

        const previousRects = getColumnRects();

        setColumns((current) => {
            const from = current.findIndex((c) => c.prop === draggedProp);
            const to = current.findIndex((c) => c.prop === targetProp);

            if (from === -1 || to === -1 || from === to) return current;

            const updated = [...current];
            const [moved] = updated.splice(from, 1);
            updated.splice(to, 0, moved);

            return updated;
        });

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                animateColumnReorder(previousRects);
            });
        });
    };

    const getCellStyle = (renderedColumn: DatagridRenderedColumn<TData>): React.CSSProperties => ({
        width: renderedColumn.width,
        minWidth: renderedColumn.width,
        maxWidth: renderedColumn.width,
        ...getPinnedStyle(renderedColumn),
    });

    return (
        <div className={`datagrid__grid__head ${enableStickyHeader ? "datagrid__grid__head--sticky" : ""}`}>
            <div className="datagrid__grid__row" style={{ gridTemplateColumns }}>

                {renderedColumns.map((renderedColumn) => {

                    const getPinnedClass = () => {
                        if (renderedColumn.pinned === "left") {
                            return "datagrid__grid__hcell--pinned-left";
                        }
                        if (renderedColumn.pinned === "right") {
                            return "datagrid__grid__hcell--pinned-right";
                        }
                        return "";
                    };

                    const pinnedClass = getPinnedClass();


                     if (useCheckboxes && renderedColumn.type === "checkbox") {
                        return (
                            <div
                                key={renderedColumn.key}
                                data-column-key={renderedColumn.key}
                                className={[
                                    "datagrid__grid__hcell",
                                    "datagrid__grid__hcell--center",
                                    pinnedClass,
                                ].filter(Boolean).join(" ")}
                                style={getCellStyle(renderedColumn)}
                            >
                                <Checkbox
                                    color={ColorDefinitions.Accent}
                                    checked={data.length > 0 && data.length === checkedItems.length}
                                    onChange={(checked) => onRowsChecked?.(checked ? data : [])}
                                />
                            </div>
                        );
                    }

                    if (collapsibleRowData && renderedColumn.type === "collapsible") {
                        return (
                            <div
                                key={renderedColumn.key}
                                data-column-key={renderedColumn.key}
                                className={[
                                    "datagrid__grid__hcell",
                                    "datagrid__grid__hcell--center",
                                    pinnedClass,
                                ].filter(Boolean).join(" ")}
                                style={getCellStyle(renderedColumn)}
                            />
                        );
                    }
                  
                    if (rowActions.length > 0 && renderedColumn.type === "rowActions") {
                        return (
                            <div
                                key={renderedColumn.key}
                                data-column-key={renderedColumn.key}
                                className={[
                                    "datagrid__grid__hcell",
                                    rowActionPosition === "right"
                                        ? "datagrid__grid__hcell--right"
                                        : "",
                                    pinnedClass,
                                ].filter(Boolean).join(" ")}
                                style={getCellStyle(renderedColumn)}
                            />
                        );
                    }

                    const column = renderedColumn.column;

                    if (!column) {
                        return null;
                    }

                    const isSorted = sort?.prop === column.prop;
                    const sortClass = isSorted ? sort.order : "";

                    const css = [
                        "datagrid__grid__hcell",
                        pinnedClass,
                        column.prop === lastPinnedLeft ? "datagrid__grid__hcell--pinned-left--last" : "",
                        column.prop === firstPinnedRight ? "datagrid__grid__hcell--pinned-right--first" : "",
                        resizing?.prop === column.prop ? "datagrid__grid--resizing" : "",
                    ].filter(Boolean).join(" ");

                    return (
                        <div
                            key={renderedColumn.key}
                            data-key={column.prop}
                            data-column-key={renderedColumn.key}
                            className={css}
                            draggable={enableColumnReorder}
                            style={getCellStyle(renderedColumn)}
                            onDragStart={(e) => {
                                if (!enableColumnReorder) {
                                    e.preventDefault();
                                    return;
                                }

                                closeHeaderDropdowns();

                                if (
                                    (e.target as HTMLElement).closest(".datagrid__grid__hcell__resize-indicator") ||
                                    (e.target as HTMLElement).closest(".smart-datagrid__grid__hcell__menu")
                                ) {
                                    e.preventDefault();
                                    return;
                                }

                                dragProp.current = column.prop;
                                lastDragTargetProp.current = null;

                                createDragPreview(column.title);

                                const img = new Image();
                                img.src =
                                    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

                                e.dataTransfer.setDragImage(img, 0, 0);
                            }}
                            onDragOver={(e) => {
                                if (!enableColumnReorder) return;

                                e.preventDefault();
                                moveDragPreview(e);

                                if (!dragProp.current) return;
                                if (dragProp.current === column.prop) return;
                                if (lastDragTargetProp.current === column.prop) return;

                                lastDragTargetProp.current = column.prop;
                                moveColumnBefore(dragProp.current, column.prop);
                            }}
                            onDragEnd={() => {
                                removeDragPreview();
                                dragProp.current = null;
                                lastDragTargetProp.current = null;
                            }}
                        >
                            <div
                                className="datagrid__grid__hcell__content"
                                onClick={() => handleSorting(column.prop)}
                            >
                                <span className="datagrid__grid__hcell__content__label">
                                    {column.title}
                                </span>
                                <span
                                    className={[
                                        "datagrid__grid__hcell__sort-indicator",
                                        sortClass,
                                    ].join(" ")}
                                />
                            </div>

                            {enableFiltersInHeader && column.filter && (
                                <div className="datagrid__grid__hcell__icon">
                                    <DatagridFilterDropdown
                                        key={`filter-${dropdownResetKey}-${column.prop}`}
                                        column={column}
                                        dataRaw={dataRaw}
                                        value={columnFilters[column.prop]}
                                        onChange={(value) =>
                                            setColumnFilters((current) => {
                                                const next = { ...current };

                                                if (!value) {
                                                    delete next[column.prop];
                                                } else {
                                                    next[column.prop] = value;
                                                }

                                                return next;
                                            })
                                        }
                                    />
                                </div>
                            )}

                            {enableMenuOptionsInHeader && (
                                <div className="datagrid__grid__hcell__icon">
                                    <DatagridMenuDropdown
                                        key={`menu-${dropdownResetKey}-${column.prop}`}
                                        column={column}
                                        sort={sort}
                                        setSort={setSort}
                                        updateColumnState={updateColumnState}
                                        resetColumns={resetColumns}
                                        renderColumnChooser={renderColumnChooser}
                                        enableColumnChooserInDropdown={enableMenuOptionColumnChooser}
                                    />
                                </div>
                            )}

                            {enableColumnResize && (
                                <span
                                    className="datagrid__grid__hcell__resize-indicator"
                                    onPointerDown={(e) => startResize(e, column)}
                                />
                            )}
                        </div>
                    );
                })}

            </div>
        </div>
    );
}

export default DatagridHead;