import React from 'react';
import type { Meta, StoryObj, StoryFn } from '@storybook/react-webpack5';
import Breadcrumb from '../Breadcrumb';
import { MemoryRouter } from 'react-router';


const meta: Meta<typeof Breadcrumb> = {
    title: 'Navigation/Breadcrumbs',
    component: Breadcrumb,
    parameters: {
        layout: 'centered',
    },
     decorators: [
        (Story) => (
            <MemoryRouter>
                <div style={{ width: '40vw' }}>
                    <Story />
                </div>
            </MemoryRouter>

        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: StoryFn = () => {
    return (
        <Breadcrumb
            items={[
                {
                    label: 'home',
                    href: '#',
                },
                {
                    label: 'organisations',
                    href: '#',
                },
                {
                    label: 'employees',
                    href: '#',
                },
                {
                    label: 'John Do',
                    href: '',
                },
            ]}
        />
    );
};
