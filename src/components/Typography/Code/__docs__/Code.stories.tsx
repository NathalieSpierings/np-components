import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Code from '../Code';

const meta: Meta<typeof Code> = {
    title: 'Typography/Code',
    component: Code,
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof Code>;

export const Default: Story = {
    args: {
        label: 'The length() method on a String object contains the length of the string. It can also serve as a character counter.',
    },
};
