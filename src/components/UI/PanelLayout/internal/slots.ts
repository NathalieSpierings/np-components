import { ReactNode } from "react";
import { AsidePane, expandMode, HeaderSlot, isAside, isExpanded, isPersistent, isVisibleWhenCollapsed, Pane } from "./model";

/** Everything needed to render a header, and whether it is shown on desktop/mobile. */
export interface SlotInfo {
    /** The header described. */
    slot: HeaderSlot;
    /** The pane of this header that is shown on mobile, if any. */
    activePane?: Pane;
    /** Set when the header is the own header of a single aside. */
    ownAside?: AsidePane;
    /** Whether `ownAside` is collapsed (always `false` for other headers). */
    collapsed: boolean;
    /** What the header shows now: the header, the `collapsedHeader`, or nothing for an aside hidden while collapsed. */
    content: ReactNode;
    /** Expanded asides under this header that get a collapse button (not hover asides, which collapse by themselves, or persistent ones). */
    collapsibleAsides: AsidePane[];
    /** The asides to show an open button for on mobile: when this header is on the main screen, those with `mobileButton`. */
    openButtons: AsidePane[];
    /** Whether the header is shown on desktop: it has content or a collapse button. */
    visibleOnDesktop: boolean;
    /** Whether the header is shown on mobile: it has a header or mobile buttons. */
    visibleOnMobile: boolean;
}

/** While collapsed: the `collapsedHeader`, else the (clipped) header, or nothing for an aside hidden when collapsed. */
const collapsedHeaderContent = (slot: HeaderSlot, ownAside: AsidePane | undefined, collapsed: boolean) => {
    if (!collapsed || !ownAside) {
        return slot.header;
    }

    return isVisibleWhenCollapsed(ownAside) ? ownAside.props.collapsedHeader ?? slot.header : undefined;
};

/**
 * Works out what a header shows in the current state (content, collapse and mobile actions),
 * and whether it is visible on desktop and on mobile.
 * @param activeKey The pane shown on mobile.
 * @param mobileButtonAsides The asides with an open button on the main screen (`mobileButton`).
 */
export function describeSlot(slot: HeaderSlot, expandedIds: string[], activeKey: string, mobileButtonAsides: AsidePane[]): SlotInfo {
    const activePane = slot.panes.find((pane) => pane.key === activeKey);
    const ownAside = !slot.isShared && isAside(slot.panes[0]) ? slot.panes[0] : undefined;
    const collapsed = !!ownAside && !isExpanded(ownAside, expandedIds);

    const content = collapsedHeaderContent(slot, ownAside, collapsed);
    const collapsibleAsides = slot.panes.filter(
        (pane): pane is AsidePane =>
            isAside(pane) &&
            isExpanded(pane, expandedIds) &&
            !isPersistent(pane) &&
            expandMode(pane) !== "hover" &&
            pane.props.collapseButton !== false,
    );

    // Mobile: the main screen gets a button per aside, an aside screen gets a dismiss button
    const openButtons = activePane?.kind === "main" ? mobileButtonAsides : [];
    const hasMobileActions = activePane?.kind === "aside" || openButtons.length > 0;

    return {
        slot,
        activePane,
        ownAside,
        collapsed,
        content,
        collapsibleAsides,
        openButtons,
        visibleOnDesktop: content != null || collapsibleAsides.length > 0,
        visibleOnMobile: slot.header != null || hasMobileActions,
    };
}
