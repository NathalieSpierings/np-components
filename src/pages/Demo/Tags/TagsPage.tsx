import React, { ReactElement, useState } from "react";
import Tags, { TagItem } from "../../../components/UI/Tags/Tags";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import Icon from "../../../components/UI/Icons/Icon/Icon";


const TagsPage = ({ }): ReactElement => {

    const defaultTags: TagItem[] = [
        { id: "1", label: "Amsterdam" },
        { id: "2", label: "London" },
        { id: "3", label: "Paris" },
        { id: "4", label: "New York" }
    ]


     const addonPrefixTags: TagItem[] = [
        { id: "1", label: "Amsterdam", prefix: <Icon icon={IconDefinitions.star} size={SizeDefinitions.ExtraSmall} />},
        { id: "2", label: "London", prefix: <Icon icon={IconDefinitions.cookie} size={SizeDefinitions.ExtraSmall} />},
        { id: "3", label: "Paris",  prefix: <Icon icon={IconDefinitions.bulb} size={SizeDefinitions.ExtraSmall} /> },
        { id: "4", label: "New York", prefix: <Icon icon={IconDefinitions.magic_wand} size={SizeDefinitions.ExtraSmall} /> }
    ]

    const addonPostfixTags: TagItem[] = [
        { id: "1", label: "Amsterdam", postfix: <Icon icon={IconDefinitions.star} size={SizeDefinitions.ExtraSmall} />},
        { id: "2", label: "London", postfix: <Icon icon={IconDefinitions.bulb} size={SizeDefinitions.ExtraSmall} /> },
        { id: "3", label: "Paris",  postfix: <Icon icon={IconDefinitions.bulb} size={SizeDefinitions.ExtraSmall} /> },
        { id: "4", label: "New York", postfix: <Icon icon={IconDefinitions.chat} size={SizeDefinitions.ExtraSmall} /> }
    ]


    const [tags, setTags] = useState<TagItem[]>(defaultTags);
    const [coloredTags, setColoredTags] = useState<TagItem[]>(defaultTags);
    const [minimalTags, setMinimalTags] = useState<TagItem[]>(defaultTags);
    const [prefixTags, setPrefixTags] = useState<TagItem[]>(addonPrefixTags);
    const [postfixTags, setPostfixTags] = useState<TagItem[]>(addonPostfixTags);

    const addTag = (value: string) => {
        setTags(current => [...current,{id: crypto.randomUUID(),label: value}]);
    };

    const removeTag = (tag: TagItem) => {
        setTags(current => current.filter(item => item.id !== tag.id));
    };


    return (
        <>
            <h3>Default</h3>
            <Tags
                tags={tags}
                onAdd={addTag}                
                onRemove={removeTag}
            />


            <h3 className="mt-4">Color</h3>
            <Tags
                tags={coloredTags}
                color={ColorDefinitions.Green}
                onAdd={(value) => setColoredTags(current => [...current,{id: crypto.randomUUID(),label: value}])}
                onRemove={(tag) => setColoredTags(current => current.filter(item => item.id !== tag.id))}
            />

            <h3 className="mt-4">Enable minimal one tag mantatory</h3>
            <Tags
                tags={minimalTags}
                color={ColorDefinitions.Red}
                onAdd={(value) => setMinimalTags(current => [...current,{id: crypto.randomUUID(),label: value}])}
                onRemove={(tag) => setMinimalTags(current => current.filter(item => item.id !== tag.id))}
                enableMinimalOneTag
            />

            <h3 className="mt-4">Prefix</h3>
            <Tags
                tags={prefixTags}
                onAdd={(value) => setPrefixTags(current => [...current,{id: crypto.randomUUID(),label: value}])}
                onRemove={(tag) => setPrefixTags(current => current.filter(item => item.id !== tag.id))}
            />

            <h3 className="mt-4">Postfix</h3>
            <Tags
                tags={postfixTags}
                onAdd={(value) => setPostfixTags(current => [...current,{id: crypto.randomUUID(),label: value}])}
                onRemove={(tag) => setPostfixTags(current => current.filter(item => item.id !== tag.id))}
            />
        </>
    )
};

export default TagsPage;