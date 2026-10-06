import React, { ReactElement } from "react";
import Avatar from "../../../components/UI/Avatar/Avatar";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import StackedAvatar from "../../../components/UI/Avatar/Stacked/StackedAvatar";
import Fieldset from "../../../components/Typography/Fieldset/Fieldset";

const AvatarDemo = ({
}): ReactElement => {

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


    return (
        <>
            <Fieldset legend="Default" fieldsetCss="mb-3">
                <div className="grid-y">
                    <Avatar initials="NS" />
                    <Avatar icon={IconDefinitions.user} />
                    <Avatar imageUrl={IMG} alt="user avatar" />
                </div>
            </Fieldset>

            <Fieldset legend="Square" fieldsetCss="mb-3">
                <div className="grid-y">
                    <Avatar square initials="NS" background={ColorDefinitions.Rose10} color={ColorDefinitions.Rose30} />
                    <Avatar square icon={IconDefinitions.user} background={ColorDefinitions.Green10} color={ColorDefinitions.Green30} />
                    <Avatar square imageUrl={IMG} alt="user avatar" />
                </div>
            </Fieldset>

            <Fieldset legend="Border" fieldsetCss="mb-3">
                <div className="grid-y">
                    <Avatar border initials="NS"  />
                    <Avatar border icon={IconDefinitions.user} />
                    <Avatar border imageUrl={IMG} alt="user avatar" />
                </div>
            </Fieldset>

                <Fieldset legend="BorderAndAutoColor" fieldsetCss="mb-3">
                <div className="grid-y">
                    <Avatar border initials="NS" autoColor />
                    <Avatar border icon={IconDefinitions.user} autoColor/>
                    <Avatar border imageUrl={IMG} alt="user avatar" />
                </div>
            </Fieldset>


            <Fieldset legend="Shadow" fieldsetCss="mb-3">
                <div className="grid-y">
                    <Avatar shadow initials="NS"  />
                    <Avatar shadow initials="NS" background={ColorDefinitions.Rose10} color={ColorDefinitions.Rose30} />
                    <Avatar shadow icon={IconDefinitions.user} background={ColorDefinitions.Green10} color={ColorDefinitions.Green30} />
                    <Avatar shadow imageUrl={IMG} alt="user avatar" />
                </div>
            </Fieldset>

            <Fieldset legend="Float" fieldsetCss="mb-3">
                <div className="grid-y">
                    <Avatar float initials="NS" background={ColorDefinitions.Rose10} color={ColorDefinitions.Rose30} />
                    <Avatar float icon={IconDefinitions.user} background={ColorDefinitions.Green10} color={ColorDefinitions.Green30} />
                    <Avatar float imageUrl={IMG} alt="user avatar" />
                </div>
            </Fieldset>

            <Fieldset legend="Background" fieldsetCss="mb-3">
                <div className="grid-y ">
                    <Avatar shadow icon={IconDefinitions.user} background={ColorDefinitions.Blue} />
                    <Avatar shadow background={ColorDefinitions.Purple} imageUrl={IMG} alt="user avatar" />
                    <Avatar shadow background={ColorDefinitions.Pink} initials="NS" />
                </div>
            </Fieldset>


            <Fieldset legend="AutoColor" fieldsetCss="mb-3">
                <div className="grid-y">
                    {PEOPLE.map(p => (
                        <Avatar key={p.tooltip} autoColor initials={p.initials} tooltip={p.tooltip} />
                    ))}
                    <Avatar autoColor icon={IconDefinitions.user} tooltip="Thomas Smith" /> {/* zelfde kleur als TS */}
                    <Avatar autoColor icon={IconDefinitions.user} />
                    <Avatar autoColor imageUrl={IMG} tooltip="Foto: geen autoColor" />
                </div>
            </Fieldset>


            <Fieldset legend="Sizes" fieldsetCss="mb-3">
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
            </Fieldset>

            <Fieldset legend="MediaObject" fieldsetCss="mb-3">
                <div className="media-object">
                    <Avatar shadow initials="JS" tooltip="Jese Leos" autoColor />
                    <div className="media-object__content">
                        <p className="media-object__title">Jese Leos</p>
                        <p className="media-object__subtitle">Joined in August 2014</p>
                    </div>
                </div>
            </Fieldset>

            <Fieldset legend="Stacked" fieldsetCss="mb-3">
                <StackedAvatar css="mb-3"
                    counter={4}
                    avatars={[
                        <Avatar key="img-1" imageUrl={IMG} tooltip="Jese Leos" />,
                        <Avatar key="img-2" imageUrl={IMG} tooltip="Jese Leos" />,
                        ...PEOPLE.map(p => <Avatar key={p.tooltip} {...p} />),
                    ]}
                />
            </Fieldset>


            <Fieldset legend="StackedAutoColor" fieldsetCss="mb-3">
                <StackedAvatar css="mb-3"
                    autoColor
                    counter={12}
                    avatars={[
                        ...PEOPLE.map(p => <Avatar key={p.tooltip} {...p} />),
                        <Avatar key="icon" icon={IconDefinitions.user} tooltip="User" />,
                    ]}
                />
            </Fieldset>


            <Fieldset legend="StackedSizes" fieldsetCss="mb-3">
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
            </Fieldset>

        </>
    )
}

export default AvatarDemo;
