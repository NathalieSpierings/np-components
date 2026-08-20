import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Heading from '../Heading';

const meta: Meta<typeof Heading> = {
    title: 'Typography/Heading',
    component: Heading,
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {
    args: {
        variant: 'h1',
        children: "I'm a heading",
    },
};

export const H1: Story = {
    args: {
        variant: 'h1',
        children: "I'm a heading",
    },
};

export const H2: Story = {
    args: {
        variant: 'h2',
        children: "I'm a heading",
    },
};

export const H3: Story = {
    args: {
        variant: 'h3',
        children: "I'm a heading",
    },
};

export const H4: Story = {
    args: {
        variant: 'h4',
        children: "I'm a heading",
    },
};

export const H5: Story = {
    args: {
        variant: 'h5',
        children: "I'm a heading",
    },
};

export const H6: Story = {
    args: {
        variant: 'h6',
        children: "I'm a heading",
    },
};
