import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { SvgSprite } from '../../../../assets/SvgSprite';
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from '../../../../lib/utils/definitions';
import Icon from '../../Icons/Icon/Icon';
import { ScrollProvider, useScrollContext } from '../../../Providers/ScrollContext';
import Badge from '../../Badge/Badge';
import Button from '../../Button/Button';
import Card from '../Card';
import React, { useState } from 'react';
import  Dropdown from '../../../Forms/Dropdown/Dropdown';

const meta: Meta<typeof Card> = {
    title: 'UI kit/Card',
    component: Card,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div style={{ width: '50vw' }}>
                <ScrollProvider>
                    <Story />
                    <SvgSprite />
                </ScrollProvider>
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: StoryFn = () => {
    return (
        <Card
            background={ColorDefinitions.Theme100}
            title={'Card title'}
            headerActions={[
                <Icon key="iconSearch" icon={IconDefinitions.search} variant="circle" size={SizeDefinitions.Small} />,
                <Icon key="iconRefresh" icon={IconDefinitions.refresh} variant="circle" size={SizeDefinitions.Small} />,
                <Icon key="iconEllipsis" icon={IconDefinitions.ellipsis_h} variant="circle" size={SizeDefinitions.Small} />,
            ]}
            headerBoxProps={{
                borderColor: ColorDefinitions.Theme100,
            }}
            footerLeftContent={<p>Action</p>}
            footerRightContent={<p>Action</p>}
            footerBoxProps={{
                borderColor: ColorDefinitions.Theme100,
            }}
        >
            <p>The forest was alive with the soft murmur of nature.</p>
            <p className="text-mute">Muted text.</p>
        </Card>
    );
};

export const Shadow: StoryFn = () => {
    return (
        <Card
            background={ColorDefinitions.Theme100}
            shadowColor={ColorDefinitions.Theme100}
            title={'Card title'}
            headerActions={[
                <Icon key="iconSearch" icon={IconDefinitions.search} variant="circle" size={SizeDefinitions.Small} />,
                <Icon key="iconRefresh" icon={IconDefinitions.refresh} variant="circle" size={SizeDefinitions.Small} />,
                <Icon key="iconEllipsis" icon={IconDefinitions.ellipsis_h} variant="circle" size={SizeDefinitions.Small} />,
            ]}
            headerBoxProps={{
                borderColor: ColorDefinitions.Theme100,
            }}
            footerLeftContent={<p>Action</p>}
            footerRightContent={<p>Action</p>}
            footerBoxProps={{
                borderColor: ColorDefinitions.Theme100,
            }}
        >
            <p>The forest was alive with the soft murmur of nature.</p>
            <p className="text-mute">Muted text.</p>
        </Card>
    );
};

export const ShadowHover: StoryFn = () => {
    return (
        <Card
            background={ColorDefinitions.Theme100}
            hoverShadowColor={ColorDefinitions.Theme100}
            title={'Card title'}
            headerActions={[
                <Icon key="iconSearch" icon={IconDefinitions.search} variant="circle" size={SizeDefinitions.Small} />,
                <Icon key="iconRefresh" icon={IconDefinitions.refresh} variant="circle" size={SizeDefinitions.Small} />,
                <Icon key="iconEllipsis" icon={IconDefinitions.ellipsis_h} variant="circle" size={SizeDefinitions.Small} />,
            ]}
            headerBoxProps={{
                borderColor: ColorDefinitions.Theme100,
            }}
            footerLeftContent={<p>Action</p>}
            footerRightContent={<p>Action</p>}
            footerBoxProps={{
                borderColor: ColorDefinitions.Theme100,
            }}
        >
            <p>The forest was alive with the soft murmur of nature.</p>
            <p className="text-mute">Muted text.</p>
        </Card>
    );
};

export const Background: StoryFn = () => {
    return (
        <Card
            title={'Card title'}
            background={ColorDefinitions.Olive}
            headerActions={[
                <Icon key="iconSearch" icon={IconDefinitions.search} variant="circle" size={SizeDefinitions.Small} />,
                <Icon key="iconRefresh" icon={IconDefinitions.refresh} variant="circle" size={SizeDefinitions.Small} />,

                <Icon key="1" icon={IconDefinitions.search}
                    variant="circle"
                    size={SizeDefinitions.Small}
                    color={ColorDefinitions.Olive10}
                    borderColor={ColorDefinitions.Olive}
                    hoverBorderColor={ColorDefinitions.Olive}
                />,
                <Dropdown 
                    key="2"
                    background={ColorDefinitions.Olive20}
                    dropdownToggle={{
                        prefix: (<Icon
                            icon={IconDefinitions.ellipsis_h}
                            variant="circle"
                            size={SizeDefinitions.Small}
                            color={ColorDefinitions.Olive10}
                            borderColor={ColorDefinitions.Olive}
                            hoverBorderColor={ColorDefinitions.Olive} />)
                    }}
                    menuItems={[
                        {
                            label: 'Item 1'
                        },
                        {
                            label: 'Item 2'
                        },
                        {
                            label: 'Item 3'
                        }
                    ]}
                />
            ]}
            headerBoxProps={{
                background: ColorDefinitions.Olive30,
                borderColor: ColorDefinitions.Olive30,
            }}
            footerLeftContent={<p>Action</p>}
            footerRightContent={<p>Action</p>}
            footerBoxProps={{
                background: ColorDefinitions.Olive20,
                borderColor: ColorDefinitions.Olive20,
            }}
        >
            <p>The forest was alive with the soft murmur of nature.</p>
            <p className="text-mute">Muted text.</p>
        </Card>
    );
};

export const Transparent: StoryFn = () => {
    return (
        <Card
            title={'Card title'}
            headerActions={[
                <Icon key="iconSearch" icon={IconDefinitions.search} variant="circle" size={SizeDefinitions.Small} />,
                <Icon key="iconRefresh" icon={IconDefinitions.refresh} variant="circle" size={SizeDefinitions.Small} />,
                <Icon key="iconEllipsis" icon={IconDefinitions.ellipsis_h} variant="circle" size={SizeDefinitions.Small} />,
            ]}
            headerBoxProps={{
                borderColor: ColorDefinitions.Theme100,
            }}
            footerLeftContent={<p>Action</p>}
            footerRightContent={<p>Action</p>}
            footerBoxProps={{
                borderColor: ColorDefinitions.Theme100,
            }}
        >
            <p>The forest was alive with the soft murmur of nature.</p>
            <p className="text-mute">Muted text.</p>
        </Card>
    );
};

export const TitleContent: StoryFn = () => {
    return (
        <Card
            background={ColorDefinitions.Theme100}
            title={
                <div>
                    Card title
                    <Badge badgeCss="ml-1" size={SizeDefinitions.Tiny} background={ColorDefinitions.Rose30}>
                        HOT
                    </Badge>
                </div>
            }
            headerActions={[
                <Icon key="iconSearch" icon={IconDefinitions.search} variant="circle" size={SizeDefinitions.Small} />,
                <Icon key="iconRefresh" icon={IconDefinitions.refresh} variant="circle" size={SizeDefinitions.Small} />,
                <Icon key="iconEllipsis" icon={IconDefinitions.ellipsis_h} variant="circle" size={SizeDefinitions.Small} />,
            ]}
            headerBoxProps={{
                borderColor: ColorDefinitions.Theme100,
            }}
            footerLeftContent={<p>Action</p>}
            footerRightContent={<p>Action</p>}
            footerBoxProps={{
                borderColor: ColorDefinitions.Theme100,
            }}
        >
            <p>The forest was alive with the soft murmur of nature.</p>
            <p className="text-mute">Muted text.</p>
        </Card>
    );
};

export const HeaderSticky: StoryFn = () => {
    const { scrollPosition } = useScrollContext();

    return (
        <Card
            background={ColorDefinitions.Theme100}
            scrollPosition={scrollPosition}
            title={'Card title'}
            headerSticky={true}
            headerActions={[
                <Button key="btnCancel">
                    <Icon icon={IconDefinitions.arrow_left} position="left" /> Annuleren
                </Button>,
                <Button key="btnSave" color={ColorDefinitions.Primary}>Opslaan</Button>,
            ]}
            headerBoxProps={{
                borderColor: ColorDefinitions.Theme100,
            }}
            footerLeftContent={<p>Action</p>}
            footerRightContent={<p>Action</p>}
            footerBoxProps={{
                borderColor: ColorDefinitions.Theme100,
            }}
        >
            <p>
                In the quietude of a sprawling forest, where the whispers of the wind caress the ancient branches, a
                hidden world thrives in harmonious rhythm. Sunlight filters through the canopy, dappling the forest
                floor with patches of gold, while the air is rich with the earthy scent of moss and pine. Birds of
                myriad colors flit between the trees, their songs intertwining in a melodic symphony that dances on the
                breeze. Tiny creatures scuttle beneath the undergrowth, their movements almost imperceptible amidst the
                tapestry of roots and leaves. The forest is a sanctuary, a living, breathing organism that hums with
                life and history, each element intricately connected to the next. It holds secrets older than time
                itself, etched into the rugged bark of trees that have stood as silent witnesses to the ebb and flow of
                centuries. This timeless realm invites those who venture within to pause, to breathe deeply, and to
                remember their place in the grand mosaic of existence, where every moment is both fleeting and eternal.
            </p>
            <p>
                In the quietude of a sprawling forest, where the whispers of the wind caress the ancient branches, a
                hidden world thrives in harmonious rhythm. Sunlight filters through the canopy, dappling the forest
                floor with patches of gold, while the air is rich with the earthy scent of moss and pine. Birds of
                myriad colors flit between the trees, their songs intertwining in a melodic symphony that dances on the
                breeze. Tiny creatures scuttle beneath the undergrowth, their movements almost imperceptible amidst the
                tapestry of roots and leaves. The forest is a sanctuary, a living, breathing organism that hums with
                life and history, each element intricately connected to the next. It holds secrets older than time
                itself, etched into the rugged bark of trees that have stood as silent witnesses to the ebb and flow of
                centuries. This timeless realm invites those who venture within to pause, to breathe deeply, and to
                remember their place in the grand mosaic of existence, where every moment is both fleeting and eternal.
            </p>
            <p>
                In the quietude of a sprawling forest, where the whispers of the wind caress the ancient branches, a
                hidden world thrives in harmonious rhythm. Sunlight filters through the canopy, dappling the forest
                floor with patches of gold, while the air is rich with the earthy scent of moss and pine. Birds of
                myriad colors flit between the trees, their songs intertwining in a melodic symphony that dances on the
                breeze. Tiny creatures scuttle beneath the undergrowth, their movements almost imperceptible amidst the
                tapestry of roots and leaves. The forest is a sanctuary, a living, breathing organism that hums with
                life and history, each element intricately connected to the next. It holds secrets older than time
                itself, etched into the rugged bark of trees that have stood as silent witnesses to the ebb and flow of
                centuries. This timeless realm invites those who venture within to pause, to breathe deeply, and to
                remember their place in the grand mosaic of existence, where every moment is both fleeting and eternal.
            </p>
            <p>
                In the quietude of a sprawling forest, where the whispers of the wind caress the ancient branches, a
                hidden world thrives in harmonious rhythm. Sunlight filters through the canopy, dappling the forest
                floor with patches of gold, while the air is rich with the earthy scent of moss and pine. Birds of
                myriad colors flit between the trees, their songs intertwining in a melodic symphony that dances on the
                breeze. Tiny creatures scuttle beneath the undergrowth, their movements almost imperceptible amidst the
                tapestry of roots and leaves. The forest is a sanctuary, a living, breathing organism that hums with
                life and history, each element intricately connected to the next. It holds secrets older than time
                itself, etched into the rugged bark of trees that have stood as silent witnesses to the ebb and flow of
                centuries. This timeless realm invites those who venture within to pause, to breathe deeply, and to
                remember their place in the grand mosaic of existence, where every moment is both fleeting and eternal.
            </p>
            <p>
                In the quietude of a sprawling forest, where the whispers of the wind caress the ancient branches, a
                hidden world thrives in harmonious rhythm. Sunlight filters through the canopy, dappling the forest
                floor with patches of gold, while the air is rich with the earthy scent of moss and pine. Birds of
                myriad colors flit between the trees, their songs intertwining in a melodic symphony that dances on the
                breeze. Tiny creatures scuttle beneath the undergrowth, their movements almost imperceptible amidst the
                tapestry of roots and leaves. The forest is a sanctuary, a living, breathing organism that hums with
                life and history, each element intricately connected to the next. It holds secrets older than time
                itself, etched into the rugged bark of trees that have stood as silent witnesses to the ebb and flow of
                centuries. This timeless realm invites those who venture within to pause, to breathe deeply, and to
                remember their place in the grand mosaic of existence, where every moment is both fleeting and eternal.
            </p>
            <p>
                In the quietude of a sprawling forest, where the whispers of the wind caress the ancient branches, a
                hidden world thrives in harmonious rhythm. Sunlight filters through the canopy, dappling the forest
                floor with patches of gold, while the air is rich with the earthy scent of moss and pine. Birds of
                myriad colors flit between the trees, their songs intertwining in a melodic symphony that dances on the
                breeze. Tiny creatures scuttle beneath the undergrowth, their movements almost imperceptible amidst the
                tapestry of roots and leaves. The forest is a sanctuary, a living, breathing organism that hums with
                life and history, each element intricately connected to the next. It holds secrets older than time
                itself, etched into the rugged bark of trees that have stood as silent witnesses to the ebb and flow of
                centuries. This timeless realm invites those who venture within to pause, to breathe deeply, and to
                remember their place in the grand mosaic of existence, where every moment is both fleeting and eternal.
            </p>
            <p>
                In the quietude of a sprawling forest, where the whispers of the wind caress the ancient branches, a
                hidden world thrives in harmonious rhythm. Sunlight filters through the canopy, dappling the forest
                floor with patches of gold, while the air is rich with the earthy scent of moss and pine. Birds of
                myriad colors flit between the trees, their songs intertwining in a melodic symphony that dances on the
                breeze. Tiny creatures scuttle beneath the undergrowth, their movements almost imperceptible amidst the
                tapestry of roots and leaves. The forest is a sanctuary, a living, breathing organism that hums with
                life and history, each element intricately connected to the next. It holds secrets older than time
                itself, etched into the rugged bark of trees that have stood as silent witnesses to the ebb and flow of
                centuries. This timeless realm invites those who venture within to pause, to breathe deeply, and to
                remember their place in the grand mosaic of existence, where every moment is both fleeting and eternal.
            </p>
            <p>
                In the quietude of a sprawling forest, where the whispers of the wind caress the ancient branches, a
                hidden world thrives in harmonious rhythm. Sunlight filters through the canopy, dappling the forest
                floor with patches of gold, while the air is rich with the earthy scent of moss and pine. Birds of
                myriad colors flit between the trees, their songs intertwining in a melodic symphony that dances on the
                breeze. Tiny creatures scuttle beneath the undergrowth, their movements almost imperceptible amidst the
                tapestry of roots and leaves. The forest is a sanctuary, a living, breathing organism that hums with
                life and history, each element intricately connected to the next. It holds secrets older than time
                itself, etched into the rugged bark of trees that have stood as silent witnesses to the ebb and flow of
                centuries. This timeless realm invites those who venture within to pause, to breathe deeply, and to
                remember their place in the grand mosaic of existence, where every moment is both fleeting and eternal.
            </p>
            <p>
                In the quietude of a sprawling forest, where the whispers of the wind caress the ancient branches, a
                hidden world thrives in harmonious rhythm. Sunlight filters through the canopy, dappling the forest
                floor with patches of gold, while the air is rich with the earthy scent of moss and pine. Birds of
                myriad colors flit between the trees, their songs intertwining in a melodic symphony that dances on the
                breeze. Tiny creatures scuttle beneath the undergrowth, their movements almost imperceptible amidst the
                tapestry of roots and leaves. The forest is a sanctuary, a living, breathing organism that hums with
                life and history, each element intricately connected to the next. It holds secrets older than time
                itself, etched into the rugged bark of trees that have stood as silent witnesses to the ebb and flow of
                centuries. This timeless realm invites those who venture within to pause, to breathe deeply, and to
                remember their place in the grand mosaic of existence, where every moment is both fleeting and eternal.
            </p>
            <p>
                In the quietude of a sprawling forest, where the whispers of the wind caress the ancient branches, a
                hidden world thrives in harmonious rhythm. Sunlight filters through the canopy, dappling the forest
                floor with patches of gold, while the air is rich with the earthy scent of moss and pine. Birds of
                myriad colors flit between the trees, their songs intertwining in a melodic symphony that dances on the
                breeze. Tiny creatures scuttle beneath the undergrowth, their movements almost imperceptible amidst the
                tapestry of roots and leaves. The forest is a sanctuary, a living, breathing organism that hums with
                life and history, each element intricately connected to the next. It holds secrets older than time
                itself, etched into the rugged bark of trees that have stood as silent witnesses to the ebb and flow of
                centuries. This timeless realm invites those who venture within to pause, to breathe deeply, and to
                remember their place in the grand mosaic of existence, where every moment is both fleeting and eternal.
            </p>
        </Card>
    );
};

export const Image: StoryFn = () => {
    return (
        <Card
            background={ColorDefinitions.Theme100}
            imageUrl="https://promeetec.nl/wp-content/uploads/2022/02/Promeetec-Gemakkelijk-declareren-VECOZO-scaled-1-1030x1030.jpeg"
            footerLeftContent={<p>Action</p>}
            footerRightContent={<p>Action</p>}
            footerBoxProps={{
                borderColor: ColorDefinitions.Theme100,
            }}
        >
            <p>The forest was alive with the soft murmur of nature.</p>
            <p className="text-mute">Muted text.</p>
        </Card>
    );
};

export const Collapse: StoryFn = () => {
    return (
        <Card collapsible={true} cardCollapsed={false} title={'Card title'}>
            <p>The forest was alive with the soft murmur of nature.</p>
            <p className="text-mute">Muted text.</p>
        </Card>
    );
};


export const CollapseControlled: StoryFn = () => {
    const [collapsed, setCollapsed] = useState(true);
    return (
        <>
            Current state: {collapsed ? "collapsed": "expanded"}
            <Card collapsible={true} cardCollapsed={collapsed} setCardCollapsed={setCollapsed} title={'Card title'}>
                <p>The forest was alive with the soft murmur of nature.</p>
                <p className="text-mute">Muted text.</p>
            </Card>
        </>
    );
};
