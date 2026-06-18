import React, { useRef, useState, useMemo, CSSProperties, ReactNode, useEffect, ReactElement } from "react";
import { DatagridColumnState } from "./Config/DatagridColumnState";
import { ColumnFilters, DatagridGetDataArguments, FilterUpdateFunc } from "./Config/DatagridData";
import { DatagridRowConfig } from "./Config/DatagridRowConfig";
import { DatagridSortConfig, DatagridSortOrder } from "./Config/DatagridSort";
import { DatagridAction } from "./Config/DatagridAction";
import { PaginationData } from "./Pagination";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import { Icon } from "../../UI/Icons/Icon";
import { Checkbox } from "../../Forms/Checkbox";
import { Dropdown } from "../../Forms/Dropdown/Dropdown";
import { DropdownMenu } from "../../Forms/Dropdown/DropdownMenu";

export type DatagridPinnedPosition = "left" | "right" | null;

export interface DatagridColumnRuntime<TData> extends DatagridRowConfig<TData> {
    width: number;
    visible: boolean;
    pinned: DatagridPinnedPosition;
}

export interface DatagridProps<TData> {
    data: TData[];
    dataRaw?: TData[];
    total: number;
    loading: boolean;
    onFilterUpdate: FilterUpdateFunc<TData>;
    properties?: DatagridRowConfig<TData>[];
    initialSortConfig?: DatagridSortConfig;
    rowActions?: DatagridAction<TData>[];
    enableStickyHeader?: boolean;
}

function Datagrid<TData extends { id: string | number }>({
    data,
    dataRaw,
    total,
    loading,
    onFilterUpdate,
    properties = [],
    initialSortConfig,
    rowActions = [],
    enableStickyHeader = true
}: Readonly<DatagridProps<TData>>): ReactElement {

    const STORAGE_KEY = "datagrid-columns";

    const gridRef = useRef<HTMLDivElement | null>(null);
    const dragPreviewRef = useRef<HTMLDivElement | null>(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [pagination, setPagination] = useState<PaginationData>({ page: 1, perPage: 25 });
    const [sort, setSort] = useState<DatagridSortConfig | undefined>(initialSortConfig);
    const [columnFilters, setColumnFilters] = useState<Record<string, any>>({});
    const [selectedRowId, setSelectedRowId] = useState<string | number | null>(null);

    const [columns, setColumns] = useState<DatagridColumnRuntime<TData>[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (stored) {
            try {
                const storedColumns = JSON.parse(stored) as DatagridColumnRuntime<TData>[];

                return properties.map((p) => {
                    const storedColumn = storedColumns.find((c) => c.prop === p.prop);

                    return {
                        ...p,
                        width: storedColumn?.width ?? 180,
                        visible: storedColumn?.visible ?? true,
                        pinned: storedColumn?.pinned ?? null,
                    };
                });
            } catch {

            }
        }

        return properties.map((p) => ({
            ...p,
            width: 180,
            visible: true,
            pinned: null,
        }));
    });

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(
                columns.map(({ prop, width, visible, pinned }) => ({
                    prop,
                    width,
                    visible,
                    pinned,
                }))
            )
        );
    }, [columns]);

    const [resizing, setResizing] = useState<{
        prop: string;
        startX: number;
        startWidth: number;
    } | null>(null);

    const dragProp = useRef<string | null>(null);
    const lastDragTargetProp = useRef<string | null>(null);

    useEffect(() => {
        setColumns((current) =>
            properties.map((property) => {
                const existing = current.find((c) => c.prop === property.prop);

                return {
                    ...property,
                    width: existing?.width ?? 180,
                    visible: existing?.visible ?? true,
                    pinned: existing?.pinned ?? null,
                };
            })
        );
    }, [properties]);

    // filter update  
    useEffect(() => {
        onFilterUpdate({
            searchTerm,
            sort,
            propertyConfigs: properties,
            pagination,
            columnFilters,
        });
    }, [searchTerm, pagination.page, pagination.perPage, sort, columnFilters]);


    // Search const 
    const updateQ = (q: string) => {
        setSearchTerm(q);
        setPagination((p) => ({
            ...p,
            page: 1,
        }));
    };

    const visibleColumns = useMemo(() => {
        const visible = columns.filter((c) => c.visible);
        const left = visible.filter((c) => c.pinned === "left");
        const center = visible.filter((c) => !c.pinned);
        const right = visible.filter((c) => c.pinned === "right");

        return [...left, ...center, ...right];
    }, [columns]);

    const gridTemplateColumns = useMemo(() => {
        return visibleColumns.map((c) => `${c.width}px`).join(" ");
    }, [visibleColumns]);

    const getLeftOffset = (column: DatagridColumnRuntime<TData>): number => {
        let offset = 0;

        for (const col of visibleColumns) {
            if (col.prop === column.prop) break;
            if (col.pinned === "left") offset += col.width;
        }

        return offset;
    };

    const getRightOffset = (column: DatagridColumnRuntime<TData>): number => {
        let offset = 0;

        for (const col of [...visibleColumns].reverse()) {
            if (col.prop === column.prop) break;
            if (col.pinned === "right") offset += col.width;
        }

        return offset;
    };

    const getPinnedStyle = (column: DatagridColumnRuntime<TData>): React.CSSProperties => {
        if (column.pinned === "left") {
            return {
                position: "sticky",
                left: getLeftOffset(column),
                zIndex: 2,
            };
        }

        if (column.pinned === "right") {
            return {
                position: "sticky",
                right: getRightOffset(column),
                zIndex: 2,
            };
        }

        return {};
    };

    const renderValue = (
        item: TData,
        column: DatagridColumnRuntime<TData>
    ): ReactNode => {
        if (column.useItemOnly) {
            return column.useItemOnly(item);
        }

        const rawValue = item[column.prop];
        const transformed = column.transformValue
            ? column.transformValue(rawValue)
            : rawValue;

        if (column.wrapValue) {
            return column.wrapValue(item, transformed);
        }

        return String(transformed ?? "");
    };

    // Sorting
    const handleSorting = (prop: string) => {
        if (!setSort) return;

        setSort(
            sort?.prop === prop
                ? { prop, order: sort.order === "asc" ? "desc" : "asc" }
                : { prop, order: "asc" }
        );
    };

    // const toggleSort = (column: DatagridColumnRuntime<TData>) => {
    //     if (!column.sortable) return;

    //     const nextOrder: DatagridSortOrder = sort?.prop === column.prop && sort.order === "asc" ? "desc" : "asc";

    //     setSort({
    //         prop: column.prop,
    //         order: nextOrder,
    //     });

    //     setPagination((p) => ({
    //         ...p,
    //         page: 1,
    //     }));
    // };

    const pinColumn = (prop: string, pinned: DatagridPinnedPosition) => {
        setColumns((current) =>
            current.map((c) => (c.prop === prop ? { ...c, pinned } : c))
        );
    };

    const hideColumn = (prop: string) => {
        setColumns((current) =>
            current.map((c) => (c.prop === prop ? { ...c, visible: false } : c))
        );
    };

    const updateColumnState = (
        prop: string,
        update: Partial<Pick<DatagridColumnRuntime<TData>, "width" | "visible" | "pinned">>
    ) => {
        setColumns((current) =>
            current.map((column) =>
                column.prop === prop
                    ? {
                        ...column,
                        ...update,
                    }
                    : column
            )
        );
    };

    const resetColumns = () => {
        setColumns(
            properties.map((p) => ({
                ...p,
                width: 180,
                visible: true,
                pinned: null,
            }))
        );

        setSort(initialSortConfig);
    };


    // Reorder
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

    // TODO tooltiop styling aanpassen/controleren
    const createDragPreview = (label: string) => {
        removeDragPreview();

        const preview = document.createElement("div");
        preview.className = "datagrid__grid__drag__tooltip";
        preview.innerHTML = `
        <div class="icon icon--sm">
            <svg><use xlink:href="#svg_icon_move" /></svg>
        </div>
        <span>${label}</span>
    `;

        document.body.appendChild(preview);
        dragPreviewRef.current = preview;
    };

    const moveDragPreview = (event: DragEvent | React.DragEvent) => {
        if (!dragPreviewRef.current) return;

        dragPreviewRef.current.style.transform =
            `translate(${event.clientX + 12}px, ${event.clientY + 12}px)`;
    };

    const removeDragPreview = () => {
        dragPreviewRef.current?.remove();
        dragPreviewRef.current = null;
    };

    useEffect(() => {
        const onDragOver = (event: DragEvent) => {
            moveDragPreview(event);
        };

        document.addEventListener("dragover", onDragOver);

        return () => {
            document.removeEventListener("dragover", onDragOver);
            removeDragPreview();
        };
    }, []);


    // Resize
    const startResize = (
        event: React.PointerEvent<HTMLSpanElement>,
        column: DatagridColumnRuntime<TData>
    ) => {
        event.preventDefault();
        event.stopPropagation();

        event.currentTarget.setPointerCapture?.(event.pointerId);

        setResizing({
            prop: column.prop,
            startX: event.clientX,
            startWidth: column.width,
        });
    };

    useEffect(() => {
        if (!resizing) return;

        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";

        const onPointerMove = (event: globalThis.PointerEvent) => {
            const nextWidth = Math.max(
                80,
                resizing.startWidth + event.clientX - resizing.startX
            );

            setColumns((current) =>
                current.map((column) =>
                    column.prop === resizing.prop
                        ? {
                            ...column,
                            width: nextWidth,
                        }
                        : column
                )
            );
        };

        const onPointerUp = () => {
            setResizing(null);
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
        };

        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);

        return () => {
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
        };
    }, [resizing]);

    // Filters 
    const hasFilterableColumns = visibleColumns?.some((p) => p.filter) ?? false;


    // Dropdown
    const menuItems = (
        prop: string,
        config: DatagridColumnRuntime<TData>,
        state: DatagridColumnRuntime<TData>
    ) => {
        return [
            {
                icon: <Icon icon={IconDefinitions.arrow_up} size={SizeDefinitions.Small} />,
                label: "Sorteer oplopend",
                selected: sort?.prop === prop && sort.order === "asc",
                onClick: () => setSort({ prop, order: "asc", }),
            },
            {
                icon: <Icon icon={IconDefinitions.arrow_down} size={SizeDefinitions.Small} />,
                label: "Sorteer aflopend",
                selected: sort?.prop === prop && sort.order === "desc",
                onClick: () => setSort({ prop, order: "desc", }),
            },   
            {
                divider: true
            },      
            {
                icon: <Icon icon={IconDefinitions.pin} size={SizeDefinitions.Small} />,
                label: "Pin column",
                items: [
                    {
                        icon: state.pinned === null ? <Icon icon={IconDefinitions.checkmark} size={SizeDefinitions.Small} /> : undefined,
                        label: <span>Niet vastzetten</span>,
                        selected: state.pinned === null,
                        onClick: () => updateColumnState(prop, { pinned: null }),
                    },
                    {
                        icon: state.pinned === "left" ? <Icon icon={IconDefinitions.checkmark} size={SizeDefinitions.Small} /> : undefined,
                        label: <span>Links vastzetten</span>,
                        selected: state.pinned === "left",
                        onClick: () => updateColumnState(prop, { pinned: "left" }),
                    },
                    {
                        icon: state.pinned === "right" ? <Icon icon={IconDefinitions.checkmark} size={SizeDefinitions.Small} /> : undefined,
                        label: <span>Rechts vastzetten</span>,
                        selected: state.pinned === "right",
                        onClick: () => updateColumnState(prop, { pinned: "right" }),
                    },
                ],
            },           
            {
                label: "Autosize",
                onClick: () => updateColumnState(prop, { width: Math.max(120, config.title.length * 20), }),
            },
            {
                divider: true
            },
            {
                label: "Reset kolommen",
                onClick: resetColumns,
            },
        ];

    }
    const dropdownConfig = (
        prop: string,
        config: DatagridColumnRuntime<TData>,
        state: DatagridColumnRuntime<TData>
    ) => {
        return {
            tabs: [
                {
                    id: "tabMenu",
                    label: "Menu",
                    menuItems,
                },
                {
                    id: "tabColumns",
                    label: "Kolommen",
                    content: (
                        {
                            ...columns.map((column) => ({
                                id: column.prop,
                                keepOpen: true,
                                selected: column.visible,
                                label: (
                                    <Checkbox
                                        label={column.title}
                                        checked={column.visible}
                                        onChange={(checked) =>
                                            updateColumnState(column.prop, {
                                                visible: checked,
                                            })
                                        }
                                    />
                                ),
                            }))
                        }
                    )
                },
            ],
        };
    }

    return (
        <div className="datagrid pc-layout">
            <div className="pc-layout__header">
                toolbar can go here...
            </div>
            <div className="pc-layout__content">

                <div ref={gridRef} className="datagrid__grid pc-layout__main">

                    <div className={`datagrid__grid__header ${enableStickyHeader ? 'datagrid__grid__header--sticky' : ''}`}>
                        <div className="datagrid__grid__row" style={{ gridTemplateColumns }}>
                            {visibleColumns.map((column) => {
                                const isSorted = sort?.prop === column.prop;
                                const sortClass = isSorted ? sort.order : "";

                                return (
                                    <div
                                        key={column.prop}
                                        data-key={column.prop}
                                        data-column-key={column.prop}
                                        className={[
                                            "datagrid__grid__hcell",
                                            column.pinned === "left"
                                                ? "datagrid__grid__hcell--pinned-left"
                                                : "",
                                            column.pinned === "right"
                                                ? "datagrid__grid__hcell--pinned-right"
                                                : "",
                                            resizing?.prop === column.prop
                                                ? "datagrid__grid--resizing"
                                                : "",
                                        ].join(" ")}

                                        draggable
                                        style={getPinnedStyle(column)}
                                        onDragStart={(e) => {
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

                                        <div className="datagrid__grid__hcell__content" onClick={() => handleSorting(column.prop)}>
                                            <span className="datagrid__grid__hcell__content__label">
                                                {column.title}
                                            </span>
                                            <span className={["datagrid__grid__hcell__sort-indicator", sortClass,].join(" ")}></span>
                                        </div>
                                        <div className="datagrid__grid__hcell__icon">

                                            <Dropdown
                                                dropdownToggle={{
                                                    label: <Icon icon={IconDefinitions.ellipsis_h} size={SizeDefinitions.Small} />,
                                                }}
                                                tabs={[
                                                    { id: "tabMenu", title: "Menu" },
                                                    { id: "tabColumns", title: "Kolommen" },
                                                ]}
                                                tabPanes={[
                                                    {
                                                        tabId: "tabMenu",
                                                        content: <DropdownMenu items={menuItems(column.prop, column, column)} />,
                                                    },
                                                    {
                                                        tabId: "tabColumns",
                                                        content: (
                                                            <div className="datagrid__column-picker">
                                                                {columns.map((visibleColumn) => (
                                                                    <div 
                                                                    key={visibleColumn.prop}
                                                                    className="datagrid__column-picker__item"
                                                                    >
                                                                        <Checkbox color={ColorDefinitions.Accent}                                                                        
                                                                        label={visibleColumn.title}
                                                                        checked={visibleColumn.visible}
                                                                        onChange={(checked) =>
                                                                            updateColumnState(visibleColumn.prop, {
                                                                                visible: checked,
                                                                            })
                                                                        }
                                                                    />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ),
                                                    },
                                                ]}


                                            // tabs={[{
                                            //     id: 'tabMenu',
                                            //     title: "Menu",
                                            //     menuItems: menuItems(column.prop, column, column)
                                            // },
                                            // {
                                            //     id: 'tabColumns',
                                            //     title: 'Kolommen',
                                            //     content: (
                                            // <>
                                            //     {columns.map((visibleColumn) => (
                                            //         <Checkbox
                                            //             key={visibleColumn.prop}
                                            //             label={visibleColumn.title}
                                            //             checked={visibleColumn.visible}
                                            //             onChange={(checked) =>
                                            //                 updateColumnState(visibleColumn.prop, {
                                            //                     visible: checked,
                                            //                 })
                                            //             }
                                            //         />
                                            //     ))}
                                            // </>
                                            //     )
                                            // }]}
                                            />
                                        </div>
                                        <span
                                            className="datagrid__grid__hcell__resize-indicator"
                                            onPointerDown={(e) => startResize(e, column)}
                                        />
                                    </div>
                                );
                            })}

                            {rowActions.length > 0 && (
                                <div className="datagrid__grid__hcell datagrid__grid__hcell--actions">
                                    Acties
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="datagrid__grid__body">
                        {data.map((item) => {

                            const selected = selectedRowId === item.id;

                            return (
                                <div
                                    key={item.id}
                                    className={["datagrid__grid__row", selected ? "selected" : ""].join(" ")}
                                    style={{ gridTemplateColumns }}
                                    onClick={() => setSelectedRowId(item.id)}
                                >
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

                                    {rowActions.length > 0 && (
                                        <div className="datagrid__grid__cell datagrid__grid__cell--actions">
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
                            );
                        })}
                    </div>
                </div>

                <div className="datagrid__sidebar pc-layout__aside shown1">
                    <div className="datagrid__sidebar__container">
                        <div className="datagrid__sidebar__header">
                            Details
                            <button className="dismiss dismiss-circle dismiss--sm dismiss--right dismiss--end">
                                <div className="dismiss__icon ">&nbsp;</div>
                            </button>
                        </div>
                        <div className="datagrid__sidebar__content">
                            details goes here...
                        </div>
                    </div>
                </div>

                <div className="datagrid__tabber pc-layout__aside shown">
                    <div className="datagrid__tabber__tabs ">
                        <button type="button" className="datagrid__tabber__tabs__tab">
                            <div className="datagrid__tabber__tabs__tab__content">
                                <Icon icon={IconDefinitions.filter} size={SizeDefinitions.Small} />
                                <div className="datagrid__tabber__tabs__tab__label">Filters</div>
                            </div>
                        </button>
                        <button type="button" className="datagrid__tabber__tabs__tab">
                            <div className="datagrid__tabber__tabs__tab__content">
                                <Icon icon={IconDefinitions.window} size={SizeDefinitions.Small} />
                                <div className="datagrid__tabber__tabs__tab__label">Columns</div>
                            </div>
                        </button>
                    </div>
                    <div className="datagrid__tabber__panes">
                        <div className="datagrid__tabber__pane">
                            <div className="datagrid__tabber__pane__container">
                                <div className="datagrid__tabber__pane__header">
                                    header
                                    <button className="dismiss dismiss-circle dismiss--sm dismiss--right dismiss--end">
                                        <div className="dismiss__icon ">&nbsp;</div>
                                    </button>
                                </div>
                                <div className="datagrid__tabber__pane__content">
                                    <p className="p2000">tab1</p>
                                </div>
                            </div>
                        </div>
                        <div className="datagrid__tabber__pane">
                            <div className="datagrid__tabber__pane__container">
                                <div className="datagrid__tabber__pane__header">
                                    header
                                    <button className="dismiss dismiss-circle dismiss--sm dismiss--right dismiss--end">
                                        <div className="dismiss__icon ">&nbsp;</div>
                                    </button>
                                </div>
                                <div className="datagrid__tabber__pane__content">tab2</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pc-layout__footer">
                footer
            </div>
        </div>
    );
}

export default Datagrid;