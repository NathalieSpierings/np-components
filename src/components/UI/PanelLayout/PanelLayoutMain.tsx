import { FC, ReactNode } from "react";

export interface PanelLayoutMainProps {
    /** Header shown above the main pane. Leave out for a pane without header. */
    header?: ReactNode;
    /** Removes the default padding around the content. */
    flush?: boolean;
    /** Extra class name for the main pane's body (not its header). */
    className?: string;
    /** The main pane's content. */
    children?: ReactNode;
}

/**
 * The main pane of a `PanelLayout`. Asides placed before it end up on the left, asides placed after it on the right.
 * Only describes the pane; `PanelLayout` does the rendering.
 */
const PanelLayoutMain: FC<PanelLayoutMainProps> = () => null;

PanelLayoutMain.displayName = "PanelLayout.Main";

export default PanelLayoutMain;
