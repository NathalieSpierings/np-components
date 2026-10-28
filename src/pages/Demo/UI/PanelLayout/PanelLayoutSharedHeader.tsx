import { ReactElement } from "react";
import { PanelLayout, Title } from "../../../../components";
import { IconDefinitions } from "../../../../lib/utils/definitions";
import { AsideControls, IconsWhenCollapsed, LongText, useFullscreenDemo } from "./PanelLayoutDemoHelpers";

const PanelLayoutSharedHeader = (): ReactElement => {
    useFullscreenDemo();

    return (
        <PanelLayout collapseOnMainClick>
            <PanelLayout.Header content={<Title>One header across the left aside and main</Title>}>
                <PanelLayout.Aside
                    id="nav"
                    label="Navigatie"
                    icon={IconDefinitions.ellipsis_v}
                    mode="collapsible"
                    flush
                    collapseButton={false}
                >
                    <IconsWhenCollapsed icons={[IconDefinitions.home, IconDefinitions.dossier, IconDefinitions.users]}>
                        <p>Navigation tree</p>
                        <LongText paragraphs={2} />
                    </IconsWhenCollapsed>
                </PanelLayout.Aside>

                <PanelLayout.Main>
                    <AsideControls ids={['nav', 'details']} />
                    <p>
                        The navigation shares its header with this pane, so it has <code>collapseButton={'{false}'}</code> (the arrow would
                        end up at the far right of the shared header). Collapse it by clicking empty space in this pane (
                        <code>collapseOnMainClick</code>) or with the buttons above.
                    </p>
                    <LongText />
                </PanelLayout.Main>
            </PanelLayout.Header>

            <PanelLayout.Aside id="details" label="Details" icon={IconDefinitions.info_circle} header={<Title>Details</Title>}>
                <p>This aside is closable (the default mode), so it is hidden while collapsed. Open it with the buttons in the main pane.</p>
            </PanelLayout.Aside>
        </PanelLayout>
    );
};

export default PanelLayoutSharedHeader;
