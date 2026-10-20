import { ReactElement, ReactNode } from "react";
import { ColorDefinitions } from "../../../../lib/utils/definitions";
import { DatagridTableInfoProps as DatagridBaseTableInfoProps } from "../Datagrid";

export type DatagridTableInfoComponentProps =
    Pick<
        DatagridBaseTableInfoProps,
        | "tableInfoBorderBottom"
        | "tableInfoBorderColor"
    > & {
        children: ReactNode;
    };

const DatagridTableInfo = ({
    tableInfoBorderBottom = false,
    tableInfoBorderColor = ColorDefinitions.Surface,
    children
}: Readonly<DatagridTableInfoComponentProps>): ReactElement => {

    return (
        <div
            className={[
                "datagrid__info",
                tableInfoBorderBottom
                    ? `border-${tableInfoBorderColor}`
                    : ""
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <div className="datagrid__info__container">
                {children}
            </div>
        </div>
    );
};

export default DatagridTableInfo;
