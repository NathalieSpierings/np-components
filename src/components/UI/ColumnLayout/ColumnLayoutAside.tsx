import { FC, PropsWithChildren } from "react";
import { ColorDefinitions } from "../../../lib/utils/definitions";
import { useColumnLayout } from "./ColumnLayoutContext";

export interface ColumnLayoutAsideProps extends PropsWithChildren {
    borderColor?: ColorDefinitions;
    css?: string;
}

const ColumnLayoutAside: FC<ColumnLayoutAsideProps> = ({
    borderColor = ColorDefinitions.Surface,
    css,
    children,
    ...props
}) => {
    const { asidePosition } = useColumnLayout();

    const cssClass = [
        "pc-layout__aside",
        `pc-layout__aside--${asidePosition}`,
        "column-layout__aside",
        "shown",
        borderColor && `border-${borderColor}`,
        css,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <aside className={cssClass} {...props}>
            <div className="pc-layout pc-layout--full-height">
                {children}
            </div>
        </aside>
    );
};

ColumnLayoutAside.displayName = "ColumnLayoutAside";

export default ColumnLayoutAside;