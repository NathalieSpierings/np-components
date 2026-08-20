import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ColorDefinitions } from '../../../../lib/utils/definitions';
import DividerSplitted from '../DividerSplitted';
import React from 'react';

const meta: Meta<typeof DividerSplitted> = {
    title: 'UI kit/DividerSplitted',
    component: DividerSplitted,
    decorators: [
        (Story) => (
            <div style={{ width: '100vw' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof DividerSplitted>;

export const Default: Story = {
    args: {
        label: '(default)',
    },
};

export const BorderColor: Story = {
    args: {
        label: '(default)',
        borderColor: ColorDefinitions.Primary
    },
};


export const TextColor: Story = {
    args: {
        label: '(default)',
        color: ColorDefinitions.Primary
    },
};