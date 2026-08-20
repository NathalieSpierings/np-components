import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import ConfirmDialog from '../ConfirmDialog';
import React from 'react';

const meta: Meta<typeof ConfirmDialog> = {
    title: 'UI kit/ConfirmDialog',
    component: ConfirmDialog,
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

export const Default: StoryFn = () => {
    return <> </>;
};
