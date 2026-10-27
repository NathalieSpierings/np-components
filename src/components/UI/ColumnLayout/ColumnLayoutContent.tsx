import { FC, PropsWithChildren } from "react";

export interface ColumnLayoutContentProps extends PropsWithChildren {
    css?: string;
}

const ColumnLayoutContent: FC<ColumnLayoutContentProps> = ({
    children,
    css = "",
}) => {
    const cssClass = [
        "column-layout__content",
        css,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className="pc-layout__content">
            <div className="pc-layout__main">
                <div className={cssClass}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ColumnLayoutContent;
