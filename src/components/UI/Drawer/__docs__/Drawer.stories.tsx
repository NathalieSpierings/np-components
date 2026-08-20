import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';

import { ColorDefinitions } from '../../../../lib/utils/definitions';
import Button from '../../../UI/Button/Button';
import Modal from '../../../UI/Modal/Modal';
import EventStopper from '../../../Base/EventStopper/EventStopper';
import Drawer from '../Drawer';
import React from 'react';

const meta: Meta<typeof Drawer> = {
    title: 'UI Kit/Drawer',
    component: Drawer,

};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: StoryFn = () => {
    const [open, setOpen] = useState<boolean | null>(null);

    return (
        <>
            <Button onClick={() => setOpen(true)}>Click me!</Button>

            <Drawer title="My title" open={open} openDrawer={setOpen}>
                My drawer content goes here.
            </Drawer>
        </>
    );
};

export const Color: StoryFn = () => {
    const [open, setOpen] = useState<boolean | null>(null);

    return (
        <>
            <Button onClick={() => setOpen(true)}>Click me!</Button>

            <Drawer title="My title" open={open} openDrawer={setOpen} background={ColorDefinitions.Green}>
                My drawer content goes here.
            </Drawer>
        </>
    );
};

export const WithoutOverlay: StoryFn = () => {
    const [drawerOpen, setDrawerOpen] = useState<boolean | null>(false);

    return (
        <>
            <EventStopper>
                <Button onClick={() => setDrawerOpen(true)}>Click me!</Button>
            </EventStopper>

            <EventStopper>
                <Drawer title="My title" open={drawerOpen} openDrawer={setDrawerOpen} useOverlay={false}>
                    My drawer content goes here.
                </Drawer>
            </EventStopper>
        </>
    );
};

export const PositionLeft: StoryFn = () => {
    const [open, setOpen] = useState<boolean | null>(null);

    return (
        <>
            <Button onClick={() => setOpen(true)}>Click me!</Button>

            <Drawer title="My title" position="left" open={open} openDrawer={setOpen}>
                My drawer content goes here.
            </Drawer>
        </>
    );
};

export const WidthFooter: StoryFn = () => {
    const [open, setOpen] = useState<boolean | null>(null);

    return (
        <>
            <Button onClick={() => setOpen(true)}>Click me!</Button>

            <Drawer title="My title" open={open} openDrawer={setOpen} footerContent={<>I am footer content</>}>
                My drawer content goes here.
            </Drawer>
        </>
    );
};

export const ExtraWide: StoryFn = () => {
    const [open, setOpen] = useState<boolean | null>(null);

    return (
        <>
            <Button onClick={() => setOpen(true)}>Click me!</Button>

            <Drawer
                title="My title"
                extraWide={true}
                open={open}
                openDrawer={setOpen}
                footerContent={<>I am footer content</>}
            >
                My drawer content goes here.
            </Drawer>
        </>
    );
};

export const WithModal: StoryFn = () => {
    const [drawerOpen, setDrawerOpen] = useState<boolean | null>(false);
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <>
            <EventStopper>
                <Button onClick={() => setDrawerOpen(true)}>Click me!</Button>
            </EventStopper>
            <EventStopper>
                <Button onClick={() => setModalOpen(true)}>Open modal</Button>
            </EventStopper>
            <EventStopper>
                <Drawer title="My title" open={drawerOpen} openDrawer={setDrawerOpen} useOverlay={false}>
                    My drawer content goes here.
                </Drawer>
            </EventStopper>

            {modalOpen ? (
                <Modal
                    isOpen={modalOpen}
                    title="My modal title"
                    onClose={() => setModalOpen(false)}
                    footerActions={
                        <>
                            <Button color={ColorDefinitions.Primary} onClick={() => setModalOpen(false)}>
                                Ok
                            </Button>
                            <Button color={ColorDefinitions.Default} onClick={() => setModalOpen(false)}>
                                Cancel
                            </Button>
                        </>
                    }
                >
                    My modal content goes here...
                </Modal>
            ) : null}
        </>
    );
};
