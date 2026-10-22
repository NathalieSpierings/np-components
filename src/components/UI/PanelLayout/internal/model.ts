import { ReactNode } from "react";
import { clampWidth } from "../../../../lib/hooks/useResizableAside";
import { matchesMediaQuery } from "../../../../lib/hooks/useMediaQuery";
import { PanelLayoutAsideProps } from "../PanelLayoutAside";
import { PanelLayoutGroupProps } from "../PanelLayoutGroup";
import { PanelLayoutMainProps } from "../PanelLayoutMain";

/** A `PanelLayout.Group`: consecutive asides that are expanded one at a time and sized as one. */
export interface GroupInfo {
    /** `group:<id of its first aside>`; also the key of its remembered width and of its mutual exclusivity. */
    key: string;
    /** The group's props (without `children`). */
    props: PanelLayoutGroupProps;
    /** Its asides, in visual order. */
    members: AsidePane[];
}

/**
 * The main pane or an aside, as parsed from the children.
 * - `key`: `MAIN_KEY` for the main pane, the aside's `id` otherwise.
 * - `side`: whether the aside is left or right of the main pane.
 * - `group`: the `PanelLayout.Group` the aside is in, if any.
 */
export type Pane =
    | { kind: "main"; key: string; props: PanelLayoutMainProps }
    | { kind: "aside"; key: string; side: "left" | "right"; props: PanelLayoutAsideProps; group?: GroupInfo };

/** The main pane. */
export type MainPane = Extract<Pane, { kind: "main" }>;

/** An aside (not the main pane). */
export type AsidePane = Extract<Pane, { kind: "aside" }>;

/**
 * Asides that sit together and are sized as one: a `PanelLayout.Group`, or a single aside outside a group.
 * Rendered as one column of the layout, with the resize handle on its edge facing the main pane.
 */
export interface AsideBlock {
    /** The group's key, or the id of the single aside. */
    key: string;
    /** The side of the main pane the block is on. */
    side: "left" | "right";
    /** Its asides, in visual order. */
    members: AsidePane[];
}

/** A `PanelLayout.Header` around several consecutive items, which share its header. */
export interface SharedItem {
    type: "shared";
    /** The shared header, spanning all panes inside. */
    slot: HeaderSlot;
    /** The items inside, in visual order. */
    items: SharedRowItem[];
}

/** An item in a row of the layout, in visual order: the main pane, a block of asides, or a shared header around items. */
export type RowItem = { type: "main"; pane: MainPane } | { type: "block"; block: AsideBlock } | SharedItem;

/** An item inside a `PanelLayout.Header` (which cannot be nested). */
export type SharedRowItem = Exclude<RowItem, SharedItem>;

/** A header: either the header of a single pane, or a `PanelLayout.Header` shared by several. */
export interface HeaderSlot {
    /** The pane's key, or `shared:<key of its first pane>` for a `PanelLayout.Header`. */
    key: string;
    /** The consecutive panes the header spans. */
    panes: Pane[];
    /** The pane's `header`, or the `content` of a `PanelLayout.Header`. */
    header: ReactNode;
    /** Whether this is a `PanelLayout.Header` (rather than a pane's own header). */
    isShared: boolean;
}

/** Key of the main pane; aside ids may not use it. */
export const MAIN_KEY = "main";

/** The `framer-motion` transition. Keep in sync with `--panel-layout-transition` in the stylesheet. */
export const TRANSITION = { duration: 0.3, ease: [0.4, 0, 0.2, 1] } as const;

/**
 * `framer-motion` variants that fade an element in whenever its variant changes, e.g. an aside's content when it
 * appears. Use with `animate={fadeVariant(collapsed)}` and `initial={false}` (no fade on mount).
 */
export const FADE_ON_CHANGE = { collapsed: { opacity: [0, 1] }, expanded: { opacity: [0, 1] } };

/** The `FADE_ON_CHANGE` variant for the collapsed state. */
export const fadeVariant = (collapsed: boolean) => (collapsed ? "collapsed" : "expanded");

/** Delays for `expandOn="hover"`, so moving the pointer across an aside does not make it flicker open. */
export const HOVER_DELAY = { open: 150, close: 250 };

/** Hover/focus expansion only applies to the desktop layout with a real pointer. Keep in sync with the `lg` breakpoint. */
const HOVER_QUERY = "(hover: hover) and (min-width: 992px)";

/** Shared empty list, so "nothing expanded" keeps the same reference (and does not trigger updates). */
export const NONE: string[] = [];

/**
 * Clicks on (or in) these do not count as a click on the main pane for `collapseOnMainClick`.
 * Keep in sync with the list in the documentation of `PanelLayoutProps.collapseOnMainClick`.
 */
export const INTERACTIVE = "a, button, input, select, textarea, label, summary, [role='button'], [tabindex]";

/** Marks the main pane's column (its header and body), for `collapseOnMainClick`. */
export const MAIN_ATTRIBUTE = "data-panel-layout-main";

/** Default limits for resizable asides, in px. */
const DEFAULT_WIDTH_LIMITS = { min: 200, max: 800 };

/** Resized widths in px, by group key or aside id: a group is sized as one, since only one of its asides is open at a time. */
export type Widths = Record<string, number>;

/** Type guard for asides. */
export const isAside = (pane: Pane): pane is AsidePane => pane.kind === "aside";

/** The aside's `mode`, with the default (`"closable"`) filled in. */
export const asideMode = (pane: AsidePane) => pane.props.mode ?? "closable";

/** Whether the aside is always expanded (`mode="persistent"`). */
export const isPersistent = (pane: AsidePane) => asideMode(pane) === "persistent";

/** Whether the pane is expanded. The main pane and persistent asides always count as expanded. */
export const isExpanded = (pane: Pane, expandedIds: string[]) => !isAside(pane) || isPersistent(pane) || expandedIds.includes(pane.key);

/** How the aside is expanded by the user (`expandOn`), defaulting to `"click"`. */
export const expandMode = (pane: AsidePane) => pane.props.expandOn ?? "click";

/** Whether hover/focus expansion applies right now (desktop layout with a real pointer), see `HOVER_QUERY`. */
export const canHover = () => matchesMediaQuery(HOVER_QUERY);

/** Sizing props (`width`, `resizable`, `overlay`) come from the group for asides in one. */
export const sizing = (pane: AsidePane) => pane.group?.props ?? pane.props;

/** Whether the aside (or its group) expands over the main pane instead of pushing it. */
export const isOverlay = (pane: AsidePane) => !!sizing(pane).overlay;

/** Whether the aside shows anything while collapsed (`mode="collapsible"`: the start of its content, in the strip). */
export const isVisibleWhenCollapsed = (pane: AsidePane) => asideMode(pane) === "collapsible";

/**
 * Closable asides collapse to nothing: override the collapsed width for their cells. Not for persistent asides (never
 * collapsed), so a `PanelLayout.Strip` in them keeps the strip's width.
 */
export const collapsedWidthStyle = (pane: AsidePane): Record<string, string> =>
    asideMode(pane) === "closable" ? { "--panel-layout-collapsed-width": "0px" } : {};

/** Key of the aside's remembered width in `Widths`: its group's key, or its own id. */
export const widthKey = (pane: AsidePane) => pane.group?.key ?? pane.key;

/** The limits given with `resizable={{ min, max }}` (none for `resizable` / `resizable={true}`). */
const resizeLimits = (pane: AsidePane) => {
    const { resizable } = sizing(pane);
    return typeof resizable === "object" ? resizable : {};
};

/** Resize limits in px of the aside (or its group), with the defaults filled in. */
export const widthLimits = (pane: AsidePane) => ({
    min: resizeLimits(pane).min ?? DEFAULT_WIDTH_LIMITS.min,
    max: resizeLimits(pane).max ?? DEFAULT_WIDTH_LIMITS.max,
});

/** What an aside is mutually exclusive on: its group, and any `exclusive` link (on the aside or its group). */
export const exclusiveKeys = (pane: AsidePane) => [
    pane.group?.key,
    pane.group?.props.exclusive && `exclusive:${pane.group.props.exclusive}`,
    pane.props.exclusive && `exclusive:${pane.props.exclusive}`,
].filter((key): key is string => !!key);

/** The expanded width as CSS: the resized width (within the limits) when there is one, else the `width` prop. */
export const asideWidth = (pane: AsidePane, widths: Widths) => {
    const resized = sizing(pane).resizable ? widths[widthKey(pane)] : undefined;

    if (resized === undefined) {
        return sizing(pane).width ?? "var(--panel-layout-aside-width)";
    }

    const { min, max } = widthLimits(pane);

    return `${clampWidth(resized, min, max)}px`;
};

/** Name of the aside for its buttons and accessibility: its `label`, falling back to its `id`. */
export const asideLabel = (pane: AsidePane) => pane.props.label ?? pane.props.id;

/** Reports a usage error (e.g. invalid children) without breaking the page. */
export const reportError = (message: string) => console.error(`PanelLayout: ${message}`);
