import React, { ReactElement, ReactNode } from "react";
import { useDatagridColumnChooser } from "../Addons/DatagridColumnChooser";
import { DatagridAction } from "../Config/DatagridAction";
import { DatagridSortConfig } from "../Config/DatagridSort";
import { DatagridColumnRuntime, DatagridRenderedColumn, DatagridRowActionsPosition } from "../Datagrid";
import Pagination, { PaginationData, PaginationInfoPosition, PaginationPosition } from "../Pagination";
import DatagridHead from "./DatagridHead";
import { DatagridRow } from "./DatagridRow";



export interface DatagridTableProps<TData> {
    gridRef: React.RefObject<HTMLDivElement | null>;
    data: TData[];
    dataRaw?: TData[];
    total: number;
    loading: boolean;

    rowActions: DatagridAction<TData>[];
    rowActionPosition: DatagridRowActionsPosition;

    enablePagination: boolean;
    paginationPosition: PaginationPosition;
    paginationRowInfoPosition:PaginationInfoPosition;

    enableColumnResize: boolean;
    enableColumnReorder: boolean;
    enableColumnVisibility?: boolean;
    enableStickyHeader?: boolean;

    enableColumnMenu?: boolean;
    enableColumnMenuColumnVisibility?: boolean;

    enableFiltersInHeader?: boolean;

    selectedRow?: TData | string | number;
    rowSingleClickAction?: (item: TData) => void;
    rowDoubleClickAction?: (item: TData) => void;

    checkedItems?: TData[];
    onRowsChecked?: (checkedItems: TData[]) => void;
    useCheckboxes: boolean;

    collapsibleRowData?: (item: TData) => ReactElement;
    collapsibleRowIds: Set<string | number>;
    toggleCollapsibleRow: (id: string | number) => void;

    headerContent?: ReactNode;
    footerContent?: ReactNode;

    pagination: PaginationData;
    setPagination: React.Dispatch<React.SetStateAction<PaginationData>>;

    sort?: DatagridSortConfig;
    setSort: React.Dispatch<React.SetStateAction<DatagridSortConfig | undefined>>;

    columns: DatagridColumnRuntime<TData>[];
    setColumns: React.Dispatch<React.SetStateAction<DatagridColumnRuntime<TData>[]>>;
    visibleColumns: DatagridColumnRuntime<TData>[];
    renderedColumns: DatagridRenderedColumn<TData>[];
    gridTemplateColumns: string;

    resizing: {
        prop: string;
        startX: number;
        startWidth: number;
    } | null;
    setResizing: React.Dispatch<
        React.SetStateAction<{
            prop: string;
            startX: number;
            startWidth: number;
        } | null>
    >;
    resetColumns: () => void;
    renderColumnValue: (item: TData, column: DatagridColumnRuntime<TData>) => ReactNode;

    firstPinnedRight?: string;
    lastPinnedLeft?: string;
    getPinnedStyle: (column: DatagridRenderedColumn<TData>) => React.CSSProperties;
    columnChooser: ReturnType<typeof useDatagridColumnChooser<TData>>;
    enableFilters?: boolean;
    columnFilters: Record<string, any>;
    setColumnFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    isNested?: boolean;
}

function DatagridTable<TData extends { id: string | number }>({
    gridRef,
    data,
    dataRaw,
    total,
    loading,
    rowActions,
    rowActionPosition,
    enablePagination,
    paginationPosition,
    paginationRowInfoPosition,
    enableColumnResize,
    enableColumnReorder,
    enableColumnVisibility,
    enableStickyHeader,
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
    columns,
    setColumns,
    visibleColumns,
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
    enableFilters,
    columnFilters,
    setColumnFilters,
    isNested
}: Readonly<DatagridTableProps<TData>>): ReactElement {
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
            />

            <div className="datagrid__grid__body">
                {data.length ? (
                    data.map((item) => {

                        return (
                            <DatagridRow
                                key={item.id}
                                item={item}
                                selected={
                                    selectedRow != null &&
                                    String(
                                        typeof selectedRow === "object"
                                            ? selectedRow.id
                                            : selectedRow
                                    ) === String(item.id)
                                }
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
                            />
                        )
                    })
                ) : (
                    <div className="datagrid__grid__row datagrid__grid__row--empty"
                        style={{ gridTemplateColumns: '1fr' }}
                    >
                        <div className="datagrid__grid__cell">
                            Geen gegevens gevonden!
                        </div>
                    </div>
                )}

                {data.map((item) => (
                    <DatagridRow
                        key={item.id}
                        item={item}
                        selected={
                            selectedRow != null &&
                            String(
                                typeof selectedRow === "object"
                                    ? selectedRow.id
                                    : selectedRow
                            ) === String(item.id)
                        }
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
                    />
                ))}
            </div>

            <div className="datagrid__grid__footer">

                {isNested && enablePagination && (
                    <Pagination
                        total={total}
                        pagination={pagination}
                        setPagination={setPagination}
                        rowInfoPosition={paginationRowInfoPosition}
                    />
                )}

                {!isNested && enablePagination && paginationPosition === "inside table" && (
                    <Pagination
                        total={total}
                        pagination={pagination}
                        setPagination={setPagination}
                        rowInfoPosition={paginationRowInfoPosition}
                    />
                )}


                {footerContent && (<div className="datagrid__footer__content">
                    {footerContent}
                </div>)}

            </div>
        </div>
    );
}
export default DatagridTable;