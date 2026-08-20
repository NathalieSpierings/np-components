import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import Logo from '../Logo';
import React from 'react';

const meta: Meta<typeof Logo> = {
    title: 'Page/Logo',
    component: Logo,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: StoryFn = () => {
    return (
       <Logo />
    );
};
