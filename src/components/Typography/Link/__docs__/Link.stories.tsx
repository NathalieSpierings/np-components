import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { ColorDefinitions } from '../../../../lib/utils/definitions';
import Link from '../Link';
import React from 'react';

const meta: Meta<typeof Link> = {
    title: 'Typography/Link',
    component: Link,
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: StoryFn = () => {
    return (
        <Link label="My link" variant="default" href="#" />
    );
};

export const Hover: StoryFn = () => {
    return <Link label="My link" variant="hover" href="javascript:" />;
};
export const HoverColor: StoryFn = () => {
    return <Link label="My link" variant="hover" href="javascript:" accentColor={ColorDefinitions.Primary} />;
};

export const PartlyUnderlined: StoryFn = () => {
    return <Link label="My link" variant="underlined" href="javascript:" />;
};

export const PartlyUnderlinedColored: StoryFn = () => {
    return <Link label="My link" variant="underlined" href="javascript:" accentColor={ColorDefinitions.Primary} />;
};

export const Flat: StoryFn = () => {
    return (
        <Link label="My link" variant="flat" href="javascript:" />
    );
};

export const FlatColored: StoryFn = () => {
    return (
        <Link
            label="My link"
            variant="flat"
            color={ColorDefinitions.Primary}
            rippleColor={ColorDefinitions.Primary}
            href="javascript:"
        />
    );
};
