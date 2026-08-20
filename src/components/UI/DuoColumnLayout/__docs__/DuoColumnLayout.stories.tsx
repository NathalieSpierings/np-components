import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { ColorDefinitions } from '../../../../lib/utils/definitions';
import DuoColumn from '../DuoColumn';
import DuoColumnLayout from '../DuoColumnLayout';
import React from 'react';

const meta: Meta<typeof DuoColumnLayout> = {
    title: 'Layout/Duo column',
    component: DuoColumnLayout,
};

export default meta;
type Story = StoryObj<typeof DuoColumnLayout>;

export const Default: StoryFn = () => {
    return (
        <DuoColumnLayout>
            <DuoColumn>
                <p>Left content.</p>
            </DuoColumn>
            <DuoColumn>
                <p>Right content.</p>
            </DuoColumn>
        </DuoColumnLayout>
    );
};

export const Gap: StoryFn = () => {
    return (
        <DuoColumnLayout gap="2rem">
            <DuoColumn>
                <p>Left content.</p>
            </DuoColumn>
            <DuoColumn>
                <p>Right content.</p>
            </DuoColumn>
        </DuoColumnLayout>
    );
};

export const ColumnDivider: StoryFn = () => {
    return (
        <DuoColumnLayout columnDivider={true}>
            <DuoColumn background={ColorDefinitions.Theme100}>
                <p>Left content.</p>
            </DuoColumn>
            <DuoColumn background={ColorDefinitions.Theme100}>
                <p>Right content.</p>
            </DuoColumn>
        </DuoColumnLayout>
    );
};

export const Background: StoryFn = () => {
    return (
        <DuoColumnLayout>
            <DuoColumn>
                <p>Left content.</p>
            </DuoColumn>
            <DuoColumn background={ColorDefinitions.Theme100}>
                <p>Right content.</p>
            </DuoColumn>
        </DuoColumnLayout>
    );
};
