import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { ReactElement } from 'react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router';
import { ColorDefinitions, IconDefinitions } from '../../../../lib/utils/definitions';
import AnimatedOutlet from '../../../Base/AnimatedOutlet/AnimatedOutlet';
import Button from '../../../UI/Button/Button';
import Card from '../../../UI/Card/Card';
import Icon from '../../../UI/Icons/Icon/Icon';
import PageOverlay from '../PageOverlay';
import React from 'react';

const meta: Meta<typeof PageOverlay> = {
    title: 'UI Kit/PageOverlay',
    component: PageOverlay,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof PageOverlay>;

const TestPage = (): ReactElement => {
    const nav = useNavigate();
    return (
            <Card
                headerSticky={true}
                title={
                    <>
                        <h3>General Info</h3>
                        <p>Welkom to the overlay page!</p>
                    </>
                }
                headerActions={[
                    <Button key="btnGoBack" onClick={() => nav(-1)}>
                        <Icon icon={IconDefinitions.arrow_left} />
                        Go back
                    </Button>,
                    <Button key="btnSaveChanges" color={ColorDefinitions.Primary} shadow={true}>
                        Save changes
                    </Button>,
                ]}
            >
                <p>
                    In the quietude of a sprawling forest, where the whispers of the wind caress the ancient branches, a
                    hidden world thrives in harmonious rhythm. Sunlight filters through the canopy, dappling the forest
                    floor with patches of gold, while the air is rich with the earthy scent of moss and pine. Birds of
                    myriad colors flit between the trees, their songs intertwining in a melodic symphony that dances on
                    the breeze. Tiny creatures scuttle beneath the undergrowth, their movements almost imperceptible
                    amidst the tapestry of roots and leaves. The forest is a sanctuary, a living, breathing organism
                    that hums with life and history, each element intricately connected to the next. It holds secrets
                    older than time itself, etched into the rugged bark of trees that have stood as silent witnesses to
                    the ebb and flow of centuries. This timeless realm invites those who venture within to pause, to
                    breathe deeply, and to remember their place in the grand mosaic of existence, where every moment is
                    both fleeting and eternal.
                </p>
                <p>
                    In the quietude of a sprawling forest, where the whispers of the wind caress the ancient branches, a
                    hidden world thrives in harmonious rhythm. Sunlight filters through the canopy, dappling the forest
                    floor with patches of gold, while the air is rich with the earthy scent of moss and pine. Birds of
                    myriad colors flit between the trees, their songs intertwining in a melodic symphony that dances on
                    the breeze. Tiny creatures scuttle beneath the undergrowth, their movements almost imperceptible
                    amidst the tapestry of roots and leaves. The forest is a sanctuary, a living, breathing organism
                    that hums with life and history, each element intricately connected to the next. It holds secrets
                    older than time itself, etched into the rugged bark of trees that have stood as silent witnesses to
                    the ebb and flow of centuries. This timeless realm invites those who venture within to pause, to
                    breathe deeply, and to remember their place in the grand mosaic of existence, where every moment is
                    both fleeting and eternal.
                </p>
                <p>
                    In the quietude of a sprawling forest, where the whispers of the wind caress the ancient branches, a
                    hidden world thrives in harmonious rhythm. Sunlight filters through the canopy, dappling the forest
                    floor with patches of gold, while the air is rich with the earthy scent of moss and pine. Birds of
                    myriad colors flit between the trees, their songs intertwining in a melodic symphony that dances on
                    the breeze. Tiny creatures scuttle beneath the undergrowth, their movements almost imperceptible
                    amidst the tapestry of roots and leaves. The forest is a sanctuary, a living, breathing organism
                    that hums with life and history, each element intricately connected to the next. It holds secrets
                    older than time itself, etched into the rugged bark of trees that have stood as silent witnesses to
                    the ebb and flow of centuries. This timeless realm invites those who venture within to pause, to
                    breathe deeply, and to remember their place in the grand mosaic of existence, where every moment is
                    both fleeting and eternal.
                </p>
                <p>
                    In the quietude of a sprawling forest, where the whispers of the wind caress the ancient branches, a
                    hidden world thrives in harmonious rhythm. Sunlight filters through the canopy, dappling the forest
                    floor with patches of gold, while the air is rich with the earthy scent of moss and pine. Birds of
                    myriad colors flit between the trees, their songs intertwining in a melodic symphony that dances on
                    the breeze. Tiny creatures scuttle beneath the undergrowth, their movements almost imperceptible
                    amidst the tapestry of roots and leaves. The forest is a sanctuary, a living, breathing organism
                    that hums with life and history, each element intricately connected to the next. It holds secrets
                    older than time itself, etched into the rugged bark of trees that have stood as silent witnesses to
                    the ebb and flow of centuries. This timeless realm invites those who venture within to pause, to
                    breathe deeply, and to remember their place in the grand mosaic of existence, where every moment is
                    both fleeting and eternal.
                </p>
                <p>
                    In the quietude of a sprawling forest, where the whispers of the wind caress the ancient branches, a
                    hidden world thrives in harmonious rhythm. Sunlight filters through the canopy, dappling the forest
                    floor with patches of gold, while the air is rich with the earthy scent of moss and pine. Birds of
                    myriad colors flit between the trees, their songs intertwining in a melodic symphony that dances on
                    the breeze. Tiny creatures scuttle beneath the undergrowth, their movements almost imperceptible
                    amidst the tapestry of roots and leaves. The forest is a sanctuary, a living, breathing organism
                    that hums with life and history, each element intricately connected to the next. It holds secrets
                    older than time itself, etched into the rugged bark of trees that have stood as silent witnesses to
                    the ebb and flow of centuries. This timeless realm invites those who venture within to pause, to
                    breathe deeply, and to remember their place in the grand mosaic of existence, where every moment is
                    both fleeting and eternal.
                </p>
                <p>
                    In the quietude of a sprawling forest, where the whispers of the wind caress the ancient branches, a
                    hidden world thrives in harmonious rhythm. Sunlight filters through the canopy, dappling the forest
                    floor with patches of gold, while the air is rich with the earthy scent of moss and pine. Birds of
                    myriad colors flit between the trees, their songs intertwining in a melodic symphony that dances on
                    the breeze. Tiny creatures scuttle beneath the undergrowth, their movements almost imperceptible
                    amidst the tapestry of roots and leaves. The forest is a sanctuary, a living, breathing organism
                    that hums with life and history, each element intricately connected to the next. It holds secrets
                    older than time itself, etched into the rugged bark of trees that have stood as silent witnesses to
                    the ebb and flow of centuries. This timeless realm invites those who venture within to pause, to
                    breathe deeply, and to remember their place in the grand mosaic of existence, where every moment is
                    both fleeting and eternal.
                </p>
                <p>
                    In the quietude of a sprawling forest, where the whispers of the wind caress the ancient branches, a
                    hidden world thrives in harmonious rhythm. Sunlight filters through the canopy, dappling the forest
                    floor with patches of gold, while the air is rich with the earthy scent of moss and pine. Birds of
                    myriad colors flit between the trees, their songs intertwining in a melodic symphony that dances on
                    the breeze. Tiny creatures scuttle beneath the undergrowth, their movements almost imperceptible
                    amidst the tapestry of roots and leaves. The forest is a sanctuary, a living, breathing organism
                    that hums with life and history, each element intricately connected to the next. It holds secrets
                    older than time itself, etched into the rugged bark of trees that have stood as silent witnesses to
                    the ebb and flow of centuries. This timeless realm invites those who venture within to pause, to
                    breathe deeply, and to remember their place in the grand mosaic of existence, where every moment is
                    both fleeting and eternal.
                </p>
                <p>
                    In the quietude of a sprawling forest, where the whispers of the wind caress the ancient branches, a
                    hidden world thrives in harmonious rhythm. Sunlight filters through the canopy, dappling the forest
                    floor with patches of gold, while the air is rich with the earthy scent of moss and pine. Birds of
                    myriad colors flit between the trees, their songs intertwining in a melodic symphony that dances on
                    the breeze. Tiny creatures scuttle beneath the undergrowth, their movements almost imperceptible
                    amidst the tapestry of roots and leaves. The forest is a sanctuary, a living, breathing organism
                    that hums with life and history, each element intricately connected to the next. It holds secrets
                    older than time itself, etched into the rugged bark of trees that have stood as silent witnesses to
                    the ebb and flow of centuries. This timeless realm invites those who venture within to pause, to
                    breathe deeply, and to remember their place in the grand mosaic of existence, where every moment is
                    both fleeting and eternal.
                </p>
                <p>
                    In the quietude of a sprawling forest, where the whispers of the wind caress the ancient branches, a
                    hidden world thrives in harmonious rhythm. Sunlight filters through the canopy, dappling the forest
                    floor with patches of gold, while the air is rich with the earthy scent of moss and pine. Birds of
                    myriad colors flit between the trees, their songs intertwining in a melodic symphony that dances on
                    the breeze. Tiny creatures scuttle beneath the undergrowth, their movements almost imperceptible
                    amidst the tapestry of roots and leaves. The forest is a sanctuary, a living, breathing organism
                    that hums with life and history, each element intricately connected to the next. It holds secrets
                    older than time itself, etched into the rugged bark of trees that have stood as silent witnesses to
                    the ebb and flow of centuries. This timeless realm invites those who venture within to pause, to
                    breathe deeply, and to remember their place in the grand mosaic of existence, where every moment is
                    both fleeting and eternal.
                </p>
            </Card>
       
    );
};
const HomePage = (): ReactElement => {
    const nav = useNavigate();
    return (
        <Button color={ColorDefinitions.Primary} onClick={() => nav('/test')}>
            Click me!
        </Button>
    );
};

export const Default: StoryFn = () => {
    return (
        <MemoryRouter initialEntries={['/']}>
            <AnimatedOutlet />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/test"
                    element={
                        <PageOverlay>
                            <TestPage />
                        </PageOverlay>
                    }
                />
            </Routes>
        </MemoryRouter>
    );
};
