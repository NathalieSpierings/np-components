import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Quotation from '../Quotation';

const meta: Meta<typeof Quotation> = {
    title: 'Typography/Quotation',
    component: Quotation,
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof Quotation>;

export const Default: Story = {
    args: {
        text: 'Scientists are considering whether the Earth has entered an entirely new geological epoch: the Anthropocene, or the age of humans.',
    },
};
