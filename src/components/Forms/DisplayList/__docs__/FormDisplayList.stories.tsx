import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import FormDisplayList from '../FormDisplayList';
import React from 'react';

const meta: Meta<typeof FormDisplayList> = {
    title: 'Forms/DisplayList',
    component: FormDisplayList,
};

export default meta;
type Story = StoryObj<typeof FormDisplayList>;

export const Default: StoryFn = () => {
    return (
        <FormDisplayList value={["item1", "item2", "item3"]} label="label" />
    );
};

export const handleSingleValues: StoryFn = () => {
    return (
        <div >
            {<FormDisplayList value={["Only item"]} label="List with one item" />}
            {<FormDisplayList value={["Only item"]} label="Set noSingleItemList" noSingleItemList />}
            {<FormDisplayList value={[]} label="List with no item" placeholder="placeHolder" />}
            {<FormDisplayList value={[]} label="Set noSingleItemList" noSingleItemList placeholder="placeHolder" />}
        </div>
    );
};

export const OtherProps: StoryFn = () => {
    const render = () => {
        return ;
    }

    return (
       <FormDisplayList value={["item1", "item2", "item3"]} label="label" sameLine colon />
    );
};