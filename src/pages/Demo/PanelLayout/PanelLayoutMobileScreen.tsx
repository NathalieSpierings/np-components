import { ReactElement, useState } from "react";
import { Button, PanelLayout, Title } from "../../../components";
import { IconDefinitions } from "../../../lib/utils/definitions";
import { LongText, useFullscreenDemo } from "./PanelLayoutDemoHelpers";

/**
 * The screen shown on mobile, controlled from outside (`mobileScreen` / `onMobileScreenChange`). Showing an aside's
 * screen also expands it. The "Notities" aside has no button in the main header on mobile (`mobileButton={false}`):
 * it is only reachable with the buttons above the layout.
 */
const PanelLayoutMobileScreen = (): ReactElement => {
    useFullscreenDemo();
    const [screen, setScreen] = useState<string | null>(null);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="grid-x p-2" style={{ flex: '0 0 auto', alignItems: 'center' }}>
                <Button onClick={() => setScreen(null)}>Main</Button>
                <Button onClick={() => setScreen('details')}>Details</Button>
                <Button onClick={() => setScreen('notes')}>Notities</Button>
                <span>
                    mobileScreen: <strong>{JSON.stringify(screen)}</strong> (resize to a mobile width to see it)
                </span>
            </div>
            <div style={{ flex: '1 1 0', minHeight: 0 }}>
                <PanelLayout mobileScreen={screen} onMobileScreenChange={setScreen}>
                    <PanelLayout.Main header={<Title>Main header</Title>}>
                        <LongText />
                    </PanelLayout.Main>
                    <PanelLayout.Aside id="details" label="Details" icon={IconDefinitions.info_circle} header={<Title>Details</Title>}>
                        <p>Details content</p>
                    </PanelLayout.Aside>
                    <PanelLayout.Aside id="notes" label="Notities" icon={IconDefinitions.pencil} header={<Title>Notities</Title>} mobileButton={false}>
                        <p>Notities content, without a button in the main header on mobile.</p>
                    </PanelLayout.Aside>
                </PanelLayout>
            </div>
        </div>
    );
};

export default PanelLayoutMobileScreen;
