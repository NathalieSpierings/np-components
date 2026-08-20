import { ReactElement, useEffect, useState } from 'react';
import { ColorDefinitions } from '../../../lib/utils/definitions';

import Button from '../Button/Button';
import Modal, { ModalVariant } from '../Modal/Modal';
import React from 'react';

export type ConfirmDialogItemType = {
    title?: string;
    titleContent?: ReactElement;
    message?: string | ReactElement;
    variant?: ModalVariant;
    confirmLabel: string;
    confirmAction: () => Promise<void>;
    dismissLabel: string;
};

export interface ConfirmDialogItemProps {
    item: ConfirmDialogItemType;
    open: boolean;
    onClose: () => void;
    buttonConfirmColor?: ColorDefinitions;
}

const ConfirmDialogItem = ({
    item,
    open,
    onClose,
    buttonConfirmColor = ColorDefinitions.Primary,
}: ConfirmDialogItemProps): ReactElement => {
    const [modalOpen, setModalOpen] = useState(open);

    return ( 
            <Modal
                isOpen={modalOpen}
                title={item.title}
                titleContent={item.titleContent}
                variant={item.variant}
                onClose={onClose}
                footerActions={
                    <>
                        <Button
                            disabled={!modalOpen}
                            shadow={true}
                            color={buttonConfirmColor}
                            onClick={async () => {
                                setModalOpen(true);
                                await item.confirmAction();
                                onClose();
                            }}
                        >
                            {item.confirmLabel}
                        </Button>
                        <Button onClick={onClose}>{item.dismissLabel}</Button>
                    </>
                }
            >
                {item.message}
            </Modal>
        
    );
};

export interface ConfirmDialogProps {
    confirmDialogs: ConfirmDialogItemType[];
    removeConfirmDialog: () => void;
}

const ConfirmDialog = ({ confirmDialogs, removeConfirmDialog }: ConfirmDialogProps): ReactElement => {
    const [currentItem, setCurrentItem] = useState<ConfirmDialogItemType>();

    const onClose = () => {
        // We dismiss the modal so set it to undefined to empty it.
        setCurrentItem(undefined);

        setTimeout(() => {
            // Wait for exit animation to finisch to dequeue
            removeConfirmDialog();
        }, 500);
    };

    useEffect(() => {
        if (currentItem) {
            return;
        }

        if (confirmDialogs.length) {
            setCurrentItem(confirmDialogs[0]);
        }
    }, [confirmDialogs]);

    return currentItem ? (
        <ConfirmDialogItem item={currentItem} open={!!currentItem} onClose={onClose} />
    ) : (
        <></>
    );
};

export default ConfirmDialog;
