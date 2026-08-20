import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Small from '../Small';

const meta: Meta<typeof Small> = {
    title: 'Typography/Small',
    component: Small,
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof Small>;

export const Default: Story = {
    args: {
        children: "I'm a small text",
    },
};

export const Muted: Story = {
    args: {
        children: "I'm a small text",
        mute: true,
    },
};
