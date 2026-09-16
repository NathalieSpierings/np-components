import React, { ReactElement, useState } from "react";
import Tags, { TagItem } from "../../../components/UI/Tags/Tags";
import {
    ColorDefinitions,
    IconDefinitions,
    SizeDefinitions
} from "../../../lib/utils/definitions";
import Icon from "../../../components/UI/Icons/Icon/Icon";
import { UserModel } from "../../../lib/testdata/models";

const users: UserModel[] = [
    {
        id: "1",
        active: true,
        displayName: "Jan de Vries",
        type: "External",
        gender: "Male",
        initials: "J.",
        firstName: "Jan",
        infix: "de",
        lastName: "Vries",
        formalName: "De heer J. de Vries",
        emailAddress: "jan@voorbeeld.nl",
        isDSEmployee: false,
        organisationId: "100",
        agbCode: "12345678"
    },
    {
        id: "2",
        active: true,
        displayName: "Sophie Jansen",
        type: "Internal",
        gender: "Female",
        initials: "S.",
        firstName: "Sophie",
        infix: "",
        lastName: "Jansen",
        formalName: "Mevrouw S. Jansen",
        emailAddress: "sophie@voorbeeld.nl",
        isDSEmployee: true,
        organisationId: "200",
        agbCode: ""
    },
    {
        id: "3",
        active: true,
        displayName: "Peter van Dijk",
        type: "External",
        gender: "Male",
        initials: "P.",
        firstName: "Peter",
        infix: "van",
        lastName: "Dijk",
        formalName: "De heer P. van Dijk",
        emailAddress: "peter.vandijk@voorbeeld.nl",
        isDSEmployee: false,
        organisationId: "101",
        agbCode: "23456789"
    },
    {
        id: "4",
        active: true,
        displayName: "Emma de Jong",
        type: "Internal",
        gender: "Female",
        initials: "E.",
        firstName: "Emma",
        infix: "de",
        lastName: "Jong",
        formalName: "Mevrouw E. de Jong",
        emailAddress: "emma.dejong@voorbeeld.nl",
        isDSEmployee: true,
        organisationId: "200",
        agbCode: ""
    },
    {
        id: "5",
        active: false,
        displayName: "Thomas Smit",
        type: "External",
        gender: "Male",
        initials: "T.",
        firstName: "Thomas",
        infix: "",
        lastName: "Smit",
        formalName: "De heer T. Smit",
        emailAddress: "thomas.smit@voorbeeld.nl",
        isDSEmployee: false,
        organisationId: "102",
        agbCode: "34567890"
    },
    {
        id: "6",
        active: true,
        displayName: "Lisa van den Berg",
        type: "External",
        gender: "Female",
        initials: "L.",
        firstName: "Lisa",
        infix: "van den",
        lastName: "Berg",
        formalName: "Mevrouw L. van den Berg",
        emailAddress: "lisa.vandenberg@voorbeeld.nl",
        isDSEmployee: false,
        organisationId: "103",
        agbCode: "45678901"
    },
    {
        id: "7",
        active: true,
        displayName: "Mark Visser",
        type: "Internal",
        gender: "Male",
        initials: "M.",
        firstName: "Mark",
        infix: "",
        lastName: "Visser",
        formalName: "De heer M. Visser",
        emailAddress: "mark.visser@voorbeeld.nl",
        isDSEmployee: true,
        organisationId: "200",
        agbCode: ""
    },
    {
        id: "8",
        active: true,
        displayName: "Laura van Leeuwen",
        type: "External",
        gender: "Female",
        initials: "L.",
        firstName: "Laura",
        infix: "van",
        lastName: "Leeuwen",
        formalName: "Mevrouw L. van Leeuwen",
        emailAddress: "laura.vanleeuwen@voorbeeld.nl",
        isDSEmployee: false,
        organisationId: "104",
        agbCode: "56789012"
    },
    {
        id: "9",
        active: false,
        displayName: "Daan Bakker",
        type: "External",
        gender: "Male",
        initials: "D.",
        firstName: "Daan",
        infix: "",
        lastName: "Bakker",
        formalName: "De heer D. Bakker",
        emailAddress: "daan.bakker@voorbeeld.nl",
        isDSEmployee: false,
        organisationId: "105",
        agbCode: "67890123"
    },
    {
        id: "10",
        active: true,
        displayName: "Anne de Boer",
        type: "Internal",
        gender: "Female",
        initials: "A.",
        firstName: "Anne",
        infix: "de",
        lastName: "Boer",
        formalName: "Mevrouw A. de Boer",
        emailAddress: "anne.deboer@voorbeeld.nl",
        isDSEmployee: true,
        organisationId: "200",
        agbCode: ""
    },
    {
        id: "11",
        active: true,
        displayName: "Jeroen Mulder",
        type: "External",
        gender: "Male",
        initials: "J.",
        firstName: "Jeroen",
        infix: "",
        lastName: "Mulder",
        formalName: "De heer J. Mulder",
        emailAddress: "jeroen.mulder@voorbeeld.nl",
        isDSEmployee: false,
        organisationId: "106",
        agbCode: "78901234"
    },
    {
        id: "12",
        active: true,
        displayName: "Eva van der Meer",
        type: "External",
        gender: "Female",
        initials: "E.",
        firstName: "Eva",
        infix: "van der",
        lastName: "Meer",
        formalName: "Mevrouw E. van der Meer",
        emailAddress: "eva.vandermeer@voorbeeld.nl",
        isDSEmployee: false,
        organisationId: "107",
        agbCode: "89012345"
    },
    {
        id: "13",
        active: true,
        displayName: "Ruben Meijer",
        type: "Internal",
        gender: "Male",
        initials: "R.",
        firstName: "Ruben",
        infix: "",
        lastName: "Meijer",
        formalName: "De heer R. Meijer",
        emailAddress: "ruben.meijer@voorbeeld.nl",
        isDSEmployee: true,
        organisationId: "200",
        agbCode: ""
    },
    {
        id: "14",
        active: false,
        displayName: "Nina van der Linden",
        type: "External",
        gender: "Female",
        initials: "N.",
        firstName: "Nina",
        infix: "van der",
        lastName: "Linden",
        formalName: "Mevrouw N. van der Linden",
        emailAddress: "nina.vanderlinden@voorbeeld.nl",
        isDSEmployee: false,
        organisationId: "108",
        agbCode: "90123456"
    },
    {
        id: "15",
        active: true,
        displayName: "Bram Bos",
        type: "External",
        gender: "Male",
        initials: "B.",
        firstName: "Bram",
        infix: "",
        lastName: "Bos",
        formalName: "De heer B. Bos",
        emailAddress: "bram.bos@voorbeeld.nl",
        isDSEmployee: false,
        organisationId: "109",
        agbCode: "11223344"
    },
    {
        id: "16",
        active: true,
        displayName: "Julia Verhoeven",
        type: "Internal",
        gender: "Female",
        initials: "J.",
        firstName: "Julia",
        infix: "",
        lastName: "Verhoeven",
        formalName: "Mevrouw J. Verhoeven",
        emailAddress: "julia.verhoeven@voorbeeld.nl",
        isDSEmployee: true,
        organisationId: "200",
        agbCode: ""
    },
    {
        id: "17",
        active: true,
        displayName: "Koen van Loon",
        type: "External",
        gender: "Male",
        initials: "K.",
        firstName: "Koen",
        infix: "van",
        lastName: "Loon",
        formalName: "De heer K. van Loon",
        emailAddress: "koen.vanloon@voorbeeld.nl",
        isDSEmployee: false,
        organisationId: "110",
        agbCode: "22334455"
    },
    {
        id: "18",
        active: true,
        displayName: "Fleur Hendriks",
        type: "External",
        gender: "Female",
        initials: "F.",
        firstName: "Fleur",
        infix: "",
        lastName: "Hendriks",
        formalName: "Mevrouw F. Hendriks",
        emailAddress: "fleur.hendriks@voorbeeld.nl",
        isDSEmployee: false,
        organisationId: "111",
        agbCode: "33445566"
    },
    {
        id: "19",
        active: false,
        displayName: "Sander van Beek",
        type: "Internal",
        gender: "Male",
        initials: "S.",
        firstName: "Sander",
        infix: "van",
        lastName: "Beek",
        formalName: "De heer S. van Beek",
        emailAddress: "sander.vanbeek@voorbeeld.nl",
        isDSEmployee: true,
        organisationId: "200",
        agbCode: ""
    },
    {
        id: "20",
        active: true,
        displayName: "Lotte Kuipers",
        type: "External",
        gender: "Female",
        initials: "L.",
        firstName: "Lotte",
        infix: "",
        lastName: "Kuipers",
        formalName: "Mevrouw L. Kuipers",
        emailAddress: "lotte.kuipers@voorbeeld.nl",
        isDSEmployee: false,
        organisationId: "112",
        agbCode: "44556677"
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

const TagsPage = (): ReactElement => {

    const [tags, setTags] = useState<TagItem[]>(defaultTags);
    const [coloredTags, setColoredTags] = useState<TagItem[]>(defaultTags);
    const [minimalTags, setMinimalTags] = useState<TagItem[]>([]);
    const [prefixTags, setPrefixTags] = useState<TagItem[]>(addonPrefixTags);
    const [postfixTags, setPostfixTags] = useState<TagItem[]>(addonPostfixTags);
    const [selectableTags, setSelectableTags] = useState<TagItem[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<TagItem[]>([]);

    const addFreeTextTag = (value: string) => {
        const tag: TagItem = {
            id: crypto.randomUUID(),
            label: value
        };

        setTags(current => [...current, tag]);
    };

    const removeTag = (
        tag: TagItem,
        setter: React.Dispatch<React.SetStateAction<TagItem[]>>
    ) => {
          setTags(current => current.filter(item => item.id !== tag.id));
        // setter(current =>
        //     current.filter(item => item.id !== tag.id)
        // );
    };

    return (
        <>
            <h3>Default</h3>
            <Tags
                tags={tags}
                onAdd={addFreeTextTag}
                onRemove={tag => removeTag(tag, setTags)}
            />

             <h3>ReadOnly</h3>
            <Tags
                tags={tags}
                readOnly
            />


            <h3 className="mt-4">Datasource - UserModel</h3>
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
                    setSelectedUsers(current =>
                        current.filter(item => item.id !== tag.id)
                    );
                }}
            />

           <h3 className="mt-4">Enable minimal one user mandatory</h3>
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

            <h3 className="mt-4">Datasource - TagItem</h3>
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
                onRemove={tag =>
                    removeTag(tag, setSelectableTags)
                }
            />

            <h3 className="mt-4">Color</h3>
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
                onRemove={tag =>
                    removeTag(tag, setColoredTags)
                }
            />

           
            <h3 className="mt-4">Prefix</h3>

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
                onRemove={tag =>
                    removeTag(tag, setPrefixTags)
                }
            />

            <h3 className="mt-4">Postfix</h3>

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
                onRemove={tag =>
                    removeTag(tag, setPostfixTags)
                }
            />
        </>
    );
};

export default TagsPage;