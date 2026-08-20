import React, { ReactElement, ReactNode } from "react";
import { useDatagridColumnChooser } from "../Addons/DatagridColumnChooser";
import { DatagridSortConfig } from "../Config/DatagridSort";
import { DatagridCheckboxProps, DatagridCollapsibleRowProps, DatagridColumnFeatureProps, DatagridColumnMenuProps, DatagridColumnRuntime, DatagridPaginationProps, DatagridRenderedColumn, DatagridResizingState, DatagridRowActionProps, DatagridRowInteractionProps } from "../Datagrid";
import { DatagridColumnFilterValue } from "../Filters/DatagridColumnFilter";
import Pagination, { PaginationData } from "../Pagination";
import DatagridHead from "./DatagridHead";
import { DatagridRow } from "./DatagridRow";
import DatagridSummaryRow from "./DatagridSummaryRow";


export type DatagridTableRowActionProps<TData> = Required<DatagridRowActionProps<TData>>;

export type DatagridTablePaginationProps =
    Required<Pick<
            DatagridPaginationProps,
            | "enablePagination"
            | "paginationPosition"
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
    DatagridTablePaginationProps,
    DatagridTableColumnFeatureProps,
    DatagridTableColumnMenuProps,
    DatagridTableSelectionProps<TData> {

    gridRef: React.RefObject<HTMLDivElement | null>;
    data: TData[];
    dataRaw?: TData[];
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
    rowActions,
    rowActionPosition,
    enablePagination,
    paginationPosition,
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
    selectedRow,
    rowSingleClickAction,
    rowDoubleClickAction,
    checkedItems,
    onRowsChecked,
    useCheckboxes,
    collapsibleRowData,
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
    lastColumnIndex
}: Readonly<DatagridTableProps<TData>>): ReactElement {

    const showPagination = enablePagination && (isNested || paginationPosition === "inside table");

    return (
        <div ref={gridRef} className="datagrid__grid pc-layout__main">
            <div className="datagrid__grid__header">
                {headerContent}
            </div>

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


            <div className="datagrid__grid__body">
                {data.length > 0 ? (
                    <>
                        {data.map((item) => (
                            <DatagridRow
                                key={item.id}
                                item={item}
                                selected={isSelectedRow(item, selectedRow)}
                                expanded={collapsibleRowIds.has(item.id)}
                                rowActions={rowActions}
                                renderedColumns={renderedColumns}
                                gridTemplateColumns={gridTemplateColumns}
                                checkedItems={checkedItems}
                                onRowsChecked={onRowsChecked}
                                useCheckboxes={useCheckboxes}
                                collapsibleRowData={collapsibleRowData}
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

                        {enableSummaryRow && (
                            <DatagridSummaryRow
                                data={data}
                                renderedColumns={renderedColumns}
                                gridTemplateColumns={gridTemplateColumns}
                                firstPinnedRight={firstPinnedRight} lastPinnedLeft={lastPinnedLeft}
                                getPinnedStyle={getPinnedStyle}
                                lastColumnIndex={lastColumnIndex}
                            />
                        )}
                    </>
                ) : (
                    <div className="datagrid__grid__row datagrid__grid__row--empty"
                        style={{ gridTemplateColumns: '1fr' }}
                    >
                        <div className="datagrid__grid__cell">
                            Geen gegevens gevonden!
                        </div>
                    </div>
                )
                }
            </div>

            <div className="datagrid__grid__footer">

                {showPagination && (
                    <Pagination
                        total={total}
                        pagination={pagination}
                        setPagination={setPagination}
                        rowInfoPosition={paginationRowInfoPosition}
                        pageSizeOptions={pageSizeOptions}
                    />
                )}

                {footerContent && (
                    <div className="datagrid__footer__content">
                        {footerContent}
                    </div>
                )}

            </div>
        </div>
    );
}

export default DatagridTable;