import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, PropsWithChildren, useState } from 'react';
import { IconDefinitions, SizeDefinitions } from '../../../lib/utils/definitions';
import Icon from '../../UI/Icons/Icon/Icon';
import DismissButton from '../DismissButton/DismissButton';

export interface AlertProps extends PropsWithChildren {
    dismissable?: boolean;
    variant?: 'default' | 'informational' | 'positive' | 'negative' | 'warning';
    shown?: boolean;
    sticky?: boolean;
    alertCss?: string;
}

const Alert: FC<AlertProps> = ({
    dismissable = false,
    variant = 'default',
    shown = true,
    sticky = false,
    alertCss = '',
    children,
}) => {
    const [show, setShow] = useState(shown);

    let icon = IconDefinitions.info_square;

    switch (variant) {
        case 'positive': {
            icon = IconDefinitions.checkmark;
            break;
        }
        case 'negative': {
            icon = IconDefinitions.warning;
            break;
        }
        case 'warning': {
            icon = IconDefinitions.warning_square;
            break;
        }
        case 'informational': {
            icon = IconDefinitions.info_square;
            break;
        }
    }

    return (
        <AnimatePresence initial={false}>
            {show && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ overflow: 'hidden' }}
                >
                    <div
                        className={`alert ${sticky ? 'alert--sticky' : ''} bg-${variant} ${shown ? 'shown' : ''
                            } ${alertCss}`}
                    >
                        {dismissable && (
                            <DismissButton
                                circle={true}
                                size={SizeDefinitions.Small}
                                right={true}
                                onClick={() => setShow(!show)}
                            />
                        )}
                        <div className="alert__icon">
                            <Icon icon={icon} size={SizeDefinitions.Medium} duotone={true} />
                        </div>
                        <span className="alert__message">{children}</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Alert;
