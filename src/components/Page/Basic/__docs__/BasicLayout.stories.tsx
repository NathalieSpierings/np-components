import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';

import { LayoutProvider } from '../../../Providers/LayoutContext/LayoutContext';
import BasicLayout from '../BasicLayout';
import React from 'react';
import { SvgSprite } from '../../../../assets/SvgSprite';
import { MemoryRouter } from 'react-router';

const meta: Meta<typeof BasicLayout> = {
    title: 'Page/Basic layout',
    component: BasicLayout,
    parameters: {
        layout: 'fullscreen',
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
type Story = StoryObj<typeof BasicLayout>;



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
        <BasicLayout
            loading={false}
            pageTitle='My page title'
            breadcrumbItems={breadcrumbItems}
        />
    );
};
