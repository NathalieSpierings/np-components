import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { PropsWithChildren, ReactElement, useEffect, useState } from 'react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router';
import { ColorDefinitions, IconDefinitions, SizeDefinitions, VerticalPositionDefinition } from '../../../../lib/utils/definitions';
import SearchInput from '../../../Forms/SearchInput/SearchInput';
import { LayoutProvider, useLayoutContext } from '../../../Providers/LayoutContext/LayoutContext';
import Avatar from '../../../UI/Avatar/Avatar';
import Button from '../../../UI/Button/Button';
import { MainMenuItem } from '../../Navigation/MainMenu/MainMenu';
import SidebarMenu, { SidebarMenuItem } from '../../Navigation/SidebarMenu/SidebarMenu';
import { SidebarAccount } from '../../Sidebar/SidebarAccount';
import MainLayout, { MainLayoutProps } from '../MainLayout';
import { MainLayoutDrawerContent, MainLayoutDrawerFooter, MainLayoutDrawerHeader, useMainLayoutDrawer } from '../MainLayoutDrawer';
import { MainLayoutSidebarContent, MainLayoutSidebarFooter } from '../MainLayoutSidebar';


const PageContent = ({ title }: { title: string }): ReactElement => (
    <>
        <h3>{title}</h3>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat.
        </p>
    </>
);


const productMenuItems: SidebarMenuItem[] = [
    { title: 'Overzicht', url: '/producten/overzicht' },
    { title: 'Categorieën', url: '/producten/categorieen' },
    { title: 'Prijzen', url: '/producten/prijzen' },
];

const ProductSidebar = (): ReactElement => (
    <>
        <MainLayoutSidebarContent>
            <SidebarMenu menuItems={productMenuItems} />
        </MainLayoutSidebarContent>
        <MainLayoutSidebarFooter>
            <Button>Nieuw product</Button>
        </MainLayoutSidebarFooter>
    </>
);


const SettingsDrawer = (): ReactElement => {
    const { close } = useMainLayoutDrawer();

    return (
        <>
            <MainLayoutDrawerContent>
                <p>Instellingen kunnen hier geplaatst worden...</p>
            </MainLayoutDrawerContent>
            <MainLayoutDrawerFooter>
                <Button onClick={close}>Annuleren</Button>
                <Button color={ColorDefinitions.Primary} shadow={true} onClick={close}>
                    Opslaan
                </Button>
            </MainLayoutDrawerFooter>
        </>
    );
};


const users = ['Jan de Vries', 'Sophie Jansen', 'Peter van Dijk', 'Emma de Jong', 'Thomas Smit', 'Lisa van den Berg'];

const SearchDrawer = (): ReactElement => {
    const [search, setSearch] = useState('');
    const results = users.filter((u) => u.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <MainLayoutDrawerHeader>
                <SearchInput placeholder="Zoek een gebruiker..." value={search} onTextInput={setSearch} />
            </MainLayoutDrawerHeader>
            <MainLayoutDrawerContent>
                {results.length > 0 ? (
                    <ul>
                        {results.map((user) => (
                            <li key={user}>{user}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-mute">Geen resultaten</p>
                )}
            </MainLayoutDrawerContent>
        </>
    );
};

const menuItems: MainMenuItem[] = [
    {
        id: 'home',
        title: 'Home',
        tooltip: 'Home',
        url: '/',
        iconName: IconDefinitions.home,
        iconDuotone: true,
        placement: VerticalPositionDefinition.Top,
    },
    {
        id: 'producten',
        title: 'Producten',
        tooltip: 'Producten',
        url: '/producten',
        iconName: IconDefinitions.briefcase,
        iconDuotone: true,
        placement: VerticalPositionDefinition.Top,
        sidebarTitle: 'Producten',
        sidebar: <ProductSidebar />,
    },
    {
        id: 'zoeken',
        title: 'Zoeken',
        tooltip: 'Zoeken',
        iconName: IconDefinitions.search,
        iconDuotone: true,
        placement: VerticalPositionDefinition.Top,
        drawer: <SearchDrawer />,
    },
    {
        id: 'settings',
        title: 'Instellingen',
        tooltip: 'Instellingen',
        iconName: IconDefinitions.cog,
        iconDuotone: true,
        placement: VerticalPositionDefinition.Bottom,
        drawerTitle: (
            <div className="grid-y gap-0">
                <h4>Mijn voorkeuren</h4>
                <h6 className="mt-1 text-mute">Instellen</h6>
            </div>
        ),
        drawerWidth: '400px',
        drawer: <SettingsDrawer />,
    },
];

const AccountMenu = ({ onOpenSettings }: { onOpenSettings: () => void }): ReactElement => (
    <SidebarAccount
        dropdownHeader={{
            border: true,
            content: (
                <span>
                    Welkom <strong>Jan de Vries</strong>
                </span>
            ),
        }}
        dropdownToggle={{
            prefix: <Avatar size={SizeDefinitions.Small} icon={IconDefinitions.user} iconDuotone={true} />,
        }}
        menuItems={[
            {
                label: 'Instellingen',
                icon: (
                    <svg>
                        <use xlinkHref="#svg_icon_cog" />
                    </svg>
                ),
                onClick: onOpenSettings,
            },
            { divider: true },
            {
                label: 'Afmelden',
                icon: (
                    <svg>
                        <use xlinkHref="#svg_icon_power" />
                    </svg>
                ),
            },
        ]}
    />
);

// Bepaalt currentMenuItem uit de route en beheert drawerRequest (zoals App.tsx)
const StoryLayout = (args: MainLayoutProps): ReactElement => {
    const location = useLocation();
    const [drawerRequest, setDrawerRequest] = useState(args.drawerRequest ?? null);

    const items = args.menuItems ?? menuItems;
    const currentMenuItem =
        items.find((x) => x.url && x.url !== '/' && location.pathname.startsWith(x.url))?.id ?? 'home';

    return (
        <MainLayout
            {...args}
            menuItems={items}
            currentMenuItem={currentMenuItem}
            drawerRequest={drawerRequest}
            accountMenu={
                <AccountMenu onOpenSettings={() => setDrawerRequest({ item: 'settings', key: Date.now() })} />
            }
        />
    );
};

const renderWithRouter = (args: MainLayoutProps, initialPath = '/'): ReactElement => (
    <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
            <Route path="/" element={<StoryLayout {...args} />}>
                <Route index element={<PageContent title="Home" />} />
                <Route path="producten/*" element={<PageContent title="Producten" />} />
                <Route path="*" element={<PageContent title="Pagina" />} />
            </Route>
        </Routes>
    </MemoryRouter>
);

// Zet hasSidebars / showHeader / fullscreen in de LayoutContext voor een story
const LayoutSettings = ({
    hasSidebars = true,
    showHeader = true,
    fullscreen = false,
    children,
}: PropsWithChildren<{ hasSidebars?: boolean; showHeader?: boolean; fullscreen?: boolean }>): ReactElement => {
    const { setHasSidebars, setShowHeader, setFullscreen } = useLayoutContext();

    useEffect(() => {
        setHasSidebars(hasSidebars);
        setShowHeader(showHeader);
        setFullscreen(fullscreen);
    }, [hasSidebars, showHeader, fullscreen, setHasSidebars, setShowHeader, setFullscreen]);

    return <>{children}</>;
};


const meta: Meta<typeof MainLayout> = {
    title: 'Page/Main layout',
    component: MainLayout,
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        loading: false,
        pageTitle: 'Home',
        breadcrumbItems: [
            { label: 'Home', href: '#' },
            { label: 'Dashboard', href: '#' },
        ],
    },
    argTypes: {
        menuItems: { control: false },
        accountMenu: { control: false },
        drawerRequest: { control: false },
        currentMenuItem: { control: false },
    },
    decorators: [
        (Story) => (
            <LayoutProvider>
                <div style={{ height: '100%' }}>
                    <Story />
                </div>
            </LayoutProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof MainLayout>;



export const Default: Story = {
    render: (args) => renderWithRouter(args),
};

export const WithSidebar: Story = {
    args: {
        pageTitle: 'Producten',
        breadcrumbItems: [
            { label: 'Home', href: '#' },
            { label: 'Producten', href: '#' },
        ],
    },
    render: (args) => renderWithRouter(args, '/producten/overzicht'),
};

export const WithDrawer: Story = {
    args: {
        drawerRequest: { item: 'settings', key: 1 },
    },
    render: (args) => renderWithRouter(args),
};

export const DrawerWithCustomHeader: Story = {
    args: {
        drawerRequest: { item: 'zoeken', key: 1 },
    },
    render: (args) => renderWithRouter(args),
};

export const Loading: Story = {
    args: {
        loading: true,
    },
    render: (args) => renderWithRouter(args),
};

export const Fullscreen: Story = {
    decorators: [
        (Story) => (
            <LayoutSettings fullscreen={true}>
                <Story />
            </LayoutSettings>
        ),
    ],
    render: (args) => renderWithRouter(args),
};

export const WithoutHeader: Story = {
    decorators: [
        (Story) => (
            <LayoutSettings showHeader={false}>
                <Story />
            </LayoutSettings>
        ),
    ],
    render: (args) => renderWithRouter(args),
};

export const WithoutSidebars: Story = {
    decorators: [
        (Story) => (
            <LayoutSettings hasSidebars={false}>
                <Story />
            </LayoutSettings>
        ),
    ],
    render: (args) => renderWithRouter(args),
};

export const WithoutSidebarsAndHeader: Story = {
    decorators: [
        (Story) => (
            <LayoutSettings hasSidebars={false} showHeader={false}>
                <Story />
            </LayoutSettings>
        ),
    ],
    render: (args) => renderWithRouter(args),
};
