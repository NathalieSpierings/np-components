import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { ColorDefinitions, SizeDefinitions } from '../../../../lib/utils/definitions';
import Fieldset from '../Fieldset';
import React from 'react';

const meta: Meta<typeof Fieldset> = {
    title: 'Typography/Fieldset',
    component: Fieldset,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div style={{ width: '50vw' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

export const Default: StoryFn = () => {
    return (
        <Fieldset>
            <i>I can be used as an alinea.</i> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Fieldset>
    );
};

export const FieldsetWithBorder: StoryFn = () => {
    return (
        <Fieldset borderColor={ColorDefinitions.Surface}>
            <i>I can be used as an alinea of text with the legend as title.</i> Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Fieldset>
    );
};

export const FieldsetWithBorderAndRoundedCorners: StoryFn = () => {
    return (
        <Fieldset borderColor={ColorDefinitions.Surface} rounded={SizeDefinitions.ExtraLarge3}>
            <i>I can be used as an alinea of text.</i> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat.
        </Fieldset>
    );
};

export const FieldsetColored: StoryFn = () => {
    return (
        <div className="grid2">
            <Fieldset background={ColorDefinitions.Olive}>
                <i>I can be used as an alinea of text.</i> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
            </Fieldset>
            <Fieldset background={ColorDefinitions.Blue} rounded={SizeDefinitions.ExtraLarge}>
                <i>I can be used as an alinea of text with the legend as title.</i> Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Fieldset>
        </div>
    );
};

export const WithLegend: StoryFn = () => {
    return (
        <Fieldset legend="Legend">
            <i>I can be used as an alinea with the legend as title.</i> Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Fieldset>
    );
};

export const WithLegendAndBorder: StoryFn = () => {
    return (
        <Fieldset borderColor={ColorDefinitions.Surface} legend="Legend">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
        </Fieldset>
    );
};

export const WithLegendAndRoundedCorners: StoryFn = () => {
    return (
        <Fieldset borderColor={ColorDefinitions.Surface} legend="Legend" rounded={SizeDefinitions.ExtraLarge2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
        </Fieldset>
    );
};

export const WithLegendBorder: StoryFn = () => {
    return (
        <Fieldset legendBorderColor={ColorDefinitions.Surface} legend="Legend">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
        </Fieldset>
    );
};



export const WithCustomCss: StoryFn = () => {
    return (
        <Fieldset fieldsetCss='mt4' legend="Legend">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
        </Fieldset>
    );
};
