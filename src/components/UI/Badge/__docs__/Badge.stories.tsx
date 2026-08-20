import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import styled from 'styled-components';
import { ColorDefinitions, SizeDefinitions } from '../../../../lib/utils/definitions';
import Badge from '../Badge';
import React from 'react';

const meta: Meta<typeof Badge> = {
    title: 'UI kit/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof Badge>;

const Grid = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const Default: StoryFn = (args) => {
    return (
        <Grid>
            <Badge>default</Badge>
            <Badge background={ColorDefinitions.Primary}>default</Badge>
            <Badge background={ColorDefinitions.Secondary}>default</Badge>
            <Badge background={ColorDefinitions.Olive}>default</Badge>
            <Badge background={ColorDefinitions.Blue}>default</Badge>
            <Badge background={ColorDefinitions.Purple}>default</Badge>
            <Badge background={ColorDefinitions.Pink}>default</Badge>
        </Grid>
    );
};

export const Outline: StoryFn = (args) => {
    return (
        <Grid>
            <Badge type="outline">outline</Badge>
            <Badge type="outline" background={ColorDefinitions.Primary}>
                outline
            </Badge>
            <Badge type="outline" background={ColorDefinitions.Secondary}>
                outline
            </Badge>
            <Badge type="outline" background={ColorDefinitions.Olive}>
                outline
            </Badge>
            <Badge type="outline" background={ColorDefinitions.Blue}>
                outline
            </Badge>
            <Badge type="outline" background={ColorDefinitions.Purple}>
                outline
            </Badge>
            <Badge type="outline" background={ColorDefinitions.Pink}>
                outline
            </Badge>
        </Grid>
    );
};

export const Circle: StoryFn = (args) => {
    return (
        <Grid>
            <Badge variant="circle">1</Badge>
            <Badge variant="circle" background={ColorDefinitions.Primary}>
                1
            </Badge>
            <Badge variant="circle" background={ColorDefinitions.Secondary}>
                1
            </Badge>
            <Badge variant="circle" background={ColorDefinitions.Olive}>
                1
            </Badge>
            <Badge variant="circle" background={ColorDefinitions.Blue}>
                1
            </Badge>
            <Badge variant="circle" background={ColorDefinitions.Purple}>
                1
            </Badge>
            <Badge variant="circle" background={ColorDefinitions.Pink}>
                1
            </Badge>
        </Grid>
    );
};

export const Square: StoryFn = (args) => {
    return (
        <Grid>
            <Badge variant="square">circle</Badge>
            <Badge variant="square" background={ColorDefinitions.Primary}>
                circle
            </Badge>
            <Badge variant="square" background={ColorDefinitions.Secondary}>
                circle
            </Badge>
            <Badge variant="square" background={ColorDefinitions.Olive}>
                circle
            </Badge>
            <Badge variant="square" background={ColorDefinitions.Blue}>
                circle
            </Badge>
            <Badge variant="square" background={ColorDefinitions.Purple}>
                circle
            </Badge>
            <Badge variant="square" background={ColorDefinitions.Pink}>
                circle
            </Badge>
        </Grid>
    );
};

export const Rounded: StoryFn = (args) => {
    return (
        <Grid>
            <Badge rounded={SizeDefinitions.ExtraLarge}>circle</Badge>
            <Badge rounded={SizeDefinitions.ExtraLarge} background={ColorDefinitions.Primary}>
                circle
            </Badge>
            <Badge rounded={SizeDefinitions.ExtraLarge} background={ColorDefinitions.Secondary}>
                circle
            </Badge>
            <Badge rounded={SizeDefinitions.ExtraLarge} background={ColorDefinitions.Olive}>
                circle
            </Badge>
            <Badge rounded={SizeDefinitions.ExtraLarge} background={ColorDefinitions.Blue}>
                circle
            </Badge>
            <Badge rounded={SizeDefinitions.ExtraLarge} background={ColorDefinitions.Purple}>
                circle
            </Badge>
            <Badge rounded={SizeDefinitions.ExtraLarge} background={ColorDefinitions.Pink}>
                circle
            </Badge>
        </Grid>
    );
};

export const Shadow: StoryFn = (args) => {
    return (
        <Grid>
            <Badge shadowColor={ColorDefinitions.Theme900}>circle</Badge>
            <Badge shadowColor={ColorDefinitions.Primary} background={ColorDefinitions.Primary}>
                circle
            </Badge>
            <Badge shadowColor={ColorDefinitions.Secondary} background={ColorDefinitions.Secondary}>
                circle
            </Badge>
            <Badge shadowColor={ColorDefinitions.Olive} background={ColorDefinitions.Olive}>
                circle
            </Badge>
            <Badge shadowColor={ColorDefinitions.Olive} background={ColorDefinitions.Olive}>
                circle
            </Badge>
            <Badge shadowColor={ColorDefinitions.Olive} background={ColorDefinitions.Olive}>
                circle
            </Badge>
        </Grid>
    );
};

export const Sizes: StoryFn = () => {
    return (
        <>
            <Grid>
                <Badge size={SizeDefinitions.Tiny} background={ColorDefinitions.Primary}>
                    999+
                </Badge>
                <Badge size={SizeDefinitions.ExtraSmall} background={ColorDefinitions.Secondary}>
                    999+
                </Badge>
                <Badge size={SizeDefinitions.Small} background={ColorDefinitions.Purple}>
                    999+
                </Badge>
                <Badge size={SizeDefinitions.Medium} background={ColorDefinitions.Green}>
                    999+
                </Badge>
                <Badge size={SizeDefinitions.Large} background={ColorDefinitions.Pink}>
                    999+
                </Badge>
                <Badge size={SizeDefinitions.ExtraLarge} background={ColorDefinitions.Blue}>
                    999+
                </Badge>
                <Badge size={SizeDefinitions.ExtraLarge2} background={ColorDefinitions.Mulberry}>
                    999+
                </Badge>
                <Badge size={SizeDefinitions.ExtraLarge3} background={ColorDefinitions.Olive}>
                    999+
                </Badge>
            </Grid>

            <Grid>
                <Badge variant="circle" size={SizeDefinitions.Tiny} background={ColorDefinitions.Primary}>
                    9
                </Badge>
                <Badge variant="circle" size={SizeDefinitions.ExtraSmall} background={ColorDefinitions.Secondary}>
                    9
                </Badge>
                <Badge variant="circle" size={SizeDefinitions.Small} background={ColorDefinitions.Purple}>
                    9
                </Badge>
                <Badge variant="circle" size={SizeDefinitions.Medium} background={ColorDefinitions.Green}>
                    9
                </Badge>
                <Badge variant="circle" size={SizeDefinitions.Large} background={ColorDefinitions.Pink}>
                    9
                </Badge>
                <Badge variant="circle" size={SizeDefinitions.ExtraLarge} background={ColorDefinitions.Blue}>
                    9
                </Badge>
                <Badge variant="circle" size={SizeDefinitions.ExtraLarge2} background={ColorDefinitions.Mulberry}>
                    9
                </Badge>
                <Badge variant="circle" size={SizeDefinitions.ExtraLarge3} background={ColorDefinitions.Olive}>
                    9
                </Badge>
            </Grid>

            <Grid>
                <Badge variant="square" size={SizeDefinitions.Tiny} background={ColorDefinitions.Primary}>
                    999+
                </Badge>
                <Badge variant="square" size={SizeDefinitions.ExtraSmall} background={ColorDefinitions.Secondary}>
                    999+
                </Badge>
                <Badge variant="square" size={SizeDefinitions.Small} background={ColorDefinitions.Purple}>
                    999+
                </Badge>
                <Badge variant="square" size={SizeDefinitions.Medium} background={ColorDefinitions.Green}>
                    999+
                </Badge>
                <Badge variant="square" size={SizeDefinitions.Large} background={ColorDefinitions.Pink}>
                    999+
                </Badge>
                <Badge variant="square" size={SizeDefinitions.ExtraLarge} background={ColorDefinitions.Blue}>
                    999+
                </Badge>
                <Badge variant="square" size={SizeDefinitions.ExtraLarge2} background={ColorDefinitions.Mulberry}>
                    999+
                </Badge>
                <Badge variant="square" size={SizeDefinitions.ExtraLarge3} background={ColorDefinitions.Olive}>
                    999+
                </Badge>
            </Grid>
        </>
    );
};
