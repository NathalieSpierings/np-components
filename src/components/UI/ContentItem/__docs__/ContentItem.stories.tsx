import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { IconDefinitions } from '../../../../lib/utils/definitions';
import Subtitle from '../../../Typography/Subtitle/Subtitle';
import Title from '../../../Typography/Title/Title';
import { Icon } from '../../Icons/Icon';
import ContentItem from '../ContentItem';


const meta: Meta<typeof ContentItem> = {
    title: 'Layout/Content item',
    component: ContentItem,
    parameters: {
        layout: 'padded',
    },
};

export default meta;
type Story = StoryObj<typeof ContentItem>;

export const Default: StoryFn = () => {
    return (
        <ContentItem item={{
            id: '1',
            prefix: <Icon icon={IconDefinitions.bin} />,
            content: <p>Content goes here</p>,
            postfix: <Icon icon={IconDefinitions.bin} />,
        }} />
    )
};


export const Separator: StoryFn = () => {
    return (
        <ContentItem item={{
            id: '1',
            prefix: <Icon icon={IconDefinitions.bin} />,
            separatorAfterPrefix: true,
            separatorAfterMeta: true,
            content: <Title>Content goes here</Title>,
            postfix: <Icon icon={IconDefinitions.bin} />,
        }} />
    )
};


export const PrefixOnly: StoryFn = () => {
    return (
        <ContentItem item={{
            id: '1',
            prefix: <Icon icon={IconDefinitions.bin} />,
        }} />
    )
};

export const MetaOnly: StoryFn = () => {
    return (
        <ContentItem item={{
            id: '1',
            content: <h4>Content goes here</h4>,
        }} />
    )
};

export const PostfixOnly: StoryFn = () => {
    return (
        <ContentItem item={{
            id: '1',
            postfix: <Icon icon={IconDefinitions.bin} />,
        }} />
    )
};

export const PrefixAndMeta: StoryFn = () => {
    return (
        <ContentItem item={{
            id: '1',
            prefix: <Icon icon={IconDefinitions.bin} />,
            content: <h4>Content goes here</h4>,
        }} />
    )
};

export const PostfixAndMeta: StoryFn = () => {
    return (
        <ContentItem item={{
            id: '1',
            postfix: <Icon icon={IconDefinitions.bin} />,
            content: <h4>Content goes here</h4>,
        }} />
    )
};


export const PrefixItemPositionStart: StoryFn = () => {
    return (
        <ContentItem item={{
            id: '1',
            prefix: <Icon icon={IconDefinitions.bin} />,
            prefixItemPosition: 'item-start',
            content: <Title>Content goes here</Title>,
            postfix: <Icon icon={IconDefinitions.bin} />,
        }} />
    )
};
export const PrefixItemPositionCenter: StoryFn = () => {
    return (
        <ContentItem item={{
            id: '1',
            prefix: <Icon icon={IconDefinitions.bin} />,
            prefixItemPosition: 'item-center',
            content: <Title>Content goes here</Title>,
            postfix: <Icon icon={IconDefinitions.bin} />,
        }} />
    )
};

export const PrefixItemPositionEnd: StoryFn = () => {
    return (
        <ContentItem item={{
            id: '1',
            prefix: <Icon icon={IconDefinitions.bin} />,
            prefixItemPosition: 'item-end',
            content: <Title>Content goes here</Title>,
            postfix: <Icon icon={IconDefinitions.bin} />,
        }} />
    )
};


export const MetaItemPositionStart: StoryFn = () => {
    return (
        <ContentItem item={{
            id: '1',
            prefix: <Icon icon={IconDefinitions.bin} />,
            contentItemPosition: 'item-start',
            content: (
                <>
                    <Title>Title</Title>
                    <Subtitle>Subtitle</Subtitle>
                </>
            ),
            postfix: <Icon icon={IconDefinitions.bin} />,
        }} />
    )
};
export const MetaItemPositionCenter: StoryFn = () => {
    return (
        <ContentItem item={{
            id: '1',
            prefix: <Icon icon={IconDefinitions.bin} />,
            contentItemPosition: 'item-center',
            content: (
                <>
                    <Title>Title</Title>
                    <Subtitle>Subtitle</Subtitle>
                </>
            ),
            postfix: <Icon icon={IconDefinitions.bin} />,
        }} />
    )
};

export const MetaItemPositionEnd: StoryFn = () => {
    return (
        <ContentItem item={{
            id: '1',
            prefix: <Icon icon={IconDefinitions.bin} />,
            contentItemPosition: 'item-end',
            content: (
                <>
                    <Title>Title</Title>
                    <Subtitle>Subtitle</Subtitle>
                </>
            ),
            postfix: <Icon icon={IconDefinitions.bin} />,
        }} />
    )
};


export const MetaJustifyPositionStart: StoryFn = () => {
    return (
        <ContentItem item={{
            id: '1',
            prefix: <Title>Action</Title>,
            contentJustifyPosition: 'justify-start',
            content: <p>Content goes here</p>,
            postfix: <Icon icon={IconDefinitions.bin} />,
        }} />
    )
};
export const MetaJustifyPositionCenter: StoryFn = () => {
    return (
        <ContentItem item={{
            id: '1',
            prefix: <Title>Action</Title>,
            contentJustifyPosition: 'justify-center',
           content: <p>Content goes here</p>,
            postfix: <Icon icon={IconDefinitions.bin} />,
        }} />
    )
};

export const MetaJustifyPositionEnd: StoryFn = () => {
    return (
        <ContentItem item={{
            id: '1',
           prefix: <Title>Action</Title>,
            contentJustifyPosition: 'justify-end',
           content: <p>Content goes here</p>,
            postfix: <Icon icon={IconDefinitions.bin} />,
        }} />
    )
};



export const PostfixItemPositionStart: StoryFn = () => {
    return (
        <ContentItem item={{
            id: '1',
            prefix: <Icon icon={IconDefinitions.bin} />,
            postfixItemPosition: 'item-start',
            content: <Title>Content goes here</Title>,
            postfix: <Icon icon={IconDefinitions.bin} />,
        }} />
    )
};
export const PostfixItemPositionCenter: StoryFn = () => {
    return (
        <ContentItem item={{
            id: '1',
            prefix: <Icon icon={IconDefinitions.bin} />,
            postfixItemPosition: 'item-center',
            content: <Title>Content goes here</Title>,
            postfix: <Icon icon={IconDefinitions.bin} />,
        }} />
    )
};

export const PostfixItemPositionEnd: StoryFn = () => {
    return (
        <ContentItem item={{
            id: '1',
            prefix: <Icon icon={IconDefinitions.bin} />,
            postfixItemPosition: 'item-end',
            content: <Title>Content goes here</Title>,
            postfix: <Icon icon={IconDefinitions.bin} />,
        }} />
    )
};

