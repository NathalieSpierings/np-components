import { createContext } from "react";
import { AsidePane, Widths } from "./model";

/** Resized widths, shared by the asides, their blocks and resize handles. Internal to PanelLayout. */
export const WidthsContext = createContext<{ widths: Widths; setWidth: (key: string, width: number) => void }>({
    widths: {},
    setWidth: () => undefined,
});

/** Hover-to-expand, shared by an aside and its resize handle. Internal to PanelLayout. */
export interface InteractionContextValue {
    /** Call when the pointer enters the aside or its resize handle. */
    pointerEnter: (pane: AsidePane) => void;
    /** Call when the pointer leaves the aside or its resize handle. */
    pointerLeave: (pane: AsidePane) => void;
}

/** Provides `InteractionContextValue`, see `useInteraction`. Internal to PanelLayout. */
export const InteractionContext = createContext<InteractionContextValue>({
    pointerEnter: () => undefined,
    pointerLeave: () => undefined,
});
