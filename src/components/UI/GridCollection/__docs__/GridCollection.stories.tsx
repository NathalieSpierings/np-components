import type { Meta, StoryObj } from '@storybook/react-webpack5';
import GridCollection from '../GridCollection';
import React from 'react';

const meta: Meta<typeof GridCollection> = {
    title: 'UI kit/GridCollection',
    component: GridCollection,
    decorators: [
        (Story) => (
            <div style={{ width: '100vw' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof GridCollection>;

export const Default: Story = {
    args: {
        children: <span>Lorem ipsum</span>,
    },
};


export const List: Story = {
    args: {
        view: 'list',
    },
};


export const TwoColumns: Story = {
    args: {
        view: 'columns-2',
    },
};


export const ThreeColumns: Story = {
    args: {
        view: 'columns-3',
    },
};

export const FourColumns: Story = {
    args: {
        view: 'columns-4',
    },
};
