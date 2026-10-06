import React, { ReactElement, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ColorDefinitions, IconDefinitions } from "../../../lib/utils/definitions";
import Icon from "../../UI/Icons/Icon/Icon";
import Loader, { LoaderVariant } from "../../UI/Loader/Loader";
import Toolbar from "../../UI/Toolbar/Toolbar";
import Tooltip from "../../UI/Tooltip/Tooltip";
import ContentItem from "../../UI/ContentItem/ContentItem";
import DatagridClearFiltersButton, { DatagridClearFiltersButtonProps } from "./Addons/DatagridClearFiltersButton";
import { useDatagridColumnChooser } from "./Addons/DatagridColumnChooser";
import DatagridSearch from "./Addons/DatagridSearch";
import { DatagridSidebar, DatagridSidebarFooter, DatagridSidebarHeader } from "./Addons/DatagridSidebar";
import DatagridTableInfo from "./Addons/DatagridTableInfo";
import { DatagridTabItem, DatagridTabPane, DatagridTabs } from "./Addons/DatagridTabs";
import { DatagridAction } from "./Config/DatagridAction";
import { ColumnFilters, FilterUpdateFunc } from "./Config/DatagridData";
import { DatagridRowConfig, NestedKeyOf } from "./Config/DatagridRowConfig";
import { DatagridSortConfig } from "./Config/DatagridSort";
import { DatagridProvider, useDatagridContext } from "./Context/DatagridContext";
import { DatagridColumnFilterValue, isActiveColumnFilter } from "./Filters/DatagridColumnFilter";
import DatagridFilterList from "./Filters/DatagridFilterList";
import { getNestedValue } from "./Helpers/datagridTypeHelpers";
import { useDatagridColumnFilters } from "./Hooks/useDatagridColumnFilters";
import { useDatagridSearchTerm } from "./Hooks/useDatagridSearchTerm";
import { PaginationData, PaginationInfoPosition } from "./Pagination";
import DatagridTable from "./Table/DatagridTable";

const DEFAULT_COLUMN_WIDTH = 180;
const UTILITY_COLUMN_WIDTH = 48;
const COLLAPSIBLE_COLUMN_WIDTH = 52;
const MIN_COLUMN_WIDTH = 80;

export type DatagridPinnedPosition = "left" | "right" | null;
export type DatagridRowActionsPosition = "left" | "right" | null;
export type DatagridVariant = "default" | "nested";
export type DatagridTabberPosition = "left" | "right";
export type DatagridSidebarPosition = "left" | "right";
export type DatagridRenderedColumnType = "collapsible" | "checkbox" | "rowActions" | "total" | "data";

export interface DatagridColumnRuntime<TData> extends DatagridRowConfig<TData> {
    width: number;
    visible: boolean;
    pinned: DatagridPinnedPosition;
}

export interface DatagridRenderedColumn<TData> {
    key: string;
    type: DatagridRenderedColumnType;
    width: number;
    pinned: DatagridPinnedPosition;
    left?: number;
    right?: number;
    column?: DatagridColumnRuntime<TData>;
}

export interface DatagridResizingState {
    prop: string;
    startX: number;
    startWidth: number;
}


export interface DatagridDataProps<TData> {
    data: TData[];
    dataRaw?: TData[];
    onFilterUpdate: FilterUpdateFunc<TData>;
    properties?: DatagridRowConfig<TData>[];
    initialSortConfig?: DatagridSortConfig;
    loading: boolean;
    getRowKey?: (item: TData) => string | number;
    /**
     * Column filters set from outside the grid.
     * - With `onColumnFiltersChange`: fully controlled (grid and parent stay in sync).
     * - Without: the grid takes over the value each time the reference changes (`undefined` clears).
     */
    columnFilters?: ColumnFilters<TData>;
    /** Called when the column filters change inside the grid (header, filter tab, "Filter wissen"). */
    onColumnFiltersChange?: (columnFilters: ColumnFilters<TData>) => void;
}

export interface DatagridGeneralSearchProps {
    /** Shows a general search field in the toolbar that searches in all columns. */
    enableSearch?: boolean;
    searchPlaceholder?: string;
    /** Debounce in ms before the search term is passed to onFilterUpdate. Default 300. */
    searchDebounce?: number;
    searchAutoFocus?: boolean;
    /** Controlled search term, e.g. for an external search field. */
    searchTerm?: string;
    onSearchTermChange?: (searchTerm: string) => void;
}

export interface DatagridAppearanceProps {
    enableCompactView?: boolean;
    enableRowHover?: boolean;
    // Detailgrid is always nested.
    variant?: DatagridVariant;
    fullHeight?: boolean;
    css?: string;
}

export interface DatagridPersistenceProps {
    localStorageKey?: string;
}

export interface DatagridRowActionProps<TData> {
    rowActions?: DatagridAction<TData>[];
    rowActionPosition?: DatagridRowActionsPosition;
}

export interface DatagridPaginationProps {
    enablePagination?: boolean;
    paginationRowInfoPosition?: PaginationInfoPosition;
    total: number;
    initialPageSize?: number;
    pageSizeOptions?: number[];
}

export interface DatagridColumnFeatureProps {
    enableColumnResize?: boolean;
    enableColumnReorder?: boolean;
    enableColumnVisibility?: boolean;
    enableColumnPinning?: boolean;
    enableStickyHeader?: boolean;
    // Shows an extra row at the bottom
    enableSummaryRow?: boolean;
}

export interface DatagridColumnMenuProps {
    enableColumnMenu?: boolean;
    enableColumnMenuColumnVisibility?: boolean;
    enableFiltersInHeader?: boolean;
}

export interface DatagridRowInteractionProps<TData> {
    selectedRow?: TData | string | number;
    rowSingleClickAction?: (item: TData) => void;
    rowDoubleClickAction?: (item: TData) => void;
}

export interface DatagridCheckboxProps<TData> {
    enableCheckboxes?: boolean;
    checkedItems?: TData[];
    onRowsChecked?: (checkedItems: TData[]) => void;
}

export interface DatagridCollapsibleRowProps<TData> {
    collapsibleRowData?: React.ComponentType<{
        item: TData;
    }>;
    hasCollapsibleRow?: (item: TData) => boolean;
}

export interface DatagridContentProps {
    footerContent?: ReactNode;
    tableHeaderContent?: ReactNode;
    tableFooterContent?: ReactNode;
}

export interface DatagridTabsProps {
    enableTabs?: boolean;
    tabs?: DatagridTabItem[];
    tabPanes?: DatagridTabPane[];
    tabberPosition?: DatagridTabberPosition;
    enableTabColumnVisibility?: boolean;
    enableTabFilters?: boolean;
    tabsMinWidth?: number;
    tabsMaxWidth?: number;
}

export interface DatagridSidebarConfig<TData> {
    header?: DatagridSidebarHeader;
    footer?: DatagridSidebarFooter;
    content?: (
        props: {
            item: TData | null;
        }
    ) => ReactNode;
}

export interface DatagridSidebarProps<TData> {
    enableSidebar?: boolean;
    sidebar?: DatagridSidebarConfig<TData>;
    sidebarPosition?: DatagridSidebarPosition;
    sidebarMinWidth?: number;
    sidebarMaxWidth?: number;
}

export type DatagridFilterInfoPosition = "toolbar" | "tableInfo" | "none";

export interface DatagridFilterInfoProps {
    // Where the built-in "Filter wissen" button and the filter message are shown:
    // - "toolbar"   (default): button in the toolbar
    // - "tableInfo": message + button in the table info bar (shown automatically when filters are active or there is a message)
    // - "none":      nothing built-in, place it yourself (see DatagridClearFiltersButton / hasActiveColumnFilters)   
    filterInfoPosition?: DatagridFilterInfoPosition;
    // Message next to the button, e.g. "12 producten gevonden, gefilterd op naam". Only used with "tableInfo". 
    filterMessage?: ReactNode;
    // Called after "Filter wissen", e.g. to clear an external search field and message. 
    onClearFilters?: () => void;
    // Styling van de ingebouwde "Filter wissen" knop (toolbar en tableInfo). 
    clearFiltersButtonProps?: Omit<DatagridClearFiltersButtonProps, "onClick">;
}

export interface DatagridTableInfoProps {
    enableTableInfo?: boolean;
    tableInfoContent?: ReactElement;
    tableInfoBorderBottom?: boolean;
    tableInfoBorderColor?: ColorDefinitions;
}

export interface DatagridToolbarProps {
    toolbarTitle?: string | ReactElement;
    toolbarNavItems?: ReactNode;
    toolbarPrefixItems?: ReactNode[];
    toolbarPostfixItems?: ReactNode[];
    toolbarSeparator?: boolean;
    toolbarBorderBottom?: boolean;
    toolbarCss?: string;
    toolbarCompact?: boolean;
}

export interface DatagridLoaderProps {
    loaderDuration?: number;
    loaderBackground?: ColorDefinitions;
    loaderEnableAnimation?: boolean;
    loaderAnimationColor?: ColorDefinitions;
    loaderEnableLabels?: boolean;
    loaderLabelColor?: ColorDefinitions;
    loaderLabels?: string[];
    loaderVariant?: LoaderVariant;
}

export interface DatagridProps<TData> extends DatagridDataProps<TData>,
    DatagridGeneralSearchProps,
    DatagridFilterInfoProps,
    DatagridAppearanceProps,
    DatagridPersistenceProps,
    DatagridRowActionProps<TData>,
    DatagridPaginationProps,
    DatagridColumnFeatureProps,
    DatagridColumnMenuProps,
    DatagridRowInteractionProps<TData>,
    DatagridCheckboxProps<TData>,
    DatagridCollapsibleRowProps<TData>,
    DatagridContentProps,
    DatagridTabsProps,
    DatagridSidebarProps<TData>,
    DatagridTableInfoProps,
    DatagridToolbarProps,
    DatagridLoaderProps {
}

function Datagrid<TData extends { id: string | number }>({
    data,
    dataRaw,
    getRowKey,
    total,
    onFilterUpdate,
    loading,
    properties = [],
    initialSortConfig,
    variant = "default",
    rowActions = [],
    rowActionPosition = "right",
    enableColumnResize = false,
    enableColumnReorder = false,
    enableColumnVisibility = false,
    enableColumnPinning = false,
    enableColumnMenu,
    enableColumnMenuColumnVisibility,
    enableStickyHeader = true,
    enableSummaryRow = false,
    enablePagination = true,
    paginationRowInfoPosition = "right",
    initialPageSize = 25,
    pageSizeOptions,
    enableTabs,
    tabs,
    tabPanes,
    tabberPosition = "right",
    tabsMinWidth,
    tabsMaxWidth,
    enableTabColumnVisibility,
    enableTabFilters,
    enableRowHover = false,
    selectedRow,
    rowSingleClickAction,
    rowDoubleClickAction,
    enableCheckboxes = false,
    checkedItems = [],
    onRowsChecked,
    collapsibleRowData,
    hasCollapsibleRow,
    footerContent,
    tableHeaderContent,
    tableFooterContent,
    localStorageKey,
    enableTableInfo = false,
    tableInfoContent,
    tableInfoBorderBottom,
    tableInfoBorderColor,
    enableCompactView = false,
    enableFiltersInHeader,
    enableSidebar,
    sidebarPosition = "right",
    sidebar,
    sidebarMinWidth,
    sidebarMaxWidth,
    toolbarTitle,
    toolbarNavItems,
    toolbarPrefixItems = [],
    toolbarPostfixItems = [],
    toolbarSeparator,
    toolbarBorderBottom = false,
    toolbarCss = '',
    toolbarCompact = false,
    loaderDuration,
    loaderBackground,
    loaderEnableAnimation,
    loaderAnimationColor,
    loaderEnableLabels = false,
    loaderLabelColor,
    loaderLabels,
    loaderVariant = "table-overlay",
    fullHeight = true,
    css = "",
    columnFilters: externalColumnFilters,
    onColumnFiltersChange,
    enableSearch = false,
    searchPlaceholder,
    searchDebounce = 300,
    searchAutoFocus = false,
    searchTerm: externalSearchTerm,
    onSearchTermChange,
    filterInfoPosition = "toolbar",
    filterMessage,
    onClearFilters,
    clearFiltersButtonProps
}: Readonly<DatagridProps<TData>>): ReactElement {



    const storageKey = localStorageKey ? `datagrid_columns_${localStorageKey}` : undefined;

    const gridRef = useRef<HTMLDivElement | null>(null);

    const datagridContext = useDatagridContext();

    const isNested = variant === "nested";
    const [showCompact, setShowCompact] = useState(false);
    const compactView = isNested ? datagridContext?.compactView ?? false : showCompact;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedSidebarItem, setSelectedSidebarItem] = useState<TData | null>(null);
    const [pagination, setPagination] = useState<PaginationData>({
        page: 1,
        perPage: initialPageSize
    });
    const [sort, setSort] = useState<DatagridSortConfig | undefined>(initialSortConfig);
    const useCheckboxes = enableCheckboxes && onRowsChecked !== undefined;
    const [resizing, setResizing] = useState<DatagridResizingState | null>(null);
    const [collapsibleRowIds, setCollapsibleRowIds] = useState<Set<string | number>>(new Set());

    const resetToFirstPage = useCallback(() => {
        setPagination((current) => current.page === 1 ? current : { ...current, page: 1 });
    }, []);


    // Column filters and general search
    const { columnFilters, setColumnFilters } =
        useDatagridColumnFilters(externalColumnFilters, onColumnFiltersChange, resetToFirstPage);

    const { searchTerm, debouncedSearchTerm, handleSearchChange } =
        useDatagridSearchTerm(externalSearchTerm, onSearchTermChange, searchDebounce, resetToFirstPage);

    // Columns
    const [columns, setColumns] = useState<DatagridColumnRuntime<TData>[]>(() => {

        if (!storageKey) {
            return getDefaultColumns(properties);
        }

        try {
            const stored = localStorage.getItem(storageKey);
            const storedColumns = stored ? JSON.parse(stored) : undefined;
            return getDefaultColumns(properties, storedColumns);
        } catch {
            return getDefaultColumns(properties);
        }
    });


    useEffect(() => {
        setColumns(
            (current) =>
                getDefaultColumns(properties, current)
        );
    }, [properties]);


    const resetColumns = useCallback(() => {
        setColumns(
            properties.map(
                (property) => ({
                    ...property,
                    width: property.width ?? DEFAULT_COLUMN_WIDTH,
                    visible: property.visible === true,
                    pinned: property.pinned ?? null
                })
            )
        );

        setSort(initialSortConfig);

    }, [properties, initialSortConfig]);


    const visibleColumns = useMemo(() =>
        getVisibleColumns(columns), [columns]
    );

    const renderedColumns = useMemo(
        () =>
            createRenderedColumns(
                visibleColumns,
                !!collapsibleRowData,
                useCheckboxes,
                rowActions,
                rowActionPosition
            ),
        [visibleColumns, collapsibleRowData, useCheckboxes, rowActions, rowActionPosition]
    );

    const lastColumnIndex = useMemo(() =>
        getLastColumnIndex(renderedColumns),
        [renderedColumns]
    );

    const gridTemplateColumns = useMemo(() =>
        getGridTemplateColumns(renderedColumns, lastColumnIndex),
        [renderedColumns, lastColumnIndex]
    );


    const lastPinnedLeft = visibleColumns.findLast((column) => column.pinned === "left")?.prop;
    const firstPinnedRight = visibleColumns.find((column) => column.pinned === "right")?.prop;

    // Resizing
    useEffect(() => {

        if (!resizing) {
            return;
        }

        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";

        const onPointerMove = (event: globalThis.PointerEvent) => {
            setColumns(
                (current) => getResizedColumns(current, resizing, event.clientX)
            );
        };

        const onPointerUp = () => {
            setResizing(null);
            resetResizeBodyStyle();
        };

        globalThis.addEventListener("pointermove", onPointerMove);
        globalThis.addEventListener("pointerup", onPointerUp);

        return () => {
            globalThis.removeEventListener("pointermove", onPointerMove);
            globalThis.removeEventListener("pointerup", onPointerUp);
            resetResizeBodyStyle();
        };

    }, [resizing]);


    // Collapsible row
    const toggleCollapsibleRow = useCallback((id: string | number) => {
        setCollapsibleRowIds((current) => toggleIdInSet(current, id));
    }, []);


    // Local storage
    useEffect(() => {

        if (!storageKey) {
            return;
        }

        localStorage.setItem(storageKey,
            JSON.stringify(columns.map(({
                prop,
                width,
                visible,
                pinned
            }) => ({ prop, width, visible, pinned })))
        );

    }, [columns, storageKey]);


    // Active filters
    const activeColumnFilters = useMemo(() =>
        getActiveColumnFilters<TData>(columnFilters),
        [columnFilters]
    );


    const hasActiveFilters = Object.keys(activeColumnFilters).length > 0 || searchTerm.trim().length > 0;

    const clearFilters = useCallback(() => {

        setColumnFilters({});

        if (searchTerm) {
            handleSearchChange("");
        }

        resetToFirstPage();
        onClearFilters?.();
    }, [setColumnFilters, searchTerm, handleSearchChange, resetToFirstPage, onClearFilters]);


    // Filter update
    const propertiesRef = useRef(properties);
    const onFilterUpdateRef = useRef(onFilterUpdate);

    useEffect(() => {
        propertiesRef.current = properties;
    }, [properties]);

    useEffect(() => {
        onFilterUpdateRef.current = onFilterUpdate;
    }, [onFilterUpdate]);

    useEffect(() => {
        onFilterUpdateRef.current({
            searchTerm: debouncedSearchTerm,
            sort,
            propertyConfigs: propertiesRef.current,
            pagination,
            columnFilters: activeColumnFilters
        });
    }, [debouncedSearchTerm, sort, pagination.page, pagination.perPage, activeColumnFilters]);


    const hasFilterableColumns = useMemo(() =>
        visibleColumns.some((column) => !!column.filter),
        [visibleColumns]
    );

    // Column chooser
    const columnChooser = useDatagridColumnChooser<TData>({
        columns,
        setColumns,
        enableColumnReorder,
        enableColumnVisibility
    });

    // Tabs
    const effectiveTabs = useMemo<DatagridTabItem[]>(() => {

        const extraTabs: DatagridTabItem[] = [];
        if (enableTabColumnVisibility) {
            extraTabs.push({
                id: "__columns",
                title: "Kolommen",
                icon: (<Icon icon={IconDefinitions.window} />)
            });
        }

        if (enableTabFilters && hasFilterableColumns) {
            extraTabs.push({
                id: "__filters",
                title: "Filters",
                icon: (<Icon icon={IconDefinitions.filter} />)
            });
        }

        return [
            ...extraTabs,
            ...(tabs ?? [])
        ];
    },
        [tabs, enableTabColumnVisibility, enableTabFilters, hasFilterableColumns]
    );


    const effectiveTabPanes = useMemo<DatagridTabPane[]>(() => {

        const extraPanes: DatagridTabPane[] = [];

        if (enableTabColumnVisibility) {
            extraPanes.push({
                tabId: "__columns",
                content: columnChooser.renderColumnChooser(),
                header: { content: "Kolommen" }
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
                header: { content: "Filters" }
            });
        }

        return [
            ...extraPanes,
            ...(tabPanes ?? [])
        ];
    },
        [tabPanes, enableTabColumnVisibility, enableTabFilters, hasFilterableColumns, columnChooser.renderColumnChooser, dataRaw, visibleColumns, columnFilters, setColumnFilters]
    );


    // Toolbar
    const postfixElements = useMemo(() =>
        getToolbarPostfixItems(
            toolbarPostfixItems,
            hasActiveFilters && filterInfoPosition === "toolbar",
            clearFilters,
            clearFiltersButtonProps,
            enableCompactView,
            isNested,
            setShowCompact
        ),
        [toolbarPostfixItems, hasActiveFilters, filterInfoPosition, clearFilters, clearFiltersButtonProps, enableCompactView, isNested]
    );


    const prefixElements = useMemo<ReactNode[]>(() =>
        enableSearch && !isNested
            ? [
                <DatagridSearch
                    key="datagrid-search"
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                    placeholder={searchPlaceholder}
                    autoFocus={searchAutoFocus}
                />,
                ...toolbarPrefixItems
            ]
            : toolbarPrefixItems,
        [enableSearch, isNested, searchTerm, handleSearchChange, searchPlaceholder, searchAutoFocus, toolbarPrefixItems]
    );


    const showToolbar =
        postfixElements.length > 0 ||
        prefixElements.length > 0 ||
        toolbarTitle !== undefined ||
        toolbarNavItems !== undefined;


    // Table info
    const showFilterInfo = !isNested && filterInfoPosition === "tableInfo" && (hasActiveFilters || !!filterMessage);
    const showCheckedInfo = enableTableInfo && checkedItems.length > 0;
    const showTableInfo = (enableTableInfo && !!tableInfoContent) || showFilterInfo || showCheckedInfo;
    const showHeader = showToolbar || showTableInfo;


    // Row interactions
    const handleRowSingleClick = useCallback((item: TData) => {

        rowSingleClickAction?.(item);

        if (!enableSidebar || !sidebarOpen) {
            return;
        }

        setSelectedSidebarItem(item);
    },
        [rowSingleClickAction, enableSidebar, sidebarOpen]
    );

    const handleRowDoubleClick = useCallback((item: TData) => {

        if (enableSidebar) {
            setSelectedSidebarItem(item);
            setSidebarOpen(true);
        }

        rowDoubleClickAction?.(item);
    },
        [enableSidebar, rowDoubleClickAction]
    );

    const effectiveRowActions = useMemo<DatagridAction<TData>[]>(() =>
        rowActions.map(
            (rowAction) => ({
                ...rowAction,

                action: (item: TData) => {

                    if (enableSidebar) {
                        setSelectedSidebarItem(item);
                        setSidebarOpen(true);
                    }

                    rowAction.action?.(item);
                }
            })
        ),
        [rowActions, enableSidebar]
    );

    const datagrid = (

        <div
            className={[
                fullHeight && !isNested ? 'pc-layout pc-layout--full-height' : 'pc-layout',
                'datagrid-layout',
                css
            ].filter(Boolean).join(" ")}
        >
            {/* header */}
            {showHeader && (
                <div className="pc-layout__header datagrid-layout__header">

                    {showToolbar && (
                        <Toolbar
                            title={toolbarTitle}
                            navItems={toolbarNavItems}
                            showSeparator={toolbarSeparator}
                            prefixItems={prefixElements}
                            postfixItems={postfixElements}
                            borderBottom={toolbarBorderBottom}
                            toolbarCss={toolbarCss}
                            compact={toolbarCompact}
                        />
                    )}

                    {showTableInfo && (
                        <DatagridTableInfo
                            tableInfoBorderBottom={tableInfoBorderBottom}
                            tableInfoBorderColor={tableInfoBorderColor}
                        >
                            {enableTableInfo && tableInfoContent ? (
                                <div>
                                    {tableInfoContent}
                                </div>
                            ) : (
                                <>
                                    {showFilterInfo && (
                                        <ContentItem item={{
                                            id: "datagrid-filter-info",
                                            content: <div>{filterMessage}</div>,
                                            postfix: hasActiveFilters && (
                                                <DatagridClearFiltersButton showTooltip={false} {...clearFiltersButtonProps} onClick={clearFilters} />
                                            )
                                        }} />
                                    )}
                                    {showCheckedInfo && (
                                        <div> U heeft{" "} <strong className="text-primary-30">{checkedItems.length}</strong> {" "} {checkedItems.length === 1 ? "rij" : "rijen"} {" "} geselecteerd</div>
                                    )}
                                </>
                            )}
                        </DatagridTableInfo>
                    )}

                </div>
            )}

            {/* body */}
            <div className="pc-layout__content datagrid-viewport">

                {/* tabs */}
                {!isNested &&
                    enableTabs &&
                    tabberPosition === "left" && (
                        <DatagridTabs
                            tabs={effectiveTabs}
                            tabPanes={effectiveTabPanes}
                            tabberPosition={tabberPosition}
                            tabsMinWidth={tabsMinWidth}
                            tabsMaxWidth={tabsMaxWidth}
                        />
                    )}

                {/* sidebar */}
                {!isNested &&
                    enableSidebar &&
                    sidebarPosition === "left" && (
                        <DatagridSidebar<TData>
                            open={sidebarOpen}
                            setOpen={setSidebarOpen}
                            sidebarPosition={sidebarPosition}
                            sidebarMinWidth={sidebarMinWidth}
                            sidebarMaxWidth={sidebarMaxWidth}
                            header={sidebar?.header}
                            footer={sidebar?.footer}
                            item={selectedSidebarItem}
                            content={sidebar?.content}
                        />
                    )}


                {/* datagrid-root */}
                {loading && (
                    <Loader
                        duration={loaderDuration}
                        loading={loading}
                        background={loaderBackground}
                        enableAnimation={loaderEnableAnimation}
                        animationColor={loaderAnimationColor}
                        enableLabels={loaderEnableLabels}
                        labels={loaderLabels}
                        labelColor={loaderLabelColor}
                        variant={loaderVariant}
                    />
                )}


                <DatagridTable
                    gridRef={gridRef}
                    data={data}
                    dataRaw={dataRaw}
                    getRowKey={getRowKey}
                    loading={loading}
                    rowActions={effectiveRowActions}
                    rowActionPosition={rowActionPosition}
                    enablePagination={enablePagination}
                    paginationRowInfoPosition={paginationRowInfoPosition}
                    total={total}
                    pageSizeOptions={pageSizeOptions}
                    enableColumnResize={enableColumnResize}
                    enableColumnReorder={enableColumnReorder}
                    enableColumnVisibility={enableColumnVisibility}
                    enableColumnPinning={enableColumnPinning}
                    enableStickyHeader={enableStickyHeader}
                    enableSummaryRow={enableSummaryRow}
                    enableColumnMenu={enableColumnMenu}
                    enableColumnMenuColumnVisibility={enableColumnMenuColumnVisibility}
                    enableFiltersInHeader={enableFiltersInHeader}
                    selectedRow={selectedRow}
                    rowSingleClickAction={handleRowSingleClick}
                    rowDoubleClickAction={handleRowDoubleClick}
                    checkedItems={checkedItems}
                    onRowsChecked={onRowsChecked}
                    useCheckboxes={useCheckboxes}
                    collapsibleRowData={collapsibleRowData}
                    hasCollapsibleRow={hasCollapsibleRow}
                    collapsibleRowIds={collapsibleRowIds}
                    toggleCollapsibleRow={toggleCollapsibleRow}
                    headerContent={tableHeaderContent}
                    footerContent={tableFooterContent}
                    pagination={pagination}
                    setPagination={setPagination}
                    sort={sort}
                    setSort={setSort}
                    setColumns={setColumns}
                    renderedColumns={renderedColumns}
                    gridTemplateColumns={gridTemplateColumns}
                    resizing={resizing}
                    setResizing={setResizing}
                    resetColumns={resetColumns}
                    renderColumnValue={renderDatagridColumnValue}
                    firstPinnedRight={firstPinnedRight}
                    lastPinnedLeft={lastPinnedLeft}
                    getPinnedStyle={getPinnedStyle}
                    columnChooser={columnChooser}
                    columnFilters={columnFilters}
                    setColumnFilters={setColumnFilters}
                    isNested={isNested}
                    lastColumnIndex={lastColumnIndex}
                    compactView={compactView}
                    enableRowHover={enableRowHover}
                />


                {/* sidebar */}
                {!isNested && enableSidebar && sidebarPosition === "right" && (
                    <DatagridSidebar<TData>
                        open={sidebarOpen}
                        setOpen={setSidebarOpen}
                        sidebarPosition={sidebarPosition}
                        sidebarMinWidth={sidebarMinWidth}
                        sidebarMaxWidth={sidebarMaxWidth}
                        header={sidebar?.header}
                        footer={sidebar?.footer}
                        item={selectedSidebarItem}
                        content={sidebar?.content}
                    />
                )}

                {/* tabber */}
                {!isNested &&
                    enableTabs &&
                    tabberPosition === "right" && (
                        <DatagridTabs
                            tabs={effectiveTabs}
                            tabPanes={effectiveTabPanes}
                            tabberPosition={tabberPosition}
                            tabsMinWidth={tabsMinWidth}
                            tabsMaxWidth={tabsMaxWidth}
                        />

                    )}

            </div>
            {/* end body */}


            {/* footer */}
            {footerContent && (
                // <div className="datagrid__footer__content">
                <div className="pc-layout__footer datagrid-layout__footer">
                    {footerContent}
                </div>
            )}
        </div>

    )

    if (isNested) {
        return datagrid;
    }


    return (
        <DatagridProvider
            compactView={showCompact}
            setCompactView={setShowCompact}
        >
            {datagrid}
        </DatagridProvider>
    );
}


export default Datagrid;


function getDefaultColumns<TData>(
    properties: DatagridRowConfig<TData>[],
    storedColumns?: Partial<DatagridColumnRuntime<TData>>[]
): DatagridColumnRuntime<TData>[] {

    const propertyMap = new Map<
        NestedKeyOf<TData>,
        DatagridRowConfig<TData>
    >(
        properties.map(
            (property) => [property.prop, property]
        )
    );

    const used = new Set<NestedKeyOf<TData>>();

    const restoredColumns =
        storedColumns
            ?.map(
                (
                    stored
                ): DatagridColumnRuntime<TData> | null => {

                    if (!stored.prop) {
                        return null;
                    }

                    const property = propertyMap.get(stored.prop);

                    if (!property) {
                        return null;
                    }

                    used.add(stored.prop);

                    return {
                        ...property,
                        width:
                            stored.width ??
                            property.width ??
                            DEFAULT_COLUMN_WIDTH,
                        visible:
                            stored.visible ??
                            property.visible === true,
                        pinned:
                            stored.pinned ??
                            property.pinned ??
                            null
                    };
                }
            )
            .filter((column): column is DatagridColumnRuntime<TData> => column !== null) ?? [];

    const newColumns = properties.filter((property) => !used.has(property.prop))
        .map((property): DatagridColumnRuntime<TData> => ({
            ...property,
            width: property.width ?? DEFAULT_COLUMN_WIDTH,
            visible: property.visible === true,
            pinned: property.pinned ?? null
        })
        );

    return [
        ...restoredColumns,
        ...newColumns
    ];
}

function getVisibleColumns<TData>(
    columns: DatagridColumnRuntime<TData>[]
): DatagridColumnRuntime<TData>[] {

    const visible = columns.filter((column) => column.visible);
    const left = visible.filter((column) => column.pinned === "left");
    const center = visible.filter((column) => !column.pinned);
    const right = visible.filter((column) => column.pinned === "right");

    return [
        ...left,
        ...center,
        ...right
    ];
}

function applyPinnedOffsets<TData>(
    columns: DatagridRenderedColumn<TData>[]
): DatagridRenderedColumn<TData>[] {

    let leftOffset = 0;

    for (const column of columns) {

        if (column.pinned !== "left") {
            continue;
        }

        column.left = leftOffset;
        leftOffset += column.width;
    }

    let rightOffset = 0;

    for (
        let index = columns.length - 1;
        index >= 0;
        index--
    ) {
        const column = columns[index];

        if (column.pinned !== "right") {
            continue;
        }

        column.right = rightOffset;
        rightOffset += column.width;
    }

    return columns;
}

function createRenderedColumns<TData>(
    visibleColumns: DatagridColumnRuntime<TData>[],
    hasCollapsibleRows: boolean,
    useCheckboxes: boolean,
    rowActions: DatagridAction<TData>[],
    rowActionPosition: DatagridRowActionsPosition
): DatagridRenderedColumn<TData>[] {

    const hasPinnedLeftColumns = visibleColumns.some((column) => column.pinned === "left");
    const hasPinnedRightColumns = visibleColumns.some((column) => column.pinned === "right");

    const utilityColumns: DatagridRenderedColumn<TData>[] = [
        ...(hasCollapsibleRows
            ? [{
                key: "__collapsible",
                type: "collapsible" as const,
                width: COLLAPSIBLE_COLUMN_WIDTH,
                pinned: hasPinnedLeftColumns ? "left" as const : null
            }]
            : []),
        ...(useCheckboxes
            ? [{
                key: "__checkbox",
                type: "checkbox" as const,
                width: UTILITY_COLUMN_WIDTH,
                pinned: hasPinnedLeftColumns ? "left" as const : null
            }]
            : []),
        ...(rowActions.length > 0 &&
            rowActionPosition === "left"
            ? [{
                key: "__rowActionsLeft",
                type: "rowActions" as const,
                width: rowActions.length * UTILITY_COLUMN_WIDTH,
                pinned: hasPinnedLeftColumns ? "left" as const : null
            }]
            : [])
    ];

    const dataColumns: DatagridRenderedColumn<TData>[] =
        visibleColumns.map(
            (column) => ({
                key: column.prop,
                type: "data",
                width: column.width,
                pinned: column.pinned,
                column
            })
        );

    const rightActionColumns: DatagridRenderedColumn<TData>[] =
        rowActions.length > 0 &&
            rowActionPosition === "right"
            ? [{
                key: "__rowActionsRight",
                type: "rowActions",
                width: rowActions.length * UTILITY_COLUMN_WIDTH,
                pinned: hasPinnedRightColumns ? "right" : null
            }]
            : [];

    return applyPinnedOffsets([
        ...utilityColumns,
        ...dataColumns,
        ...rightActionColumns
    ]);
}

function getPinnedStyle<TData>(
    column: DatagridRenderedColumn<TData>
): React.CSSProperties {

    if (column.pinned === "left") {
        return {
            position: "sticky",
            left: column.left ?? 0,
            zIndex: column.type === "data" ? 2 : 3
        };
    }

    if (column.pinned === "right") {
        return {
            position: "sticky",
            right: column.right ?? 0,
            zIndex: column.type === "data" ? 2 : 3
        };
    }

    return {};
}

function getLastColumnIndex<TData>(
    renderedColumns: DatagridRenderedColumn<TData>[]
): number {
    return renderedColumns
        .map((column) => column.pinned)
        .lastIndexOf(null);
}

function getGridTemplateColumns<TData>(
    renderedColumns: DatagridRenderedColumn<TData>[],
    lastColumnIndex: number
): string {
    return renderedColumns
        .map(
            (column, index) =>
                index === lastColumnIndex
                    ? `minmax(${column.width}px, 1fr)`
                    : `${column.width}px`
        )
        .join(" ");
}

function getResizedColumns<TData>(
    columns: DatagridColumnRuntime<TData>[],
    resizing: DatagridResizingState,
    clientX: number
): DatagridColumnRuntime<TData>[] {

    const nextWidth =
        Math.max(
            MIN_COLUMN_WIDTH,
            resizing.startWidth +
            clientX -
            resizing.startX
        );

    return columns.map(
        (column) =>
            column.prop === resizing.prop
                ? {
                    ...column,
                    width: nextWidth
                }
                : column
    );
}

function resetResizeBodyStyle(): void {
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
}

function toggleIdInSet(
    current: Set<string | number>,
    id: string | number
): Set<string | number> {

    const next = new Set(current);

    if (next.has(id)) {
        next.delete(id);
    } else {
        next.add(id);
    }

    return next;
}

function getActiveColumnFilters<TData>(
    columnFilters: Record<
        string,
        DatagridColumnFilterValue | undefined
    >
): ColumnFilters<TData> {

    return Object.fromEntries(Object.entries(columnFilters).filter(([, filter]) => isActiveColumnFilter(filter))) as ColumnFilters<TData>;
}

function renderDatagridColumnValue<TData>(
    item: TData,
    column: DatagridColumnRuntime<TData>
): ReactNode {

    if (column.useItemOnly) {
        return column.useItemOnly(item);
    }

    const rawValue = getNestedValue(item, column.prop);

    let transformed: ReactNode;

    if (column.transformValue) {
        transformed = column.transformValue(rawValue);

    } else if (rawValue === null || rawValue === undefined) {
        transformed = "";

    } else if (typeof rawValue === "string" || typeof rawValue === "number" || typeof rawValue === "boolean") {
        transformed = String(rawValue);
    } else {
        transformed = "";
    }

    if (column.wrapValue) {
        return column.wrapValue(item, transformed);
    }

    return transformed;
}

function getToolbarPostfixItems(
    toolbarPostfixItems: ReactNode[],
    hasActiveFilters: boolean,
    clearFilters: () => void,
    clearFiltersButtonProps: Omit<DatagridClearFiltersButtonProps, "onClick"> | undefined,
    enableCompactView: boolean,
    isNested: boolean,
    setShowCompact: React.Dispatch<React.SetStateAction<boolean>>
): ReactNode[] {

    const items = [
        ...toolbarPostfixItems
    ];

    if (hasActiveFilters) {
        items.push(
            <DatagridClearFiltersButton
                key="clear-filters"
                {...clearFiltersButtonProps}
                onClick={clearFilters}
            />
        );
    }

    if (enableCompactView && !isNested) {
        items.push(
            <Tooltip
                key="compact"
                content="Compacte weergave"
                direction="top-left"
            >
                <Icon
                    icon={IconDefinitions.vertical_spacing}
                    variant="circle"
                    iconCss="pointer"
                    onClick={() => setShowCompact((current) => !current)
                    }
                />
            </Tooltip>
        );
    }

    return items;
}
