import { ReactElement } from "react";
import { PanelLayout } from "../../../components";
import { IconDefinitions } from "../../../lib/utils/definitions";
import { AsideControls, IconsWhenCollapsed, LongText, useFullscreenDemo } from "./PanelLayoutDemoHelpers";

const PanelLayoutWithoutHeaders = (): ReactElement => {
    useFullscreenDemo();

    return (
        <PanelLayout>
            <PanelLayout.Aside
                id="left"
                label="Links"
                icon={IconDefinitions.angle_left}
                mode="collapsible"
                flush
            >
                <IconsWhenCollapsed icons={[IconDefinitions.cog]}>
                    <p>Left aside without header. When expanded a header bar appears to hold the collapse button.</p>
                </IconsWhenCollapsed>
            </PanelLayout.Aside>
            <PanelLayout.Main>
                <AsideControls ids={['left', 'right']} />
                <p>Main without header. On mobile a bar with the aside buttons is shown at the top.</p>
                <LongText />
            </PanelLayout.Main>
            <PanelLayout.Aside id="right" label="Rechts" icon={IconDefinitions.angle_right}>
                <p>Right aside without header, closable (the default mode): hidden while collapsed.</p>
            </PanelLayout.Aside>
        </PanelLayout>
    );
};

export default PanelLayoutWithoutHeaders;
