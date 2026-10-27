import { FC, ReactNode } from "react";

export interface PanelLayoutHeaderProps {
    /** Header content, spanning all panes inside. Replaces the panes' own headers. */
    content: ReactNode;
    /** Consecutive panes: `PanelLayout.Main`, `PanelLayout.Aside` and/or `PanelLayout.Group`. */
    children?: ReactNode;
}

/**
 * One header shared by consecutive panes of a `PanelLayout`.
 * Only describes the header; `PanelLayout` does the rendering.
 */
const PanelLayoutHeader: FC<PanelLayoutHeaderProps> = () => null;

PanelLayoutHeader.displayName = "PanelLayout.Header";

export default PanelLayoutHeader;
