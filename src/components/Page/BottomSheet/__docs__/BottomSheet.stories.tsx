import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import BottomSheet from '../BottomSheet';
import Button from '../../../UI/Button/Button';

const meta: Meta<typeof BottomSheet> = {
    title: 'UI kit/Bottom sheet',
    component: BottomSheet,
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

export const Default: StoryFn = (args) => {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <Button onClick={() => setOpen(!open)}>Click me!</Button>
            <BottomSheet open={open} openBottomSheet={setOpen}>
                Content goes here...
            </BottomSheet>
        </>
    );
};
