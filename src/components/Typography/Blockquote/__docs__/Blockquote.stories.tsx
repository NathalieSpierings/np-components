import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Blockquote from '../Blockquote';

const meta: Meta<typeof Blockquote> = {
    title: 'Typography/Blockquote',
    component: Blockquote,
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof Blockquote>;

export const Default: Story = {
    args: {
        text: 'Blockquote lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porttitor mauris quis pulvinar ultrices.',
        citeText: 'Firstname Lastname',
    },
};
