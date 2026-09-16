import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { MemoryRouter } from 'react-router';
import { Icon, LayoutProvider } from '../../..';
import { SvgSprite } from '../../../../assets/SvgSprite';
import { UserModel } from '../../../../lib/testdata/models';
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

const users: UserModel[] = [
    {
        id: "1",
        displayName: "Jan de Vries",
    },
    {
        id: "2",        
        displayName: "Sophie Jansen",
    },
    {
        id: "3",        
        displayName: "Peter van Dijk",
    },
    {
        id: "4",        
        displayName: "Emma de Jong",
    },
    {
        id: "5",
        displayName: "Thomas Smit",
    },
    {
        id: "6",        
        displayName: "Lisa van den Berg",
    },
    {
        id: "7",        
        displayName: "Mark Visser",
    },
    {
        id: "8",        
        displayName: "Laura van Leeuwen",
    },
    {
        id: "9",
        displayName: "Daan Bakker",
    },
    {
        id: "10",        
        displayName: "Anne de Boer",
    },
    {
        id: "11",        
        displayName: "Jeroen Mulder",
    },
    {
        id: "12",        
        displayName: "Eva van der Meer",
    },
    {
        id: "13",        
        displayName: "Ruben Meijer",
    },
    {
        id: "14",
        displayName: "Nina van der Linden",
    },
    {
        id: "15",        
        displayName: "Bram Bos",
    },
    {
        id: "16",        
        displayName: "Julia Verhoeven",
    },
    {
        id: "17",        
        displayName: "Koen van Loon",
    },
    {
        id: "18",        
        displayName: "Fleur Hendriks",
    },
    {
        id: "19",
        displayName: "Sander van Beek",
    },
    {
        id: "20",        
        displayName: "Lotte Kuipers",
    }
];

const defaultTags: TagItem[] = [
    { id: "1", label: "Amsterdam" },
    { id: "2", label: "London" },
    { id: "3", label: "Paris" },
    { id: "4", label: "New York" }
];

const tagOptions: TagItem[] = [
    { id: "1", label: "Amsterdam" },
    { id: "2", label: "London" },
    { id: "3", label: "Paris" },
    { id: "4", label: "New York" },
    { id: "5", label: "Berlin" },
    { id: "6", label: "Madrid" },
    { id: "7", label: "Rome" },
    { id: "8", label: "Brussels" }
];

const addonPrefixTags: TagItem[] = [
    {
        id: "1",
        label: "Amsterdam",
        prefix: (
            <Icon
                icon={IconDefinitions.star}
                size={SizeDefinitions.ExtraSmall}
            />
        )
    },
    {
        id: "2",
        label: "London",
        prefix: (
            <Icon
                icon={IconDefinitions.cookie}
                size={SizeDefinitions.ExtraSmall}
            />
        )
    },
    {
        id: "3",
        label: "Paris",
        prefix: (
            <Icon
                icon={IconDefinitions.bulb}
                size={SizeDefinitions.ExtraSmall}
            />
        )
    },
    {
        id: "4",
        label: "New York",
        prefix: (
            <Icon
                icon={IconDefinitions.magic_wand}
                size={SizeDefinitions.ExtraSmall}
            />
        )
    }
];

const addonPostfixTags: TagItem[] = [
    {
        id: "1",
        label: "Amsterdam",
        postfix: (
            <Icon
                icon={IconDefinitions.star}
                size={SizeDefinitions.ExtraSmall}
            />
        )
    },
    {
        id: "2",
        label: "London",
        postfix: (
            <Icon
                icon={IconDefinitions.bulb}
                size={SizeDefinitions.ExtraSmall}
            />
        )
    },
    {
        id: "3",
        label: "Paris",
        postfix: (
            <Icon
                icon={IconDefinitions.bulb}
                size={SizeDefinitions.ExtraSmall}
            />
        )
    },
    {
        id: "4",
        label: "New York",
        postfix: (
            <Icon
                icon={IconDefinitions.chat}
                size={SizeDefinitions.ExtraSmall}
            />
        )
    }
];


export const Default: StoryFn = () => {

    const [tags, setTags] = useState<TagItem[]>(defaultTags);

    const addTag = (value: string) => {
        const tag: TagItem = {
            id: crypto.randomUUID(),
            label: value
        };

        setTags(current => [...current, tag]);
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

export const ReadOnly: StoryFn = () => {

    const [tags, setTags] = useState<TagItem[]>(defaultTags);

    return (
        <Tags
            tags={tags}
            readOnly
        />
    )
};

export const DatasourceUserModel: StoryFn = () => {

    const [selectedUsers, setSelectedUsers] = useState<TagItem[]>([]);
  
    return (
        <Tags<UserModel>
            tags={selectedUsers}
            dataSource={users}
            dataSourceId="id"
            dataSourceLabel="displayName"
            placeholder="Gebruiker zoeken"
            onAddItem={user => {
                setSelectedUsers(current => [
                    ...current,
                    {
                        id: user.id,
                        label: user.displayName
                    }
                ]);
            }}
            onRemove={tag => {
                setSelectedUsers(current => current.filter(item => item.id !== tag.id));
            }}
        />
    )
};


export const MinimalOneTagMandatory: StoryFn = () => {

    const [minimalTags, setMinimalTags] = useState<TagItem[]>([]);

    return (
        <Tags<UserModel>
                tags={minimalTags}
                dataSource={users}
                dataSourceId="id"
                dataSourceLabel="displayName"
                color={ColorDefinitions.Red}
                onAddItem={user => {
                    setMinimalTags(current => [
                         ...current,
                        {
                            id: user.id,
                            label: user.displayName
                        }
                    ]);
                }}
                onRemove={tag =>{
                    setMinimalTags(current =>
                        current.filter(item => item.id !== tag.id)
                    );
                }
                }
                enableMinimalOneTag
            />
    )
};

 
export const DatasourceTagItem: StoryFn = () => {

    const [selectableTags, setSelectableTags] = useState<TagItem[]>([]);
    
    const removeTag = (tag: TagItem) => {
        setSelectableTags(current => current.filter(item => item.id !== tag.id));
    };

    return (
       <Tags<TagItem>
                tags={selectableTags}
                dataSource={tagOptions}
                dataSourceId="id"
                dataSourceLabel="label"
                placeholder="Plaats zoeken"
                onAddItem={tag => {
                    setSelectableTags(current => [
                        ...current,
                        tag
                    ]);
                }}
                onRemove={removeTag}
            />
    )
};


export const Color: StoryFn = () => {

     const [coloredTags, setColoredTags] = useState<TagItem[]>(defaultTags);

     const removeTag = (tag: TagItem) => {
        setColoredTags(current => current.filter(item => item.id !== tag.id));
    };

    return (
       <Tags<TagItem>
                tags={coloredTags}
                dataSource={tagOptions}
                dataSourceId="id"
                dataSourceLabel="label"
                color={ColorDefinitions.Green}
                onAddItem={tag => {
                    setColoredTags(current => [
                        ...current,
                        tag
                    ]);
                }}
                onRemove={removeTag}
            />
    )
};


export const AddonPrefix: StoryFn = () => {

   const [prefixTags, setPrefixTags] = useState<TagItem[]>(addonPrefixTags);

    const removeTag = (tag: TagItem) => {
        setPrefixTags(current => current.filter(item => item.id !== tag.id));
    };

    return (
       <Tags<TagItem>
                tags={prefixTags}
                dataSource={addonPrefixTags}
                dataSourceId="id"
                dataSourceLabel="label"
                onAddItem={tag => {
                    setPrefixTags(current => [
                        ...current,
                        tag
                    ]);
                }}
                onRemove={removeTag}
            />
    )
};


export const AddonPostfix: StoryFn = () => {

    const [postfixTags, setPostfixTags] = useState<TagItem[]>(addonPostfixTags);

     const removeTag = (tag: TagItem) => {
        setPostfixTags(current => current.filter(item => item.id !== tag.id));
    };

    return (
       <Tags<TagItem>
                tags={postfixTags}
                dataSource={addonPostfixTags}
                dataSourceId="id"
                dataSourceLabel="label"
                onAddItem={tag => {
                    setPostfixTags(current => [
                        ...current,
                        tag
                    ]);
                }}
                onRemove={removeTag}
            />
    )
};