import { ReactElement } from "react";
import { PanelLayout, Title, usePanelLayout } from "../../../../components";
import { IconDefinitions } from "../../../../lib/utils/definitions";
import { AsideControls, LongText, useFullscreenDemo } from "./PanelLayoutDemoHelpers";

/**
 * An aside that cannot be collapsed (`mode="persistent"`): always expanded, also when clicking the main pane or pressing
 * Escape (`collapseOnMainClick`) or from code. On mobile it is still its own screen, which you can leave.
 */
const PanelLayoutAlwaysExpanded = (): ReactElement => {
    useFullscreenDemo();

    return (
        <PanelLayout collapseOnMainClick>
            <PanelLayout.Main header={<Title>Main header</Title>}>
                <AsideControls ids={['info']} />
                <p>
                    The aside on the right has <code>mode="persistent"</code>: it is always shown. Clicking this pane, pressing Escape or
                    the buttons above (<code>usePanelLayout()</code>) do not collapse it. On mobile it is still its own screen: going
                    back leaves the screen, but does not collapse it.
                </p>
                <LongText />
            </PanelLayout.Main>
            <PanelLayout.Aside id="info" label="Info" icon={IconDefinitions.info_circle} header={<Title>Info</Title>} mode="persistent">
                <p>This aside cannot be collapsed.</p>
                <LongText paragraphs={3} />
            </PanelLayout.Aside>
        </PanelLayout>
    );
};

export default PanelLayoutAlwaysExpanded;
