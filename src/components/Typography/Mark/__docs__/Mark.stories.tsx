import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Mark from '../Mark';

const meta: Meta<typeof Mark> = {
    title: 'Typography/Mark',
    component: Mark,
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof Mark>;

export const Default: Story = {
    args: {
        children: 'Eos nulla molestiae',
    },
};
