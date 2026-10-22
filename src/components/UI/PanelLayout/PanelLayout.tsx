import { CSSProperties, FC, ReactNode, useMemo, useRef, useState } from "react";
import { ColorDefinitions } from "../../../lib/utils/definitions";
import { joinClasses } from "../../../lib/helpers/helpers";
import { LayoutState, RowItems } from "./internal/Columns";
import { InteractionContext, WidthsContext } from "./internal/contexts";
import { isAside, Widths } from "./internal/model";
import { parseChildren } from "./internal/parseChildren";
import { describeSlot } from "./internal/slots";
import { useExpandedAsides } from "./internal/useExpandedAsides";
import { useCollapseOnMainClick, useInteraction } from "./internal/useInteraction";
import PanelLayoutAside from "./PanelLayoutAside";
import { PanelLayoutContext } from "./PanelLayoutContext";
import PanelLayoutGroup from "./PanelLayoutGroup";
import PanelLayoutHeader from "./PanelLayoutHeader";
import PanelLayoutMain from "./PanelLayoutMain";
import PanelLayoutStrip from "./PanelLayoutStrip";

export interface PanelLayoutProps {
    /** `PanelLayout.Main`, `PanelLayout.Aside`, `PanelLayout.Group` and `PanelLayout.Header` elements, in the order they should appear. */
    children?: ReactNode;
    /**
     * Ids of the expanded asides, to control them from outside the layout. When set, the layout does not change this
     * itself: update it from `onExpandedAsidesChange`. Leave it out to let the layout keep track (uncontrolled).
     */
    expandedAsides?: string[];
    /** Ids of the asides that are expanded initially, when uncontrolled. Ignored when `expandedAsides` is set. */
    defaultExpandedAsides?: string[];
    /**
     * Called with the new ids of the expanded asides whenever they change: by the user (click, hover, collapse arrow,
     * mobile buttons, `collapseOnMainClick`) or from code (`usePanelLayout()`).
     */
    onExpandedAsidesChange?: (ids: string[]) => void;
    /**
     * The aside whose screen is shown on mobile (`null` for the main pane), to control it from outside: update it from
     * `onMobileScreenChange`. An aside shown this way is expanded as well (as with `usePanelLayout().open(id)`), and when
     * it collapses, mobile goes back to the main pane. Leave it out to let the layout keep track (uncontrolled).
     */
    mobileScreen?: string | null;
    /**
     * The aside whose screen is shown on mobile initially, when uncontrolled (`null`, the default, for the main pane).
     * It is expanded initially as well. Ignored when `mobileScreen` is set.
     */
    defaultMobileScreen?: string | null;
    /** Called with the aside whose screen is now shown on mobile (`null` for the main pane), whenever that changes. */
    onMobileScreenChange?: (id: string | null) => void;
    /**
     * Collapse all asides when the main pane (its body or own header) is clicked, or when Escape is pressed anywhere in
     * the layout (so keyboard users can do the same).
     *
     * Ignored are:
     * - clicks on, or inside, `a`, `button`, `input`, `select`, `textarea`, `label`, `summary`, `[role="button"]` and
     *   any element with a `tabindex`, so controls in the main pane keep working;
     * - clicks that end a text selection;
     * - Escape presses already handled (`preventDefault`) by something inside the layout.
     */
    collapseOnMainClick?: boolean;
    /** Color of the lines between the panes and below the headers. Defaults to `ColorDefinitions.Surface`. */
    borderColor?: ColorDefinitions;
    /** Extra class name for the layout's root element. */
    className?: string;
}

/**
 * A layout with one main pane and any number of asides on the left and/or right, built on `.pc-layout`: every pane
 * is a `pc-layout__main` / `pc-layout__aside` column with a nested `.pc-layout` for its header and body.
 *
 * - Desktop: depending on their `mode`, asides are hidden while collapsed, collapse to a strip about as wide as the
 *   sidebar (showing the start of their content), or are always expanded.
 *   Each aside expands independently, except within a `PanelLayout.Group` or a shared `exclusive` link,
 *   on click, on hover, or only from code (`expandOn`), either pushing the main pane aside or over it (`overlay`).
 *   Resizable asides and groups can be resized at their edge facing the main pane.
 * - Mobile: every pane becomes its own screen. The main header shows a button per aside to open it.
 *
 * Expand asides via `usePanelLayout()` from inside the layout, or via the `expandedAsides` prop from outside.
 */
const PanelLayoutRoot: FC<PanelLayoutProps> = (props) => {
    const { children, borderColor = ColorDefinitions.Surface, className } = props;

    const { items, panes, slots } = parseChildren(children);
    const asides = panes.filter(isAside);

    const { expandedIds, contextValue, activeKey } = useExpandedAsides(props, asides);
    const interaction = useInteraction(contextValue);

    const rootRef = useRef<HTMLDivElement>(null);
    useCollapseOnMainClick(rootRef, !!props.collapseOnMainClick, contextValue.close);

    const [widths, setWidths] = useState<Widths>({});
    const widthsValue = useMemo(() => ({
        widths,
        setWidth: (key: string, width: number) => setWidths((current) => ({ ...current, [key]: width })),
    }), [widths]);

    const mobileButtonAsides = asides.filter((aside) => aside.props.mobileButton !== false);
    const headers = new Map(slots.map((slot) => [slot, describeSlot(slot, expandedIds, activeKey, mobileButtonAsides)]));
    const ownHeaders = new Map([...headers.values()].filter((info) => !info.slot.isShared).map((info) => [info.slot.panes[0], info]));

    const layout: LayoutState = {
        expandedIds,
        activeKey,
        ownHeader: (pane) => ownHeaders.get(pane),
        sharedHeader: (item) => headers.get(item.slot)!,
    };

    return (
        <PanelLayoutContext.Provider value={contextValue}>
            <InteractionContext.Provider value={interaction}>
                <WidthsContext.Provider value={widthsValue}>
                    <div
                        ref={rootRef}
                        className={joinClasses("pc-layout", "pc-layout--full-height", "panel-layout", className)}
                        style={{ "--panel-layout-border": `var(--color-border-${borderColor})` } as CSSProperties}
                    >
                        <div className="pc-layout__content">
                            <RowItems items={items} layout={layout} />
                        </div>
                    </div>
                </WidthsContext.Provider>
            </InteractionContext.Provider>
        </PanelLayoutContext.Provider>
    );
};

PanelLayoutRoot.displayName = "PanelLayout";

const PanelLayout = Object.assign(PanelLayoutRoot, {
    Main: PanelLayoutMain,
    Aside: PanelLayoutAside,
    Group: PanelLayoutGroup,
    Header: PanelLayoutHeader,
    Strip: PanelLayoutStrip,
});

export default PanelLayout;
