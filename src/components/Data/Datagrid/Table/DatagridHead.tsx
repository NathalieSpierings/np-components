import React, { ReactElement, ReactNode, useState } from "react";
import { ColorDefinitions } from "../../../../lib/utils/definitions";
import Checkbox from "../../../Forms/Checkbox/Checkbox";
import Tooltip from "../../../UI/Tooltip/Tooltip";
import DatagridMenuDropdown from "../Addons/DatagridMenuDropdown";
import { DatagridSortConfig } from "../Config/DatagridSort";
import { DatagridColumnRuntime, DatagridRenderedColumn } from "../Datagrid";
import { DatagridColumnFilterValue } from "../Filters/DatagridColumnFilter";
import DatagridFilterDropdown from "../Filters/DatagridFilterDropdown";
import { DatagridTableProps } from "./DatagridTable";

export type SetSort = React.Dispatch<React.SetStateAction<DatagridSortConfig | undefined>>;
export type GetPinnedStyle<TData> = (column: DatagridRenderedColumn<TData>) => React.CSSProperties;

export type DatagridHeadInheritedProps<TData extends { id: string | number }> = Pick<
    DatagridTableProps<TData>,
    | "gridRef"
    | "data"
    | "dataRaw"
    | "rowActions"
    | "rowActionPosition"
    | "enableColumnResize"
    | "enableColumnReorder"
    | "enableColumnVisibility"
    | "enableColumnPinning"
    | "enableStickyHeader"
    | "enableColumnMenu"
    | "enableColumnMenuColumnVisibility"
    | "enableFiltersInHeader"
    | "checkedItems"
    | "onRowsChecked"
    | "useCheckboxes"
    | "collapsibleRowData"
    | "renderedColumns"
    | "gridTemplateColumns"
    | "resizing"
    | "setResizing"
    | "setColumns"
    | "firstPinnedRight"
    | "lastPinnedLeft"
    | "getPinnedStyle"
    | "columnFilters"
    | "setColumnFilters"
    | "lastColumnIndex"
>;

export interface DatagridHeadProps<TData extends { id: string | number }> extends DatagridHeadInheritedProps<TData> {
    sort?: DatagridSortConfig;
    setSort: React.Dispatch<React.SetStateAction<DatagridSortConfig | undefined>>;
    updateColumnState: (
        prop: string,
        update: Partial<
            Pick<
                DatagridColumnRuntime<TData>,
                "width" | "visible" | "pinned"
            >
        >
    ) => void;
    resetColumns: () => void;
    renderColumnChooser: () => ReactNode;
    createDragPreview: (label: string) => void;
    moveDragPreview: (event: DragEvent | React.DragEvent) => void;
    removeDragPreview: () => void;
    dragProp: React.RefObject<string | null>;
    lastDragTargetProp: React.RefObject<string | null>;
}

export type HandleDragOverContext<TData extends { id: string | number }> = Pick<
    DatagridHeadProps<TData>,
    | "enableColumnReorder"
    | "dragProp"
    | "lastDragTargetProp"
    | "moveDragPreview"
    | "gridRef"
    | "setColumns"
> & {
    setDropdownResetKey: React.Dispatch<React.SetStateAction<number>>;
};


export function DatagridHead<TData extends { id: string | number }>({
    gridRef,
    data,
    dataRaw,
    rowActions,
    rowActionPosition,
    enableColumnResize,
    enableColumnReorder,
    enableColumnVisibility,
    enableColumnPinning,
    enableStickyHeader,
    enableColumnMenu,
    enableColumnMenuColumnVisibility,
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
    lastColumnIndex
}: Readonly<DatagridHeadProps<TData>>): ReactElement {

    const [dropdownResetKey, setDropdownResetKey] = useState(0);

    return (
        <div className={`pc-layout__header datagrid__header-row datagrid__row ${enableStickyHeader ? "datagrid__header-row--sticky" : ""}`}>
            {renderedColumns.map(
                (renderedColumn, index) => {

                    if (useCheckboxes && renderedColumn.type === "checkbox") {
                        return renderCheckboxHeader(
                            renderedColumn,
                            data,
                            checkedItems,
                            onRowsChecked,
                            getPinnedStyle
                        );
                    }

                    if (collapsibleRowData && renderedColumn.type === "collapsible") {
                        return renderCollapsibleHeader(
                            renderedColumn,
                            getPinnedStyle
                        );
                    }

                    if (rowActions.length > 0 && renderedColumn.type === "rowActions") {
                        return renderRowActionsHeader(
                            renderedColumn,
                            index,
                            rowActionPosition,
                            lastColumnIndex,
                            getPinnedStyle
                        );
                    }

                    const column = renderedColumn.column;

                    if (!column) {
                        return null;
                    }

                    const sortClass =
                        sort?.prop === column.prop
                            ? sort.order
                            : "";

                    const css = [
                        "datagrid__hcell",
                        index === lastColumnIndex ? "datagrid__hcell--last-column" : "",
                        getPinnedClass(renderedColumn),
                        column.prop === lastPinnedLeft ? "datagrid__hcell--pinned-left--last" : "",
                        column.prop === firstPinnedRight ? "datagrid__hcell--pinned-right--first" : "",
                        resizing?.prop === column.prop ? "datagrid__hcell--resizing" : ""
                    ].filter(Boolean).join(" ");

                    return (
                        <div role="none"
                            key={renderedColumn.key}
                            data-key={column.prop}
                            data-column-key={renderedColumn.key}
                            className={css}
                            draggable={enableColumnReorder}
                            style={getCellStyle(
                                renderedColumn,
                                getPinnedStyle
                            )}
                            onDragStart={(event) => handleDragStart(
                                event,
                                column,
                                enableColumnReorder,
                                dragProp,
                                lastDragTargetProp,
                                createDragPreview,
                                setDropdownResetKey
                            )
                            }
                            onDragOver={(event) => handleDragOver(
                                event,
                                column,
                                {
                                    enableColumnReorder,
                                    dragProp,
                                    lastDragTargetProp,
                                    moveDragPreview,
                                    gridRef,
                                    setColumns,
                                    setDropdownResetKey
                                }
                            )
                            }
                            onDragEnd={() => handleDragEnd(
                                dragProp,
                                lastDragTargetProp,
                                removeDragPreview
                            )
                            }
                        >
                            <button type="button"
                                className="datagrid__hcell__content"
                                onClick={() => handleSorting(column.prop, sort, setSort)}
                            >
                                <Tooltip overflowTooltip>
                                    <span className="datagrid__hcell__content__label">
                                        {column.title}
                                    </span>
                                </Tooltip>

                                <span
                                    className={[
                                        "datagrid__hcell__sort-indicator",
                                        sortClass
                                    ].join(" ")}
                                />
                            </button>

                            {enableFiltersInHeader &&
                                column.filter && (
                                    <div className="datagrid__hcell__icon">
                                        <DatagridFilterDropdown
                                            key={`filter-${dropdownResetKey}-${column.prop}`}
                                            column={column}
                                            dataRaw={dataRaw}
                                            value={
                                                columnFilters[
                                                column.prop
                                                ]
                                            }
                                            onChange={(value) =>
                                                updateColumnFilter(
                                                    column.prop,
                                                    value,
                                                    setColumnFilters
                                                )
                                            }
                                        />
                                    </div>
                                )}

                            {enableColumnMenu && (
                                <div className="datagrid__hcell__icon">
                                    <DatagridMenuDropdown
                                        key={`menu-${dropdownResetKey}-${column.prop}`}
                                        enableColumnResize={enableColumnResize}
                                        enableColumnVisibility={enableColumnVisibility}
                                        enableColumnPinning={enableColumnPinning}
                                        column={column}
                                        sort={sort}
                                        setSort={setSort}
                                        updateColumnState={updateColumnState}
                                        resetColumns={resetColumns}
                                        renderColumnChooser={renderColumnChooser}
                                        enableColumnChooserInDropdown={enableColumnMenuColumnVisibility}
                                    />
                                </div>
                            )}

                            {enableColumnResize && (
                                <span
                                    className="datagrid__hcell__resize-indicator"
                                    onPointerDown={(event) =>
                                        startResize(
                                            event,
                                            column,
                                            setResizing,
                                            setDropdownResetKey
                                        )
                                    }
                                />
                            )}
                        </div>
                    );
                }
            )}
        </div>
    );
}

export default DatagridHead;


function getPinnedClass<TData>(
    renderedColumn: DatagridRenderedColumn<TData>
): string {

    if (renderedColumn.pinned === "left") {
        return "datagrid__hcell--pinned-left";
    }

    if (renderedColumn.pinned === "right") {
        return "datagrid__hcell--pinned-right";
    }

    return "";
}

function closeHeaderDropdowns(
    setDropdownResetKey: React.Dispatch<React.SetStateAction<number>>
): void {
    setDropdownResetKey((current) => current + 1);
}

function handleSorting(
    prop: string,
    sort: DatagridSortConfig | undefined,
    setSort: SetSort
): void {
    setSort(
        sort?.prop === prop
            ? {
                prop,
                order: sort.order === "asc" ? "desc" : "asc"
            }
            : {
                prop,
                order: "asc"
            }
    );
}

function startResize<TData extends { id: string | number }>(
    event: React.PointerEvent<HTMLSpanElement>,
    column: DatagridColumnRuntime<TData>,
    setResizing: DatagridHeadProps<TData>["setResizing"],
    setDropdownResetKey: React.Dispatch<React.SetStateAction<number>>
): void {
    event.preventDefault();
    event.stopPropagation();

    closeHeaderDropdowns(setDropdownResetKey);

    event.currentTarget.setPointerCapture?.(event.pointerId);

    setResizing({
        prop: column.prop,
        startX: event.clientX,
        startWidth: column.width
    });
}

function getColumnRects(
    gridRef: React.RefObject<HTMLDivElement | null>
): Map<string, DOMRect> {
    const rects = new Map<string, DOMRect>();

    gridRef.current
        ?.querySelectorAll<HTMLElement>(".datagrid__hcell")
        .forEach((cell) => {
            const key = cell.dataset.columnKey;

            if (key) {
                rects.set(key, cell.getBoundingClientRect());
            }
        });

    return rects;
}

function animateColumnReorder(
    gridRef: React.RefObject<HTMLDivElement | null>,
    previousRects: Map<string, DOMRect>
): void {
    if (!gridRef.current) {
        return;
    }

    const headers =
        gridRef.current.querySelectorAll<HTMLElement>(
            ".datagrid__hcell"
        );

    const offsets = new Map<string, number>();

    // Eerst ALLE layout reads
    headers.forEach((header) => {
        const key = header.dataset.columnKey;

        if (!key) {
            return;
        }

        const previous = previousRects.get(key);

        if (!previous) {
            return;
        }

        const current = header.getBoundingClientRect();
        const deltaX = previous.left - current.left;

        if (deltaX) {
            offsets.set(key, deltaX);
        }
    });

    const cells =
        gridRef.current.querySelectorAll<HTMLElement>(
            ".datagrid__hcell, .datagrid__cell"
        );

    // Daarna ALLE writes
    cells.forEach((cell) => {
        const key = cell.dataset.columnKey;

        if (!key) {
            return;
        }

        const deltaX = offsets.get(key);

        if (!deltaX) {
            return;
        }

        cell.animate(
            [
                { transform: `translateX(${deltaX}px)` },
                { transform: "translateX(0)" }
            ],
            {
                duration: 180,
                easing: "cubic-bezier(.2, 0, .2, 1)"
            }
        );
    });
}

function moveColumnBefore<TData extends { id: string | number }>(
    draggedProp: string,
    targetProp: string,
    gridRef: React.RefObject<HTMLDivElement | null>,
    setColumns: DatagridHeadProps<TData>["setColumns"],
    setDropdownResetKey: React.Dispatch<React.SetStateAction<number>>
): void {
    if (draggedProp === targetProp) {
        return;
    }

    closeHeaderDropdowns(setDropdownResetKey);

    const previousRects = getColumnRects(gridRef);

    setColumns((current) => {
        const from = current.findIndex(
            (column) => column.prop === draggedProp
        );

        const to = current.findIndex(
            (column) => column.prop === targetProp
        );

        if (from === -1 || to === -1 || from === to) {
            return current;
        }

        const updated = [...current];
        const [moved] = updated.splice(from, 1);

        updated.splice(to, 0, moved);

        return updated;
    });

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            animateColumnReorder(
                gridRef,
                previousRects
            );
        });
    });
}

function getCellStyle<TData>(
    renderedColumn: DatagridRenderedColumn<TData>,
    getPinnedStyle: GetPinnedStyle<TData>
): React.CSSProperties {
    return {
        width: renderedColumn.width,
        minWidth: renderedColumn.width,
        maxWidth: renderedColumn.width,
        ...getPinnedStyle(renderedColumn)
    };
}

function updateColumnFilter<TData extends { id: string | number }>(
    prop: string,
    value: DatagridColumnFilterValue | undefined,
    setColumnFilters: DatagridHeadProps<TData>["setColumnFilters"]
): void {
    setColumnFilters((current) => {
        if (!value) {
            const { [prop]: _, ...rest } = current;
            return rest;
        }

        return {
            ...current,
            [prop]: value
        };
    });
}

function renderCheckboxHeader<TData extends { id: string | number }>(
    renderedColumn: DatagridRenderedColumn<TData>,
    data: TData[],
    checkedItems: TData[],
    onRowsChecked: DatagridHeadProps<TData>["onRowsChecked"],
    getPinnedStyle: DatagridHeadProps<TData>["getPinnedStyle"]
): ReactElement {
    return (
        <div
            key={renderedColumn.key}
            data-column-key={renderedColumn.key}
            className={[
                "datagrid__hcell",
                "datagrid__hcell--center",
                getPinnedClass(renderedColumn)
            ].filter(Boolean).join(" ")}
            style={getCellStyle(
                renderedColumn,
                getPinnedStyle
            )}
        >
            <Checkbox
                color={ColorDefinitions.Accent}
                checked={
                    data.length > 0 &&
                    data.length === checkedItems.length
                }
                onChange={(checked) =>
                    onRowsChecked?.(
                        checked ? data : []
                    )
                }
            />
        </div>
    );
}

function renderCollapsibleHeader<TData extends { id: string | number }>(
    renderedColumn: DatagridRenderedColumn<TData>,
    getPinnedStyle: DatagridHeadProps<TData>["getPinnedStyle"]
): ReactElement {
    return (
        <div
            key={renderedColumn.key}
            data-column-key={renderedColumn.key}
            className={[
                "datagrid__hcell",
                "datagrid__hcell--center",
                getPinnedClass(renderedColumn)
            ].filter(Boolean).join(" ")}
            style={getCellStyle(
                renderedColumn,
                getPinnedStyle
            )}
        />
    );
}

function renderRowActionsHeader<TData extends { id: string | number }>(
    renderedColumn: DatagridRenderedColumn<TData>,
    index: number,
    rowActionPosition: DatagridHeadProps<TData>["rowActionPosition"],
    lastColumnIndex: number,
    getPinnedStyle: DatagridHeadProps<TData>["getPinnedStyle"]
): ReactElement {
    return (
        <div
            key={renderedColumn.key}
            data-column-key={renderedColumn.key}
            className={[
                "datagrid__hcell",
                index === lastColumnIndex
                    ? "datagrid__cell--last-column"
                    : "",
                rowActionPosition === "right"
                    ? "datagrid__hcell--right"
                    : "",
                getPinnedClass(renderedColumn)
            ].filter(Boolean).join(" ")}
            style={getCellStyle(
                renderedColumn,
                getPinnedStyle
            )}
        />
    );
}

function handleDragStart<TData extends { id: string | number }>(
    event: React.DragEvent<HTMLDivElement>,
    column: DatagridColumnRuntime<TData>,
    enableColumnReorder: boolean,
    dragProp: React.RefObject<string | null>,
    lastDragTargetProp: React.RefObject<string | null>,
    createDragPreview: (label: string) => void,
    setDropdownResetKey: React.Dispatch<React.SetStateAction<number>>
): void {
    if (!enableColumnReorder) {
        event.preventDefault();
        return;
    }

    closeHeaderDropdowns(setDropdownResetKey);

    const target = event.target as HTMLElement;

    if (
        target.closest(
            ".datagrid__hcell__resize-indicator"
        ) ||
        target.closest(
            ".datagrid__hcell__menu"
        )
    ) {
        event.preventDefault();
        return;
    }

    dragProp.current = column.prop;
    lastDragTargetProp.current = null;

    createDragPreview(column.title);

    const image = new Image();

    image.src =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

    event.dataTransfer.setDragImage(
        image,
        0,
        0
    );
}

function handleDragOver<TData extends { id: string | number }>(
    event: React.DragEvent<HTMLDivElement>,
    column: DatagridColumnRuntime<TData>,
    context: HandleDragOverContext<TData>
): void {
    const {
        enableColumnReorder,
        dragProp,
        lastDragTargetProp,
        moveDragPreview,
        gridRef,
        setColumns,
        setDropdownResetKey
    } = context;

    if (!enableColumnReorder) {
        return;
    }

    event.preventDefault();

    moveDragPreview(event);

    const draggedProp = dragProp.current;

    if (
        !draggedProp ||
        draggedProp === column.prop ||
        lastDragTargetProp.current === column.prop
    ) {
        return;
    }

    lastDragTargetProp.current = column.prop;

    moveColumnBefore(
        draggedProp,
        column.prop,
        gridRef,
        setColumns,
        setDropdownResetKey
    );
}

function handleDragEnd(
    dragProp: React.RefObject<string | null>,
    lastDragTargetProp: React.RefObject<string | null>,
    removeDragPreview: () => void
): void {
    removeDragPreview();

    dragProp.current = null;
    lastDragTargetProp.current = null;
}
