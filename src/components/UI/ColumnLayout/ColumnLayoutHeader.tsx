import React, { FC, PropsWithChildren } from "react";
import { useColumnLayout } from "../../../components/UI/ColumnLayout/ColumnLayoutContext";
import { ColorDefinitions } from "../../../lib/utils/definitions";
import DismissButton from "../DismissButton/DismissButton";

export interface ColumnLayoutHeaderProps extends PropsWithChildren {
    borderColor?: ColorDefinitions;
    css?: string;
}

const ColumnLayoutHeader: FC<ColumnLayoutHeaderProps> = ({
    borderColor = ColorDefinitions.Surface,
    children,
    css = "",
}) => {
    const {
        isShown,
        setIsShown,
        hasAside,
        hasMain,
        enableBurger,
    } = useColumnLayout();

    const hasToggle = hasAside && hasMain;
    const showBurger = hasToggle && !isShown;
    const showDismiss = hasToggle && isShown;

    const cssClass = [
        "pc-layout__header",
        "column-layout__header",
        borderColor && `border-${borderColor}`,
        css,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <header className={cssClass}>
            {children}

            {showBurger && enableBurger && (
                <button
                    type="button"
                    className="burger burger--sm"
                    onClick={() => setIsShown(true)}
                    aria-label="Panel openen"
                >
                    <span className="burger__line" />
                    <span className="burger__line" />
                    <span className="burger__line" />
                </button>
            )}

            {showDismiss && (
                <DismissButton
                    right={true}
                    onClick={() => setIsShown(false)}
                    aria-label="Panel sluiten"
                />
            )}
        </header>
    );
};

export default ColumnLayoutHeader;
