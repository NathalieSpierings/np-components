import { ReactElement, useState } from "react";
import { Icon, PanelLayout, Title, usePanelLayout } from "../../../../components";
import { IconDefinitions } from "../../../../lib/utils/definitions";
import { AsideControls, FILTERS, FilterList, IconsWhenCollapsed, LongText, useFullscreenDemo } from "./PanelLayoutDemoHelpers";

const PanelLayoutDefault = (): ReactElement => {
    useFullscreenDemo();
    const [filter, setFilter] = useState('all');

    return (
        <PanelLayout collapseOnMainClick>
            {/*
              * Navigation: expands on hover, over the main pane instead of pushing it.
              * `mode="collapsible"`: while collapsed the filter list shows its start (the icons), clipped.
              */}
            <PanelLayout.Aside
                id="filters"
                label="Filters"
                expandOn="hover"
                overlay
                resizable={{ min: 160, max: 400 }}
                icon={IconDefinitions.funnel}
                header={<Title>Filters</Title>}
                collapsedHeader={<Icon icon={IconDefinitions.funnel} />}
                mode="collapsible"
                flush
            >
                <FilterList selected={filter} onSelect={setFilter} />
            </PanelLayout.Aside>

            <PanelLayout.Main header={<Title>Main header</Title>}>
                <AsideControls ids={['filters', 'details', 'history']} />
                <p>
                    Active filter: <strong>{FILTERS.find((f) => f.id === filter)?.name}</strong>
                </p>
                <ul>
                    <li>
                        <strong>Filters</strong> (left): <code>expandOn="hover"</code> and <code>overlay</code>. It expands while you hover it
                        (or tab into it), over the main pane, so this text does not move.
                    </li>
                    <li>
                        <strong>Details</strong> and <strong>Geschiedenis</strong> (right) are a <code>PanelLayout.Group</code>: expanding
                        one collapses the other. They push the main pane, and are independent of the filters.
                    </li>
                    <li>
                        <strong>Geschiedenis</strong> has no <code>mode</code>, so it is <code>"closable"</code> (the default): hidden
                        while collapsed. Open it with the <em>Toggle "history"</em> button above (via <code>usePanelLayout()</code>).
                    </li>
                    <li>
                        The filters and the group are <code>resizable</code>, and remember their size while collapsed. The group is resized
                        as a whole at its left edge, so switching between Details and Geschiedenis keeps this pane the same width.
                    </li>
                    <li>
                        <code>collapseOnMainClick</code>: clicking empty space in this pane (or pressing Escape) collapses all asides
                        (clicks on buttons and other controls don't).
                    </li>
                    <li>Resize to a mobile width to see every aside become its own screen.</li>
                </ul>
                <LongText />
            </PanelLayout.Main>

            {/* One block: at most one of these is expanded, and the block is resized at its left edge */}
            <PanelLayout.Group width="400px" resizable>
                <PanelLayout.Aside
                    id="details"
                    label="Details"
                    icon={IconDefinitions.info_circle}
                    header={<Title>Details</Title>}
                    collapsedHeader={<Icon icon={IconDefinitions.info_circle} />}
                    mode="collapsible"
                    flush
                >
                    <IconsWhenCollapsed icons={[IconDefinitions.info_circle, IconDefinitions.user]}>
                        <p>Resize the group by dragging its left edge, whichever aside is expanded.</p>
                        <LongText paragraphs={4} />
                    </IconsWhenCollapsed>
                </PanelLayout.Aside>

                <PanelLayout.Aside
                    id="history"
                    label="Geschiedenis"
                    icon={IconDefinitions.history}
                    header={<Title>Geschiedenis</Title>}
                >
                    <p>History content. Hidden while collapsed, so it can only be opened from code (the "Toggle history" button).</p>
                </PanelLayout.Aside>
            </PanelLayout.Group>
        </PanelLayout>
    );
};

export default PanelLayoutDefault;
