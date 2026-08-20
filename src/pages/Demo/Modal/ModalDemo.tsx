import React, { ReactElement, useState } from "react";
import { Fieldset } from "../../../components/Typography/Fieldset";
import Button from "../../../components/UI/Button/Button";
import Modal, { ModalActionPosition, ModalVariant } from "../../../components/UI/Modal/Modal";
import { ColorDefinitions } from "../../../lib/utils/definitions";

const ModalDemo = ({
}): ReactElement => {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalVariant, setModalVariant] = useState<ModalVariant>();
    const [modalActionPosition, setModalActionPosition] = useState<ModalActionPosition>('left');
    const [modalBackground, setModalBackground] = useState<ColorDefinitions>();

    const openModal = (
        variant?: ModalVariant,
        background?: ColorDefinitions,
        position?: "left" | "center" | "right"
    ) => {
        setModalVariant(variant);

        if (background) {
            setModalBackground(background);
        }
        if (position) {
            setModalActionPosition(position);
        }else{
             setModalActionPosition('left');
        }

        setModalOpen(true);
    };

    return (
        <section className="centered centered--wide">
            <h3>Welkom to the modal demo</h3>


            <Modal
                variant={modalVariant}
                isOpen={modalOpen}
                background={modalBackground}
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


            <Fieldset legend="Variants" className="mt-4">
                <div className="grid">
                    <button className="btn" onClick={() => openModal('default')}>Default modal</button>
                    <button className="btn" onClick={() => openModal('primary')}>Primary</button>
                    <button className="btn" onClick={() => openModal('warning')}>Warning</button>
                    <button className="btn" onClick={() => openModal('informational')}>Informational</button>
                    <button className="btn" onClick={() => openModal('positive')}>Positive</button>
                    <button className="btn" onClick={() => openModal('negative')}>Negative</button>
                </div>
            </Fieldset>

            <Fieldset legend="Bakckground" className="mt-4">
                <button className="btn" onClick={() => openModal("default", ColorDefinitions.Olive)}>
                    Background
                </button>
            </Fieldset>


            <Fieldset legend="Actions centered" className="mt-4">     
                 <button className="btn" onClick={() => openModal("default", undefined, 'center')}>
                    Centered actions
                </button>
            </Fieldset>

            <Fieldset legend="Actions right" className="mt-4">
               <button className="btn" onClick={() => openModal("default", undefined, 'right')}>
                    Right actions
                </button>
            </Fieldset>
        </section>
    )
}

export default ModalDemo;