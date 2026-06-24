import React, { ReactElement, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useDatagridColumnChooser } from "./Addons/DatagridColumnChooser";
import { DatagridAction } from "./Config/DatagridAction";
import { FilterUpdateFunc } from "./Config/DatagridData";
import { DatagridRowConfig } from "./Config/DatagridRowConfig";
import { DatagridSortConfig } from "./Config/DatagridSort";
import DatagridHead from "./DatagridHead";
import { DatagridTabItem, DatagridTabPane, DatagridTabs } from "./DatagridTabs";
import Pagination, { PaginationData } from "./Pagination";
import Icon from "../../UI/Icons/Icon/Icon";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import Checkbox from "../../Forms/Checkbox/Checkbox";

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
    enablePagination?: boolean;
    enableColumnResize?: boolean;
    enableColumnReorder?: boolean;
    enableColumnVisibility?: boolean;

    // Dropdown
    enableDropdownHeadMenu?: boolean;
    enableColumnChooserInDropdownHeadMenu?: boolean;

    // Tabs
    enableTabs?: boolean;
    tabs?: DatagridTabItem[];
    tabPanes?: DatagridTabPane[];
    enableTabColumnChooser?: boolean;

    enableStickyHeader?: boolean;

    selectedRow?: TData | string | number;
    rowSingleClickAction?: (item: TData) => void;
    rowDoubleClickAction?: (item: TData) => void;

    enableCheckboxes?: boolean;
    checkedItems?: TData[];
    onRowsChecked?: (checkedItems: TData[]) => void;

    footerContent?: ReactNode;
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
    enableColumnResize = false,
    enableColumnReorder = false,
    enableColumnVisibility = false,
    enablePagination = true,
    enableTabs,
    tabs,
    tabPanes,
    enableTabColumnChooser,
    enableDropdownHeadMenu,
    enableColumnChooserInDropdownHeadMenu,
    enableStickyHeader = true,

    selectedRow,
    rowSingleClickAction,
    rowDoubleClickAction,

    enableCheckboxes = false,
    checkedItems = [],
    onRowsChecked,

    footerContent,
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

    const useCheckboxes = enableCheckboxes && onRowsChecked !== undefined;


    const [columnFilters, setColumnFilters] = useState<Record<string, any>>({});

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

    const visibleColumns = useMemo(() => {
        const visible = columns.filter((c) => c.visible);
        const left = visible.filter((c) => c.pinned === "left");
        const center = visible.filter((c) => !c.pinned);
        const right = visible.filter((c) => c.pinned === "right");

        return [...left, ...center, ...right];
    }, [columns]);

    const gridTemplateColumns = useMemo(() => {
        const columns = visibleColumns.map((c) => `${c.width}px`);

        if (useCheckboxes) {
            columns.unshift("50px");
        }

        return columns.join(" ");
    }, [visibleColumns, useCheckboxes]);


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



    // Tabs

    const menuItems = (column: DatagridColumnRuntime<TData>) => {

        return [
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
                        label: "Niet vastzetten",
                        selected: column.pinned === null,
                        onClick: () => updateColumnState(column.prop, { pinned: null }),
                    },
                    {
                        label: "Links vastzetten",
                        selected: column.pinned === "left",
                        onClick: () => updateColumnState(column.prop, { pinned: "left" }),
                    },
                    {
                        label: "Rechts vastzetten",
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

            ...extraItems,
        ];
    };

    // Tab Column chooser
    const columnChooser = useDatagridColumnChooser<TData>({ columns, setColumns, enableColumnReorder, enableColumnVisibility });

    // Tab menu


    const effectiveTabs = useMemo<DatagridTabItem[]>(() => {
        const extraTabs: DatagridTabItem[] = [];

        if (enableTabColumnChooser) {
            extraTabs.push({
                id: "__columns",
                title: "Kolommen",
            });
        }

        return [
            ...extraTabs,
            ...(tabs ?? []),
        ];
    }, [tabs, enableTabColumnChooser]);

    const effectiveTabPanes = useMemo<DatagridTabPane[]>(() => {
        const extraPanes: DatagridTabPane[] = [];

        if (enableTabColumnChooser) {
            extraPanes.push({
                tabId: "__columns",
                content: columnChooser.renderColumnChooser(),
                header: {
                    content: "Kolommen",
                },
            });
        }



        return [
            ...extraPanes,
            ...(tabPanes ?? []),
        ];
    }, [
        tabPanes,
        enableTabColumnChooser,
        columnChooser.renderColumnChooser,
    ]);

    // Checkbox handling
    const handleCheckedItems = (items: TData[]) => {
        onRowsChecked?.(items);
    };

    return (
        <div className="datagrid pc-layout">
            <div className="pc-layout__header">


            </div>
            <div className="pc-layout__content">

                <div ref={gridRef} className="datagrid__grid pc-layout__main">

                    <DatagridHead
                        gridRef={gridRef}
                        data={data}
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
                        resetColumns={resetColumns}
                        enableColumnReorder={enableColumnReorder}
                        enableColumnResize={enableColumnResize}
                        enableDropdownHeadMenu={enableDropdownHeadMenu}
                        enableColumnChooserInDropdownHeadMenu={enableColumnChooserInDropdownHeadMenu}
                        updateColumnState={columnChooser.updateColumnState}
                        renderColumnChooser={columnChooser.renderColumnChooser}
                        createDragPreview={columnChooser.createDragPreview}
                        moveDragPreview={columnChooser.moveDragPreview}
                        removeDragPreview={columnChooser.removeDragPreview}
                        dragProp={columnChooser.columnPickerDragProp}
                        lastDragTargetProp={columnChooser.lastDragTargetProp}
                        enableCheckboxes={enableCheckboxes}
                        checkedItems={checkedItems}
                        onRowsChecked={onRowsChecked}
                    />

                    <div className="datagrid__grid__body">
                        {data.map((item) => {

                            const selected =
                                selectedRow != null &&
                                String(typeof selectedRow === "object" ? selectedRow.id : selectedRow) === String(item.id);


                            return (
                                <div
                                    key={item.id}
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

                                    {onRowsChecked && (
                                       <div className="datagrid__grid__cell">
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
                        tabs={effectiveTabs}
                        tabPanes={effectiveTabPanes}
                    />
                )}
            </div>
            <div className="datagrid__footer pc-layout__footer">
                {enablePagination && (
                    <Pagination
                        total={total}
                        pagination={pagination}
                        setPagination={setPagination}
                    />
                )}
                <div className="datagrid__footer__content">
                    {footerContent}
                </div>
            </div>
        </div>
    );
}

export default Datagrid;