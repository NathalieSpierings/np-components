import { createContext, useContext } from "react";

interface ColumnLayoutContextValue {
    isShown: boolean;
    setIsShown: (value: boolean) => void;
    primaryViewOnMobile: "main" | "aside";
    hasAside: boolean;
    hasMain: boolean;
    enableBurger?: boolean;
    asidePosition: "left" | "right";
}

export const ColumnLayoutContext =
    createContext<ColumnLayoutContextValue | null>(null);

export const useColumnLayout = () => {
    const context = useContext(ColumnLayoutContext);

    if (!context) {
        throw new Error(
            "ColumnLayout components must be used inside ColumnLayout"
        );
    }

    return context;
};
