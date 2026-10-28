import { ReactElement, useState } from "react";
import { Button, PanelLayout, Title } from "../../../../components";
import { IconDefinitions } from "../../../../lib/utils/definitions";
import { IconsWhenCollapsed, LongText, useFullscreenDemo } from "./PanelLayoutDemoHelpers";

const PanelLayoutControlled = (): ReactElement => {
    useFullscreenDemo();
    const [expanded, setExpanded] = useState<string[]>(['details']);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="grid-x p-2" style={{ flex: '0 0 auto', alignItems: 'center' }}>
                <Button onClick={() => setExpanded(['details'])}>Open details from outside the layout</Button>
                <Button onClick={() => setExpanded([])}>Close</Button>
                <span>
                    expandedAsides: <strong>{JSON.stringify(expanded)}</strong>
                </span>
            </div>
            <div style={{ flex: '1 1 0', minHeight: 0 }}>
                <PanelLayout expandedAsides={expanded} onExpandedAsidesChange={setExpanded}>
                    <PanelLayout.Main header={<Title>Main</Title>}>
                        <LongText />
                    </PanelLayout.Main>
                    <PanelLayout.Aside
                        id="details"
                        label="Details"
                        header={<Title>Details</Title>}
                        mode="collapsible"
                        flush
                    >
                        <IconsWhenCollapsed icons={[IconDefinitions.info_circle]}>
                            <p>Details content</p>
                        </IconsWhenCollapsed>
                    </PanelLayout.Aside>
                </PanelLayout>
            </div>
        </div>
    );
};

export default PanelLayoutControlled;
