import { FC, ReactNode } from "react";
import { ResizeLimits } from "./PanelLayoutAside";

export interface PanelLayoutGroupProps {
    /** Consecutive `PanelLayout.Aside` elements. At most one of them is expanded at a time. */
    children?: ReactNode;
    /**
     * Links this group with other groups and asides that have the same value: they expand and collapse as one
     * (expanding one collapses the others), but each keeps its own size.
     */
    exclusive?: string;
    /**
     * Width of the expanded aside. Defaults to `--root-aside-width`.
     * A CSS length that does not depend on the surrounding element: `px`, `rem`, `vw` or combinations, e.g.
     * `max(400px, 28vw)`. Percentages are not supported (they would resolve differently for the aside, its header and
     * its content).
     */
    width?: string;
    /**
     * Lets the user resize the group by dragging its edge facing the main pane, whichever aside in it is expanded,
     * optionally within limits in px for the expanded aside (`min` defaults to 200, `max` to 800):
     * e.g. `resizable={{ min: 300 }}`. The size is remembered while collapsed.
     */
    resizable?: boolean | ResizeLimits;
    /** Expand over the main pane instead of making it narrower. */
    overlay?: boolean;
}

/**
 * A block of consecutive asides that behaves as one: at most one is expanded, and it is sized and resized as a whole.
 * Each aside keeps its own header, `mode`, `expandOn` and mobile icon.
 * Only describes the group; `PanelLayout` does the rendering.
 */
const PanelLayoutGroup: FC<PanelLayoutGroupProps> = () => null;

PanelLayoutGroup.displayName = "PanelLayout.Group";

export default PanelLayoutGroup;
