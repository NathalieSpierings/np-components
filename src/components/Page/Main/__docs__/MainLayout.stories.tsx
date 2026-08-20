import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import React, { ReactElement } from 'react';
import { MemoryRouter } from 'react-router';
import { SvgSprite } from '../../../../assets/SvgSprite';
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from '../../../../lib/utils/definitions';
import { LayoutProvider } from '../../../Providers/LayoutContext/LayoutContext';
import Avatar from '../../../UI/Avatar/Avatar';
import { SidebarAccount } from '../../Sidebar/SidebarAccount';
import MainLayout from '../MainLayout';
import { SidebarMenuPlacement } from '../../Navigation/MainMenu';


const meta: Meta<typeof MainLayout> = {
    title: 'Page/Main layout',
    component: MainLayout,
    parameters: {
        layout: 'padded',
    },
    decorators: [
        (Story) => (
            <LayoutProvider>
                <MemoryRouter>
                    <SvgSprite />
                    <Story />
                </MemoryRouter>
            </LayoutProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof MainLayout>;



const accountDropdown = (
    <SidebarAccount
        dropdownHeader={{
            border: true,
            content: (
                <>
                    <span>Welkom &nbsp;</span>
                    <strong>Willem van Oranje</strong>
                </>
            ),
        }}
        dropdownToggle={{
            prefix: (<Avatar size={SizeDefinitions.Small} icon={IconDefinitions.user} iconDuotone={true} />)
        }}
        menuItems={[
            {
                label: 'Account',
                icon: (
                    <svg>
                        <use xlinkHref="#svg_icon_user" />
                    </svg>
                ),
            },
            {
                label: 'Instellingen',
                icon: (
                    <svg>
                        <use xlinkHref="#svg_icon_cog" />
                    </svg>
                ),
            },
            {
              divider: true
            },
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
        url: '#',
        iconName: IconDefinitions.cog,
        iconDuotone: true,
        placement: SidebarMenuPlacement.Bottom,
    },
];

const breadcrumbItems = [
    {
        label: 'home',
        href: '#',
    },
    {
        label: 'Declaraties',
        href: '#',
    },
    {
        label: 'Betrokkene',
        href: '#',
    },
];

export const Default: StoryFn = () => {
    return (
        <MainLayout
            accountMenu={accountDropdown}
            loading={false}
            menuItems={menuItems}
            currentMenuItem="home"
            pageTitle="Header title"
            breadcrumbItems={breadcrumbItems}
        />
    );
};
