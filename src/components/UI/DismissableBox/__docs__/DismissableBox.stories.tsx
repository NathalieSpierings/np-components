import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import DismissableBox from '../DismissableBox';
import React, { useState } from 'react';

const meta: Meta<typeof DismissableBox> = {
    title: 'UI kit/Dismissable box',
    component: DismissableBox,
};

export default meta;
type Story = StoryObj<typeof DismissableBox>;


export const Default: StoryFn = (args) => {
    const [open, setOpen] = useState(true);

    return (
        <DismissableBox isOpen={open} onClose={() => setOpen(false)}>
            I am dismissable box content.
        </DismissableBox>
    );
};
