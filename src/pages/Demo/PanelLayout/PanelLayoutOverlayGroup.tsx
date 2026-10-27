import { ReactElement } from "react";
import { Icon, PanelLayout, Title } from "../../../components";
import { IconDefinitions } from "../../../lib/utils/definitions";
import { AsideControls, IconsWhenCollapsed, LongText, useFullscreenDemo } from "./PanelLayoutDemoHelpers";

/**
 * A group with `overlay`: the open group floats over the main pane as one block, laid out as if it pushed. The asides
 * between the expanded one and the main pane move along, so nothing in the group is covered. The main pane keeps its width.
 * The resize handle is on the block's left edge.
 */
const PanelLayoutOverlayGroup = (): ReactElement => {
    useFullscreenDemo();

    return (
        <PanelLayout collapseOnMainClick>
            <PanelLayout.Main header={<Title>Main header</Title>}>
                <AsideControls ids={['details', 'notes', 'history']} />
                <p>
                    The three asides on the right are one <code>PanelLayout.Group</code> with <code>overlay</code> and{' '}
                    <code>resizable</code>. Expand the leftmost, middle and rightmost one to compare: the group floats over this pane as one
                    block (the strips to the left of the expanded aside move along instead of being covered), so this text never moves.
                    Click empty space in this pane to collapse it again (<code>collapseOnMainClick</code>).
                </p>
                <LongText />
            </PanelLayout.Main>

            <PanelLayout.Group overlay resizable width="360px">
                <PanelLayout.Aside
                    id="details"
                    label="Details"
                    icon={IconDefinitions.info_circle}
                    header={<Title>Details</Title>}
                    collapsedHeader={<Icon icon={IconDefinitions.info_circle} />}
                    mode="collapsible"
                    flush
                >
                    <IconsWhenCollapsed icons={[IconDefinitions.info_circle]}>
                        <p>Details: the leftmost aside of the group.</p>
                    </IconsWhenCollapsed>
                </PanelLayout.Aside>

                <PanelLayout.Aside
                    id="notes"
                    label="Notities"
                    icon={IconDefinitions.pencil}
                    header={<Title>Notities</Title>}
                    collapsedHeader={<Icon icon={IconDefinitions.pencil} />}
                    mode="collapsible"
                    flush
                >
                    <IconsWhenCollapsed icons={[IconDefinitions.pencil]}>
                        <p>Notities: the middle aside. Expanded, the Details strip moves left along with it.</p>
                    </IconsWhenCollapsed>
                </PanelLayout.Aside>

                <PanelLayout.Aside
                    id="history"
                    label="Geschiedenis"
                    icon={IconDefinitions.history}
                    header={<Title>Geschiedenis</Title>}
                    collapsedHeader={<Icon icon={IconDefinitions.history} />}
                    mode="collapsible"
                    flush
                >
                    <IconsWhenCollapsed icons={[IconDefinitions.history]}>
                        <p>Geschiedenis: the rightmost aside. Expanded, the Notities and Details strips move left along with it.</p>
                    </IconsWhenCollapsed>
                </PanelLayout.Aside>
            </PanelLayout.Group>
        </PanelLayout>
    );
};

export default PanelLayoutOverlayGroup;
