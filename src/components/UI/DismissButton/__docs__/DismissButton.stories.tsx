import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import styled from 'styled-components';
import { ColorDefinitions, SizeDefinitions } from '../../../../lib/utils/definitions';
import DismissButton from '../DismissButton';
import React from 'react';

const meta: Meta<typeof DismissButton> = {
    title: 'UI kit/DismissButton',
    component: DismissButton,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div className="shown">
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof DismissButton>;

const Grid = styled.div`
    display: flex;
    gap: 1rem;
`;

export const Default: StoryFn = (args) => {
    return (
        <Grid>
            <DismissButton label="sluiten" labelPosition="left" onClick={() => console.log('clicked dismiss')} />
            <DismissButton />
            <DismissButton label="sluiten" labelPosition="right" onClick={() => console.log('clicked dismiss')} />
        </Grid>
    );
};

export const Circle: StoryFn = (args) => {
    return (
        <Grid>
            <DismissButton
                circle={true}
                label="sluiten"
                labelPosition="left"
                onClick={() => console.log('clicked dismiss')}
            />
            <DismissButton circle={true} />
            <DismissButton
                circle={true}
                label="sluiten"
                labelPosition="right"
                onClick={() => console.log('clicked dismiss')}
            />
        </Grid>
    );
};

export const Background: StoryFn = (args) => {
    return (
        <Grid>
            <DismissButton
                circle={true}
                background={ColorDefinitions.Blue}
                label="sluiten"
                labelPosition="left"
                onClick={() => console.log('clicked dismiss')}
            />
            <DismissButton circle={true} background={ColorDefinitions.Blue} />
            <DismissButton
                circle={true}
                background={ColorDefinitions.Blue}
                label="sluiten"
                labelPosition="right"
                onClick={() => console.log('clicked dismiss')}
            />
        </Grid>
    );
};

export const DefaultRight: Story = {
    args: {
        right: true,
        onClick: () => console.log('clicked dismiss'),
    },
};

export const InsideToastr: StoryFn = () => {
    return (
        <div className="toastr toastr-negative toastr--bottom-center">
            <div>
                <div className="toastr__container bg-rose-30 shown move-up-enter-done">
                    <div className="toastr__message">Toastr message</div>
                    <DismissButton
                        circle={true}
                        background={ColorDefinitions.Rose}
                        size={SizeDefinitions.Small}
                        right={true}
                    />
                </div>
            </div>
        </div>
    );
};
