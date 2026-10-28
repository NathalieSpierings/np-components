import { ReactNode, useEffect } from "react";
import { Badge, Button, ContentItem, Icon, PanelLayout, useLayoutContext, usePanelLayout, usePanelLayoutAside } from "../../../../components";
import { ColorDefinitions, IconDefinitions } from "../../../../lib/utils/definitions";

/** Maakt de demopagina schermvullend (zoals de ColumnLayout-demo's) en zet dat terug bij het verlaten. */
export const useFullscreenDemo = () => {
    const { setFullscreen, setShowHeader } = useLayoutContext();

    useEffect(() => {
        setFullscreen(true);
        setShowHeader(false);
        return () => {
            setFullscreen(false);
            setShowHeader(true);
        };
    }, [setFullscreen, setShowHeader]);
};

export const LongText = ({ paragraphs = 12 }: { paragraphs?: number }) => (
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
export const IconsWhenCollapsed = ({ icons, children }: { icons: IconDefinitions[]; children: ReactNode }) => {
    const { collapsed } = usePanelLayoutAside();

    if (collapsed) {
        return (
            <PanelLayout.Strip style={{ paddingBlock: 'var(--page-padding-sm)' }}>
                {icons.map((icon) => (
                    <Icon key={icon} icon={icon} hover />
                ))}
            </PanelLayout.Strip>
        );
    }

    return <div style={{ padding: 'var(--page-padding)' }}>{children}</div>;
};

export const FILTERS = [
    { id: 'all', name: 'Alle orders', icon: IconDefinitions.inbox, count: 128 },
    { id: 'mine', name: 'Mijn orders', icon: IconDefinitions.user, count: 12 },
    { id: 'open', name: 'Openstaand', icon: IconDefinitions.clock_circle, count: 37 },
    { id: 'flagged', name: 'Gemarkeerd', icon: IconDefinitions.flag, count: 4 },
    { id: 'done', name: 'Afgerond', icon: IconDefinitions.checks, count: 75 },
];

/**
 * One list for both states (`mode="collapsible"`): the same button elements are rendered collapsed and expanded,
 * so the labels slide in/out as the column animates. The collapsed column simply clips everything after the icon.
 */
export const FilterList = ({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) => {
    const { collapsed } = usePanelLayoutAside();

    return (
        <div className="grid-y gap-05" style={{ padding: 'var(--page-padding-sm) 0' }}>
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
                        padding: '0 var(--page-padding-sm) 0 0',
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
export const AsideControls = ({ ids }: { ids: string[] }) => {
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
