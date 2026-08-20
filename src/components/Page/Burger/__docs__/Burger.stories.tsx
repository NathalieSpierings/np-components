import { Meta, StoryObj } from '@storybook/react-webpack5';
import Burger from '../Burger';

const meta = {
    component: Burger,
    title: 'Page/Burger',
} satisfies Meta<typeof Burger>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        hasSidebars: true,
    },
};

