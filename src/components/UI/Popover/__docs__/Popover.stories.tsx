import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { ColorDefinitions, IconDefinitions } from '../../../../lib/utils/definitions';
import Popover from '../Popover';

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
