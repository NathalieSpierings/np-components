import { ReactElement } from "react";
import { PanelLayout, Title } from "../../../../components";
import { LongText, useFullscreenDemo } from "./PanelLayoutDemoHelpers";

const PanelLayoutMainOnly = (): ReactElement => {
    useFullscreenDemo();

    return (
        <PanelLayout>
            <PanelLayout.Main header={<Title>Main header</Title>}>
                <LongText />
            </PanelLayout.Main>
        </PanelLayout>
    );
};

export default PanelLayoutMainOnly;
