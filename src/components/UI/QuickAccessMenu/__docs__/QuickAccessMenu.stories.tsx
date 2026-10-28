import type { Meta, StoryFn } from '@storybook/react-webpack5';
import { ReactNode, useState } from 'react';
import { MemoryRouter } from 'react-router';
import { ArtDefinitions, IconDefinitions, SizeDefinitions } from '../../../../lib/utils/definitions';
import { DropdownHorizontalPosition } from '../../../Forms/Dropdown/Dropdown';
import Icon from '../../Icons/Icon/Icon';
import QuickAccessMenu, { QuickAccessMenuItem } from '../QuickAccessMenu';

const meta: Meta<typeof QuickAccessMenu> = {
    title: 'UI kit/Quick access menu',
    component: QuickAccessMenu,
    decorators: [
        // NavLink heeft een router nodig. In de demo-app staat deze decorator uit (die heeft zelf een router).
        (Story) => (
            <MemoryRouter>
                <div style={{ minHeight: '60rem' }}>
                    <Story />
                </div>
            </MemoryRouter>
        ),
    ],
};

export default meta;

const ART_ITEMS: { art: ArtDefinitions; label: string }[] = [
    { art: ArtDefinitions.ClaimManager, label: 'Claim manager' },
    { art: ArtDefinitions.Contract, label: 'Contract' },
    { art: ArtDefinitions.Dossier, label: 'Dossier' },
    { art: ArtDefinitions.Igo, label: 'Igo' },
    { art: ArtDefinitions.Ketenzorg, label: 'Ketenzorg' },
    { art: ArtDefinitions.Meekijkconsult, label: 'Meekijkconsult' },
    { art: ArtDefinitions.Populatiebekostiging, label: 'Populatiebekostiging' },
    { art: ArtDefinitions.Ticket, label: 'Ticket' },
    { art: ArtDefinitions.Verbruiksmiddel, label: 'Verbruiksmiddel' },
];

const createArtItems = (onClick?: (item: QuickAccessMenuItem) => void): QuickAccessMenuItem[] =>
    ART_ITEMS.map(({ art, label }) => ({ id: art, label, art, onClick }));

const Chosen = ({ value }: { value: ReactNode }) => (
    <p className="mt-2">Gekozen: <strong>{value}</strong></p>
);

export const Default: StoryFn = () => {
    const [chosen, setChosen] = useState<ReactNode>('-');

    return (
        <>
            <QuickAccessMenu title={<strong>Snelmenu</strong>} items={createArtItems((item) => setChosen(item.label))} />
            <Chosen value={chosen} />
        </>
    );
};

export const WithIcons: StoryFn = () => {
    const [chosen, setChosen] = useState<ReactNode>('-');
    const onClick = (item: QuickAccessMenuItem) => setChosen(item.label);
    const icon = (name: IconDefinitions) => <Icon icon={name} size={SizeDefinitions.Large} />;

    return (
        <>
            <QuickAccessMenu
                title={<strong>Snelmenu</strong>}
                items={[
                    { id: 'home', label: 'Home', icon: icon(IconDefinitions.home), onClick },
                    { id: 'products', label: 'Products', icon: icon(IconDefinitions.tag), onClick },
                    { id: 'orders', label: 'Orders', icon: icon(IconDefinitions.shoppingcart), onClick },
                    { id: 'users', label: 'Users', icon: icon(IconDefinitions.users), onClick },
                    { id: 'reports', label: 'Reports', icon: icon(IconDefinitions.chart), onClick },
                    { id: 'settings', label: 'Settings', icon: icon(IconDefinitions.cog), onClick },
                ]}
            />
            <Chosen value={chosen} />
        </>
    );
};

export const FourColumns: StoryFn = () => (
    <QuickAccessMenu title={<strong>Snelmenu</strong>} columns={4} items={createArtItems()} />
);

export const WithLinks: StoryFn = () => (
    <QuickAccessMenu
        title={<strong>Snelmenu</strong>}
        items={[
            { id: 'home', label: 'Home', art: ArtDefinitions.Suite, url: '/' },
            { id: 'contracts', label: 'Contracten', art: ArtDefinitions.Contract, url: '/contracts' },
            { id: 'tickets', label: 'Tickets', art: ArtDefinitions.Ticket, url: '/tickets' },
        ]}
    />
);

export const WithFooter: StoryFn = () => (
    <QuickAccessMenu
        title={<strong>Snelmenu</strong>}
        footer={<button type="button" className="link action-link">Alle applicaties</button>}
        items={createArtItems()}
    />
);

export const CustomToggle: StoryFn = () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <QuickAccessMenu
            toggleIcon={<Icon icon={IconDefinitions.home} />}
            toggleLabel="Apps"
            horizontalPosition={DropdownHorizontalPosition.Right}
            title={<strong>Snelmenu</strong>}
            items={createArtItems()}
        />
    </div>
);

export const DisabledItem: StoryFn = () => (
    <QuickAccessMenu
        title={<strong>Snelmenu</strong>}
        items={createArtItems().map((item) => (item.id === ArtDefinitions.Ticket ? { ...item, disabled: true } : item))}
    />
);
