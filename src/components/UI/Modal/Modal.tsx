import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, ReactNode } from 'react';
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from '../../../lib/utils/definitions';
import Box, { BoxProps } from '../../Base/Box/Box';
import Icon from '../../UI/Icons/Icon/Icon';
import DismissButton from '../DismissButton/DismissButton';

export type ModalVariant = 'default' | 'primary' | 'warning' | 'informational' | 'positive' | 'negative';
export type ModalActionPosition = 'left' | 'center' | 'right';
export type ModalSize = 'default' | 'sm' | 'md' | 'lg' ;


export interface ModalProps extends BoxProps {
    title?: string;
    titleContent?: ReactNode;
    variant?: ModalVariant;
    size?: ModalSize;
    headerBoxProps?: BoxProps;
    footerBoxProps?: BoxProps;
    footerActions?: ReactNode;
    footerActionPosition?: 'left' | 'center' | 'right';
    background?: ColorDefinitions;
    isOpen: boolean;
    onClose?: () => void;
    enableDismiss?: boolean;
}

const Modal: FC<ModalProps> = ({
    title,
    titleContent,
    variant,
    size = "default",
    headerBoxProps = { borderColor: ColorDefinitions.Surface },
    footerBoxProps = { borderColor: ColorDefinitions.Surface },
    footerActions,
    footerActionPosition = "left",
    background,
    isOpen,
    onClose = () => { },
    children,
    enableDismiss = true,
}) => {
    
    const overlayVariants = {
        visible: {
            opacity: 1,
            transition: {
                when: 'beforeChildren',
                duration: 0.3,
                delayChildren: 0.4,
            },
        },
        hidden: {
            opacity: 0,
            transition: {
                when: 'afterChildren',
                duration: 0.3,
                delay: 0.4,
            },
        },
    };

    const cls = [
        'modal',
        background ? `bg--${background}` : '',
        variant ? `modal-${variant}` : '',
        size ? `modal--${size}` : ''
    ].filter(Boolean).join(' ');

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={overlayVariants}
                    className="modal-backdrop"
                >
                    <motion.div
                        className={cls}
                        initial={{ opacity: 0, scale: 0.75 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            transition: { ease: 'easeOut', duration: 0.15 },
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.75,
                            transition: { ease: 'easeIn', duration: 0.15 },
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        <Box {...headerBoxProps} css="modal__header shown">
                            {variant ? (
                                <Icon icon={IconDefinitions.warning} size={SizeDefinitions.ExtraLarge} />
                            ) : null}
                            {title ? <h3>{title}</h3> : <>{titleContent}</>}

                            {enableDismiss ? <DismissButton right={true} onClick={onClose} /> : null}
                        </Box>
                        <div className="modal__content">{children}</div>
                        <Box
                            {...footerBoxProps}
                            css={`modal__footer ${footerActionPosition ? "modal__footer--" + footerActionPosition : ''}`}
                        >
                            {footerActions}
                        </Box>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
