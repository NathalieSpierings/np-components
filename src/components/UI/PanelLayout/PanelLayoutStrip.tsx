import { FC, HTMLAttributes } from "react";
import { joinClasses } from "../../../lib/helpers/helpers";

/**
 * A box exactly as wide as a collapsed aside, with its content centered (in a column): for what should fit in the
 * strip of a `mode="collapsible"` aside, e.g. an icon at the start of a row, or a column of icons shown while collapsed.
 * Place it at the start of the aside's content, with `flush` on the aside so the content's padding does not shift it.
 */
const PanelLayoutStrip: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
    <div className={joinClasses("grid-y", "panel-layout__strip", className)} {...props} />
);

PanelLayoutStrip.displayName = "PanelLayout.Strip";

export default PanelLayoutStrip;
