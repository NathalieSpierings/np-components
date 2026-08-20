import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { MemoryRouter } from 'react-router';
import { SvgSprite } from '../../../../../assets/SvgSprite';
import { IconDefinitions } from '../../../../../lib/utils/definitions';
import Menu, { SidebarMenuPlacement } from '../MainMenu';
import React from 'react';

const meta: Meta<typeof Menu> = {
    title: 'Navigation/MainMenu',
    component: Menu,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <MemoryRouter>
                <div style={{ width: '40vw' }}>
                    <SvgSprite />
                    <Story />
                </div>
            </MemoryRouter>

        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Menu>;

const menuItems = [
    {
        id: '1',
        title: 'Home',
        tooltip: 'Home',
        iconName: IconDefinitions.home,
        url: '#',
        placement: SidebarMenuPlacement.Top,
    },
    {
        id: '2',
        title: 'Settings',
        tooltip: 'Settings',
        iconName: IconDefinitions.cog,
        active: true,
        url: '#',
        placement: SidebarMenuPlacement.Top,
    },
];

export const Default: Story = {
    args: {
        menuItems: menuItems,
    },
};
