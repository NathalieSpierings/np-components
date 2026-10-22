import type { Meta, StoryFn } from '@storybook/react-webpack5';
import { ReactNode, useState } from 'react';
import { Badge, Button, ContentItem, Icon, Title } from '../../..';
import { ColorDefinitions, IconDefinitions } from '../../../../lib/utils/definitions';
import PanelLayout from '../PanelLayout';
import { usePanelLayout, usePanelLayoutAside } from '../PanelLayoutContext';

const meta: Meta<typeof PanelLayout> = {
    title: 'Layout/Panel layout',
    component: PanelLayout,
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <div style={{ height: '100vh' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

const LongText = ({ paragraphs = 12 }: { paragraphs?: number }) => (
    <>
        {Array.from({ length: paragraphs }, (_, i) => (
            <p key={i}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit
                aliquet. Maecenas faucibus mollis interdum. Nullam quis risus eget urna mollis ornare vel eu leo. Cras mattis consectetur
                purus sit amet fermentum.
            </p>
        ))}
    </>
);

/**
 * Aside content (for `mode="collapsible"` with `flush`) that shows only icons while collapsed, in the strip, and the
 * full content (with padding) when expanded: the content adapts itself with `usePanelLayoutAside()`.
 */
const IconsWhenCollapsed = ({ icons, children }: { icons: IconDefinitions[]; children: ReactNode }) => {
    const { collapsed } = usePanelLayoutAside();

    if (collapsed) {
        return (
            <PanelLayout.Strip style={{ paddingBlock: 'var(--padding-xl)' }}>
                {icons.map((icon) => (
                    <Icon key={icon} icon={icon} hover />
                ))}
            </PanelLayout.Strip>
        );
    }

    return <div style={{ padding: 'var(--padding-2xl)' }}>{children}</div>;
};

const FILTERS = [
    { id: 'all', name: 'Alle dossiers', icon: IconDefinitions.inbox, count: 128 },
    { id: 'mine', name: 'Mijn dossiers', icon: IconDefinitions.user, count: 12 },
    { id: 'open', name: 'Openstaand', icon: IconDefinitions.clock_circle, count: 37 },
    { id: 'flagged', name: 'Gemarkeerd', icon: IconDefinitions.flag, count: 4 },
    { id: 'done', name: 'Afgerond', icon: IconDefinitions.checks, count: 75 },
];

/**
 * One list for both states (`mode="collapsible"`): the same button elements are rendered collapsed and expanded,
 * so the labels slide in/out as the column animates. The collapsed column simply clips everything after the icon.
 */
const FilterList = ({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) => {
    const { collapsed } = usePanelLayoutAside();

    return (
        <div className="grid-y gap-05" style={{ padding: 'var(--padding-xl) 0' }}>
            {FILTERS.map((filter) => (
                <button
                    key={filter.id}
                    type="button"
                    onClick={() => onSelect(filter.id)}
                    title={collapsed ? `${filter.name} (${filter.count})` : undefined}
                    aria-label={`${filter.name} (${filter.count})`}
                    aria-pressed={selected === filter.id}
                    style={{
                        display: 'flex',
                        width: '100%',
                        height: '4.4rem',
                        padding: '0 var(--padding-xl) 0 0',
                        border: 0,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        color: 'inherit',
                        background: selected === filter.id ? 'var(--color-selected)' : 'transparent',
                        cursor: 'pointer',
                        textAlign: 'left',
                    }}
                >
                    {/*
                      * Designed for a preview: the prefix is exactly the collapsed width and holds only the centered icon,
                      * so the collapsed (clipped) aside shows just the icons, and the name and count slide in on expand.
                      */}
                    <ContentItem
                        item={{
                            prefix: (
                                <PanelLayout.Strip>
                                    <Icon icon={filter.icon} renderAs="span" />
                                </PanelLayout.Strip>
                            ),
                            content: <span style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>{filter.name}</span>,
                            postfix: <Badge>{filter.count}</Badge>,
                        }}
                    />
                </button>
            ))}
        </div>
    );
};

/** Buttons that open the asides via the hook, to show it works from anywhere inside the layout. */
const AsideControls = ({ ids }: { ids: string[] }) => {
    const { expandedAsides, isOpen, close, toggle } = usePanelLayout();

    return (
        <div className="grid-x mb-3" style={{ alignItems: 'center' }}>
            {ids.map((id) => (
                <Button key={id} color={isOpen(id) ? ColorDefinitions.Primary : undefined} onClick={() => toggle(id)}>
                    Toggle "{id}"
                </Button>
            ))}
            <Button onClick={() => close()}>Collapse all</Button>
            <p style={{ width: '100%', margin: 0 }}>
                Expanded asides: <strong>{expandedAsides.length > 0 ? expandedAsides.join(', ') : 'none'}</strong>
            </p>
        </div>
    );
};

export const Default: StoryFn = () => {
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

/**
 * Overlay asides on both sides: they expand over the main pane, which keeps its width.
 * They are linked with `exclusive`, so only one covers the main pane at a time, though they are not adjacent.
 */
export const Overlays: StoryFn = () => (
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

/**
 * A group with `overlay`: the open group floats over the main pane as one block, laid out as if it pushed. The asides
 * between the expanded one and the main pane move along, so nothing in the group is covered. The main pane keeps its width.
 * The resize handle is on the block's left edge.
 */
export const OverlayGroup: StoryFn = () => (
    <PanelLayout collapseOnMainClick>
        <PanelLayout.Main header={<Title>Main header</Title>}>
            <AsideControls ids={['details', 'notes', 'history']} />
            <p>
                The three asides on the right are one <code>PanelLayout.Group</code> with <code>overlay</code> and{' '}
                <code>resizable</code>. Expand the leftmost, middle and rightmost one to compare: the group floats over this pane as one
                block (the strips to the left of the expanded aside move along instead of being covered), so this text never moves.
                Click empty space in this pane to collapse it again (<code>collapseOnMainClick</code>).
            </p>
            <LongText />
        </PanelLayout.Main>

        <PanelLayout.Group overlay resizable width="360px">
            <PanelLayout.Aside
                id="details"
                label="Details"
                icon={IconDefinitions.info_circle}
                header={<Title>Details</Title>}
                collapsedHeader={<Icon icon={IconDefinitions.info_circle} />}
                mode="collapsible"
                flush
            >
                <IconsWhenCollapsed icons={[IconDefinitions.info_circle]}>
                    <p>Details: the leftmost aside of the group.</p>
                </IconsWhenCollapsed>
            </PanelLayout.Aside>

            <PanelLayout.Aside
                id="notes"
                label="Notities"
                icon={IconDefinitions.pencil}
                header={<Title>Notities</Title>}
                collapsedHeader={<Icon icon={IconDefinitions.pencil} />}
                mode="collapsible"
                flush
            >
                <IconsWhenCollapsed icons={[IconDefinitions.pencil]}>
                    <p>Notities: the middle aside. Expanded, the Details strip moves left along with it.</p>
                </IconsWhenCollapsed>
            </PanelLayout.Aside>

            <PanelLayout.Aside
                id="history"
                label="Geschiedenis"
                icon={IconDefinitions.history}
                header={<Title>Geschiedenis</Title>}
                collapsedHeader={<Icon icon={IconDefinitions.history} />}
                mode="collapsible"
                flush
            >
                <IconsWhenCollapsed icons={[IconDefinitions.history]}>
                    <p>Geschiedenis: the rightmost aside. Expanded, the Notities and Details strips move left along with it.</p>
                </IconsWhenCollapsed>
            </PanelLayout.Aside>
        </PanelLayout.Group>
    </PanelLayout>
);

export const SharedHeader: StoryFn = () => (
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

export const ControlledFromOutside: StoryFn = () => {
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

/**
 * An aside that cannot be collapsed (`mode="persistent"`): always expanded, also when clicking the main pane or pressing
 * Escape (`collapseOnMainClick`) or from code. On mobile it is still its own screen, which you can leave.
 */
export const AlwaysExpanded: StoryFn = () => (
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

/**
 * On mobile, start on an aside's screen instead of the main pane (`defaultMobileScreen`), like a ColumnLayout with
 * `primaryViewOnMobile="aside"`. The aside is persistent, so it is always shown on desktop.
 */
export const MobileStartsOnAside: StoryFn = () => (
    <PanelLayout defaultMobileScreen="list">
        <PanelLayout.Aside id="list" label="Lijst" icon={IconDefinitions.dossier} header={<Title>Lijst</Title>} mode="persistent">
            <p>On mobile this screen is shown first. Go back to see the main pane; its header has a button to come back here.</p>
        </PanelLayout.Aside>
        <PanelLayout.Main header={<Title>Main header</Title>}>
            <LongText />
        </PanelLayout.Main>
    </PanelLayout>
);

/**
 * The screen shown on mobile, controlled from outside (`mobileScreen` / `onMobileScreenChange`). Showing an aside's
 * screen also expands it. The "Notities" aside has no button in the main header on mobile (`mobileButton={false}`):
 * it is only reachable with the buttons above the layout.
 */
export const MobileScreenFromOutside: StoryFn = () => {
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

/**
 * Close to a ColumnLayout: one aside, open initially. Closable (the default mode), so it is hidden when collapsed.
 * On mobile it opens with the default burger.
 */
export const SingleAside: StoryFn = () => (
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

export const WithoutHeaders: StoryFn = () => (
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

export const MainOnly: StoryFn = () => (
    <PanelLayout>
        <PanelLayout.Main header={<Title>Main header</Title>}>
            <LongText />
        </PanelLayout.Main>
    </PanelLayout>
);
