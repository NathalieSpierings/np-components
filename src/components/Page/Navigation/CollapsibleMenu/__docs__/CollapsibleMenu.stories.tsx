import type { Meta, StoryFn } from '@storybook/react-webpack5';
import { ReactNode, useState } from 'react';
import { MemoryRouter } from 'react-router';
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from '../../../../../lib/utils/definitions';
import Title from '../../../../Typography/Title/Title';
import Button from '../../../../UI/Button/Button';
import Icon from '../../../../UI/Icons/Icon/Icon';
import PanelLayout from '../../../../UI/PanelLayout/PanelLayout';
import { usePanelLayout, usePanelLayoutAside } from '../../../../UI/PanelLayout/PanelLayoutContext';
import CollapsibleMenu, { CollapsibleMenuItem } from '../CollapsibleMenu';
import Badge from '../../../../UI/Badge/Badge';

const meta: Meta<typeof CollapsibleMenu> = {
    title: 'Navigation/Collapsible menu',
    component: CollapsibleMenu,
    decorators: [
        // NavLink heeft een router nodig. In de demo-app staat deze decorator uit (die heeft zelf een router).
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
};

export default meta;

const MenuBox = ({ children }: { children: ReactNode }) => <div style={{ maxWidth: '32rem' }}>{children}</div>;

const createMenuItems = (withIcons = false, onClick?: (item: CollapsibleMenuItem) => void): CollapsibleMenuItem[] => {
    const icon = (name: IconDefinitions) => (withIcons ? <Icon icon={name}  /> : undefined);

    return [
        { id: 'home', title: 'Home', icon: icon(IconDefinitions.home), url: '/' },
        {
            id: 'products',
            title: 'Products',
            description: 'Catalogue and stock',
            icon: icon(IconDefinitions.tag),
            children: [
                { id: 'products-all', title: 'All products', onClick },
                { id: 'products-new', title: 'New product', onClick },
                {
                    id: 'products-categories',
                    title: 'Categories',
                    children: [
                        {
                            id: 'cat-living',
                            title: 'Living',
                            children: [
                                { id: 'cat-living-furniture', title: 'Furniture', onClick },
                                { id: 'cat-living-lighting', title: 'Lighting', onClick },
                                { id: 'cat-living-decoration', title: 'Decoration', onClick },
                            ],
                        },
                        {
                            id: 'cat-household',
                            title: 'Household',
                            children: [
                                { id: 'cat-household-kitchen', title: 'Kitchen', onClick },
                                { id: 'cat-household-cleaning', title: 'Cleaning', onClick },
                            ],
                        },
                        {
                            id: 'cat-garden',
                            title: 'Garden',
                            children: [
                                { id: 'cat-garden-furniture', title: 'Garden furniture', onClick },
                                { id: 'cat-garden-tools', title: 'Tools', onClick },
                                { id: 'cat-garden-plants', title: 'Plants', onClick },
                            ],
                        },
                    ],
                },
                { id: 'products-discontinued', title: 'Discontinued', disabled: true },
            ],
        },
        {
            id: 'orders',
            title: 'Orders',
            description: 'Track and process',
            icon: icon(IconDefinitions.shoppingcart),
            badge:<Badge variant='circle' background={ColorDefinitions.Purple}> 3</Badge>,
            children: [
                { id: 'orders-new', title: 'New', onClick },
                { id: 'orders-in-progress', title: 'In progress', onClick },
                { id: 'orders-shipped', title: 'Shipped', onClick },
                { id: 'orders-delivered', title: 'Delivered', onClick },
                { id: 'orders-returns', title: 'Returns', onClick },
            ],
        },
        { id: 'settings', title: 'Settings', icon: icon(IconDefinitions.cog), onClick },
    ];
};

const collectParentIds = (items: CollapsibleMenuItem[]): string[] =>
    items.flatMap((item) => (item.children?.length ? [item.id, ...collectParentIds(item.children)] : []));

export const Default: StoryFn = () => (
    <MenuBox>
        <CollapsibleMenu items={createMenuItems()} defaultOpenIds={['products', 'products-categories']} />
    </MenuBox>
);

export const WithIcons: StoryFn = () => (
    <MenuBox>
        <CollapsibleMenu items={createMenuItems(true)} defaultOpenIds={['orders']} />
    </MenuBox>
);

export const Accordion: StoryFn = () => (
    <MenuBox>
        <CollapsibleMenu items={createMenuItems(true)} accordion />
    </MenuBox>
);

export const Controlled: StoryFn = () => {
    const items = createMenuItems(true);
    const [openIds, setOpenIds] = useState<string[]>(['products']);

    return (
        <MenuBox>
            <div className="gap-2 mb-2" style={{ display: 'flex' }}>
                <Button onClick={() => setOpenIds(collectParentIds(items))}>Alles openklappen</Button>
                <Button variant="outline" onClick={() => setOpenIds([])}>Alles dichtklappen</Button>
            </div>
            <CollapsibleMenu items={items} openIds={openIds} onOpenChange={setOpenIds} />
            <p>Open: <code>{openIds.join(', ') || '(geen)'}</code></p>
        </MenuBox>
    );
};

export const OnClick: StoryFn = () => {
    const [clicked, setClicked] = useState('-');

    return (
        <MenuBox>
            <CollapsibleMenu
                items={createMenuItems(true, (item) => setClicked(String(item.title)))}
                defaultOpenIds={['products', 'orders']}
            />
            <p>Laatst aangeklikt: <strong>{clicked}</strong></p>
        </MenuBox>
    );
};

export const WithoutLines: StoryFn = () => (
    <MenuBox>
        <CollapsibleMenu items={createMenuItems(true)} showLines={false} defaultOpenIds={['products', 'products-categories']} />
    </MenuBox>
);

export const CustomChevron: StoryFn = () => (
    <MenuBox>
        <CollapsibleMenu
            items={createMenuItems(true)}
            chevronIcon={<Icon icon={IconDefinitions.angle_down} size={SizeDefinitions.Small} />}
            defaultOpenIds={['products']}
        />
    </MenuBox>
);

/** Alleen iconen. Een klik op een item met children klapt het menu hier weer uit (`onCollapsedClick`). */
export const Collapsed: StoryFn = () => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <>
            <Button onClick={() => setCollapsed(!collapsed)}>{collapsed ? 'Uitklappen' : 'Inklappen'}</Button>
            <div
                className="mt-2"
                style={{
                    width: collapsed ? '75px' : '32rem',
                    transition: 'width 0.3s',
                    paddingBlock: 'var(--page-padding-2xs)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                }}
            >
                <CollapsibleMenu
                    items={createMenuItems(true)}
                    collapsed={collapsed}
                    onCollapsedClick={() => setCollapsed(false)}
                />
            </div>
        </>
    );
};

/** Het menu in een PanelLayout-aside: gekoppeld aan de collapsed-status van de aside. */
const AsideMenu = () => {
    const { id, collapsed } = usePanelLayoutAside();
    const { open } = usePanelLayout();

    return (
        <div style={{ paddingBlock: 'var(--page-padding-2xs)' }}>
            <CollapsibleMenu
                items={createMenuItems(true)}
                collapsed={collapsed}
                onCollapsedClick={() => open(id)}
                defaultOpenIds={['products']}
            />
        </div>
    );
};

export const InPanelLayout: StoryFn = () => (
    <div style={{ height: '60rem', border: '1px solid var(--color-border)' }}>
        <PanelLayout collapseOnMainClick>
            <PanelLayout.Aside
                id="menu"
                label="Menu"
                icon={IconDefinitions.list_bullets}
                header={<Title>Menu</Title>}
                collapsedHeader={<Icon icon={IconDefinitions.list_bullets} />}
                mode="collapsible"
                flush
                resizable={{ min: 200, max: 400 }}
            >
                <AsideMenu />
            </PanelLayout.Aside>

            <PanelLayout.Main header={<Title>Main</Title>}>
                <p>
                    Ingeklapt toont het menu alleen de iconen, met de titel als tooltip. Klik op het icoon van
                    <strong> Products</strong> of <strong>Orders</strong>: de aside klapt uit met dat item al open
                    (<code>onCollapsedClick</code> + <code>usePanelLayout().open</code>). Klik op lege ruimte in dit paneel om weer in te klappen.
                </p>
            </PanelLayout.Main>
        </PanelLayout>
    </div>
);
