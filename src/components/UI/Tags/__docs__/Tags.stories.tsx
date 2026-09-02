import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { MemoryRouter } from 'react-router';
import { Icon, LayoutProvider } from '../../..';
import { SvgSprite } from '../../../../assets/SvgSprite';
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from '../../../../lib/utils/definitions';
import { ToastrProvider } from '../../../Providers/ToastrContext/ToastrContext';
import Tags, { TagItem } from '../Tags';


const meta: Meta<typeof Tags> = {
    title: 'UI kit/Tags',
    component: Tags,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <LayoutProvider>
                <ToastrProvider>

                    <MemoryRouter>
                        <SvgSprite />
                        <Story />
                    </MemoryRouter>
                </ToastrProvider>
            </LayoutProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Tags>;

const defaultTags: TagItem[] = [
    { id: "1", label: "Amsterdam" },
    { id: "2", label: "London" },
    { id: "3", label: "Paris" },
    { id: "4", label: "New York" }
]


export const Default: StoryFn = () => {

    const [tags, setTags] = useState<TagItem[]>(defaultTags);
    const addTag = (value: string) => {
        setTags(current => [...current, { id: crypto.randomUUID(), label: value }]);
    };

    const removeTag = (tag: TagItem) => {
        setTags(current => current.filter(item => item.id !== tag.id));
    };

    return (
        <Tags
            tags={tags}
            onAdd={addTag}
            onRemove={removeTag}
        />
    )
};

export const Color: StoryFn = () => {

    const [coloredTags, setColoredTags] = useState<TagItem[]>(defaultTags);

    return (
        <Tags
            tags={coloredTags}
            color={ColorDefinitions.Green}
            onAdd={(value) => setColoredTags(current => [...current, { id: crypto.randomUUID(), label: value }])}
            onRemove={(tag) => setColoredTags(current => current.filter(item => item.id !== tag.id))}
        />
    )
};


export const MinimalOneTagMandatory: StoryFn = () => {

    const [minimalTags, setMinimalTags] = useState<TagItem[]>(defaultTags);


    return (
        <Tags
            tags={minimalTags}
            color={ColorDefinitions.Red}
            onAdd={(value) => setMinimalTags(current => [...current, { id: crypto.randomUUID(), label: value }])}
            onRemove={(tag) => setMinimalTags(current => current.filter(item => item.id !== tag.id))}
            enableMinimalOneTag
        />
    )
};


export const AddonPrefix: StoryFn = () => {

    const addonPrefixTags: TagItem[] = [
        { id: "1", label: "Amsterdam", prefix: <Icon icon={IconDefinitions.star} size={SizeDefinitions.ExtraSmall} /> },
        { id: "2", label: "London", prefix: <Icon icon={IconDefinitions.cookie} size={SizeDefinitions.ExtraSmall} /> },
        { id: "3", label: "Paris", prefix: <Icon icon={IconDefinitions.bulb} size={SizeDefinitions.ExtraSmall} /> },
        { id: "4", label: "New York", prefix: <Icon icon={IconDefinitions.magic_wand} size={SizeDefinitions.ExtraSmall} /> }
    ]
    const [prefixTags, setPrefixTags] = useState<TagItem[]>(addonPrefixTags);

    return (
        <Tags
            tags={prefixTags}
            onAdd={(value) => setPrefixTags(current => [...current, { id: crypto.randomUUID(), label: value }])}
            onRemove={(tag) => setPrefixTags(current => current.filter(item => item.id !== tag.id))}
        />
    )
};


export const AddonPostfix: StoryFn = () => {

    const addonPostfixTags: TagItem[] = [
        { id: "1", label: "Amsterdam", postfix: <Icon icon={IconDefinitions.star} size={SizeDefinitions.ExtraSmall} /> },
        { id: "2", label: "London", postfix: <Icon icon={IconDefinitions.bulb} size={SizeDefinitions.ExtraSmall} /> },
        { id: "3", label: "Paris", postfix: <Icon icon={IconDefinitions.bulb} size={SizeDefinitions.ExtraSmall} /> },
        { id: "4", label: "New York", postfix: <Icon icon={IconDefinitions.chat} size={SizeDefinitions.ExtraSmall} /> }
    ]
    const [postfixTags, setPostfixTags] = useState<TagItem[]>(addonPostfixTags);


    return (
        <Tags
            tags={postfixTags}
            onAdd={(value) => setPostfixTags(current => [...current, { id: crypto.randomUUID(), label: value }])}
            onRemove={(tag) => setPostfixTags(current => current.filter(item => item.id !== tag.id))}
        />
    )
};