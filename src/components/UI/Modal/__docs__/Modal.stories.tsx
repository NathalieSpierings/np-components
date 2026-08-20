import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { SvgSprite } from '../../../../assets/SvgSprite';
import { ColorDefinitions } from '../../../../lib/utils/definitions';
import Button from '../../Button/Button';
import Modal, { ModalActionPosition, ModalVariant } from '../Modal';
import React from 'react';

const meta: Meta<typeof Modal> = {
    title: 'UI kit/Modal',
    component: Modal,
    decorators: [
        (StoryFn) => (
            <>
                <div id="modal" />
                <SvgSprite />
                <StoryFn />
            </>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Modal>;


export const Default: StoryFn = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalVariant, setModalVariant] = useState<ModalVariant>();

    const openModal = (
        variant?: ModalVariant
    ) => {
        setModalVariant(variant);
        setModalOpen(true);
    };

    return (
        <>
            <Modal
                variant={modalVariant}
                isOpen={modalOpen}
                title="My modal title"
                onClose={() => setModalOpen(false)}
                footerActions={
                    <>
                        <Button color={ColorDefinitions.Primary} raised={true} onClick={() => setModalOpen(false)}>
                            Confirm
                        </Button>
                        <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                    </>
                }
            >
                My content goes here...
            </Modal>

            <button className="btn" onClick={() => openModal('default')}>
                Default
            </button>
        </>
    );
};

export const Primary: StoryFn = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalVariant, setModalVariant] = useState<ModalVariant>();

    const openModal = (
        variant?: ModalVariant
    ) => {
        setModalVariant(variant);
        setModalOpen(true);
    };

    return (
        <>
            <Modal
                variant={modalVariant}
                isOpen={modalOpen}
                title="My modal title"
                onClose={() => setModalOpen(false)}
                footerActions={
                    <>
                        <Button color={ColorDefinitions.Primary} raised={true} onClick={() => setModalOpen(false)}>
                            Confirm
                        </Button>
                        <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                    </>
                }
            >
                My content goes here...
            </Modal>

            <button className="btn" onClick={() => openModal('primary')}>
                Primary
            </button>
        </>
    );
};

export const Warning: StoryFn = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalVariant, setModalVariant] = useState<ModalVariant>();

    const openModal = (
        variant?: ModalVariant
    ) => {
        setModalVariant(variant);
        setModalOpen(true);
    };

    return (
        <>
            <Modal
                variant={modalVariant}
                isOpen={modalOpen}
                title="My modal title"
                onClose={() => setModalOpen(false)}
                footerActions={
                    <>
                        <Button color={ColorDefinitions.Primary} raised={true} onClick={() => setModalOpen(false)}>
                            Confirm
                        </Button>
                        <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                    </>
                }
            >
                My content goes here...
            </Modal>

            <button className="btn" onClick={() => openModal('warning')}>
                Warning
            </button>
        </>
    );
};

export const Informational: StoryFn = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalVariant, setModalVariant] = useState<ModalVariant>();

    const openModal = (
        variant?: ModalVariant
    ) => {
        setModalVariant(variant);
        setModalOpen(true);
    };

    return (
        <>
            <Modal
                variant={modalVariant}
                isOpen={modalOpen}
                title="My modal title"
                onClose={() => setModalOpen(false)}
                footerActions={
                    <>
                        <Button color={ColorDefinitions.Primary} raised={true} onClick={() => setModalOpen(false)}>
                            Confirm
                        </Button>
                        <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                    </>
                }
            >
                My content goes here...
            </Modal>

            <button className="btn" onClick={() => openModal('informational')}>
                Informational
            </button>
        </>
    );
};

export const Positive: StoryFn = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalVariant, setModalVariant] = useState<ModalVariant>();

    const openModal = (
        variant?: ModalVariant
    ) => {
        setModalVariant(variant);
        setModalOpen(true);
    };

    return (
        <>
            <Modal
                variant={modalVariant}
                isOpen={modalOpen}
                title="My modal title"
                onClose={() => setModalOpen(false)}
                footerActions={
                    <>
                        <Button color={ColorDefinitions.Primary} raised={true} onClick={() => setModalOpen(false)}>
                            Confirm
                        </Button>
                        <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                    </>
                }
            >
                My content goes here...
            </Modal>

            <button className="btn" onClick={() => openModal('positive')}>
                Positive
            </button>
        </>
    );
};

export const Negative: StoryFn = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalVariant, setModalVariant] = useState<ModalVariant>();

    const openModal = (
        variant?: ModalVariant
    ) => {
        setModalVariant(variant);
        setModalOpen(true);
    };

    return (
        <>
            <Modal
                variant={modalVariant}
                isOpen={modalOpen}
                title="My modal title"
                onClose={() => setModalOpen(false)}
                footerActions={
                    <>
                        <Button color={ColorDefinitions.Primary} raised={true} onClick={() => setModalOpen(false)}>
                            Confirm
                        </Button>
                        <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                    </>
                }
            >
                My content goes here...
            </Modal>

            <button className="btn" onClick={() => openModal('negative')}>
                Negative
            </button>
        </>
    );
};

export const Background: StoryFn = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalBackground, setModalBackground] = useState<ColorDefinitions>();


    const openModal = (
        background?: ColorDefinitions,
    ) => {
        if (background) {
            setModalBackground(background);
        }
        setModalOpen(true);
    };

    return (
        <>
            <Modal
                isOpen={modalOpen}
                background={modalBackground}
                title="My modal title"
                onClose={() => setModalOpen(false)}
                footerActions={
                    <>
                        <Button color={ColorDefinitions.Primary} raised={true} onClick={() => setModalOpen(false)}>
                            Confirm
                        </Button>
                        <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                    </>
                }
            >
                My content goes here...
            </Modal>
            <button className="btn" onClick={() => openModal(ColorDefinitions.Olive)}>
                Background
            </button>
        </>
    );
};

export const ActionsCentered: StoryFn = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalActionPosition, setModalActionPosition] = useState<ModalActionPosition>('left');

    const openModal = () => {
        setModalActionPosition("center");
        setModalOpen(true);
    };
    return (
        <>
            <Modal
                variant="default"
                isOpen={modalOpen}
                title="My modal title"
                onClose={() => setModalOpen(false)}
                footerActionPosition={modalActionPosition}
                footerActions={
                    <>
                        <Button color={ColorDefinitions.Primary} raised={true} onClick={() => setModalOpen(false)}>
                            Confirm
                        </Button>
                        <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                    </>
                }
            >
                My content goes here...
            </Modal>

            <button className="btn" onClick={() => openModal()}>
                Centered actions
            </button>
        </>
    );
};

export const ActionsRight: StoryFn = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalActionPosition, setModalActionPosition] = useState<ModalActionPosition>('left');

    const openModal = () => {
        setModalActionPosition("right");
        setModalOpen(true);
    };

    return (
        <>
            <Modal
                variant="default"
                isOpen={modalOpen}
                title="My modal title"
                onClose={() => setModalOpen(false)}
                footerActionPosition={modalActionPosition}
                footerActions={
                    <>
                        <Button color={ColorDefinitions.Primary} raised={true} onClick={() => setModalOpen(false)}>
                            Confirm
                        </Button>
                        <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                    </>
                }
            >
                My content goes here...
            </Modal>

            <button className="btn" onClick={() => openModal()}>
                Right actions
            </button>
        </>
    );
};
