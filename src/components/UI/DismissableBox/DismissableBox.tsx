import { AnimatePresence, motion } from "framer-motion";
import React, { FC, ReactNode } from "react";
import { ColorDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import DismissButton from "../DismissButton/DismissButton";
import Box, { BoxProps } from "../../Base/Box/Box";


export interface DismissableBoxProps extends BoxProps {
    isOpen: boolean;
    onClose?: () => void;
    headerContent?: string | ReactNode;
    css?: string;
    dismissbuttonVisible?: boolean;
    dismissButtonCss?: string;
    dismissButtonCircle?: boolean;
    dismissButtonSize?: SizeDefinitions;
    dismissButtonLabel?: string;
    dismissButtonLabelColor?: ColorDefinitions;
    dismissButtonBackground?: ColorDefinitions;
    dismissButtonLabelPosition?: 'left' | 'right';
    dismissButtonRight?: boolean;
}

const DismissableBox: FC<DismissableBoxProps> = ({
    isOpen,
    onClose = () => { },
    css = '',
    headerContent,
    dismissbuttonVisible = true,
    dismissButtonCss = '',
    dismissButtonCircle = false,
    dismissButtonSize,
    dismissButtonLabel,
    dismissButtonLabelColor,
    dismissButtonBackground,
    dismissButtonLabelPosition,
    dismissButtonRight = true,

    children,
    ...boxProps
}) => {

    const cls = [
        'dismissable-box',
        isOpen ? 'shown' : '',
        css,
    ]
        .filter(Boolean)
        .join(' ');


    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="dismissable"
                    className=""
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.75 }}
                    transition={{ ease: 'easeOut', duration: 0.15 }}
                >
                    <Box {...boxProps} css={cls} style={{ position: 'relative' }}>
                        <div className="dismissable-box__header">
                            {headerContent}
                            {dismissbuttonVisible && <DismissButton
                                dismissCss={dismissButtonCss}
                                circle={dismissButtonCircle}
                                size={dismissButtonSize}
                                label={dismissButtonLabel}
                                labelColor={dismissButtonLabelColor}
                                background={dismissButtonBackground}
                                labelPosition={dismissButtonLabelPosition}
                                right={dismissButtonRight}
                                onClick={onClose}
                            />}

                        </div>

                        {children}
                    </Box>
                </motion.div>
            )}
        </AnimatePresence>
    )

}

export default DismissableBox;