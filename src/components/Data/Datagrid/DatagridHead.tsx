import React, { ReactElement, ReactNode, RefObject } from "react";
import DatagridMenuDropdown from "./Addons/DatagridMenuDropdown";
import { DatagridAction } from "./Config/DatagridAction";
import { DatagridSortConfig } from "./Config/DatagridSort";
import { DatagridColumnRuntime, DatagridRowActionsPosition } from "./Datagrid";
import Checkbox from "../../Forms/Checkbox/Checkbox";
import { ColorDefinitions } from "../../../lib/utils/definitions";


export interface DatagridHeadProps<TData> {
    gridRef: RefObject<HTMLDivElement | null>;
    data: TData[];

    enableColumnResize?: boolean;
    enableColumnReorder?: boolean;

    // Dropdown
    enableDropdownHeadMenu?: boolean;
    enableColumnChooserInDropdownHeadMenu?: boolean;

    // Tabs
    enabelTabs?: boolean;
    enableTabMenu?: boolean;
    enableTabColumnChooser?: boolean;

    enableColumnVisibility?: boolean;
    visibleColumns: DatagridColumnRuntime<TData>[];
    gridTemplateColumns: string;
    sort?: DatagridSortConfig;
    setSort: React.Dispatch<React.SetStateAction<DatagridSortConfig | undefined>>;
    resizing: { prop: string; startX: number; startWidth: number } | null;
    setResizing: React.Dispatch<React.SetStateAction<{ prop: string; startX: number; startWidth: number } | null>>;
    getPinnedStyle: (column: DatagridColumnRuntime<TData>) => React.CSSProperties;
    setColumns: React.Dispatch<React.SetStateAction<DatagridColumnRuntime<TData>[]>>;
    rowActions: DatagridAction<TData>[];
    rowActionPosition?: DatagridRowActionsPosition,
    enableStickyHeader: boolean;

    updateColumnState: (prop: string, update: Partial<Pick<DatagridColumnRuntime<TData>, "width" | "visible" | "pinned">>) => void;
    resetColumns: () => void;
    renderColumnChooser: () => ReactNode;
    createDragPreview: (label: string) => void;
    moveDragPreview: (event: DragEvent | React.DragEvent) => void;
    removeDragPreview: () => void;
    dragProp: React.RefObject<string | null>;
    lastDragTargetProp: React.RefObject<string | null>;

    enableCheckboxes?: boolean;
    checkedItems?: TData[];
    onRowsChecked?: (checkedItems: TData[]) => void;

    collapsibleRowData?: (item: TData) => ReactElement;
}

export function DatagridHead<TData>({
    gridRef,
    data,
    // Dropdown
    enableDropdownHeadMenu,
    enableColumnChooserInDropdownHeadMenu,

    enableColumnResize,
    enableColumnReorder,

    visibleColumns,
    gridTemplateColumns,
    sort,
    setSort,
    resizing,
    setResizing,
    getPinnedStyle,
    setColumns,
    rowActions,
    rowActionPosition,
    enableStickyHeader,
    updateColumnState,
    resetColumns,
    renderColumnChooser,
    createDragPreview,
    moveDragPreview,
    removeDragPreview,
    dragProp,
    lastDragTargetProp,
    enableCheckboxes,
    checkedItems = [],
    onRowsChecked,
    collapsibleRowData
}: Readonly<DatagridHeadProps<TData>>): ReactElement {

    const useCheckboxes = enableCheckboxes && onRowsChecked !== undefined;


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
        //  setOpenDropdown(null);

        event.preventDefault();
        event.stopPropagation();

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

    return (
        <div className={`datagrid__grid__header ${enableStickyHeader ? "datagrid__grid__header--sticky" : ""}`}>
            <div className="datagrid__grid__row" style={{ gridTemplateColumns }}>

                {collapsibleRowData && (
                    <div className="datagrid__grid__hcell datagrid__grid__hcell--center"></div>
                )}

                {useCheckboxes && (
                    <div className="datagrid__grid__hcell datagrid__grid__hcell--center">
                        <Checkbox
                            color={ColorDefinitions.Accent}
                            checked={data.length > 0 && data.length === checkedItems.length}
                            onChange={(checked) => onRowsChecked?.(checked ? data : [])}
                        />
                    </div>
                )}


                {rowActions.length > 0 && rowActionPosition === 'left' && (
                    <div className="datagrid__grid__hcell datagrid__grid__hcell--actions"></div>
                )}

                {visibleColumns.map((column) => {

                    const isSorted = sort?.prop === column.prop;
                    const sortClass = isSorted ? sort.order : "";
                    const css = [
                        "datagrid__grid__hcell",
                        column.pinned === "left" ? "datagrid__grid__hcell--pinned-left" : "",
                        column.pinned === "right" ? "datagrid__grid__hcell--pinned-right" : "",
                        resizing?.prop === column.prop ? "datagrid__grid--resizing" : "",
                    ].join(" ");

                    return (
                        <div
                            key={column.prop}
                            data-key={column.prop}
                            data-column-key={column.prop}
                            className={css}
                            draggable
                            style={getPinnedStyle(column)}
                            onDragStart={(e) => {
                                if (!enableColumnReorder) {
                                    e.preventDefault();
                                    return;
                                }

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

                            {enableDropdownHeadMenu && (
                                <div className="datagrid__grid__hcell__icon">
                                    <DatagridMenuDropdown
                                        column={column}
                                        sort={sort}
                                        setSort={setSort}
                                        updateColumnState={updateColumnState}
                                        resetColumns={resetColumns}
                                        renderColumnChooser={renderColumnChooser}
                                        enableColumnChooserInDropdown={enableColumnChooserInDropdownHeadMenu}
                                    />
                                </div>

                            )}

                            {enableColumnResize && (
                                <span className="datagrid__grid__hcell__resize-indicator" onPointerDown={(e) => startResize(e, column)}></span>
                            )}

                        </div>
                    );
                })}

                {rowActions.length > 0 && rowActionPosition === 'right' && (
                    <div className="datagrid__grid__hcell datagrid__grid__hcell--actions"></div>
                )}

            </div>
        </div>
    );
}

export default DatagridHead;