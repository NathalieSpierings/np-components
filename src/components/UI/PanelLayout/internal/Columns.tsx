import { CSSProperties, FC, useContext } from "react";
import { joinClasses } from "../../../../lib/helpers/helpers";
import { blockFootprint, blockWidth, isOverlayBlock, openMember, resizeTarget, sharedWidth } from "./blocks";
import { WidthsContext } from "./contexts";
import { AsideBlock, isExpanded, Pane, RowItem, SharedItem } from "./model";
import { PaneHeader } from "./PaneHeader";
import { AsideColumn, MainColumn } from "./Panes";
import { BlockResizeHandle } from "./BlockResizeHandle";
import { SlotInfo } from "./slots";

/** The state the columns are rendered from. */
export interface LayoutState {
    expandedIds: string[];
    /** The pane shown on mobile. */
    activeKey: string;
    /** A pane's own header, or `undefined` when it is inside a `PanelLayout.Header`. */
    ownHeader: (pane: Pane) => SlotInfo | undefined;
    /** What a `PanelLayout.Header` shows. */
    sharedHeader: (item: SharedItem) => SlotInfo;
}

/**
 * A block of asides (a `PanelLayout.Group`, or a single aside): a `pc-layout__aside` column with a nested `.pc-layout`
 * around its asides, as wide as they are together, with the resize handle on its edge facing the main pane.
 * As an overlay it only takes its collapsed width in the row; its inside grows over the main pane.
 */
const BlockColumn: FC<{ block: AsideBlock; layout: LayoutState }> = ({ block, layout }) => {
    const { widths } = useContext(WidthsContext);
    const { expandedIds, activeKey } = layout;
    const resizeAside = resizeTarget(block, expandedIds);

    const cssClass = joinClasses(
        "pc-layout__aside",
        `pc-layout__aside--${block.side}`,
        "panel-layout__column",
        "panel-layout__block",
        `panel-layout__block--${block.side}`,
        isOverlayBlock(block) && "panel-layout__block--overlay",
        openMember(block, expandedIds) && "is-open",
        block.members.some((member) => member.key === activeKey) && "is-active",
    );

    const style = {
        "--panel-layout-block-width": blockWidth(block, expandedIds, widths),
        "--panel-layout-block-footprint": blockFootprint(block, expandedIds, widths),
    } as CSSProperties;

    return (
        <div className={cssClass} style={style}>
            <div className="pc-layout pc-layout--full-height panel-layout__block-inner">
                <div className="pc-layout__content">
                    {block.members.map((member) => (
                        <AsideColumn
                            key={member.key}
                            pane={member}
                            ownHeader={layout.ownHeader(member)}
                            active={member.key === activeKey}
                            expanded={isExpanded(member, expandedIds)}
                        />
                    ))}
                </div>

                {resizeAside && <BlockResizeHandle pane={resizeAside} />}
            </div>
        </div>
    );
};

/**
 * A `PanelLayout.Header` around several items: a column with a nested `.pc-layout`, the shared header on top and the
 * items inside. With the main pane inside it is a `pc-layout__main` (taking the remaining space), otherwise a
 * `pc-layout__aside` as wide as its asides.
 */
const SharedHeaderColumn: FC<{ item: SharedItem; layout: LayoutState }> = ({ item, layout }) => {
    const { widths } = useContext(WidthsContext);
    const { expandedIds, activeKey } = layout;
    const hasMain = item.items.some((child) => child.type === "main");

    const cssClass = joinClasses(
        hasMain ? "pc-layout__main" : "pc-layout__aside",
        "panel-layout__column",
        "panel-layout__shared",
        !hasMain && "panel-layout__shared--asides",
        item.slot.panes.some((pane) => pane.key === activeKey) && "is-active",
    );

    const style = hasMain ? undefined : ({ "--panel-layout-shared-width": sharedWidth(item.items, expandedIds, widths) } as CSSProperties);

    return (
        <div className={cssClass} style={style}>
            <div className="pc-layout pc-layout--full-height">
                <PaneHeader info={layout.sharedHeader(item)} />
                <div className="pc-layout__content">
                    <RowItems items={item.items} layout={layout} />
                </div>
            </div>
        </div>
    );
};

/** The items of a row, in visual order: the main pane, blocks of asides and shared headers. */
export const RowItems: FC<{ items: RowItem[]; layout: LayoutState }> = ({ items, layout }) => (
    <>
        {items.map((item) => {
            if (item.type === "main") {
                return (
                    <MainColumn
                        key={item.pane.key}
                        pane={item.pane}
                        ownHeader={layout.ownHeader(item.pane)}
                        active={item.pane.key === layout.activeKey}
                    />
                );
            }

            if (item.type === "block") {
                return <BlockColumn key={`block:${item.block.key}`} block={item.block} layout={layout} />;
            }

            return <SharedHeaderColumn key={item.slot.key} item={item} layout={layout} />;
        })}
    </>
);
