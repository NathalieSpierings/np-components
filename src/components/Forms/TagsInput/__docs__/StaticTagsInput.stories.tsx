import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { ColorDefinitions, IconDefinitions } from '../../../../lib/utils/definitions';
import { TagsInputTagItem } from '../TagsInput';
import { useState } from 'react';
import { Icon } from '../../../UI/Icons/Icon';
import StaticTagsInput from '../StaticTagsInput';

const meta: Meta<typeof StaticTagsInput> = {
    title: 'Forms/TagsInput/Static',
    component: StaticTagsInput,

};

export default meta;
type Story = StoryObj<typeof StaticTagsInput>;

const tagItems: TagsInputTagItem[] = [{
    id: '1',
    title: 'New York'
},
{
    id: '2',
    title: 'Paris'
}];

export const Default: StoryFn = () => {
    const [selectedTags] = useState<TagsInputTagItem[]>(tagItems);


    return (
        <StaticTagsInput
            selectedTags={selectedTags}
            label="My tags"
        />
    );
};

export const RemovebleItems: StoryFn = () => {
    const [selectedTags, setSelectedTags] = useState<TagsInputTagItem[]>(tagItems);

    return (
        <div className="grid">
            <StaticTagsInput
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                label="My tags"
            />
        </div>
    );
};

export const NoLabel: StoryFn = () => {
    const [selectedTags] = useState<TagsInputTagItem[]>(tagItems);

    return (
        <StaticTagsInput
            selectedTags={selectedTags}
            label={null}
        />
    );
};

export const Colored: StoryFn = () => {
    const [selectedTags] = useState<TagsInputTagItem[]>(tagItems);

    return (
        <StaticTagsInput
            selectedTags={selectedTags}
            label="My tags"
            color={ColorDefinitions.Rose30}
        />
    );
};

export const PreAndPostFix: StoryFn = () => {
    const [selectedTags, setSelectedTags] = useState<TagsInputTagItem[]>(tagItems);

    return (
        <StaticTagsInput
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            addonPrefix={<Icon icon={IconDefinitions.alarm} />}
            addonSuffix={<Icon icon={IconDefinitions.plus} />}
            color={ColorDefinitions.Green}
            label="My tags"
        />
    );
};

