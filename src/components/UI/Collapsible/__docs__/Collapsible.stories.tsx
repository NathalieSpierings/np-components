import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import Collapsible from '../Collapsible';

const meta: Meta<typeof Collapsible> = {
    title: 'UI kit/Collapsible',
    component: Collapsible,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div style={{ width: '80vw' }}>
                <Story />
               
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: StoryFn = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <Collapsible title="Click me!" collapsed={open} setCollapsed={setOpen}>
            Content goes here...
        </Collapsible>
    );
};
