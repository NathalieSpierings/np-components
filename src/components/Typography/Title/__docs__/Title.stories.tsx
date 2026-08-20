import { Meta, StoryObj } from '@storybook/react-webpack5';
import Title from '../Title';

const meta = {
    component: Title,
    title: 'Typography/Title',
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        muted: false,
        children: 'This is a title',
    },
};


export const Muted: Story = {
    args: {
        muted: true,
        children: 'This is a title',
    },
};
