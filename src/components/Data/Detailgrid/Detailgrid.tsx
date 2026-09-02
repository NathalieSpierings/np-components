import React, { ReactElement } from "react";
import Datagrid, { DatagridProps } from "../Datagrid/Datagrid";

export interface DetailgridProps<TData> extends DatagridProps<TData> {
}

function Detailgrid<TData extends { id: string | number }>({
    data,
    dataRaw,
    total,
    onFilterUpdate,
    loading,
    properties = [],
    initialSortConfig,
    rowActions = [],
    rowActionPosition = 'right',
    enableColumnResize = false,
    enableColumnReorder = false,
    enableColumnVisibility = false,
    enableColumnPinning = false,
    enableColumnMenu,
    enableColumnMenuColumnVisibility,
    enableStickyHeader = true,
    enablePagination = true,
    paginationRowInfoPosition = "left",
    initialPageSize = 10,
    pageSizeOptions,
    enableRowHover = false,
    selectedRow,
    rowSingleClickAction,
    rowDoubleClickAction,
    enableCheckboxes = false,
    checkedItems = [],
    onRowsChecked,
    tableHeaderContent,
    tableFooterContent,
    enableTableInfo = false,
    tableInfoContent,
    tableInfoBorderBottom,
    tableInfoBorderColor,
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
    loaderEnableLabels,
    loaderLabelColor,
    loaderLabels,
    loaderVariant = "table-overlay",
    css = ""
}: Readonly<DatagridProps<TData>>): ReactElement {
    return (

        <Datagrid
            data={data}
            dataRaw={dataRaw}
            total={total}
            onFilterUpdate={onFilterUpdate}
            loading={loading}
            properties={properties}
            initialSortConfig={initialSortConfig}
            variant="nested"
            rowActions={rowActions}
            rowActionPosition={rowActionPosition}
            enableColumnResize={enableColumnResize}
            enableColumnReorder={enableColumnReorder}
            enableColumnVisibility={enableColumnVisibility}
            enableColumnPinning={enableColumnPinning}
            enableColumnMenu={enableColumnMenu}
            enableColumnMenuColumnVisibility={enableColumnMenuColumnVisibility}
            enableStickyHeader={enableStickyHeader}
            enablePagination={enablePagination}
            paginationPosition = "inside table"
            paginationRowInfoPosition={paginationRowInfoPosition}
            initialPageSize={initialPageSize}
            pageSizeOptions={pageSizeOptions}
            enableRowHover={enableRowHover}
            selectedRow={selectedRow}
            rowSingleClickAction={rowSingleClickAction}
            rowDoubleClickAction={rowDoubleClickAction}
            enableCheckboxes={enableCheckboxes}
            checkedItems={checkedItems}
            onRowsChecked={onRowsChecked}
            tableHeaderContent={tableHeaderContent}
            tableFooterContent={tableFooterContent}
            enableTableInfo={enableTableInfo}
            tableInfoContent={tableInfoContent}
            tableInfoBorderBottom={tableInfoBorderBottom}
            tableInfoBorderColor={tableInfoBorderColor}
            toolbarTitle={toolbarTitle}
            toolbarNavItems={toolbarNavItems}
            toolbarPrefixItems={toolbarPrefixItems}
            toolbarPostfixItems={toolbarPostfixItems}
            toolbarSeparator={toolbarSeparator}
            toolbarBorderBottom={toolbarBorderBottom}
             toolbarCompact={toolbarCompact}
            toolbarCss={toolbarCss}
            loaderDuration={loaderDuration}
            loaderBackground={loaderBackground}
            loaderEnableAnimation={loaderEnableAnimation}
            loaderAnimationColor={loaderAnimationColor}
            loaderEnableLabels={loaderEnableLabels}
            loaderLabelColor={loaderLabelColor}
            loaderLabels={loaderLabels}
            loaderVariant={loaderVariant}            
            css={css}
        />
    )
}


export default Detailgrid;