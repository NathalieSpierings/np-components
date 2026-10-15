import React, { FC, PropsWithChildren } from "react";

export interface ColumnLayoutMainProps extends PropsWithChildren {
    css?: string;
}

const ColumnLayoutMain: FC<ColumnLayoutMainProps> = ({
    children,
    css = "",
}) => {
    const cssClass = [
        "pc-layout__main",
        "column-layout__main",
        css,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={cssClass}>
            <div className="pc-layout pc-layout--full-height">
                {children}
            </div>
        </div>
    );
};

ColumnLayoutMain.displayName = "ColumnLayoutMain";

export default ColumnLayoutMain;
