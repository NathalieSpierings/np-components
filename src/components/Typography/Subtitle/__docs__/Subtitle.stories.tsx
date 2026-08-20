import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Subtitle from '../Subtitle';

const meta: Meta<typeof Subtitle> = {
    title: 'Typography/Subtitle',
    component: Subtitle,
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof Subtitle>;

export const Default: Story = {
    args: {
        children: "I'm a subtitle",
    },
};

export const Muted: Story = {
    args: {
        children: "I'm a subtitle",
        mute: true,
    },
};
