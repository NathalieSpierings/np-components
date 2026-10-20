import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { ColorDefinitions, IconDefinitions } from '../../../../lib/utils/definitions';
import { Icon } from '../../../UI/Icons/Icon';
import TagsInput, { TagsInputTagItem } from '../TagsInput';

const meta: Meta<typeof TagsInput> = {
    title: 'Forms/TagsInput',
    component: TagsInput,

};

export default meta;
type Story = StoryObj<typeof TagsInput>;

const tagItems: TagsInputTagItem[] = [{
    id: '1',
    title: 'New York'
},
{
    id: '2',
    title: 'Paris'
}]

export const Default: StoryFn = () => {
    const [selectedTags, setSelectedTags] = useState<TagsInputTagItem[]>(tagItems);
    const [textInput, setTextInput] = useState<string>("");
   
    return (
        <TagsInput
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                textInput={textInput}
                setTextInput={setTextInput}
                label="My tags"
                placeholder="Enter om tags toe te voegen"
            />
    );
};

export const SelectedTags: StoryFn = () => {
    const [selectedTags, setSelectedTags] = useState<TagsInputTagItem[]>(tagItems);
    const [textInput, setTextInput] = useState<string>("");

    return (
       <TagsInput 
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                textInput={textInput}
                setTextInput={setTextInput}
                label="My tags" />
    );
};

export const Colored: StoryFn = () => {
    const [selectedTags, setSelectedTags] = useState<TagsInputTagItem[]>(tagItems);
    const [textInput, setTextInput] = useState<string>("");

    return (
         <TagsInput
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                textInput={textInput}
                setTextInput={setTextInput}
                color={ColorDefinitions.Green}
                label="My tags"
             />
    );
};

export const PreAndPostFix: StoryFn = () => {
    const [selectedTags, setSelectedTags] = useState<TagsInputTagItem[]>(tagItems);
    const [textInput, setTextInput] = useState<string>("");


    return (
        <TagsInput
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                textInput={textInput}
                setTextInput={setTextInput}
                addonPrefix={<Icon icon={IconDefinitions.alarm} />}
                addonSuffix={<Icon icon={IconDefinitions.plus} />}
                color={ColorDefinitions.Green}
                label="My tags"
             />
    );
};

