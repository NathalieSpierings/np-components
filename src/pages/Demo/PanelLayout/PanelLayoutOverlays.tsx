import { ReactElement } from "react";
import { Icon, PanelLayout, Title } from "../../../components";
import { IconDefinitions } from "../../../lib/utils/definitions";
import { AsideControls, IconsWhenCollapsed, LongText, useFullscreenDemo } from "./PanelLayoutDemoHelpers";

/**
 * Overlay asides on both sides: they expand over the main pane, which keeps its width.
 * They are linked with `exclusive`, so only one covers the main pane at a time, though they are not adjacent.
 */
const PanelLayoutOverlays = (): ReactElement => {
    useFullscreenDemo();

    return (
        <PanelLayout>
            <PanelLayout.Aside
                id="nav"
                label="Navigatie"
                icon={IconDefinitions.ellipsis_v}
                header={<Title>Navigatie</Title>}
                collapsedHeader={<Icon icon={IconDefinitions.ellipsis_v} />}
                mode="collapsible"
                flush
                expandOn="hover"
                overlay
                exclusive="overlays"
            >
                <IconsWhenCollapsed icons={[IconDefinitions.home, IconDefinitions.dossier]}>
                    <p>Expands on hover, over the main pane.</p>
                </IconsWhenCollapsed>
            </PanelLayout.Aside>

            <PanelLayout.Main header={<Title>Main header</Title>}>
                <AsideControls ids={['nav', 'notes']} />
                <LongText />
            </PanelLayout.Main>

            <PanelLayout.Aside
                id="notes"
                label="Notities"
                icon={IconDefinitions.pencil}
                header={<Title>Notities</Title>}
                collapsedHeader={<Icon icon={IconDefinitions.pencil} />}
                mode="collapsible"
                flush
                overlay
                resizable
                exclusive="overlays"
            >
                <IconsWhenCollapsed icons={[IconDefinitions.pencil]}>
                    <p>Click to expand, over the main pane. Collapse with the arrow in the header.</p>
                </IconsWhenCollapsed>
            </PanelLayout.Aside>
        </PanelLayout>
    );
};

export default PanelLayoutOverlays;
