import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { ReactElement, useEffect, useState } from 'react';
import { MemoryRouter } from 'react-router';
import { SvgSprite } from '../../../../assets/SvgSprite';
import { IconDefinitions, SizeDefinitions } from '../../../../lib/utils/definitions';
import { Avatar } from '../../../UI/Avatar';
import { Icon } from '../../../UI/Icons/Icon';
import { SidebarMenuPlacement } from '../../Navigation/MainMenu';
import Sidebar from '../Sidebar';
import { SidebarAccount } from '../SidebarAccount';
const meta: Meta<typeof Sidebar> = {
    title: 'Page/Aside/Sidebar',
    component: Sidebar,
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <MemoryRouter>
                <>
                    <SvgSprite />
                    <Story />
                </>
            </MemoryRouter>

        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

const TemplateSidebarAccountMenu = () => {
    const auth = {
        name: 'test',
    };

    return (
        <SidebarAccount
            dropdownToggle={{
                prefix: <Avatar size={SizeDefinitions.Small} icon={IconDefinitions.user} iconDuotone={true} />,
            }}
            dropdownHeader={{
                border: true,
                content: (
                    <>
                        <span>Welkom &nbsp;</span>
                        <strong>{auth ? auth.name : ''}</strong>
                    </>
                ),
            }}
            menuItems={[
                {
                    label: 'Account',
                      icon: <Icon icon={IconDefinitions.user}/>
                },
                {
                    divider: true
                },
                {
                    label: 'Afmelden',
                    icon: <Icon icon={IconDefinitions.power}/>
                },
            ]}
        />
    );
};

const SidebarDeclareren = (): ReactElement => {
    return (
        <div key="declaraties">
            <div className="sidebar-sub__menu">
                <ul id="2">
                    <li className="">Declaraties item 1</li>
                    <li className="">Declaraties item 2</li>
                </ul>
            </div>
            <div className="sidebar-sub__content">
                <div className="subtitle">Declaraties</div>
                Content goes here...
            </div>
        </div>
    );
};

const SidebarBetrokkene = (): ReactElement => {
    return (
        <div key="betrokkene">
            <div className="sidebar-sub__menu">
                <ul id="2">
                    <li className="">Betrokkene item 1</li>
                    <li className="">Betrokkene item 2</li>
                </ul>
            </div>
            <div className="sidebar-sub__content">
                <div className="subtitle">Betrokkene</div>
                Content goes here...
            </div>
        </div>
    );
};

const SidebarSettings = (): ReactElement => {
    return (
        <div key="settings">
            <div className="sidebar-sub__content">
                <div className="subtitle">Settings</div>
                Content goes here...
            </div>
        </div>
    );
};

const menuItems = [
    {
        id: 'home',
        title: 'Home',
        tooltip: 'Home',
        url: '#',
        iconName: IconDefinitions.home,
        iconDuotone: true,
        placement: SidebarMenuPlacement.Top,
    },
    {
        id: 'declaraties',
        title: 'Declaraties',
        tooltip: 'Declaraties',
        url: '#',
        iconName: IconDefinitions.briefcase,
        iconDuotone: true,
        placement: SidebarMenuPlacement.Top,
        sidebarContentItem: <SidebarDeclareren />,
    },
    {
        id: 'betrokkene',
        title: 'Betrokkene',
        tooltip: 'Betrokkene',
        url: '#',
        iconName: IconDefinitions.building,
        iconDuotone: true,
        placement: SidebarMenuPlacement.Top,
        sidebarContentItem: <SidebarBetrokkene />,
    },
    {
        id: 'settings',
        title: 'Settings',
        tooltip: 'Settings',
        iconName: IconDefinitions.cog,
        iconDuotone: true,
        placement: SidebarMenuPlacement.Bottom,
        SidebarContentItem: <SidebarSettings />,
    },
];


const menuItems1 = [
    {
        id: 'home',
        title: 'Home',
        tooltip: 'Home',
        url: '#',
        iconName: IconDefinitions.home,
        iconDuotone: true,
        placement: SidebarMenuPlacement.Top,
    },
    {
        id: 'declaraties',
        title: 'Declaraties',
        tooltip: 'Declaraties',
        url: '#',
        iconName: IconDefinitions.briefcase,
        iconDuotone: true,
        placement: SidebarMenuPlacement.Top,
        sidebarContentItem: <SidebarDeclareren />,
    },
    {
        id: 'betrokkene',
        title: 'Betrokkene',
        tooltip: 'Betrokkene',
        url: '#',
        iconName: IconDefinitions.building,
        iconDuotone: true,
        placement: SidebarMenuPlacement.Top,
        sidebarContentItem: <SidebarBetrokkene />,
    },
    {
        id: 'settings',
        title: 'Settings',
        tooltip: 'Settings',
        iconName: IconDefinitions.cog,
        iconDuotone: true,
        placement: SidebarMenuPlacement.Bottom,
        SidebarContentItem: <SidebarSettings />,
    },
    {
        id: 'help',
        title: 'Help',
        tooltip: 'SettiHelpngs',
        iconName: IconDefinitions.question_square,
        iconDuotone: true,
        placement: SidebarMenuPlacement.Bottom,
        SidebarContentItem: <SidebarSettings />,
    },
];

export const Default: StoryFn = () => {
    const currentMenuItem = 'home';
    const [hasSidebars, setHasSidebars] = useState<boolean>(true);

    const [activeMenuItem, setActiveMenuItem] = useState<string | null>(currentMenuItem || null);
    const [sidebarSubOpen, setSidebarSubOpen] = useState<boolean>(false);

    const [activeDrawerItem, setActiveDrawerItem] = useState<string | null>(null);
    const [sidebarDrawerOpen, setSidebarDrawerOpen] = useState<boolean>(false);

    const [mobileSidebarsShown, setSidebarsMobileShown] = useState<boolean>(false);

    useEffect(() => {
        setActiveMenuItem(currentMenuItem || null);
        const exists = menuItems.some((x) => x.id === activeMenuItem && x.sidebarContentItem);
        setSidebarSubOpen(exists);
    }, [currentMenuItem, activeMenuItem, menuItems]);

    const onMenuItemClick = (id: string) => {
        // Reset drawer
        setActiveDrawerItem(null);
        setSidebarDrawerOpen(false);

        setActiveMenuItem(id);
    };

    const handleMenuItemDrawerClick = (id: string) => {
        setActiveDrawerItem(id);
        setSidebarDrawerOpen(!sidebarDrawerOpen);
    };

    const handleDismiss = () => {
        setSidebarSubOpen(false);
    };

    const handleDismissDrawer = () => {
        setSidebarDrawerOpen(false);
    };

    const handleDismissMobile = () => {
        setSidebarsMobileShown(false);
    };

    const cls = `page  ${hasSidebars ? 'has-sidebars' : ''} ${sidebarSubOpen ? 'sub-shown' : ''}  ${mobileSidebarsShown ? 'sb-mobile-shown' : ''}`;

    return (
            <div className={cls}>
                <Sidebar
                    handleDismissMobile={handleDismissMobile}
                    menuItems={menuItems}
                    activeMenuItem={activeMenuItem}
                    handleDismiss={handleDismiss}
                    handleMenuItemClick={onMenuItemClick}
                    activeDawerMenuItem={activeDrawerItem}
                    sidebarDrawerOpen={sidebarDrawerOpen}
                    handleDismissDrawer={handleDismissDrawer}
                    handleMenuItemDrawerClick={handleMenuItemDrawerClick}
                    setSidebarsMobileShown={setSidebarsMobileShown}
                    mobileSidebarsShown={mobileSidebarsShown}
                />

                <div className="page__container">
                    <div className="page__content">Content goes here...</div>
                </div>
            </div>
     
    );
};

export const WithBottomMenuItems: StoryFn = () => {
    const currentMenuItem = 'home';
    const [hasSidebars, setHasSidebars] = useState<boolean>(true);

    const [activeMenuItem, setActiveMenuItem] = useState<string | null>(currentMenuItem || null);
    const [sidebarSubOpen, setSidebarSubOpen] = useState<boolean>(false);

    const [activeDrawerItem, setActiveDrawerItem] = useState<string | null>(null);
    const [sidebarDrawerOpen, setSidebarDrawerOpen] = useState<boolean>(false);

    const [mobileSidebarsShown, setSidebarsMobileShown] = useState<boolean>(false);

    useEffect(() => {
        setActiveMenuItem(currentMenuItem || null);
        const exists = menuItems.some((x) => x.id === activeMenuItem && x.sidebarContentItem);
        setSidebarSubOpen(exists);
    }, [currentMenuItem, activeMenuItem, menuItems]);

    const handleMenuItemClickWithBottomMenuItems = (id: string) => {
        // Reset drawer
        setActiveDrawerItem(null);
        setSidebarDrawerOpen(false);

        setActiveMenuItem(id);
    };

    const handleMenuItemDrawerClick = (id: string) => {
        setActiveDrawerItem(id);
        setSidebarDrawerOpen(!sidebarDrawerOpen);
    };

    const handleDismiss = () => {
        setSidebarSubOpen(false);
    };

    const handleDismissDrawer = () => {
        setSidebarDrawerOpen(false);
    };

    const handleDismissMobile = () => {
        setSidebarsMobileShown(false);
    };

    const cls = `page  ${hasSidebars ? 'has-sidebars' : ''} ${sidebarSubOpen ? 'sub-shown' : ''}  ${mobileSidebarsShown ? 'sb-mobile-shown' : ''}`;

    return (
      
            <div className={cls}>
                <Sidebar
                    handleDismissMobile={handleDismissMobile}
                    menuItems={menuItems1}
                    activeMenuItem={activeMenuItem}
                    handleDismiss={handleDismiss}
                    handleMenuItemClick={handleMenuItemClickWithBottomMenuItems}
                    activeDawerMenuItem={activeDrawerItem}
                    sidebarDrawerOpen={sidebarDrawerOpen}
                    handleDismissDrawer={handleDismissDrawer}
                    handleMenuItemDrawerClick={handleMenuItemDrawerClick}
                    setSidebarsMobileShown={setSidebarsMobileShown}
                    mobileSidebarsShown={mobileSidebarsShown}
                />

                <div className="page__container">
                    <div className="page__content">Content goes here...</div>
                </div>
            </div>
       
    );
};

export const WithAccountDropdown: StoryFn = () => {
    const currentMenuItem = 'home';
    const [hasSidebars, setHasSidebars] = useState<boolean>(true);

    const [activeMenuItem, setActiveMenuItem] = useState<string | null>(currentMenuItem || null);
    const [sidebarSubOpen, setSidebarSubOpen] = useState<boolean>(false);

    const [activeDrawerItem, setActiveDrawerItem] = useState<string | null>(null);
    const [sidebarDrawerOpen, setSidebarDrawerOpen] = useState<boolean>(false);

    const [mobileSidebarsShown, setSidebarsMobileShown] = useState<boolean>(false);

    useEffect(() => {
        setActiveMenuItem(currentMenuItem || null);
        const exists = menuItems.some((x) => x.id === activeMenuItem && x.sidebarContentItem);
        setSidebarSubOpen(exists);
    }, [currentMenuItem, activeMenuItem, menuItems]);

    const doHhandleMenuItemClick = (id: string) => {
        // Reset drawer
        setActiveDrawerItem(null);
        setSidebarDrawerOpen(false);
        setActiveMenuItem(id);
    };

    const handleMenuItemDrawerClick = (id: string) => {
        setActiveDrawerItem(id);
        setSidebarDrawerOpen(!sidebarDrawerOpen);
    };

    const handleDismiss = () => {
        setSidebarSubOpen(false);
    };

    const handleDismissDrawer = () => {
        setSidebarDrawerOpen(false);
    };

    const handleDismissMobile = () => {
        setSidebarsMobileShown(false);
    };

    const cls = `page  ${hasSidebars ? 'has-sidebars' : ''} ${sidebarSubOpen ? 'sub-shown' : ''}  ${mobileSidebarsShown ? 'sb-mobile-shown' : ''}`;

    return (
      
            <div className={cls}>
                <Sidebar
                    accountMenu={TemplateSidebarAccountMenu()}
                    handleDismissMobile={handleDismissMobile}
                    menuItems={menuItems}
                    activeMenuItem={activeMenuItem}
                    handleDismiss={handleDismiss}
                    handleMenuItemClick={doHhandleMenuItemClick}
                    activeDawerMenuItem={activeDrawerItem}
                    sidebarDrawerOpen={sidebarDrawerOpen}
                    handleDismissDrawer={handleDismissDrawer}
                    handleMenuItemDrawerClick={handleMenuItemDrawerClick}
                    setSidebarsMobileShown={setSidebarsMobileShown}
                    mobileSidebarsShown={mobileSidebarsShown}
                />

                <div className="page__container">
                    <div className="page__content">Content goes here...</div>
                </div>
            </div>
       
    );
};
