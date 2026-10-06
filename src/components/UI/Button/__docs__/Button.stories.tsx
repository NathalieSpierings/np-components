import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from '../../../../lib/utils/definitions';
import Icon from '../../Icons/Icon/Icon';
import Button from '../Button';
import React from 'react';

const meta: Meta<typeof Button> = {
    title: 'UI kit/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: StoryFn = () => {
    return (
        <Button>Default</Button>
    )
};

export const Surfaces: StoryFn = () => {
    return (
        <div className="flex gap-1">
            <Button color={ColorDefinitions.SurfaceDark}>Surface dark</Button>
            <Button color={ColorDefinitions.Surface}>Surface</Button>
            <Button color={ColorDefinitions.SurfaceLight}>Surface light</Button>
        </div>
    );
};

export const Variants: StoryFn = () => {
    return (
        <div >
            <h2>Variants</h2>
            <h4>Default</h4>
            <div className="flex gap-1">         
                <Button color={ColorDefinitions.Blue}>Outline</Button>
                <Button color={ColorDefinitions.Blue} iconOnly><Icon icon={IconDefinitions.bulb} /></Button>
                <Button color={ColorDefinitions.Pink} rounded={true}>Rounded</Button>
                <Button color={ColorDefinitions.Rose} circle={true} iconOnly> <Icon icon={IconDefinitions.bulb} /></Button>
                <Button color={ColorDefinitions.Accent}>Accent</Button>

            </div>

            <h4>Outline</h4>
            <div className="flex gap-1">         
                <Button color={ColorDefinitions.Blue} variant="outline">Outline</Button>
                <Button color={ColorDefinitions.Blue} variant="outline" iconOnly><Icon icon={IconDefinitions.bulb} /></Button>
                <Button color={ColorDefinitions.Pink} variant="outline" rounded={true}>Rounded</Button>
                <Button color={ColorDefinitions.Rose} variant="outline" circle={true} iconOnly> <Icon icon={IconDefinitions.bulb} /></Button>
                <Button color={ColorDefinitions.Accent} variant="outline">Accent</Button>
            </div>

            <h4>Ghost</h4>
            <div className="flex gap-1">
                <Button color={ColorDefinitions.Blue} variant="ghost">Outline</Button>
                <Button color={ColorDefinitions.Blue} variant="ghost" iconOnly><Icon icon={IconDefinitions.bulb} /></Button>
                <Button color={ColorDefinitions.Pink} variant="ghost" rounded={true}>Rounded</Button>
                <Button color={ColorDefinitions.Rose} variant="ghost" circle={true} iconOnly> <Icon icon={IconDefinitions.bulb} /></Button>
            </div>

             <h4>Flat</h4>
            <div className="flex gap-1">
                <Button color={ColorDefinitions.Blue} variant="flat">Outline</Button>
                <Button color={ColorDefinitions.Blue} variant="flat" iconOnly><Icon icon={IconDefinitions.bulb} /></Button>
                <Button color={ColorDefinitions.Pink} variant="flat" rounded={true}>Rounded</Button>
                <Button color={ColorDefinitions.Rose} variant="flat" circle={true} iconOnly> <Icon icon={IconDefinitions.bulb} /></Button>
            </div>

            <h4>Other</h4>
            <div className="flex gap-1">
                <Button color={ColorDefinitions.Olive}>Button bg</Button>
                <Button color={ColorDefinitions.Blue} raised={true}>Raised</Button>
                <Button color={ColorDefinitions.Pink} shadow={true}>Shadow</Button>
                <Button color={ColorDefinitions.Rose}><Icon icon={IconDefinitions.arrow_left} position="left" />Icon left</Button>
                <Button color={ColorDefinitions.Rose}>Icon right<Icon icon={IconDefinitions.arrow_right} position="right" /></Button>
                <Button color={ColorDefinitions.Olive} rounded={true}>Rounded</Button>
                <Button circle={true} color={ColorDefinitions.Olive} iconOnly> <Icon icon={IconDefinitions.bulb} /></Button>                
            </div>

        </div>
    );
};

export const Sizes: StoryFn = () => {
    return (
        <>

            <div className="flex gap-1">
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.ExtraSmall}>Button</Button>
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.Small}>Button</Button>
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.Medium}>Button</Button>
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.Large}>Button</Button>
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.ExtraLarge}>Button</Button>
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.ExtraLarge2}>Button</Button>
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.ExtraLarge3}>Button</Button>
            </div>

            <div className="flex gap-1">
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.ExtraSmall}><Icon icon={IconDefinitions.bulb} position="left" />Button</Button>
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.Small}><Icon icon={IconDefinitions.bulb} position="left" />Button</Button>
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.Medium}><Icon icon={IconDefinitions.bulb} position="left" />Button</Button>
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.Large}><Icon icon={IconDefinitions.bulb} position="left" />Button</Button>
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.ExtraLarge}><Icon icon={IconDefinitions.bulb} position="left" />Button</Button>
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.ExtraLarge2}><Icon icon={IconDefinitions.bulb} position="left" />Button</Button>
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.ExtraLarge3}><Icon icon={IconDefinitions.bulb} position="left" />Button</Button>
            </div>
        </>
    );
};

export const Fluid: Story = {
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        fluid: true,
        children: 'Button',
        onClick: () => console.log('Button'),
    },
};
