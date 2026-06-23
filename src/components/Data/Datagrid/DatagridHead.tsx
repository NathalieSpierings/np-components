import React, { ReactElement, ReactNode, RefObject, useState } from "react";
import { IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import { Dropdown } from "../../Forms/Dropdown/Dropdown";
import { DropdownMenu } from "../../Forms/Dropdown/DropdownMenu";
import { Icon } from "../../UI/Icons/Icon";
import { DatagridAction } from "./Config/DatagridAction";
import { DatagridSortConfig } from "./Config/DatagridSort";
import { DatagridColumnRuntime } from "./Datagrid";

export interface DatagridHeadProps<TData> {
    gridRef: RefObject<HTMLDivElement | null>;
    enableColumnResize?: boolean;
    enableColumnReorder?: boolean;
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
    enableStickyHeader: boolean;
    updateColumnState: (prop: string, update: Partial<Pick<DatagridColumnRuntime<TData>, "width" | "visible" | "pinned">>) => void;
    resetColumns: () => void;
    renderColumnChooser: () => ReactNode;
    createDragPreview: (label: string) => void;
    moveDragPreview: (event: DragEvent | React.DragEvent) => void;
    removeDragPreview: () => void;
    dragProp: React.RefObject<string | null>;
    lastDragTargetProp: React.RefObject<string | null>;
}

export function DatagridHead<TData>({
    gridRef,
    enableColumnResize,
    enableColumnReorder,
    enableColumnVisibility,
    visibleColumns,
    gridTemplateColumns,
    sort,
    setSort,
    resizing,
    setResizing,
    getPinnedStyle,
    setColumns,
    rowActions,
    enableStickyHeader,
    updateColumnState,
    resetColumns,
    renderColumnChooser,
    createDragPreview,
    moveDragPreview,
    removeDragPreview,
    dragProp,
    lastDragTargetProp,
}: Readonly<DatagridHeadProps<TData>>): ReactElement {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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
        setOpenDropdown(null);

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


    const showColumnsTab = enableColumnVisibility && enableColumnReorder;

    const menuItems = (
        prop: string,
        config: DatagridColumnRuntime<TData>,
        state: DatagridColumnRuntime<TData>
    ) => [
            {
                icon: <Icon icon={IconDefinitions.arrow_up} size={SizeDefinitions.Small} />,
                label: "Sorteer oplopend",
                selected: sort?.prop === prop && sort.order === "asc",
                onClick: () => setSort({ prop, order: "asc" }),
            },
            {
                icon: <Icon icon={IconDefinitions.arrow_down} size={SizeDefinitions.Small} />,
                label: "Sorteer aflopend",
                selected: sort?.prop === prop && sort.order === "desc",
                onClick: () => setSort({ prop, order: "desc" }),
            },
            { divider: true },
            {
                icon: <Icon icon={IconDefinitions.pin} size={SizeDefinitions.Small} />,
                label: "Pin column",
                items: [
                    {
                        icon:
                            state.pinned === null ? (
                                <Icon icon={IconDefinitions.checkmark} size={SizeDefinitions.Small} />
                            ) : undefined,
                        label: <span>Niet vastzetten</span>,
                        selected: state.pinned === null,
                        onClick: () => updateColumnState(prop, { pinned: null }),
                    },
                    {
                        icon:
                            state.pinned === "left" ? (
                                <Icon icon={IconDefinitions.checkmark} size={SizeDefinitions.Small} />
                            ) : undefined,
                        label: <span>Links vastzetten</span>,
                        selected: state.pinned === "left",
                        onClick: () => updateColumnState(prop, { pinned: "left" }),
                    },
                    {
                        icon:
                            state.pinned === "right" ? (
                                <Icon icon={IconDefinitions.checkmark} size={SizeDefinitions.Small} />
                            ) : undefined,
                        label: <span>Rechts vastzetten</span>,
                        selected: state.pinned === "right",
                        onClick: () => updateColumnState(prop, { pinned: "right" }),
                    },
                ],
            },
            {
                label: "Autosize",
                onClick: () =>
                    updateColumnState(prop, {
                        width: Math.max(120, config.title.length * 20),
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
        ...(showColumnsTab ? [{ id: "tabColumns", title: "Kolommen" }] : []),
    ];

    const markupDropdownTabPanes = (column: DatagridColumnRuntime<TData>) => {

       return [
            {
                tabId: "tabMenu",
                content: (
                    <DropdownMenu
                        items={menuItems(column.prop, column, column)}
                    />
                ),
            },
            ...(showColumnsTab
                ? [{
                    tabId: "tabColumns",
                    content: renderColumnChooser(),
                }]
                : []),
        ];
    }

    return (
        <div className={`datagrid__grid__header ${enableStickyHeader ? "datagrid__grid__header--sticky" : ""}`}>
            <div className="datagrid__grid__row" style={{ gridTemplateColumns }}>

                {visibleColumns.map((column) => {

                    const isSorted = sort?.prop === column.prop;
                    const sortClass = isSorted ? sort.order : "";
                    const css = [
                        "datagrid__grid__hcell",
                        column.pinned === "left" ? "datagrid__grid__hcell--pinned-left" : "",
                        column.pinned === "right" ? "datagrid__grid__hcell--pinned-right" : "",
                        resizing?.prop === column.prop ? "datagrid__grid--resizing" : "",
                    ].join(" ");


                    const showColumnsTab = enableColumnVisibility && enableColumnReorder;

                    // const menuItems = (
                    //     prop: string,
                    //     config: DatagridColumnRuntime<TData>,
                    //     state: DatagridColumnRuntime<TData>
                    // ) => [
                    //         {
                    //             icon: <Icon icon={IconDefinitions.arrow_up} size={SizeDefinitions.Small} />,
                    //             label: "Sorteer oplopend",
                    //             selected: sort?.prop === prop && sort.order === "asc",
                    //             onClick: () => setSort({ prop, order: "asc" }),
                    //         },
                    //         {
                    //             icon: <Icon icon={IconDefinitions.arrow_down} size={SizeDefinitions.Small} />,
                    //             label: "Sorteer aflopend",
                    //             selected: sort?.prop === prop && sort.order === "desc",
                    //             onClick: () => setSort({ prop, order: "desc" }),
                    //         },
                    //         { divider: true },
                    //         {
                    //             icon: <Icon icon={IconDefinitions.pin} size={SizeDefinitions.Small} />,
                    //             label: "Pin column",
                    //             items: [
                    //                 {
                    //                     icon:
                    //                         state.pinned === null ? (
                    //                             <Icon icon={IconDefinitions.checkmark} size={SizeDefinitions.Small} />
                    //                         ) : undefined,
                    //                     label: <span>Niet vastzetten</span>,
                    //                     selected: state.pinned === null,
                    //                     onClick: () => updateColumnState(prop, { pinned: null }),
                    //                 },
                    //                 {
                    //                     icon:
                    //                         state.pinned === "left" ? (
                    //                             <Icon icon={IconDefinitions.checkmark} size={SizeDefinitions.Small} />
                    //                         ) : undefined,
                    //                     label: <span>Links vastzetten</span>,
                    //                     selected: state.pinned === "left",
                    //                     onClick: () => updateColumnState(prop, { pinned: "left" }),
                    //                 },
                    //                 {
                    //                     icon:
                    //                         state.pinned === "right" ? (
                    //                             <Icon icon={IconDefinitions.checkmark} size={SizeDefinitions.Small} />
                    //                         ) : undefined,
                    //                     label: <span>Rechts vastzetten</span>,
                    //                     selected: state.pinned === "right",
                    //                     onClick: () => updateColumnState(prop, { pinned: "right" }),
                    //                 },
                    //             ],
                    //         },
                    //         {
                    //             label: "Autosize",
                    //             onClick: () =>
                    //                 updateColumnState(prop, {
                    //                     width: Math.max(120, config.title.length * 20),
                    //                 }),
                    //         },
                    //         { divider: true },
                    //         {
                    //             label: "Reset kolommen",
                    //             onClick: resetColumns,
                    //         },
                    //     ];


                    // const tabs = [
                    //     { id: "tabMenu", title: "Menu" },
                    //     ...(showColumnsTab ? [{ id: "tabColumns", title: "Kolommen" }] : []),
                    // ];

                    // const tabPanes = [
                    //     {
                    //         tabId: "tabMenu",
                    //         content: (
                    //             <DropdownMenu
                    //                 items={menuItems(column.prop, column, column)}
                    //             />
                    //         ),
                    //     },
                    //     ...(showColumnsTab
                    //         ? [{
                    //             tabId: "tabColumns",
                    //             content: renderColumnChooser(),
                    //         }]
                    //         : []),
                    // ];


                    return (
                        <div
                            key={column.prop}
                            data-key={column.prop}
                            data-column-key={column.prop}
                            className={css}
                            draggable
                            style={getPinnedStyle(column)}
                            onDragStart={(e) => {
                                setOpenDropdown(null);

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

                            <div className="datagrid__grid__hcell__icon">
                                <Dropdown
                                    isOpen={openDropdown === column.prop}
                                    onOpenChange={(open) =>
                                        setOpenDropdown(open ? column.prop : null)
                                    }
                                    dropdownToggle={{
                                        label: (
                                            <Icon
                                                icon={IconDefinitions.ellipsis_h}
                                                size={SizeDefinitions.Small}
                                            />
                                        ),
                                    }}
                                    tabs={tabs}
                                    tabPanes={markupDropdownTabPanes(column)}
                                />
                            </div>

                            {enableColumnResize && (
                                <span className="datagrid__grid__hcell__resize-indicator" onPointerDown={(e) => startResize(e, column)}></span>
                            )}

                        </div>
                    );
                })}

                {rowActions.length > 0 && (
                    <div className="datagrid__grid__hcell datagrid__grid__hcell--actions"></div>
                )}
            </div>
        </div>
    );
}

export default DatagridHead;