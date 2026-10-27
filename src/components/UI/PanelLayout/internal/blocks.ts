import { AsideBlock, asideWidth, isExpanded, isOverlay, isVisibleWhenCollapsed, NONE, SharedRowItem, sizing, Widths } from "./model";

const COLLAPSED_WIDTH = "var(--panel-layout-collapsed-width)";

/** The sum of CSS widths, as CSS (`0px` for none). */
const sumWidths = (parts: string[]) => (parts.length > 0 ? `calc(${parts.join(" + ")})` : "0px");

/** Whether the asides of the block expand over the main pane (`overlay` is a group prop, so it is the same for all). */
export const isOverlayBlock = (block: AsideBlock) => isOverlay(block.members[0]);

/** The block's expanded aside, if any (one at most, unless more are expanded from outside: then the first). */
export const openMember = (block: AsideBlock, expandedIds: string[]) => block.members.find((member) => isExpanded(member, expandedIds));

/**
 * The width of the block's asides together, as CSS: the width of each expanded aside, plus the collapsed width
 * of each collapsed one (nothing for an aside hidden while collapsed).
 */
export const blockWidth = (block: AsideBlock, expandedIds: string[], widths: Widths) => {
    const parts = block.members
        .map((member) => {
            if (isExpanded(member, expandedIds)) {
                return asideWidth(member, widths);
            }

            return isVisibleWhenCollapsed(member) ? COLLAPSED_WIDTH : undefined;
        })
        .filter((part): part is string => part !== undefined);

    return sumWidths(parts);
};

/**
 * The space the block takes in its row, as CSS: its width, or for an overlay its collapsed width
 * (an open overlay grows over the main pane instead).
 */
export const blockFootprint = (block: AsideBlock, expandedIds: string[], widths: Widths) =>
    blockWidth(block, isOverlayBlock(block) ? NONE : expandedIds, widths);

/**
 * The width of a `PanelLayout.Header` around asides only (no main pane), as CSS: the space its blocks take.
 * With the main pane inside, the shared header simply takes the remaining space instead.
 */
export const sharedWidth = (items: SharedRowItem[], expandedIds: string[], widths: Widths) => {
    return sumWidths(items.flatMap((item) => (item.type === "block" ? [blockFootprint(item.block, expandedIds, widths)] : [])));
};

/** The aside to resize the block by: its expanded aside, if the block is resizable. */
export const resizeTarget = (block: AsideBlock, expandedIds: string[]) =>
    sizing(block.members[0]).resizable ? openMember(block, expandedIds) : undefined;
