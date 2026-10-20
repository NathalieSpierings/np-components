import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ColorDefinitions } from '../../../../lib/utils/definitions';
import Divider from '../Divider';

const meta: Meta<typeof Divider> = {
    title: 'UI kit/Divider',
    component: Divider,
    decorators: [
        (Story) => (
            <div style={{ width: '100vw' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
    args: {
        className: ''
    },
};

export const BorderColor: Story = {
    args: {
        color: ColorDefinitions.Primary,
        className: ''
    },
};
