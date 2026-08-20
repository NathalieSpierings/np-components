import type { Meta, StoryObj } from '@storybook/react-webpack5';
import DescriptionList from '../DescriptionList';

const meta: Meta<typeof DescriptionList> = {
    title: 'Typography/DescriptionList',
    component: DescriptionList,
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof DescriptionList>;

const items = [
    {
        label: 'Name',
        content: 'Jan Janssen',
    },
    {
        label: 'E-mail',
        content: 'jan.janssen@example.com',
    },
    {
        label: 'Organization',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
];

export const Default: Story = {
    args: {
        data: items,
    },
};

export const Colon: Story = {
    args: {
        data: items,
        enableColon: true,
    },
};


export const CustomSpacing: Story = {
    args: {
        data: items,
        columnGap: "5rem",
        rowGap: "3rem",
    },
};
