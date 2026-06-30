import React, { ReactElement, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { ColorDefinitions, IconDefinitions } from "../../../lib/utils/definitions";
import Icon from "../../UI/Icons/Icon/Icon";
import Loader from "../../UI/Loader/Loader";
import Toolbar from "../../UI/Toolbar/Toolbar";
import Tooltip from "../../UI/Tooltip/Tooltip";
import { useDatagridColumnChooser } from "./Addons/DatagridColumnChooser";
import DatagridFilterToolbar from "./Addons/DatagridFilterToolbar";
import DatagridSearch from "./Addons/DatagridSearch";
import DatagridTableInfo from "./Addons/DatagridTableInfo";
import { DatagridAction } from "./Config/DatagridAction";
import { ColumnFilters, FilterUpdateFunc } from "./Config/DatagridData";
import { DatagridRowConfig } from "./Config/DatagridRowConfig";
import { DatagridSortConfig } from "./Config/DatagridSort";
import { DatagridTabItem, DatagridTabPane, DatagridTabs } from "./DatagridTabs";
import { isActiveColumnFilter } from "./Filters/DatagridColumnFilter";
import DatagridFilterList from "./Filters/DatagridFilterList";
import Pagination, { PaginationData } from "./Pagination";
import DatagridTable from "./Table/DatagridTable";
import { DatagridSidebar, DatagridSidebarFooter, DatagridSidebarHeader } from "./DatagridSidebar";

export type DatagridPinnedPosition = "left" | "right" | null;
export type DatagridRowActionsPosition = "left" | "right" | null;

export interface DatagridColumnRuntime<TData> extends DatagridRowConfig<TData> {
    width: number;
    visible: boolean;
    pinned: DatagridPinnedPosition;
}

export type DatagridRenderedColumnType =
    | "collapsible"
    | "checkbox"
    | "rowActions"
    | "data";

export interface DatagridRenderedColumn<TData> {
    key: string;
    type: DatagridRenderedColumnType;
    width: number;
    pinned: DatagridPinnedPosition;
    left?: number;
    right?: number;
    column?: DatagridColumnRuntime<TData>;
}

export interface Datagridsidebar<TData> {
    header?: DatagridSidebarHeader;
    footer?: DatagridSidebarFooter;
    content?: (item: TData | null) => ReactNode;
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
    rowActionPosition?: DatagridRowActionsPosition,
    enablePagination?: boolean;
    paginationPosition?: 'inside table' | 'outside table';
    paginationRowInfoPosition?: 'left' | 'right';
    enableColumnResize?: boolean;
    enableColumnReorder?: boolean;
    enableColumnVisibility?: boolean;
    enableStickyHeader?: boolean;
    enableColumnMenu?: boolean;
    enableColumnMenuColumnVisibility?: boolean;
    enableFiltersInHeader?: boolean;
    enableTabs?: boolean;
    tabs?: DatagridTabItem[];
    tabPanes?: DatagridTabPane[];
    tabberPosition?: 'left' | 'right';
    enableTabColumnVisibility?: boolean;
    enableTabFilters?: boolean;
    selectedRow?: TData | string | number;
    rowSingleClickAction?: (item: TData) => void;
    rowDoubleClickAction?: (item: TData) => void;
    enableCheckboxes?: boolean;
    checkedItems?: TData[];
    onRowsChecked?: (checkedItems: TData[]) => void;
    collapsibleRowData?: (item: TData) => ReactElement;
    footerContent?: ReactNode;
    tableHeaderContent?: ReactNode;
    tableFooterContent?: ReactNode;
    localStorageKey?: string;
    loaderDuration?: number;
    loaderBackground?: ColorDefinitions;
    loaderLabels?: string[];
    loaderShowLabels?: boolean;
    loaderLabelColor?: ColorDefinitions;
    loaderShowOverlay?: boolean;
    loaderTableOverlay?: boolean;
    loaderCentered?: boolean;
    loaderShowAnimation?: boolean;
    loaderAnimationColor?: ColorDefinitions;
    enableTableInfo?: boolean;
    tableInfoContent?: ReactElement;
    tableInfoBorderBottom?: boolean;
    tableInfoBorderColor?: ColorDefinitions;
    enableFilterToolbar?: boolean;
    filterbarSearchPlaceholder?: string;
    filterbarRemoveFiltersTooltip?: string;
    filterbarFilterButtonColor?: ColorDefinitions;
    filterbarFilterButtonArrow?: boolean;
    filterbarFilterGhostButton?: boolean;
    filterbarBorderBottom?: boolean;
    filterbarBorderColor?: ColorDefinitions;
    filterbarEnableInfoPopover?: boolean;
    filterbarInfoPopoverToggleIcon?: IconDefinitions;
    filterbarInfoPopoverContent?: React.ReactNode;
    enableCompactView?: boolean;
    enableSearch?: boolean;
    toolbarTitle?: string | ReactElement;
    toolbarNavItems?: ReactNode;
    toolbarPrefixItems?: ReactNode[];
    toolbarPostfixItems?: ReactNode[];
    toolbarSeparator?: boolean;
    toolbarBorderBottom?: boolean;
    variant?: "default" | "nested";

    enableSidebar?: boolean;
    sidebar?: Datagridsidebar<TData>;
    sidebarPosition?: 'left' | 'right';
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
    rowActionPosition = 'right',
    enableColumnResize = false,
    enableColumnReorder = false,
    enableColumnVisibility = false,
    enablePagination = true,
    paginationPosition = 'outside table',
    paginationRowInfoPosition = 'right',
    enableTabs,
    tabs,
    tabPanes,
    tabberPosition = 'right',
    enableTabColumnVisibility,
    enableTabFilters,
    enableColumnMenu,
    enableColumnMenuColumnVisibility,
    enableStickyHeader = true,
    selectedRow,
    rowSingleClickAction,
    rowDoubleClickAction,
    enableCheckboxes = false,
    checkedItems = [],
    onRowsChecked,
    collapsibleRowData,
    footerContent,
    tableHeaderContent,
    tableFooterContent,
    localStorageKey = "datagrid-columns",
    loaderDuration,
    loaderBackground,
    loaderLabels,
    loaderShowLabels = false,
    loaderLabelColor,
    loaderShowOverlay,
    loaderTableOverlay = true,
    loaderCentered = true,
    loaderShowAnimation,
    loaderAnimationColor,
    enableTableInfo = false,
    tableInfoContent,
    tableInfoBorderBottom,
    tableInfoBorderColor,
    enableFilterToolbar,
    filterbarSearchPlaceholder,
    filterbarRemoveFiltersTooltip,
    filterbarFilterButtonColor,
    filterbarFilterButtonArrow,
    filterbarFilterGhostButton,
    filterbarBorderBottom = false,
    filterbarBorderColor = ColorDefinitions.Surface,
    filterbarEnableInfoPopover,
    filterbarInfoPopoverToggleIcon,
    filterbarInfoPopoverContent,
    toolbarTitle,
    toolbarNavItems,
    toolbarPrefixItems = [],
    toolbarPostfixItems = [],
    toolbarSeparator,
    toolbarBorderBottom = false,
    enableCompactView = false,
    enableSearch = false,
    enableFiltersInHeader,
    variant,
    enableSidebar,
    sidebarPosition = 'right',
    sidebar,

}: Readonly<DatagridProps<TData>>): ReactElement {

    const STORAGE_KEY = localStorageKey;
    const DEFAULT_COLUMN_WIDTH = 180;

    const gridRef = useRef<HTMLDivElement | null>(null);
    const searchInput = useRef<HTMLInputElement>(null!);

    const [showCompact, setShowCompact] = useState(false);
    const [columnFilters, setColumnFilters] = useState<Record<string, any>>({});
    const [searchTerm, setSearchTerm] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    const [sidebarOpen, setSidebarOpen] = useState<boolean | null>(false);
    const [selectedSidebarItem, setSelectedSidebarItem] = useState<TData | null>(null);


    const [pagination, setPagination] = useState<PaginationData>({
        page: 1,
        perPage: 25,
    });

    const [sort, setSort] = useState<DatagridSortConfig | undefined>(
        initialSortConfig
    );

    const useCheckboxes = enableCheckboxes && onRowsChecked !== undefined;

    const [resizing, setResizing] = useState<{
        prop: string;
        startX: number;
        startWidth: number;
    } | null>(null);

    const [collapsibleRowIds, setCollapsibleRowIds] = useState<Set<string | number>>(new Set());


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
                        width: storedColumn?.width ?? p.width ?? DEFAULT_COLUMN_WIDTH,
                        visible: storedColumn?.visible ?? p.visible === true,
                        pinned: storedColumn?.pinned ?? p.pinned ?? null,
                    };
                });
            } catch {
                // negeer corrupte localStorage
            }
        }

        return properties.map((p) => ({
            ...p,
            width: p.width ?? DEFAULT_COLUMN_WIDTH,
            visible: p.visible === true,
            pinned: p.pinned ?? null,
        }));
    });


    useEffect(() => {
        setColumns((current) =>
            properties.map((property) => {
                const existing = current.find(
                    (column) => column.prop === property.prop
                );

                return {
                    ...property,
                    width: existing?.width ?? property.width ?? DEFAULT_COLUMN_WIDTH,
                    visible: existing?.visible ?? property.visible === true,
                    pinned: existing?.pinned ?? property.pinned ?? null,
                };
            })
        );
    }, [properties]);

    const resetColumns = () => {
        setColumns(
            properties.map((p) => ({
                ...p,
                width: p.width ?? DEFAULT_COLUMN_WIDTH,
                visible: p.visible === true,
                pinned: p.pinned ?? null,
            }))
        );

        setSort(initialSortConfig);
    };

    const visibleColumns = useMemo(() => {
        const visible = columns.filter((c) => c.visible);
        const left = visible.filter((c) => c.pinned === "left");
        const center = visible.filter((c) => !c.pinned);
        const right = visible.filter((c) => c.pinned === "right");

        return [...left, ...center, ...right];
    }, [columns]);

    const renderColumnValue = (
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

    const hasPinnedLeftColumns = useMemo(
        () => visibleColumns.some((column) => column.pinned === "left"),
        [visibleColumns]
    );

    const hasPinnedRightColumns = useMemo(
        () => visibleColumns.some((column) => column.pinned === "right"),
        [visibleColumns]
    );

    const renderedColumns = useMemo<DatagridRenderedColumn<TData>[]>(() => {
        const rendered: DatagridRenderedColumn<TData>[] = [];

        if (collapsibleRowData) {
            rendered.push({
                key: "__collapsible",
                type: "collapsible",
                width: 50,
                pinned: hasPinnedLeftColumns ? "left" : null,
            });
        }

        if (useCheckboxes) {
            rendered.push({
                key: "__checkbox",
                type: "checkbox",
                width: 50,
                pinned: hasPinnedLeftColumns ? "left" : null,
            });
        }

        if (rowActions.length > 0 && rowActionPosition === "left") {
            rendered.push({
                key: "__rowActionsLeft",
                type: "rowActions",
                width: rowActions.length * 40,
                pinned: hasPinnedLeftColumns ? "left" : null,
            });
        }

        rendered.push(
            ...visibleColumns.map((column) => ({
                key: column.prop,
                type: "data" as const,
                width: column.width,
                pinned: column.pinned,
                column,
            }))
        );

        if (rowActions.length > 0 && rowActionPosition === "right") {
            rendered.push({
                key: "__rowActionsRight",
                type: "rowActions",
                width: rowActions.length * 40,
                pinned: hasPinnedRightColumns ? "right" : null,
            });
        }

        let leftOffset = 0;

        for (const column of rendered) {
            if (column.pinned === "left") {
                column.left = leftOffset;
                leftOffset += column.width;
            }
        }

        let rightOffset = 0;

        for (const column of [...rendered].reverse()) {
            if (column.pinned === "right") {
                column.right = rightOffset;
                rightOffset += column.width;
            }
        }

        return rendered;
    }, [collapsibleRowData, useCheckboxes, rowActions.length, rowActionPosition, visibleColumns, hasPinnedLeftColumns, hasPinnedRightColumns]);

    const gridTemplateColumns = useMemo(() => {
        return renderedColumns.map((column) => `${column.width}px`).join(" ");
    }, [renderedColumns]);

    const lastPinnedLeft = visibleColumns.filter((column) => column.pinned === "left").at(-1)?.prop;
    const firstPinnedRight = visibleColumns.find((column) => column.pinned === "right")?.prop;

    const getPinnedStyle = (column: DatagridRenderedColumn<TData>): React.CSSProperties => {
        if (column.pinned === "left") {
            return {
                position: "sticky",
                left: column.left ?? 0,
                zIndex: column.type === "data" ? 2 : 3,
            };
        }

        if (column.pinned === "right") {
            return {
                position: "sticky",
                right: column.right ?? 0,
                zIndex: column.type === "data" ? 2 : 3,
            };
        }

        return {};
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
                        ? { ...column, width: nextWidth }
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

    const toggleCollapsibleRow = (id: string | number) => {
        setCollapsibleRowIds((prev) => {
            const next = new Set(prev);

            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }

            return next;
        });
    };

    // Save state in local storage
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
    }, [columns, STORAGE_KEY]);

    const activeColumnFilters = Object.fromEntries(
        Object.entries(columnFilters).filter(([, filter]) =>
            isActiveColumnFilter(filter)
        )
    ) as ColumnFilters<TData>;

    // filter update  
    useEffect(() => {
        onFilterUpdate({
            searchTerm,
            sort,
            propertyConfigs: properties,
            pagination,
            columnFilters: activeColumnFilters,
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

    // Filters 
    const hasFilterableColumns = visibleColumns?.some((p) => p.filter) ?? false;


    // Tabs   
    // Tab Column chooser
    const columnChooser = useDatagridColumnChooser<TData>({ columns, setColumns, enableColumnReorder, enableColumnVisibility });

    const effectiveTabs = useMemo<DatagridTabItem[]>(() => {
        const extraTabs: DatagridTabItem[] = [];

        if (enableTabColumnVisibility) {
            extraTabs.push({
                id: "__columns",
                title: "Kolommen",
                icon: <Icon icon={IconDefinitions.window} />,
            });
        }

        if (enableTabFilters && hasFilterableColumns) {
            extraTabs.push({
                id: "__filters",
                title: "Filters",
                icon: <Icon icon={IconDefinitions.filter} />,
            });
        }

        return [
            ...extraTabs,
            ...(tabs ?? []),
        ];
    }, [tabs, enableTabColumnVisibility]);

    const effectiveTabPanes = useMemo<DatagridTabPane[]>(() => {
        const extraPanes: DatagridTabPane[] = [];

        if (enableTabColumnVisibility) {
            extraPanes.push({
                tabId: "__columns",
                content: columnChooser.renderColumnChooser(),
                header: {
                    content: "Kolommen",
                },
            });
        }

        if (enableTabFilters && hasFilterableColumns) {
            extraPanes.push({
                tabId: "__filters",
                content: (
                    <DatagridFilterList
                        dataRaw={dataRaw}
                        columns={visibleColumns}
                        columnFilters={columnFilters}
                        setColumnFilters={setColumnFilters}
                    />
                ),
                header: {
                    content: "Filters",
                },
            });
        }

        return [
            ...extraPanes,
            ...(tabPanes ?? []),
        ];
    }, [tabPanes, enableTabColumnVisibility, enableTabFilters, hasFilterableColumns, columnChooser.renderColumnChooser, dataRaw, visibleColumns, columnFilters
    ]);

    // Toolbar 
    const postfixElements: ReactNode[] = [];
    if (toolbarPostfixItems) {
        postfixElements.push(...toolbarPostfixItems);
    }

    if (enableCompactView) {
        postfixElements.push(
            <Tooltip key="compact" content="Compacte weergave" direction="bottom-left">
                <Icon
                    icon={IconDefinitions.vertical_spacing}
                    variant="circle"
                    iconCss="pointer"
                    onClick={() => setShowCompact(!showCompact)}
                />
            </Tooltip>
        );
    }

    // Table info 
    const isEnableTableInfo = enableTableInfo && !!tableInfoContent;

    const isNested = variant === "nested";

    const handleRowDoubleClick = (item: TData) => {
        if (!enableSidebar) {
            rowDoubleClickAction?.(item);
            return;
        }

        setSelectedSidebarItem(item);
        setSidebarOpen(true);

        rowDoubleClickAction?.(item);
    };

    return (
        <div className={`datagrid pc-layout ${showCompact ? "datagrid--compact" : ""} ${isNested ? "datagrid--nested" : ""}`}>

            {!isNested && (
                <div className="datagrid__header pc-layout__header">

                    {(toolbarPostfixItems || postfixElements.length > 0) && (
                        <Toolbar
                            title={toolbarTitle}
                            navItems={toolbarNavItems}
                            showSeparator={toolbarSeparator}
                            prefixItems={toolbarPrefixItems}
                            postfixItems={postfixElements}
                            borderBottom={toolbarBorderBottom}
                        />
                    )}

                    {enableFilterToolbar && hasFilterableColumns && (
                        <DatagridFilterToolbar
                            data={data}
                            dataRaw={dataRaw}
                            properties={visibleColumns}
                            searchTerm={searchTerm}
                            onSearchChange={updateQ}
                            columnFilters={columnFilters}
                            setColumnFilters={setColumnFilters}
                            searchPlaceholder={filterbarSearchPlaceholder}
                            removeFiltersTooltip={filterbarRemoveFiltersTooltip}
                            filterButtonColor={filterbarFilterButtonColor}
                            filterButtonArrow={filterbarFilterButtonArrow}
                            filterGhostButton={filterbarFilterGhostButton}
                            borderBottom={filterbarBorderBottom || isEnableTableInfo}
                            borderColor={filterbarBorderColor}
                            enableInfoPopover={filterbarEnableInfoPopover}
                            infoPopoverToggleIcon={filterbarInfoPopoverToggleIcon}
                            infoPopoverContent={filterbarInfoPopoverContent}
                        />
                    )}

                    {isEnableTableInfo && (
                        <DatagridTableInfo
                            borderBottom={tableInfoBorderBottom}
                            borderColor={tableInfoBorderColor}
                        >
                            {checkedItems.length > 0 && !tableInfoContent && (

                                <div> U heeft{" "} <strong className="text-primary-30">{checkedItems.length}</strong> {" "} {checkedItems.length === 1 ? "rij" : "rijen"} {" "} geselecteerd</div>
                            )}

                            {enableTableInfo && tableInfoContent && (<div>{tableInfoContent}</div>)}
                        </DatagridTableInfo>
                    )}

                    {showSearch && (
                        <DatagridSearch
                            enableSearch={showSearch}
                            inputRef={searchInput}
                            searchTerm={searchTerm}
                            onSearchChange={updateQ}
                        />
                    )}
                </div>
            )}


            <div className="pc-layout__content">

                {!isNested && enableSidebar && sidebarPosition === 'left' && (
                    <DatagridSidebar
                        open={sidebarOpen}
                        setOpen={setSidebarOpen}
                        header={sidebar?.header}
                        footer={sidebar?.footer}
                        content={
                            sidebar?.content
                                ? sidebar.content(selectedSidebarItem)
                                : null
                        }
                        sidebarPosition={sidebarPosition}
                    />
                )}

                {!isNested && enableTabs && tabberPosition === 'left' && (
                    <DatagridTabs
                        tabs={effectiveTabs}
                        tabPanes={effectiveTabPanes}
                        tabberPosition={tabberPosition}
                    />
                )}

                {loading ? (
                    <Loader
                        tableOverlay={loaderTableOverlay}
                        duration={loaderDuration}
                        loading={loading}
                        background={loaderBackground}
                        labels={loaderLabels}
                        showLabels={loaderShowLabels}
                        labelColor={loaderLabelColor}
                        showOverlay={loaderShowOverlay}
                        centered={loaderCentered}
                        showAnimation={loaderShowAnimation}
                        animationColor={loaderAnimationColor}
                    />
                ) : null}


                <DatagridTable
                    gridRef={gridRef}
                    data={data}
                    dataRaw={dataRaw}
                    total={total}
                    loading={loading}
                    rowActions={rowActions}
                    rowActionPosition={rowActionPosition}
                    enablePagination={enablePagination}
                    paginationPosition={paginationPosition}
                    paginationRowInfoPosition={paginationRowInfoPosition}
                    enableColumnResize={enableColumnResize}
                    enableColumnReorder={enableColumnReorder}
                    enableColumnVisibility={enableColumnVisibility}
                    enableStickyHeader={enableStickyHeader}
                    enableColumnMenu={enableColumnMenu}
                    enableColumnMenuColumnVisibility={enableColumnMenuColumnVisibility}
                    enableFiltersInHeader={enableFiltersInHeader}
                    selectedRow={selectedRow}
                    rowSingleClickAction={rowSingleClickAction}
                    rowDoubleClickAction={handleRowDoubleClick}
                    checkedItems={checkedItems}
                    onRowsChecked={onRowsChecked}
                    useCheckboxes={useCheckboxes}
                    collapsibleRowData={collapsibleRowData}
                    collapsibleRowIds={collapsibleRowIds}
                    toggleCollapsibleRow={toggleCollapsibleRow}

                    headerContent={isNested ? undefined : tableHeaderContent}
                    footerContent={isNested ? undefined : tableFooterContent}

                    pagination={pagination}
                    setPagination={setPagination}
                    sort={sort}
                    setSort={setSort}
                    columns={columns}
                    setColumns={setColumns}
                    visibleColumns={visibleColumns}
                    renderedColumns={renderedColumns}
                    gridTemplateColumns={gridTemplateColumns}
                    resizing={resizing}
                    setResizing={setResizing}
                    resetColumns={resetColumns}
                    renderColumnValue={renderColumnValue}
                    firstPinnedRight={firstPinnedRight}
                    lastPinnedLeft={lastPinnedLeft}
                    getPinnedStyle={getPinnedStyle}
                    columnChooser={columnChooser}
                    columnFilters={columnFilters}
                    setColumnFilters={setColumnFilters}
                />

                {!isNested && enableTabs && tabberPosition === 'right' && (
                    <DatagridTabs
                        tabs={effectiveTabs}
                        tabPanes={effectiveTabPanes}
                        tabberPosition={tabberPosition}
                    />
                )}

                {!isNested && enableSidebar && sidebarPosition === 'right' && (
                    <DatagridSidebar
                        open={sidebarOpen}
                        setOpen={setSidebarOpen}
                        header={sidebar?.header}
                        footer={sidebar?.footer}
                        content={
                            sidebar?.content
                                ? sidebar.content(selectedSidebarItem)
                                : null
                        }
                        sidebarPosition={sidebarPosition}
                    />
                )}

            </div>

            {!isNested && (
                <div className="datagrid__footer pc-layout__footer">
                    {paginationPosition === 'outside table' && enablePagination && (
                        <Pagination
                            total={total}
                            pagination={pagination}
                            setPagination={setPagination}
                            rowInfoPosition={paginationRowInfoPosition}
                        />
                    )}
                    <div className="datagrid__footer__content">
                        {footerContent}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Datagrid;