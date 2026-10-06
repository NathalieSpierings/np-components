import type { Meta, StoryFn } from '@storybook/react-webpack5';
import Avatar from '../Avatar';
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from '../../../../lib/utils/definitions';
import StackedAvatar from '../Stacked/StackedAvatar';
import React from 'react';


const meta: Meta<typeof Avatar> = {
    title: 'UI kit/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered',
    },
};

export default meta;


const IMG = 'https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';

const PEOPLE = [
    { initials: 'TS', tooltip: 'Thomas Smith' },
    { initials: 'JS', tooltip: 'Jackson Smutt' },
    { initials: 'LS', tooltip: 'Lindsay Sneeder' },
    { initials: 'TY', tooltip: 'Tyler Swagger' },
];




const SIZES = [
    SizeDefinitions.ExtraExtraSmall,
    SizeDefinitions.ExtraSmall,
    SizeDefinitions.Small,
    undefined, // standaard
    SizeDefinitions.Medium,
    SizeDefinitions.Large,
    SizeDefinitions.ExtraLarge,
    SizeDefinitions.ExtraLarge2,
    SizeDefinitions.ExtraLarge3,
];


export const Default: StoryFn = () => {
    return (
        <div className="grid-y">
            <Avatar initials="NS" />
            <Avatar icon={IconDefinitions.user} />
            <Avatar imageUrl={IMG} alt="user avatar" />
        </div>
    );
};

export const Square: StoryFn = () => {
    return (
        <div className="grid-y">
            <Avatar square initials="NS" background={ColorDefinitions.Rose10} color={ColorDefinitions.Rose30} />
            <Avatar square icon={IconDefinitions.user} background={ColorDefinitions.Green10} color={ColorDefinitions.Green30} />
            <Avatar square imageUrl={IMG} alt="user avatar" />
        </div>
    );
};

export const Border: StoryFn = () => {
    return (
        <div className="grid-y">
            <Avatar border initials="NS" background={ColorDefinitions.Rose10} color={ColorDefinitions.Rose30} />
            <Avatar border icon={IconDefinitions.user} background={ColorDefinitions.Green10} color={ColorDefinitions.Green30} />
            <Avatar border imageUrl={IMG} alt="user avatar" />
        </div>
    );
};


export const BorderAndAutoColor: StoryFn = () => {
    return (
        <div className="grid-y">
            <Avatar border initials="NS" autoColor/>
            <Avatar border icon={IconDefinitions.user} autoColor/>
            <Avatar border imageUrl={IMG} alt="user avatar" />
        </div>
    );
};

export const Shadow: StoryFn = () => {
    return (
        <div className="grid-y">
            <Avatar shadow initials="NS" />
            <Avatar shadow icon={IconDefinitions.user} />
            <Avatar shadow imageUrl={IMG} alt="user avatar" />
        </div>
    );
};

export const ShadowAndBackground: StoryFn = () => {
    return (
         <div className="grid-y ">
            <Avatar shadow icon={IconDefinitions.user} background={ColorDefinitions.Blue} />
            <Avatar shadow background={ColorDefinitions.Purple} imageUrl={IMG} alt="user avatar" />
            <Avatar shadow background={ColorDefinitions.Pink} initials="NS" />
        </div>
    );
};
export const ShadowAndAutoColor: StoryFn = () => {
    return (
        <div className="grid-y">
            <Avatar shadow autoColor initials="NS"   />
            <Avatar shadow autoColor icon={IconDefinitions.user}/>
            <Avatar shadow autoColor imageUrl={IMG} alt="user avatar" />
        </div>
    );
};

export const Float: StoryFn = () => {
    return (
        <div className="grid-y">
            <Avatar float initials="NS" background={ColorDefinitions.Rose10} color={ColorDefinitions.Rose30} />
            <Avatar float icon={IconDefinitions.user} background={ColorDefinitions.Green10} color={ColorDefinitions.Green30} />
            <Avatar float imageUrl={IMG} alt="user avatar" />
        </div>

    );
};

export const Background: StoryFn = () => {
    return (
        <div className="grid-y ">
            <Avatar icon={IconDefinitions.user} background={ColorDefinitions.Blue} />
            <Avatar background={ColorDefinitions.Purple} imageUrl={IMG} alt="user avatar" />
            <Avatar background={ColorDefinitions.Pink} initials="NS" />
        </div>
    );
};


export const AutoColor: StoryFn = () => {
    return (
        <div className="grid-y">
            {PEOPLE.map(p => (
                <Avatar key={p.tooltip} autoColor initials={p.initials} tooltip={p.tooltip} />
            ))}
            <Avatar autoColor icon={IconDefinitions.user} tooltip="Thomas Smith" /> {/* zelfde kleur als TS */}
            <Avatar autoColor icon={IconDefinitions.user} />
            <Avatar autoColor imageUrl={IMG} tooltip="Foto: geen autoColor" />
        </div>
    );
};


export const Sizes: StoryFn = () => {
    return (
        <div className="grid-x gap-5">
            <div className="grid-y">
                {SIZES.map(size => (
                    <Avatar key={size ?? 'default'} autoColor icon={IconDefinitions.user} size={size} />
                ))}
            </div>
            <div className="grid-y">
                {SIZES.map((size, idx) => {
                    const person = PEOPLE[idx % PEOPLE.length];

                    return (
                        <Avatar
                            key={size ?? 'default'}
                            autoColor
                            initials={person.initials}
                            tooltip={person.tooltip}
                            size={size}
                        />
                    );
                })}

            </div>
            <div className="grid-y">
                {SIZES.map(size => (
                    <Avatar key={size ?? 'default'} autoColor imageUrl={IMG} tooltip="Foto: geen autoColor" size={size} />
                ))}
            </div>
        </div>
    );
};


export const MediaObject: StoryFn = () => {
    return (
        <div className="media-object">
            <Avatar shadow initials="JS" tooltip="Jese Leos" autoColor />
            <div className="media-object__content">
                <p className="media-object__title">Jese Leos</p>
                <p className="media-object__subtitle">Joined in August 2014</p>
            </div>
        </div>
    );
};

export const Stacked: StoryFn = () => {
    return (
        <StackedAvatar css="mb-3"
            counter={4}
            avatars={[
                <Avatar key="img-1" imageUrl={IMG} tooltip="Jese Leos" />,
                <Avatar key="img-2" imageUrl={IMG} tooltip="Jese Leos" />,
                ...PEOPLE.map(p => <Avatar key={p.tooltip} {...p} />),
            ]}
        />
    );
};

export const StackedAutoColor: StoryFn = () => {
    return (
        <StackedAvatar css="mb-3"
            autoColor
            counter={12}
            avatars={[
                ...PEOPLE.map(p => <Avatar key={p.tooltip} {...p} />),
                <Avatar key="icon" icon={IconDefinitions.user} tooltip="User" />,
            ]}
        />
    );
};

export const StackedSizes: StoryFn = () => {
    return (
        <div className="grid-y gap-2 mb-3">
            {SIZES.map((size, idx) => (
                <StackedAvatar
                    key={size ?? 'default'}
                    size={size}
                    autoColor
                    counter={4}
                    avatars={[0, 1, 2].map(offset => {
                        const p = PEOPLE[(idx + offset) % PEOPLE.length];
                        return <Avatar key={p.tooltip} {...p} />;
                    })}
                />
            ))}
        </div>
    );
};
