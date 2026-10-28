import { ReactElement } from "react";
import { PanelLayout, Title } from "../../../../components";
import { AsideControls, LongText, useFullscreenDemo } from "./PanelLayoutDemoHelpers";

/**
 * Close to a ColumnLayout: one aside, open initially. Closable (the default mode), so it is hidden when collapsed.
 * On mobile it opens with the default burger.
 */
const PanelLayoutSingleAside = (): ReactElement => {
    useFullscreenDemo();

    return (
        <PanelLayout defaultExpandedAsides={['aside']}>
            <PanelLayout.Main header={<Title>Main header</Title>}>
                <AsideControls ids={['aside']} />
                <LongText />
            </PanelLayout.Main>
            <PanelLayout.Aside id="aside" label="Paneel" header={<Title>Aside header</Title>}>
                <p>Aside content goes here...</p>
            </PanelLayout.Aside>
        </PanelLayout>
    );
};

export default PanelLayoutSingleAside;
