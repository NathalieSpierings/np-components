import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Caption from '../Caption';

const meta: Meta<typeof Caption> = {
    title: 'Typography/Caption',
    component: Caption,
};

export default meta;
type Story = StoryObj<typeof Caption>;

export const Default: Story = {
    args: {
        children: "I'm a caption",
    },
};

export const Muted: Story = {
    args: {
        children: "I'm a caption",
        mute: true,
    },
};
