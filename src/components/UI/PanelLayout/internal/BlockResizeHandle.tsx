import { FC, useContext } from "react";
import { clampWidth, useResizeDrag } from "../../../../lib/hooks/useResizableAside";
import ResizeHandle from "../../ResizeHandle/ResizeHandle";
import { WidthsContext } from "./contexts";
import { AsidePane, widthKey, widthLimits } from "./model";
import { useExpandTrigger } from "./useInteraction";

/**
 * The resize handle of a resizable block of asides, on its edge facing the main pane (`pane` is the expanded aside,
 * which the drag resizes). Lives inside the block, so it is on the block's edge whichever aside is expanded,
 * also when an overlay grows over the main pane.
 */
export const BlockResizeHandle: FC<{ pane: AsidePane }> = ({ pane }) => {
    const { widths, setWidth } = useContext(WidthsContext);
    const { min, max } = widthLimits(pane);
    const key = widthKey(pane);
    const resized = widths[key];

    const { resizing, startResize } = useResizeDrag({
        minWidth: min,
        maxWidth: max,
        side: pane.side,
        onResize: (width) => setWidth(key, width),
    });

    // Hover asides stay open while the pointer is on (or dragging) the handle
    const { props: hoverProps } = useExpandTrigger(pane, true);

    // Before the first resize the width comes from CSS (the `width` prop), so measure the expanded aside
    const currentWidth = (handle: HTMLElement) => {
        if (resized !== undefined) {
            return clampWidth(resized, min, max);
        }

        const aside = handle.closest(".panel-layout")?.querySelector(`[data-pane="${CSS.escape(pane.key)}"]`);
        return aside?.getBoundingClientRect().width ?? min;
    };

    return (
        <ResizeHandle
            // A block on the left of the main pane faces it with its right edge
            edge={pane.side === "left" ? "right" : "left"}
            resizing={resizing}
            onResizeStart={(e) => startResize(e, currentWidth(e.currentTarget))}
            onMouseEnter={hoverProps.onMouseEnter}
            onMouseLeave={hoverProps.onMouseLeave}
        />
    );
};
