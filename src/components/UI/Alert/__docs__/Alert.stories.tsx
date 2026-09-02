import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { SvgSprite } from '../../../../assets/SvgSprite';
import Alert from '../Alert';
import React from 'react';

const meta: Meta<typeof Alert> = {
    title: 'UI kit/Alert',
    component: Alert,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div style={{ width: '40vw' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: StoryFn = () => {
    return (
        <Alert shown={true}>
                <p>
                    {' '}
                    This is an default message. <button type="button" className="link action-link ">More Info.</button>
                </p>
            </Alert>
    );
};

export const Informational: StoryFn = () => {
    return (
        <Alert shown={true} variant="informational">
                <p>
                    {' '}
                    This is an informational message. <button type="button" className="link action-link">More Info.</button>
                </p>
            </Alert>
    );
};

export const Positive: StoryFn = () => {
    return (
        <Alert shown={true} variant="positive">
                <p>
                    {' '}
                    This is an positive message. <button type="button" className="link action-link">More Info.</button>
                </p>
            </Alert>
    );
};

export const Negative: StoryFn = () => {
    return (
       <Alert shown={true} variant="negative">
                <p>
                    {' '}
                    This is an negative message. <button type="button" className="link action-link">More Info.</button>
                </p>
            </Alert>
    );
};

export const Warning: StoryFn = () => {
    return (
       <Alert shown={true} variant="warning">
                <p>
                    {' '}
                    This is an warning message. <button type="button" className="link action-link">More Info.</button>
                </p>
            </Alert>
    );
};

export const Sticky: Story = {
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        shown: true,
        sticky: true,
        variant: 'negative',
        children: (
            <p>
                {' '}
                This is an sticky message. <button type="button" className="link action-link">More Info.</button>
            </p>
        ),
    },
};
