import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Paragraph from '../Paragraph';

const meta: Meta<typeof Paragraph> = {
    title: 'Typography/Paragraph',
    component: Paragraph,
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof Paragraph>;

export const Default: Story = {
    args: {
        tabIndex: 1,
        children:
            'Large paragraph lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porttitor mauris quis pulvinar ultrices. Quisque eget placerat odio, vel viverra ipsum. Sed pharetra varius dignissim. Cras varius luctus est sit amet sollicitudin. Donec eget dui eget nulla luctus ultrices. Sed eu turpis quam. Nulla facilisi.',
    },
};
