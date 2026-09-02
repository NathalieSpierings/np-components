import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import ConfirmDialog from '../ConfirmDialog';
import React from 'react';
import { ConfirmDialogProvider, useConfirmDialog } from '../../../Providers/ConfirmDialogContext';
import { Button } from '../../Button';

const meta: Meta<typeof ConfirmDialog> = {
    title: 'UI kit/ConfirmDialog',
    component: ConfirmDialog,
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const DefaultInner = ({}) => {
    const { items, enqueue, dequeue } = useConfirmDialog();

    return <>
        <ConfirmDialog confirmDialogs={items} removeConfirmDialog={dequeue} />
        <Button onClick={() => enqueue({
            confirmLabel: 'Confirm',
            confirmAction: async () => {
                await delay(3000);
                console.log("Confirm action");
            },
            dismissLabel: 'Dismiss',
            titleContent: <h3>Title</h3>,
            message: "Message"
        })}>Open dialog</Button>
    </>;
}

export const Default: StoryFn = () => {

    return (
            <ConfirmDialogProvider>
                <DefaultInner />
            </ConfirmDialogProvider>
        );
};
