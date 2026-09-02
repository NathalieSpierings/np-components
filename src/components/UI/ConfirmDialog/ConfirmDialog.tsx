import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { ColorDefinitions, IconDefinitions } from '../../../lib/utils/definitions';
import Button from '../Button/Button';
import Modal, { ModalVariant } from '../Modal/Modal';
import { Icon } from '../Icons/Icon';

export type ConfirmDialogItemType = {
    title?: string;
    titleContent?: ReactNode;
    message?: ReactNode;
    variant?: ModalVariant;
    confirmLabel?: ReactNode;
    confirmAction?: () => (Promise<void> | void);
    dismissLabel?: string;
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
    const [isLoading, setIsLoading] = useState(false);

    return ( 
            <Modal
                isOpen={modalOpen}
                title={item.title}
                titleContent={item.titleContent}
                variant={item.variant}
                onClose={onClose}
                enableDismiss={!isLoading}
                footerActions={
                    <>
                        {item.confirmLabel === undefined ? null : <Button
                            disabled={!modalOpen || isLoading}
                            
                            shadow={true}
                            color={buttonConfirmColor}
                            onClick={async () => {
                                setModalOpen(true);
                                setIsLoading(true);
                                if (item.confirmAction) {
                                    await item?.confirmAction();
                                }
                                onClose();
                                setIsLoading(false);
                            }}
                        >
                            {isLoading ? <Icon icon={IconDefinitions.loading} /> : null}
                            {item.confirmLabel}
                        </Button>}
                        {item.dismissLabel === undefined ? null : <Button onClick={onClose} disabled={isLoading}>{item.dismissLabel}</Button>}
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
