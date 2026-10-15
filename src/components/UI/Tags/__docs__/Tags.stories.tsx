import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';
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
        active: true,
        displayName: "Jan de Vries",
        type: "Zorgverlener",
        gender: "M",
        initials: "J.",
        firstName: "Jan",
        infix: "de",
        lastName: "Vries",
        formalName: "Dhr. J. de Vries",
        emailAddress: "jan.devries@example.com",
        isDSEmployee: false,
        organisationId: "org-001",
        agbCode: "01000001",
    },
    {
        id: "2",
        active: true,
        displayName: "Sophie Jansen",
        type: "Medewerker",
        gender: "V",
        initials: "S.",
        firstName: "Sophie",
        infix: "",
        lastName: "Jansen",
        formalName: "Mevr. S. Jansen",
        emailAddress: "sophie.jansen@example.com",
        isDSEmployee: true,
        organisationId: "org-001",
        agbCode: "",
    },
    {
        id: "3",
        active: true,
        displayName: "Peter van Dijk",
        type: "Zorgverlener",
        gender: "M",
        initials: "P.",
        firstName: "Peter",
        infix: "van",
        lastName: "Dijk",
        formalName: "Dhr. P. van Dijk",
        emailAddress: "peter.vandijk@example.com",
        isDSEmployee: false,
        organisationId: "org-002",
        agbCode: "01000003",
    },
    {
        id: "4",
        active: false,
        displayName: "Emma de Jong",
        type: "Medewerker",
        gender: "V",
        initials: "E.",
        firstName: "Emma",
        infix: "de",
        lastName: "Jong",
        formalName: "Mevr. E. de Jong",
        emailAddress: "emma.dejong@example.com",
        isDSEmployee: false,
        organisationId: "org-002",
        agbCode: "",
    },
    {
        id: "5",
        active: true,
        displayName: "Thomas Smit",
        type: "Beheerder",
        gender: "M",
        initials: "T.",
        firstName: "Thomas",
        infix: "",
        lastName: "Smit",
        formalName: "Dhr. T. Smit",
        emailAddress: "thomas.smit@example.com",
        isDSEmployee: true,
        organisationId: "org-001",
        agbCode: "",
    },
    {
        id: "6",
        active: true,
        displayName: "Lisa van den Berg",
        type: "Zorgverlener",
        gender: "V",
        initials: "L.",
        firstName: "Lisa",
        infix: "van den",
        lastName: "Berg",
        formalName: "Mevr. L. van den Berg",
        emailAddress: "lisa.vandenberg@example.com",
        isDSEmployee: false,
        organisationId: "org-003",
        agbCode: "01000006",
    },
    {
        id: "7",
        active: true,
        displayName: "Mark Visser",
        type: "Medewerker",
        gender: "M",
        initials: "M.",
        firstName: "Mark",
        infix: "",
        lastName: "Visser",
        formalName: "Dhr. M. Visser",
        emailAddress: "mark.visser@example.com",
        isDSEmployee: true,
        organisationId: "org-003",
        agbCode: "",
    },
    {
        id: "8",
        active: true,
        displayName: "Laura van Leeuwen",
        type: "Zorgverlener",
        gender: "V",
        initials: "L.",
        firstName: "Laura",
        infix: "van",
        lastName: "Leeuwen",
        formalName: "Mevr. L. van Leeuwen",
        emailAddress: "laura.vanleeuwen@example.com",
        isDSEmployee: false,
        organisationId: "org-001",
        agbCode: "01000008",
    },
    {
        id: "9",
        active: false,
        displayName: "Daan Bakker",
        type: "Zorgverlener",
        gender: "M",
        initials: "D.",
        firstName: "Daan",
        infix: "",
        lastName: "Bakker",
        formalName: "Dhr. D. Bakker",
        emailAddress: "daan.bakker@example.com",
        isDSEmployee: false,
        organisationId: "org-002",
        agbCode: "01000009",
    },
    {
        id: "10",
        active: true,
        displayName: "Anne de Boer",
        type: "Beheerder",
        gender: "V",
        initials: "A.",
        firstName: "Anne",
        infix: "de",
        lastName: "Boer",
        formalName: "Mevr. A. de Boer",
        emailAddress: "anne.deboer@example.com",
        isDSEmployee: true,
        organisationId: "org-002",
        agbCode: "",
    },
    {
        id: "11",
        active: true,
        displayName: "Jeroen Mulder",
        type: "Medewerker",
        gender: "M",
        initials: "J.",
        firstName: "Jeroen",
        infix: "",
        lastName: "Mulder",
        formalName: "Dhr. J. Mulder",
        emailAddress: "jeroen.mulder@example.com",
        isDSEmployee: false,
        organisationId: "org-003",
        agbCode: "",
    },
    {
        id: "12",
        active: true,
        displayName: "Eva van der Meer",
        type: "Zorgverlener",
        gender: "V",
        initials: "E.",
        firstName: "Eva",
        infix: "van der",
        lastName: "Meer",
        formalName: "Mevr. E. van der Meer",
        emailAddress: "eva.vandermeer@example.com",
        isDSEmployee: false,
        organisationId: "org-003",
        agbCode: "01000012",
    },
    {
        id: "13",
        active: true,
        displayName: "Ruben Meijer",
        type: "Zorgverlener",
        gender: "M",
        initials: "R.",
        firstName: "Ruben",
        infix: "",
        lastName: "Meijer",
        formalName: "Dhr. R. Meijer",
        emailAddress: "ruben.meijer@example.com",
        isDSEmployee: false,
        organisationId: "org-001",
        agbCode: "01000013",
    },
    {
        id: "14",
        active: true,
        displayName: "Nina van der Linden",
        type: "Medewerker",
        gender: "V",
        initials: "N.",
        firstName: "Nina",
        infix: "van der",
        lastName: "Linden",
        formalName: "Mevr. N. van der Linden",
        emailAddress: "nina.vanderlinden@example.com",
        isDSEmployee: true,
        organisationId: "org-001",
        agbCode: "",
    },
    {
        id: "15",
        active: false,
        displayName: "Bram Bos",
        type: "Medewerker",
        gender: "M",
        initials: "B.",
        firstName: "Bram",
        infix: "",
        lastName: "Bos",
        formalName: "Dhr. B. Bos",
        emailAddress: "bram.bos@example.com",
        isDSEmployee: false,
        organisationId: "org-002",
        agbCode: "",
    },
    {
        id: "16",
        active: true,
        displayName: "Julia Verhoeven",
        type: "Zorgverlener",
        gender: "V",
        initials: "J.",
        firstName: "Julia",
        infix: "",
        lastName: "Verhoeven",
        formalName: "Mevr. J. Verhoeven",
        emailAddress: "julia.verhoeven@example.com",
        isDSEmployee: false,
        organisationId: "org-002",
        agbCode: "01000016",
    },
    {
        id: "17",
        active: true,
        displayName: "Koen van Loon",
        type: "Beheerder",
        gender: "M",
        initials: "K.",
        firstName: "Koen",
        infix: "van",
        lastName: "Loon",
        formalName: "Dhr. K. van Loon",
        emailAddress: "koen.vanloon@example.com",
        isDSEmployee: true,
        organisationId: "org-003",
        agbCode: "",
    },
    {
        id: "18",
        active: true,
        displayName: "Fleur Hendriks",
        type: "Zorgverlener",
        gender: "V",
        initials: "F.",
        firstName: "Fleur",
        infix: "",
        lastName: "Hendriks",
        formalName: "Mevr. F. Hendriks",
        emailAddress: "fleur.hendriks@example.com",
        isDSEmployee: false,
        organisationId: "org-003",
        agbCode: "01000018",
    },
    {
        id: "19",
        active: true,
        displayName: "Sander van Beek",
        type: "Medewerker",
        gender: "M",
        initials: "S.",
        firstName: "Sander",
        infix: "van",
        lastName: "Beek",
        formalName: "Dhr. S. van Beek",
        emailAddress: "sander.vanbeek@example.com",
        isDSEmployee: false,
        organisationId: "org-001",
        agbCode: "",
    },
    {
        id: "20",
        active: true,
        displayName: "Lotte Kuipers",
        type: "Zorgverlener",
        gender: "V",
        initials: "L.",
        firstName: "Lotte",
        infix: "",
        lastName: "Kuipers",
        formalName: "Mevr. L. Kuipers",
        emailAddress: "lotte.kuipers@example.com",
        isDSEmployee: false,
        organisationId: "org-002",
        agbCode: "01000020",
    },
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

    const [tags] = useState<TagItem[]>(defaultTags);

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