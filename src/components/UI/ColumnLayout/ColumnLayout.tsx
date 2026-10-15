import React, { Children, FC, isValidElement, PropsWithChildren, ReactElement, ReactNode, useCallback, useMemo, useState } from "react";
import { ColumnLayoutContext } from "./ColumnLayoutContext";

export interface ColumnLayoutProps extends PropsWithChildren {
    className?: string;
    asidePosition?: "left" | "right";
    primaryViewOnMobile?: "main" | "aside";
    enableBurger?: boolean;
    isShown?: boolean;
    onShownChange?: (isShown: boolean) => void;
}

const ColumnLayout: FC<ColumnLayoutProps> = ({
    asidePosition = "right",
    primaryViewOnMobile = "main",
    children,
    className = "",
    enableBurger = true,
    isShown: controlledIsShown,
    onShownChange,
}) => {
    const [internalIsShown, setInternalIsShown] = useState(false);

    const isControlled = typeof controlledIsShown === "boolean";

    const isShown = isControlled
        ? controlledIsShown
        : internalIsShown;

    const setIsShown = useCallback((value: boolean) => {
        if (!isControlled) {
            setInternalIsShown(value);
        }

        onShownChange?.(value);
    }, [isControlled, onShownChange]);

    const getDisplayName = (child: ReactNode) =>
        isValidElement(child)
            ? (child.type as { displayName?: string })?.displayName
            : undefined;

    const childrenArray = Children.toArray(children);

    const mains = childrenArray.filter((child) => getDisplayName(child) === "ColumnLayoutMain");
    const asides = childrenArray.filter((child) => getDisplayName(child) === "ColumnLayoutAside");
    const otherChildren = childrenArray.filter((child) => {
        const name = getDisplayName(child);
        return name !== "ColumnLayoutMain" && name !== "ColumnLayoutAside";
    });

    if (mains.length > 1 || asides.length > 1) {
        const message =
            `ColumnLayout: maximaal 1 ColumnLayoutMain en 1 ColumnLayoutAside toegestaan ` +
            `(gevonden: ${mains.length} main, ${asides.length} aside). ` +
            `Gebruik asidePosition="left" of "right" om de kant te kiezen.`;

        if (process.env.NODE_ENV !== "production") {
            throw new Error(message);
        }

        console.error(message);
    }

    const main = mains[0] as ReactElement | undefined;
    const aside = asides[0] as ReactElement | undefined;

    const hasMain = !!main;
    const hasAside = !!aside;
    const contextValue = useMemo(() => ({
        isShown,
        setIsShown,
        primaryViewOnMobile,
        hasMain,
        hasAside,
        enableBurger,
        asidePosition,
    }), [
        isShown,
        setIsShown,
        primaryViewOnMobile,
        hasMain,
        hasAside,
        enableBurger,
        asidePosition,
    ]);

    const css = [
        "pc-layout",
        "pc-layout--full-height",
        "column-layout",
        hasAside && asidePosition === "left" && "column-layout--aside-left",
        hasAside && asidePosition === "right" && "column-layout--aside-right",
        primaryViewOnMobile === "main" && "main-primary",
        primaryViewOnMobile === "aside" && "aside-primary",
        isShown && "is-shown",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const layoutChildren = asidePosition === "left"
        ? [aside, main]
        : [main, aside];

    return (
        <ColumnLayoutContext.Provider value={contextValue}>
            <div className={css}>
                {otherChildren}

                <div className="pc-layout__content">
                    {layoutChildren}
                </div>
            </div>
        </ColumnLayoutContext.Provider>
    );
};

ColumnLayout.displayName = "ColumnLayout";

export default ColumnLayout;
