import { FC, ReactElement, ReactNode } from "react";
import { IconDefinitions } from "../../../lib/utils/definitions";

/** Limits in px for a resizable aside or group. */
export interface ResizeLimits {
    /** Minimum width. Defaults to 200. */
    min?: number;
    /** Maximum width. Defaults to 800. */
    max?: number;
}

export interface PanelLayoutAsideProps {
    /** Unique id, used to open the aside via `usePanelLayout().open(id)` or the `expandedAsides` prop. */
    id: string;
    /** Header shown above the aside. Leave out for an aside without header. */
    header?: ReactNode;
    /**
     * What the aside does when it is not expanded:
     * - `"closable"` (default): it is hidden while collapsed; it can only be expanded from code (or with its button on
     *   mobile).
     * - `"collapsible"`: it collapses to a strip about as wide as the sidebar, showing the start of its content: the
     *   content keeps its full width and is clipped to the strip, so nothing reflows when expanding. Content can adapt to
     *   being collapsed with `usePanelLayoutAside()`, and use `PanelLayout.Strip` for what should fit in the strip
     *   (e.g. icons), with `flush` so the content's padding does not shift it.
     * - `"persistent"`: it is always expanded: the user (and code) cannot collapse it. On mobile it is still its own
     *   screen, which the user can leave. Cannot be in a `PanelLayout.Group` or have an `exclusive` link.
     */
    mode?: "collapsible" | "closable" | "persistent";
    /** Header shown while collapsed (`mode="collapsible"`). Defaults to the regular `header`, clipped to the collapsed width. */
    collapsedHeader?: ReactNode;
    /**
     * How the user expands the aside on desktop:
     * - `"click"` (default): click the collapsed aside; collapse with the arrow in its header.
     * - `"hover"`: expands while the pointer (or keyboard focus) is in the aside, collapses when it leaves.
     * - `"none"`: only via `usePanelLayout()` or the `expandedAsides` prop.
     *
     * Does not apply to `mode="persistent"`.
     */
    expandOn?: "click" | "hover" | "none";
    /**
     * Show an arrow in the aside's header to collapse it when expanded (not for `expandOn="hover"` or
     * `mode="persistent"`). Defaults to `true`.
     * Turn it off to collapse the aside in another way, e.g. with `usePanelLayout().close(id)` or `collapseOnMainClick`.
     */
    collapseButton?: boolean;
    /**
     * Expand over the main pane instead of making it narrower. The aside's column keeps its collapsed width.
     * Useful for navigation that should not disturb the main content. Inside a `PanelLayout.Group`, set it on the group.
     */
    overlay?: boolean;
    /**
     * Links this aside with other asides and groups that have the same value: they expand and collapse as one
     * (expanding one collapses the others), but each keeps its own size.
     */
    exclusive?: string;
    /** Icon of the button that opens this aside on mobile. Defaults to a burger. */
    icon?: IconDefinitions | ReactElement;
    /**
     * Show a button in the main pane's header on mobile to open this aside's screen. Defaults to `true`.
     * Turn it off to open the screen in another way, e.g. with `usePanelLayout().open(id)` or the `mobileScreen` prop.
     */
    mobileButton?: boolean;
    /** Accessible name of the aside, used for its open/close buttons. */
    label?: string;
    /**
     * Width when expanded. Defaults to `--root-aside-width`. Inside a `PanelLayout.Group`, set it on the group.
     * A CSS length that does not depend on the surrounding element: `px`, `rem`, `vw` or combinations, e.g.
     * `max(400px, 28vw)`. Percentages are not supported (they would resolve differently for the aside, its header and
     * its content).
     */
    width?: string;
    /**
     * Lets the user resize the expanded aside by dragging its edge facing the main pane, optionally within limits in px
     * (`min` defaults to 200, `max` to 800): e.g. `resizable={{ min: 160, max: 400 }}`.
     * The size is remembered while collapsed. Inside a `PanelLayout.Group`, set it on the group.
     */
    resizable?: boolean | ResizeLimits;
    /** Removes the default padding around the content. */
    flush?: boolean;
    /** Extra class name for the aside's body (not its header). */
    className?: string;
    /** The aside's content. */
    children?: ReactNode;
}

/**
 * An aside of a `PanelLayout`. Asides placed before `PanelLayout.Main` end up on the left, asides placed after it on the right.
 * Only describes the pane; `PanelLayout` does the rendering.
 */
const PanelLayoutAside: FC<PanelLayoutAsideProps> = () => null;

PanelLayoutAside.displayName = "PanelLayout.Aside";

export default PanelLayoutAside;
