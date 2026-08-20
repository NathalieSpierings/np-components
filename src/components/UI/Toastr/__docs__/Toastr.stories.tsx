import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import Toastr, { ToastrPosition } from '../Toastr';
import React from 'react';
import { ToastrProvider, useToastr } from '../../../Providers/ToastrContext/ToastrContext';
import Button from '../../Button/Button';
import { ColorDefinitions } from '../../../../lib/utils/definitions';
import { LayoutProvider } from '../../..';
import { MemoryRouter } from 'react-router';
import { SvgSprite } from '../../../../assets/SvgSprite';

const meta: Meta<typeof Toastr> = {
    title: 'UI kit/Toastr',
    component: Toastr,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (           
                <LayoutProvider>
                    <ToastrProvider>
                     
                            <MemoryRouter>
                                <TemplateToastr />
                                 <SvgSprite />
                                  <Story />
                            </MemoryRouter>                      
                    </ToastrProvider>
                </LayoutProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Toastr>;


const TemplateToastr = () => {
    const { toasts, dequeue } = useToastr();

    return (
        <Toastr
            duration={15000}
            toasts={toasts}
            removeToastrItem={dequeue}
        />
    );
}


const Toast = ({
    message = "Dit is een bericht",
    variant,
    position,
    background
}: {
    message?: string;
    variant?: "positive" | "negative" | "informational" | "warning";
    position?: ToastrPosition;
    background?: ColorDefinitions;
}) => {
    const { enqueue } = useToastr();

    return (
        <Button
            onClick={() => enqueue({ message, variant, position, background })}
        >
            Show toastr
        </Button>
    );
};




export const Default: StoryFn = () => {
    return (
        <Toast message="Dit is een bericht" />
    )
};

export const Positive: StoryFn = () => {
    return (
        <Toast message="Dit is een bericht" variant="positive" />
    )
};

export const Negative: StoryFn = () => {
    return (
        <Toast message="Dit is een bericht" variant="negative" />
    )
};

export const Informational: StoryFn = () => {
    return (
        <Toast message="Dit is een bericht" variant="informational" />
    )
};

export const Warning: StoryFn = () => {
    return (
        <Toast message="Dit is een bericht" variant="warning" />
    )
};


export const Background: StoryFn = () => {
    return (
        <Toast message="Dit is een bericht" background={ColorDefinitions.Purple} />
    )
};

export const TopLeft: StoryFn = () => {
    return (
        <Toast message="Dit is een bericht" position="top-left" />
    )
};

export const TopCenter: StoryFn = () => {
    return (
        <Toast message="Dit is een bericht" position="top-center" />
    )
};


export const TopRight: StoryFn = () => {
    return (
        <Toast message="Dit is een bericht" position="top-right" />
    )
};


export const TopFull: StoryFn = () => {
    return (
        <Toast message="Dit is een bericht" position="top-full" />
    )
};



export const BottomLeft: StoryFn = () => {
    return (
        <Toast message="Dit is een bericht" position="bottom-left" />
    )
};

export const BottomCenter: StoryFn = () => {
    return (
        <Toast message="Dit is een bericht" position="bottom-center" />
    )
};


export const BottomRight: StoryFn = () => {
    return (
        <Toast message="Dit is een bericht" position="bottom-right" />
    )
};


export const BottomFull: StoryFn = () => {
    return (
        <Toast message="Dit is een bericht" position="bottom-full" />
    )
};