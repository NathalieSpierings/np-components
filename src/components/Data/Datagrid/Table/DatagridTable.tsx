import React, { ReactElement, ReactNode } from "react";
import { useDatagridColumnChooser } from "../Addons/DatagridColumnChooser";
import { DatagridSortConfig } from "../Config/DatagridSort";
import { DatagridAppearanceProps, DatagridCheckboxProps, DatagridCollapsibleRowProps, DatagridColumnFeatureProps, DatagridColumnMenuProps, DatagridColumnRuntime, DatagridPaginationProps, DatagridRenderedColumn, DatagridResizingState, DatagridRowActionProps, DatagridRowInteractionProps } from "../Datagrid";
import { DatagridColumnFilterValue } from "../Filters/DatagridColumnFilter";
import Pagination, { PaginationData } from "../Pagination";
import DatagridHead from "./DatagridHead";
import { DatagridRow } from "./DatagridRow";
import DatagridSummaryRow from "./DatagridSummaryRow";

//enableRowHover

export type DatagridTableRowActionProps<TData> = Required<DatagridRowActionProps<TData>>;

export type DatagridTableAppearanceProps =
    Pick<
        DatagridAppearanceProps,
        | "enableRowHover"
    >;



export type DatagridTablePaginationProps =
    Required<Pick<
        DatagridPaginationProps,
        | "enablePagination"
        | "paginationRowInfoPosition"
    >
    > & Pick<
        DatagridPaginationProps,
        | "total"
        | "pageSizeOptions"
    >;

export type DatagridTableColumnFeatureProps =
    Required<
        Pick<
            DatagridColumnFeatureProps,
            | "enableColumnResize"
            | "enableColumnReorder"
            | "enableColumnVisibility"
            | "enableColumnPinning"
            | "enableStickyHeader"
            | "enableSummaryRow"
        >
    >;

export type DatagridTableColumnMenuProps =
    Pick<
        DatagridColumnMenuProps,
        | "enableColumnMenu"
        | "enableColumnMenuColumnVisibility"
        | "enableFiltersInHeader"
    >;

export type DatagridTableSelectionProps<TData> =
    DatagridRowInteractionProps<TData> &
    Pick<
        DatagridCheckboxProps<TData>,
        | "checkedItems"
        | "onRowsChecked"
    > &
    DatagridCollapsibleRowProps<TData>;


export interface DatagridTableProps<TData>
    extends DatagridTableRowActionProps<TData>,
    DatagridTableAppearanceProps,
    DatagridTablePaginationProps,
    DatagridTableColumnFeatureProps,
    DatagridTableColumnMenuProps,
    DatagridTableSelectionProps<TData> {

    gridRef: React.RefObject<HTMLDivElement | null>;
    data: TData[];
    dataRaw?: TData[];
    getRowKey?: (item: TData) => string | number;
    loading: boolean;
    useCheckboxes: boolean;
    collapsibleRowIds: Set<string | number>;
    toggleCollapsibleRow: (id: string | number) => void;
    headerContent?: ReactNode;
    footerContent?: ReactNode;
    pagination: PaginationData;
    setPagination: React.Dispatch<React.SetStateAction<PaginationData>>;
    sort?: DatagridSortConfig;
    setSort: React.Dispatch<React.SetStateAction<DatagridSortConfig | undefined>>;
    setColumns: React.Dispatch<React.SetStateAction<DatagridColumnRuntime<TData>[]>>;
    renderedColumns: DatagridRenderedColumn<TData>[];
    gridTemplateColumns: string;
    resizing: DatagridResizingState | null;
    setResizing: React.Dispatch<React.SetStateAction<DatagridResizingState | null>>;
    resetColumns: () => void;
    renderColumnValue: (
        item: TData,
        column: DatagridColumnRuntime<TData>
    ) => ReactNode;
    firstPinnedRight?: string;
    lastPinnedLeft?: string;
    getPinnedStyle: (column: DatagridRenderedColumn<TData>) => React.CSSProperties;
    columnChooser: ReturnType<typeof useDatagridColumnChooser<TData>>;
    columnFilters: Record<
        string,
        DatagridColumnFilterValue | undefined
    >;
    setColumnFilters: React.Dispatch<
        React.SetStateAction<
            Record<
                string,
                DatagridColumnFilterValue | undefined
            >
        >
    >;
    isNested?: boolean;
    lastColumnIndex: number;
    compactView?: boolean;
}


function isSelectedRow<TData extends { id: string | number }>(
    item: TData,
    selectedRow: TData | string | number | undefined
): boolean {
    if (selectedRow == null) {
        return false;
    }

    const selectedId =
        typeof selectedRow === "object"
            ? selectedRow.id
            : selectedRow;

    return String(selectedId) === String(item.id);
}

function DatagridTable<TData extends { id: string | number }>({
    gridRef,
    data,
    dataRaw,
    getRowKey,
    rowActions,
    rowActionPosition,
    enablePagination,
    paginationRowInfoPosition,
    total,
    pageSizeOptions,
    enableColumnResize,
    enableColumnReorder,
    enableColumnVisibility,
    enableColumnPinning,
    enableStickyHeader,
    enableSummaryRow,
    enableColumnMenu,
    enableColumnMenuColumnVisibility,
    enableFiltersInHeader,
    enableRowHover,
    selectedRow,
    rowSingleClickAction,
    rowDoubleClickAction,
    checkedItems,
    onRowsChecked,
    useCheckboxes,
    collapsibleRowData,
    hasCollapsibleRow,
    collapsibleRowIds,
    toggleCollapsibleRow,
    headerContent,
    footerContent,
    pagination,
    setPagination,
    sort,
    setSort,
    setColumns,
    renderedColumns,
    gridTemplateColumns,
    resizing,
    setResizing,
    resetColumns,
    renderColumnValue,
    firstPinnedRight,
    lastPinnedLeft,
    getPinnedStyle,
    columnChooser,
    columnFilters,
    setColumnFilters,
    isNested,
    lastColumnIndex,
    compactView
}: Readonly<DatagridTableProps<TData>>): ReactElement {

    //const showPagination = enablePagination && (isNested || paginationPosition === "inside table");
    const showPagination = enablePagination;

    return (

        <div className={`pc-layout__main datagrid-root ${isNested ? "datagrid--nested" : ""} `}>
            <div className="pc-layout">

                {headerContent && (
                    <div className="pc-layout__header datagrid-root__header">
                        {headerContent}
                    </div>
                )}


                <div className="pc-layout__content datagrid-root__content">
                    <div className="pc-layout__main">

                        <div ref={gridRef}
                            className={[
                                'pc-layout datagrid datagrid__scrollable-area',
                                enableRowHover ? "datagrid--hover" : "",
                                compactView ? "datagrid--compact" : ""
                            ].filter(Boolean).join(" ")}
                            style={{
                                "--datagrid-columns": gridTemplateColumns,
                                "--datagrid-width": `${renderedColumns.reduce((total, column) => total + column.width, 0)}px`
                            } as React.CSSProperties}
                        >
                            <DatagridHead
                                gridRef={gridRef}
                                data={data}
                                dataRaw={dataRaw}
                                rowActions={rowActions}
                                rowActionPosition={rowActionPosition}
                                enableColumnResize={enableColumnResize}
                                enableColumnReorder={enableColumnReorder}
                                enableColumnVisibility={enableColumnVisibility}
                                enableColumnPinning={enableColumnPinning}
                                enableStickyHeader={enableStickyHeader}
                                enableColumnMenu={enableColumnMenu}
                                enableColumnMenuColumnVisibility={enableColumnMenuColumnVisibility}
                                enableFiltersInHeader={enableFiltersInHeader}
                                checkedItems={checkedItems}
                                onRowsChecked={onRowsChecked}
                                useCheckboxes={useCheckboxes}
                                collapsibleRowData={collapsibleRowData}
                                sort={sort}
                                setSort={setSort}
                                renderedColumns={renderedColumns}
                                gridTemplateColumns={gridTemplateColumns}
                                resizing={resizing}
                                setResizing={setResizing}
                                setColumns={setColumns}
                                updateColumnState={columnChooser.updateColumnState}
                                resetColumns={resetColumns}
                                renderColumnChooser={columnChooser.renderColumnChooser}
                                createDragPreview={columnChooser.createDragPreview}
                                moveDragPreview={columnChooser.moveDragPreview}
                                removeDragPreview={columnChooser.removeDragPreview}
                                dragProp={columnChooser.columnPickerDragProp}
                                lastDragTargetProp={columnChooser.lastDragTargetProp}
                                firstPinnedRight={firstPinnedRight}
                                lastPinnedLeft={lastPinnedLeft}
                                getPinnedStyle={getPinnedStyle}
                                columnFilters={columnFilters}
                                setColumnFilters={setColumnFilters}
                                lastColumnIndex={lastColumnIndex}
                            />
                            <div className="pc-layout__content">

                                <div className="pc-layout__main datagrid__body">
                                    {data.length > 0 ? (
                                        <>
                                            {data.map((item) => (
                                                <DatagridRow
                                                    key={getRowKey ? getRowKey(item) : item.id}
                                                    item={item}
                                                    selected={isSelectedRow(item, selectedRow)}
                                                    expanded={collapsibleRowIds.has(item.id)}
                                                    rowActions={rowActions}
                                                    renderedColumns={renderedColumns}
                                                    checkedItems={checkedItems}
                                                    onRowsChecked={onRowsChecked}
                                                    useCheckboxes={useCheckboxes}
                                                    collapsibleRowData={collapsibleRowData}
                                                    hasCollapsibleRow={hasCollapsibleRow}
                                                    toggleCollapsibleRow={toggleCollapsibleRow}
                                                    rowSingleClickAction={rowSingleClickAction}
                                                    rowDoubleClickAction={rowDoubleClickAction}
                                                    resizing={resizing}
                                                    renderColumnValue={renderColumnValue}
                                                    firstPinnedRight={firstPinnedRight}
                                                    lastPinnedLeft={lastPinnedLeft}
                                                    getPinnedStyle={getPinnedStyle}
                                                    lastColumnIndex={lastColumnIndex}
                                                />
                                            ))}


                                        </>
                                    ) : (
                                        <div className="datagrid__row datagrid__row--empty"
                                            style={{ "--datagrid-columns": '1fr' } as React.CSSProperties}
                                        >
                                            <div className="datagrid__cell">
                                                Geen gegevens gevonden!
                                            </div>
                                        </div>
                                    )
                                    }
                                </div>
                            </div>



                            {data.length > 0 && enableSummaryRow && (
                                <DatagridSummaryRow
                                    data={data}
                                    renderedColumns={renderedColumns}
                                    gridTemplateColumns={gridTemplateColumns}
                                    firstPinnedRight={firstPinnedRight} lastPinnedLeft={lastPinnedLeft}
                                    getPinnedStyle={getPinnedStyle}
                                    lastColumnIndex={lastColumnIndex}
                                />
                            )}


                        </div>
                    </div>
                </div>

                {(showPagination || footerContent) && (
                    <div className="pc-layout__footer datagrid-root__footer">

                        {showPagination && (
                            <Pagination
                                total={total}
                                pagination={pagination}
                                setPagination={setPagination}
                                rowInfoPosition={paginationRowInfoPosition}
                                pageSizeOptions={pageSizeOptions}
                            />
                        )}

                        {footerContent}

                    </div>
                )}


            </div>
        </div>
    );
}

export default DatagridTable;
