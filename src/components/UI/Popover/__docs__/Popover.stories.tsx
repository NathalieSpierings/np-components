import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from '../../../../lib/utils/definitions';
import Avatar from '../../Avatar/Avatar';
import Icon from '../../Icons/Icon/Icon';
import Popover from '../Popover';
import React from 'react';

const meta: Meta<typeof Popover> = {
    title: 'Forms/Popover',
    component: Popover,
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof Popover>;



export const Default: StoryFn = () => {


    return (
        <Popover toggleIcon={IconDefinitions.info_square}>
            This is the content of the popover.
        </Popover>
    );
};

export const DirectionUp: StoryFn = () => {   
    return (
        <Popover direction="up" toggleIcon={IconDefinitions.info_square}>
            This is the content of the popover.
        </Popover>
    );

};


export const Background: StoryFn = () => {
    return (
        <Popover direction="up" toggleIcon={IconDefinitions.info_square} background={ColorDefinitions.Olive}>
            This is the content of the popover.
        </Popover>
    );
};

export const WithHeading: StoryFn = () => {
    return (
       <Popover 
       direction="up" 
       toggleIcon={IconDefinitions.info_square} 
       headerContent={(<h5>Info!</h5>)}>
            This is the content of the popover.
        </Popover>
    );
};

export const WithHeadingAndBorder: StoryFn = () => { 

    return (
         <Popover 
       direction="up" 
       toggleIcon={IconDefinitions.info_square} 
       borderColor={ColorDefinitions.Surface} 
       headerContent={(<h5>Info!</h5>)}>
            This is the content of the popover.
        </Popover>
    );
};
