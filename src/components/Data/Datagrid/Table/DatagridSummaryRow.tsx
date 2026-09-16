import React, { ReactElement, ReactNode, useMemo } from "react";
import Tooltip from "../../../UI/Tooltip/Tooltip";
import { DatagridColumnRuntime, DatagridRenderedColumn } from "../Datagrid";
import { getNestedValue } from "../Helpers/datagridTypeHelpers";

const getPinnedClass = <TData,>(
    renderedColumn: DatagridRenderedColumn<TData>
): string => {
    if (renderedColumn.pinned === "left") {
        return "datagrid__cell--pinned-left";
    }

    if (renderedColumn.pinned === "right") {
        return "datagrid__cell--pinned-right";
    }

    return "";
};

const getCellClassName = <TData,>(
    renderedColumn: DatagridRenderedColumn<TData>,
    index: number,
    lastColumnIndex: number,
    lastPinnedLeft?: string,
    firstPinnedRight?: string
): string => {
    const column = renderedColumn.column;

    return [
        "datagrid__cell grid__cell--summary",
        index === lastColumnIndex
            ? "datagrid__cell--last-column"
            : "",
        getPinnedClass(renderedColumn),
        lastPinnedLeft !== undefined &&
            column?.prop === lastPinnedLeft
            ? "datagrid__cell--pinned-left--last"
            : "",
        firstPinnedRight !== undefined &&
            column?.prop === firstPinnedRight
            ? "datagrid__cell--pinned-right--first"
            : ""
    ]
        .filter(Boolean)
        .join(" ");
};

const calculateSummaryTotals = <TData,>(
    data: TData[],
    renderedColumns: DatagridRenderedColumn<TData>[]
): Map<string, number> => {

    const summaryColumns = renderedColumns
        .filter(
            (
                renderedColumn
            ): renderedColumn is DatagridRenderedColumn<TData> & {
                column: DatagridColumnRuntime<TData>;
            } =>
                renderedColumn.type === "data" &&
                renderedColumn.column?.summary === true
        )
        .map((renderedColumn) => renderedColumn.column);

    const totals = new Map<string, number>();

    for (const column of summaryColumns) {
        totals.set(column.prop, 0);
    }

    for (const item of data) {
        for (const column of summaryColumns) {
            const value = getNestedValue(item, column.prop);



            if (typeof value !== "number" || !Number.isFinite(value)) {
                continue;
            }

            totals.set(
                column.prop,
                (totals.get(column.prop) ?? 0) + value
            );
        }
    }
    return totals;
};

const renderTotalValue = <TData,>(
    column: DatagridColumnRuntime<TData>,
    total: number
): ReactNode => {
    if (column.transformValue) {
        return column.transformValue(total as never);
    }

    return total;
};

export interface DatagridSummaryRowProps<TData> {
    data: TData[];
    renderedColumns: DatagridRenderedColumn<TData>[];
    gridTemplateColumns: string;
    firstPinnedRight?: string;
    lastPinnedLeft?: string;
    getPinnedStyle: (
        column: DatagridRenderedColumn<TData>
    ) => React.CSSProperties;
    lastColumnIndex: number;
}

export default function DatagridSummaryRow<TData>({
    data,
    renderedColumns,
    firstPinnedRight,
    lastPinnedLeft,
    getPinnedStyle,
    lastColumnIndex
}: Readonly<DatagridSummaryRowProps<TData>>): ReactElement {

    const firstSummaryColumnIndex = useMemo(
        () =>
            renderedColumns.findIndex(
                (renderedColumn) =>
                    renderedColumn.type === "data" &&
                    renderedColumn.column?.summary === true
            ),
        [renderedColumns]
    );

    const totalLabelColumnIndex =
        firstSummaryColumnIndex > 0
            ? firstSummaryColumnIndex - 1
            : -1;

    const summaryTotals = useMemo(
        () => calculateSummaryTotals(data, renderedColumns),
        [data, renderedColumns]
    );


    return (
        <div className="pc-layout__footer datagrid__footer-row datagrid__row">
            {renderedColumns.map((renderedColumn, index) => {
                const column = renderedColumn.column;

                const isSummaryLabelColumn = index === totalLabelColumnIndex;
                const isFirstSummaryColumn = index === firstSummaryColumnIndex;

                const css = getCellClassName(
                    renderedColumn,
                    index,
                    lastColumnIndex,
                    lastPinnedLeft,
                    firstPinnedRight
                );


                if (renderedColumn.type !== "data" || !column) {
                    return (
                        <div
                            key={renderedColumn.key}
                            className={css}
                            data-column-key={renderedColumn.key}
                            style={getPinnedStyle(renderedColumn)}
                        >
                            {isSummaryLabelColumn && (
                                <div className="datagrid__cell__content">
                                    <Tooltip
                                        overflowTooltip
                                        content="Totaal"
                                    >
                                        <div className="datagrid__cell__content__label">
                                            Totaal
                                        </div>
                                    </Tooltip>
                                </div>
                            )}
                        </div>
                    );
                }

                let content: ReactNode = null;

                if (column.summary) {
                    const total = summaryTotals.get(column.prop) ?? 0;
                    content = renderTotalValue(column, total);
                } else if (isSummaryLabelColumn) {
                    content = "Totaal";
                }

                const showLabelInsideSummary =
                    totalLabelColumnIndex === -1 &&
                    isFirstSummaryColumn;

                return (
                    <div
                        key={renderedColumn.key}
                        className={css}
                        data-column-key={renderedColumn.key}
                        style={getPinnedStyle(renderedColumn)}
                    >
                        <div className="grid__cell__content">
                            <div className="grid__cell__content__label">
                                {showLabelInsideSummary ? (
                                    <>
                                        <span>Totaal </span>
                                        {content}
                                    </>
                                ) : (
                                    content
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
