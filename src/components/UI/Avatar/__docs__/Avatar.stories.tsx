import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import Avatar from '../Avatar';
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from '../../../../lib/utils/definitions';
import React from 'react';


const meta: Meta<typeof Avatar> = {
    title: 'UI kit/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered',
    },    
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: StoryFn = (args) => {
    return (
        <div className="grid">
            <Avatar icon={IconDefinitions.user} />
            <Avatar imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
            <Avatar initials="NS" />
        </div>
    );
};

export const Square: StoryFn = (args) => {
    return (
        <div className="grid">
            <Avatar icon={IconDefinitions.user} background={ColorDefinitions.SurfaceDark} square />
            <Avatar background={ColorDefinitions.SurfaceDark} square imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
            <Avatar background={ColorDefinitions.SurfaceDark} square initials="NS" />
        </div>
    );
};

export const Float: StoryFn = (args) => {
    return (
        <div className="grid">
                <Avatar float icon={IconDefinitions.user} background={ColorDefinitions.SurfaceDark} />
                <Avatar float background={ColorDefinitions.SurfaceDark} imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                <Avatar float background={ColorDefinitions.SurfaceDark} initials="NS" />
            </div>

    );
};

export const Border: StoryFn = (args) => {
    return (
       <div className="grid">
                <Avatar border icon={IconDefinitions.user} background={ColorDefinitions.SurfaceDark} />
                <Avatar border background={ColorDefinitions.SurfaceDark} imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                <Avatar border background={ColorDefinitions.SurfaceDark} initials="NS" />
            </div>
    );
};


export const Shadow: StoryFn = (args) => {
    return (
      <div className="grid">
                <Avatar shadow icon={IconDefinitions.user} background={ColorDefinitions.SurfaceDark} />
                <Avatar shadow background={ColorDefinitions.SurfaceDark} imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                <Avatar shadow background={ColorDefinitions.SurfaceDark} initials="NS" />
            </div>
    );
};

export const Background: StoryFn = (args) => {
    return (
     <div className="grid">
                <Avatar shadow icon={IconDefinitions.user} background={ColorDefinitions.Blue} />
                <Avatar shadow background={ColorDefinitions.Purple} imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                <Avatar shadow background={ColorDefinitions.Pink} initials="NS" />
            </div>
    );
};

export const Sizes: StoryFn = (args) => {
    return (
     <div className="grid">
                <div>
                     <Avatar icon={IconDefinitions.user} size={SizeDefinitions.ExtraSmall} />
                     <Avatar icon={IconDefinitions.user} size={SizeDefinitions.Small} />
                     <Avatar icon={IconDefinitions.user} />
                     <Avatar icon={IconDefinitions.user} size={SizeDefinitions.Medium} />
                     <Avatar icon={IconDefinitions.user} size={SizeDefinitions.Large} />
                     <Avatar icon={IconDefinitions.user} size={SizeDefinitions.ExtraLarge} />
                     <Avatar icon={IconDefinitions.user} size={SizeDefinitions.ExtraLarge2} />
                </div>
                <div>
                    <Avatar size={SizeDefinitions.ExtraSmall}  imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                    <Avatar size={SizeDefinitions.Small}  imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                    <Avatar imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                    <Avatar size={SizeDefinitions.Medium}  imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                    <Avatar size={SizeDefinitions.Large}  imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                    <Avatar size={SizeDefinitions.ExtraLarge}  imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                    <Avatar size={SizeDefinitions.ExtraLarge2}  imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                </div>
                <div>
                    <Avatar border background={ColorDefinitions.SurfaceDark} initials="NS" size={SizeDefinitions.ExtraSmall}/>
                    <Avatar border background={ColorDefinitions.SurfaceDark} initials="NS" size={SizeDefinitions.Small}/>
                    <Avatar border background={ColorDefinitions.SurfaceDark} initials="NS" />
                    <Avatar border background={ColorDefinitions.SurfaceDark} initials="NS" size={SizeDefinitions.Medium} />
                    <Avatar border background={ColorDefinitions.SurfaceDark} initials="NS" size={SizeDefinitions.Large}/>
                    <Avatar border background={ColorDefinitions.SurfaceDark} initials="NS" size={SizeDefinitions.ExtraLarge}/>
                    <Avatar border background={ColorDefinitions.SurfaceDark} initials="NS" size={SizeDefinitions.ExtraLarge2}/>
                </div>
            </div>
    );
};


export const WithText: StoryFn = (args) => {
    return (
    <div className="avatar__text">
                <Avatar shadow={true} imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                <div>
                    <div>Jese Leos</div>
                    <div>Joined in August 2014</div>
                </div>
            </div>
    );
};

export const Stacked: StoryFn = (args) => {
    return (
    <div className="row">
                <ul className="avatar-group">
                    <li>
                        <Avatar shadow={true} imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                    </li>
                    <li>
                        <Avatar shadow={true} imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                    </li>
                    <li>
                        <Avatar shadow={true} imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                    </li>
                    <li>
                        <Avatar shadow={true} imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                    </li>
                    <li>
                        <div className="avatar">
                            +4
                        </div>
                    </li>
                </ul>
            </div>
    );
};


export const StackedSizes: StoryFn = (args) => {
    return (
    <>
    <div className="row">
                <div className="col-12">
                    <ul className="avatar-group avatar-group--tiny">
                        <li>
                            <Avatar shadow={true} imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                        </li>
                        <li>
                            <Avatar shadow={true} imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                        </li>
                        <li>
                            <span className="avatar">
                                +4
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <ul className="avatar-group avatar-group--xs">
                        <li>
                            <Avatar shadow={true} imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                        </li>
                        <li>
                            <Avatar shadow={true} imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                        </li>
                        <li>
                            <span className="avatar">
                                +4
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <ul className="avatar-group avatar-group--sm">
                        <li>
                            <Avatar shadow={true} imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                        </li>
                        <li>
                            <Avatar shadow={true} imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                        </li>
                        <li>
                            <span className="avatar">
                                +4
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <ul className="avatar-group avatar-group--md">
                        <li>
                            <Avatar shadow={true} imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                        </li>
                        <li>
                            <Avatar shadow={true} imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                        </li>
                        <li>
                            <span className="avatar ">
                                +4
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <ul className="avatar-group avatar-group--lg">
                        <li>
                            <Avatar shadow={true} imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                        </li>
                        <li>
                            <Avatar shadow={true} imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                        </li>
                        <li>
                            <span className="avatar ">
                                +4
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <ul className="avatar-group avatar-group--xl">
                        <li>
                            <Avatar shadow={true} imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                        </li>
                        <li>
                            <Avatar shadow={true} imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                        </li>
                        <li>
                            <span className="avatar ">
                                +4
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <ul className="avatar-group avatar-group--2xl">
                        <li>
                            <Avatar shadow={true} imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                        </li>
                        <li>
                            <Avatar shadow={true} imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                        </li>
                        <li>
                            <span className="avatar ">
                                +4
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <ul className="avatar-group avatar-group--3xl">
                        <li>
                            <Avatar shadow={true} imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                        </li>
                        <li>
                            <Avatar shadow={true} imageUrl="https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="user avatar" />
                        </li>
                        <li>
                            <span className="avatar ">
                                +4
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
    </>
    );
};