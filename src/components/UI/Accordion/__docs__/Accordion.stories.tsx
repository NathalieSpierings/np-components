import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { ColorDefinitions } from '../../../../lib/utils/definitions';
import Accordion, { AccordionSection } from '../Accordion';
import React from 'react';


const meta: Meta<typeof Accordion> = {
    title: 'UI kit/Accordion',
    component: Accordion,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div style={{ width: '30vw' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: StoryFn = () => {
    return (
        <Accordion>
            <AccordionSection title="Accordion Item #1">
                <p>
                    <em>The Art of Slowing Down</em>
                </p>
                <p>
                    In a world that constantly demands more of our attention, learning the art of slowing down has
                    become a lost skill. We rush through tasks, multitask to exhaustion, and measure success in moments
                    of frenetic activity. Yet, it is in the stillness that we often find our greatest insights. Slowing
                    down doesn’t mean being idle; rather, it’s about giving ourselves permission to breathe, to notice,
                    and to appreciate the subtle beauty in the world around us. By embracing moments of calm and
                    reflection, we allow ourselves the space to recharge and live more intentionally.
                </p>
            </AccordionSection>
            <AccordionSection title="Accordion Item #2">Sed ut perspiciatis unde omnis iste ...</AccordionSection>
            <AccordionSection title="Accordion Item #3">Sed ut perspiciatis unde omnis iste ...</AccordionSection>
            <AccordionSection title="Accordion Item #4">Sed ut perspiciatis unde omnis iste ...</AccordionSection>
        </Accordion>
    );
};

export const OpenIndex: StoryFn = () => {
    return (
        <Accordion defaultOpenIndex={2}>
            <AccordionSection title="Accordion Item #1">
                <p>
                    <em>The Art of Slowing Down</em>
                </p>
                <p>
                    In a world that constantly demands more of our attention, learning the art of slowing down has
                    become a lost skill. We rush through tasks, multitask to exhaustion, and measure success in moments
                    of frenetic activity. Yet, it is in the stillness that we often find our greatest insights. Slowing
                    down doesn’t mean being idle; rather, it’s about giving ourselves permission to breathe, to notice,
                    and to appreciate the subtle beauty in the world around us. By embracing moments of calm and
                    reflection, we allow ourselves the space to recharge and live more intentionally.
                </p>
            </AccordionSection>
            <AccordionSection title="Accordion Item #2">Sed ut perspiciatis unde omnis iste ...</AccordionSection>
            <AccordionSection title="Accordion Item #3">Sed ut perspiciatis unde omnis iste ...</AccordionSection>
            <AccordionSection title="Accordion Item #4">Sed ut perspiciatis unde omnis iste ...</AccordionSection>
        </Accordion>
    );
};

export const AllCollapsed: StoryFn = () => {
    return (
        <Accordion defaultOpenIndex={-1}>
            <AccordionSection title="Accordion Item #1">
                <p>
                    <em>The Art of Slowing Down</em>
                </p>
                <p>
                    In a world that constantly demands more of our attention, learning the art of slowing down has
                    become a lost skill. We rush through tasks, multitask to exhaustion, and measure success in moments
                    of frenetic activity. Yet, it is in the stillness that we often find our greatest insights. Slowing
                    down doesn’t mean being idle; rather, it’s about giving ourselves permission to breathe, to notice,
                    and to appreciate the subtle beauty in the world around us. By embracing moments of calm and
                    reflection, we allow ourselves the space to recharge and live more intentionally.
                </p>
            </AccordionSection>
            <AccordionSection title="Accordion Item #2">Sed ut perspiciatis unde omnis iste ...</AccordionSection>
            <AccordionSection title="Accordion Item #3">Sed ut perspiciatis unde omnis iste ...</AccordionSection>
            <AccordionSection title="Accordion Item #4">Sed ut perspiciatis unde omnis iste ...</AccordionSection>
        </Accordion>
    );
};

export const Color: StoryFn = () => {
    return (
        <Accordion
            headerBackground={ColorDefinitions.Olive30}
            contentBackground={ColorDefinitions.Olive}
            accentColor={ColorDefinitions.Green}
        >
            <AccordionSection title="Accordion Item #1">
                <p>
                    <em>The Art of Slowing Down</em>
                </p>
                <p>
                    In a world that constantly demands more of our attention, learning the art of slowing down has
                    become a lost skill. We rush through tasks, multitask to exhaustion, and measure success in moments
                    of frenetic activity. Yet, it is in the stillness that we often find our greatest insights. Slowing
                    down doesn’t mean being idle; rather, it’s about giving ourselves permission to breathe, to notice,
                    and to appreciate the subtle beauty in the world around us. By embracing moments of calm and
                    reflection, we allow ourselves the space to recharge and live more intentionally.
                </p>
            </AccordionSection>
            <AccordionSection title="Accordion Item #2">Sed ut perspiciatis unde omnis iste ...</AccordionSection>
            <AccordionSection title="Accordion Item #3">Sed ut perspiciatis unde omnis iste ...</AccordionSection>
            <AccordionSection title="Accordion Item #4">Sed ut perspiciatis unde omnis iste ...</AccordionSection>
        </Accordion>
    );
};
