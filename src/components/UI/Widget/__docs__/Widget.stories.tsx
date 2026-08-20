import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import ArtIgo from '../../../Base/Art/ArtIgo';
import Widget from '../Widget';

const meta: Meta<typeof Widget> = {
    title: 'UI kit/Widget',
    component: Widget,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof Widget>;

export const Default: StoryFn = () => {
    return (
        <Widget>Content goes here...</Widget>
    );
};

export const Image: StoryFn = () => {
    return <Widget image={<ArtIgo />}>Content goes here...</Widget>;
};

export const Horizontal: StoryFn = () => {
    return (
        <Widget image={<ArtIgo />} horizontal={true}>
            Content goes here...
        </Widget>
    );
};

export const WithContent: StoryFn = () => {
    return <Widget widgetPostfix={<span>Action</span>} widgetContent={<p> Content goes here...</p>} />;
};

export const WithContentAndImage: StoryFn = () => {
    return (
        <Widget image={<ArtIgo />} widgetPostfix={<span>Action</span>} widgetContent={<p> Content goes here...</p>} />
    );
};

export const WithContentAndHorizontal: StoryFn = () => {
    return (
        <Widget
            horizontal={true}
            image={<ArtIgo />}
            widgetPostfix={<span>Action</span>}
            widgetContent={<p>Content goes here...</p>}
        />
    );
};


export const WithContentItem: StoryFn = () => {
    return (
        <Widget
            widgetPrefix={<span>Action</span>}
            widgetPostfix={<span>Action</span>}
            widgetContent={<p>Content goes here...</p>}
        />
    );
};
