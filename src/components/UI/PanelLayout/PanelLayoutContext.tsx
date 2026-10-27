import { createContext, useContext } from "react";

export interface PanelLayoutContextValue {
    /** Ids of the asides that are currently expanded (not including persistent asides, which always are). */
    expandedAsides: string[];
    /**
     * Expands the aside with the given id (collapsing the others in its `PanelLayout.Group` or with the same `exclusive`).
     * On mobile, the most recently expanded aside is the screen that is shown.
     */
    open: (id: string) => void;
    /**
     * Collapses the aside with the given id, or all asides when no id is given.
     * A persistent aside cannot collapse: closing it only leaves its screen on mobile.
     */
    close: (id?: string) => void;
    /** Expands the aside, or collapses it when it is already expanded. */
    toggle: (id: string) => void;
    /** Whether the aside with the given id is expanded (always `true` for a persistent aside). */
    isOpen: (id: string) => boolean;
}

export const PanelLayoutContext = createContext<PanelLayoutContextValue | null>(null);

/**
 * Controls the surrounding `PanelLayout`. Use it in any component rendered inside the layout,
 * e.g. a button in the main pane that opens a details aside.
 *
 * To control the layout from outside, use the `expandedAsides` / `onExpandedAsidesChange` props instead.
 */
export const usePanelLayout = () => {
    const context = useContext(PanelLayoutContext);

    if (!context) {
        throw new Error("usePanelLayout must be used inside a PanelLayout");
    }

    return context;
};

export interface PanelLayoutAsideContextValue {
    /** Id of the aside this component is rendered in. */
    id: string;
    /** Whether the aside is currently collapsed (desktop). */
    collapsed: boolean;
}

export const PanelLayoutAsideContext = createContext<PanelLayoutAsideContextValue | null>(null);

/**
 * Info about the aside the calling component is rendered in (its content or header). Lets the content of a
 * `mode="collapsible"` aside adapt to being collapsed, e.g. show only icons (in a `PanelLayout.Strip`):
 *
 * ```tsx
 * const { collapsed } = usePanelLayoutAside();
 * return collapsed ? <FilterIcons /> : <FilterList />;
 * ```
 *
 * Switching like this unmounts the other variant (and its state). To keep it, render both and hide one instead,
 * e.g. `<FilterList hidden={collapsed} />`.
 */
export const usePanelLayoutAside = () => {
    const context = useContext(PanelLayoutAsideContext);

    if (!context) {
        throw new Error("usePanelLayoutAside must be used inside a PanelLayout.Aside");
    }

    return context;
};
