import { motion } from "framer-motion";
import { CSSProperties, FC, ReactNode, useContext, useMemo } from "react";
import { PanelLayoutAsideContext } from "../PanelLayoutContext";
import { joinClasses } from "../../../../lib/helpers/helpers";
import { WidthsContext } from "./contexts";
import { AsidePane, asideWidth, collapsedWidthStyle, FADE_ON_CHANGE, fadeVariant, isVisibleWhenCollapsed, MAIN_ATTRIBUTE, MainPane, Pane, TRANSITION } from "./model";
import { PaneHeader } from "./PaneHeader";
import { SlotInfo } from "./slots";
import { useExpandTrigger } from "./useInteraction";

/** Props of the pane columns, `MainColumn` and `AsideColumn`. */
export interface PaneColumnProps<P extends Pane> {
    /** The pane to render. */
    pane: P;
    /** The pane's own header, or `undefined` when it is inside a `PanelLayout.Header` (which renders the header). */
    ownHeader?: SlotInfo;
    /** Whether this pane is the screen shown on mobile. */
    active: boolean;
}

/**
 * The inside of a pane: a nested full-height `.pc-layout` with the pane's own header (if any)
 * and its body, which scrolls.
 */
const PaneLayout: FC<{ header?: SlotInfo; bodyClassName?: string; children: ReactNode }> = ({ header, bodyClassName, children }) => (
    <div className="pc-layout pc-layout--full-height">
        {header && <PaneHeader info={header} />}
        <div className="pc-layout__content">
            <div className={joinClasses("pc-layout__main", "panel-layout__body", bodyClassName)}>{children}</div>
        </div>
    </div>
);

/** The `className` of a pane's content, without padding when `flush`. */
const contentClass = (pane: Pane, fixedWidth: boolean) =>
    joinClasses("panel-layout__content", pane.props.flush && "panel-layout__content--flush", fixedWidth && "panel-layout__content--fixed-width");

/** The main pane: a `pc-layout__main` column. Marked with `MAIN_ATTRIBUTE` for `collapseOnMainClick`. */
export const MainColumn: FC<PaneColumnProps<MainPane>> = ({ pane, ownHeader, active }) => (
    <div
        className={joinClasses("pc-layout__main", "panel-layout__column", "panel-layout__pane", "panel-layout__pane--main", active && "is-active")}
        {...{ [MAIN_ATTRIBUTE]: "" }}
    >
        <PaneLayout header={ownHeader} bodyClassName={pane.props.className}>
            <div className={contentClass(pane, false)}>{pane.props.children}</div>
        </PaneLayout>
    </div>
);

/**
 * An aside: a `pc-layout__aside` column, its collapsed width or its (resized) width when expanded (`shown`).
 * Shows its content (kept mounted while collapsed, so its state survives), clipped to the strip while collapsed for
 * a collapsible aside. Handles expanding on click/hover and fades in the content when it appears.
 */
export const AsideColumn: FC<PaneColumnProps<AsidePane> & { expanded: boolean }> = ({ pane, ownHeader, active, expanded }) => {
    const trigger = useExpandTrigger(pane, expanded);
    const { widths } = useContext(WidthsContext);
    // A collapsible aside keeps showing its content while collapsed, clipped to the strip
    const visibleWhenCollapsed = isVisibleWhenCollapsed(pane);

    // For `usePanelLayoutAside()`, in everything rendered for the aside
    const asideContext = useMemo(() => ({ id: pane.key, collapsed: !expanded }), [pane.key, expanded]);

    // Fade in the content when it appears; collapsible content is always shown, so it needs no fade
    const fade = { variants: FADE_ON_CHANGE, animate: fadeVariant(!expanded), initial: false, transition: TRANSITION };

    const cssClass = joinClasses(
        "pc-layout__aside",
        `pc-layout__aside--${pane.side}`,
        expanded && "shown",
        "panel-layout__column",
        "panel-layout__pane",
        "panel-layout__pane--aside",
        `panel-layout__pane--${pane.side}`,
        expanded ? "is-expanded" : "is-collapsed",
        !expanded && !visibleWhenCollapsed && "is-hidden",
        trigger.clickable && "is-clickable",
        active && "is-active",
    );

    const style = {
        "--panel-layout-pane-width": asideWidth(pane, widths),
        ...collapsedWidthStyle(pane),
    } as CSSProperties;

    return (
        <aside
            className={cssClass}
            style={style}
            data-pane={pane.key}
            data-side={pane.side}
            aria-label={pane.props.label}
            {...trigger.props}
        >
            <PanelLayoutAsideContext.Provider value={asideContext}>
                <PaneLayout header={ownHeader} bodyClassName={pane.props.className}>
                    {/*
                      * The content stays mounted (hidden) while collapsed, so its state survives. A collapsible aside
                      * keeps showing it instead, at full width, clipped to the strip. It keeps its full width while
                      * the aside animates, so it does not reflow.
                      */}
                    <motion.div
                        className={contentClass(pane, expanded || visibleWhenCollapsed)}
                        hidden={!expanded && !visibleWhenCollapsed}
                        {...(!visibleWhenCollapsed && fade)}
                    >
                        {pane.props.children}
                    </motion.div>
                </PaneLayout>
            </PanelLayoutAsideContext.Provider>
        </aside>
    );
};
