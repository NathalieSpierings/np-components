import { ReactElement } from "react";
import { PanelLayout, Title } from "../../../components";
import { IconDefinitions } from "../../../lib/utils/definitions";
import { LongText, useFullscreenDemo } from "./PanelLayoutDemoHelpers";

/**
 * On mobile, start on an aside's screen instead of the main pane (`defaultMobileScreen`), like a ColumnLayout with
 * `primaryViewOnMobile="aside"`. The aside is persistent, so it is always shown on desktop.
 */
const PanelLayoutMobileStartsOnAside = (): ReactElement => {
    useFullscreenDemo();

    return (
        <PanelLayout defaultMobileScreen="list">
            <PanelLayout.Aside id="list" label="Lijst" icon={IconDefinitions.dossier} header={<Title>Lijst</Title>} mode="persistent">
                <p>On mobile this screen is shown first. Go back to see the main pane; its header has a button to come back here.</p>
            </PanelLayout.Aside>
            <PanelLayout.Main header={<Title>Main header</Title>}>
                <LongText />
            </PanelLayout.Main>
        </PanelLayout>
    );
};

export default PanelLayoutMobileStartsOnAside;
