import React, { ReactElement, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import DatagridColumnChooser from "./Addons/DatagridColumnChooser";
import { DatagridAction } from "./Config/DatagridAction";
import { FilterUpdateFunc } from "./Config/DatagridData";
import { DatagridRowConfig } from "./Config/DatagridRowConfig";
import { DatagridSortConfig } from "./Config/DatagridSort";
import DatagridHead from "./DatagridHead";
import { DatagridTabItem, DatagridTabPane, DatagridTabs } from "./DatagridTabs";
import { PaginationData } from "./Pagination";

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
    enableTabs?: boolean;
    tabs?: DatagridTabItem[];
    tabPanes?: DatagridTabPane[];


    localStorageKey?: string;
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

   
    enableStickyHeader = true,
    enableTabs,
    tabs,
    tabPanes,

    localStorageKey = "datagrid-columns",
}: Readonly<DatagridProps<TData>>): ReactElement {

    const STORAGE_KEY = localStorageKey;

    const gridRef = useRef<HTMLDivElement | null>(null);
    const columnPickerDragProp = useRef<string | null>(null);
    const lastDragTargetProp = useRef<string | null>(null);
    const dragPreviewRef = useRef<HTMLDivElement | null>(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [pagination, setPagination] = useState<PaginationData>({
        page: 1,
        perPage: 25,
    });

    const [sort, setSort] = useState<DatagridSortConfig | undefined>(
        initialSortConfig
    );
      
    const [columnFilters, setColumnFilters] = useState<Record<string, any>>({});
    const [selectedRowId, setSelectedRowId] = useState<string | number | null>(null);
    const [columnSearchTerm, setColumnSearchTerm] = useState("");
    const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

    const [resizing, setResizing] = useState<{
        prop: string;
        startX: number;
        startWidth: number;
    } | null>(null);


    // Columns
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

    useEffect(() => {
        setColumns((current) =>
            properties.map((property) => {
                const existing = current.find(
                    (column) => column.prop === property.prop
                );

                return {
                    ...property,
                    width: existing?.width ?? 180,
                    visible: existing?.visible ?? true,
                    pinned: existing?.pinned ?? null,
                };
            })
        );
    }, [properties]);

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

        globalThis.addEventListener("pointermove", onPointerMove);
        globalThis.addEventListener("pointerup", onPointerUp);

        return () => {
            globalThis.removeEventListener("pointermove", onPointerMove);
            globalThis.removeEventListener("pointerup", onPointerUp);
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
        };
    }, [resizing]);

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


    const allColumnsVisible = columns.every((c) => c.visible);
    const someColumnsVisible = columns.some((c) => c.visible);

    const setAllColumnsVisible = (checked: boolean) => {
        setColumns((current) =>
            current.map((column, index) => ({
                ...column,
                visible: checked || index === 0,
            }))
        );
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



    const updateColumnState = (
        prop: string,
        update: Partial<Pick<DatagridColumnRuntime<TData>, "width" | "visible" | "pinned">>
    ) => {
        setColumns((current) => {
            // Alleen controleren bij het verbergen van een kolom
            if (update.visible === false) {
                const visibleCount = current.filter((c) => c.visible).length;
                const targetColumn = current.find((c) => c.prop === prop);

                // Last visible column cannot be removed
                if (visibleCount === 1 && targetColumn?.visible) {
                    return current;
                }
            }

            return current.map((column) =>
                column.prop === prop
                    ? {
                        ...column,
                        ...update,
                    }
                    : column
            );
        });
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

    const moveColumn = (draggedProp: string, targetProp: string) => {
        if (draggedProp === targetProp) return;

        setColumns((current) => {
            const from = current.findIndex((c) => c.prop === draggedProp);
            const to = current.findIndex((c) => c.prop === targetProp);

            if (from === -1 || to === -1 || from === to) return current;

            const updated = [...current];
            const [moved] = updated.splice(from, 1);
            updated.splice(to, 0, moved);

            return updated;
        });
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


    // Pinning
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

    // Dragging
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

    // Search const 
    const updateQ = (q: string) => {
        setSearchTerm(q);
        setPagination((p) => ({
            ...p,
            page: 1,
        }));
    };

    // Filters 
    const hasFilterableColumns = visibleColumns?.some((p) => p.filter) ?? false;



    // Column chooser
    const renderColumnChooser = () => (
        <DatagridColumnChooser
            columns={columns}
            searchTerm={columnSearchTerm}
            setSearchTerm={setColumnSearchTerm}
            allColumnsVisible={allColumnsVisible}
            someColumnsVisible={someColumnsVisible}
            setAllColumnsVisible={setAllColumnsVisible}
            updateColumnState={updateColumnState}
            moveColumn={moveColumn}
            columnPickerDragProp={columnPickerDragProp}
            lastDragTargetProp={lastDragTargetProp}
            dragOverColumn={dragOverColumn}
            setDragOverColumn={setDragOverColumn}
            createDragPreview={createDragPreview}
            moveDragPreview={moveDragPreview}
            removeDragPreview={removeDragPreview}
        />
    );

   

    return (
        <div className="datagrid pc-layout">
            <div className="pc-layout__header">
               
             

            </div>
            <div className="pc-layout__content">

                <div ref={gridRef} className="datagrid__grid pc-layout__main">

                    <DatagridHead
                        gridRef={gridRef}
                        visibleColumns={visibleColumns}
                        gridTemplateColumns={gridTemplateColumns}
                        sort={sort}
                        setSort={setSort}
                        resizing={resizing}
                        setResizing={setResizing}
                        getPinnedStyle={getPinnedStyle}
                        setColumns={setColumns}
                        rowActions={rowActions}
                        enableStickyHeader={enableStickyHeader}
                        updateColumnState={updateColumnState}
                        resetColumns={resetColumns}
                        renderColumnChooser={renderColumnChooser}
                        createDragPreview={createDragPreview}
                        moveDragPreview={moveDragPreview}
                        removeDragPreview={removeDragPreview}
                        dragProp={columnPickerDragProp}
                        lastDragTargetProp={lastDragTargetProp}
                    />

                    <div className="datagrid__grid__body">
                        {data.map((item) => {

                            const selected = selectedRowId === item.id;
                            //const selected = { typeof selectedRow === "string" ? selectedRow === item.id : selectedRow?.id === item.id }

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



                {enableTabs && (
                    <DatagridTabs
                        tabs={tabs ?? []}
                        tabPanes={tabPanes ?? []}
                        enableTabs
                        enableColumnChooserTab
                        columnChooserContent={renderColumnChooser()}
                    />
                )}
            </div>
            <div className="pc-layout__footer">
                footer
            </div>
        </div>
    );
}

export default Datagrid;