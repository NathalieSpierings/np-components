import { motion } from 'framer-motion';
import React, { FC, PropsWithChildren, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { CenteredSizeDefinition, ColorDefinitions, SizeDefinitions } from '../../../lib/utils/definitions';
import { ScrollContext } from '../../Providers/ScrollContext';
import DismissButton from '../../UI/DismissButton/DismissButton';

export interface PageOverlayProps extends PropsWithChildren {
    navBased?: boolean;
    centeredSize?: CenteredSizeDefinition;
    dismissCss?: string;
    dismissCircle?: boolean;
    dismissSize?: SizeDefinitions;
    dismissLabel?: string;
    dismissLabelColor?: ColorDefinitions;
    dismissBackground?: ColorDefinitions;
    dismissLabelPosition?: 'left' | 'right';
    dismissRight?: boolean;
    background?: ColorDefinitions;
}

const PageOverlay: FC<PageOverlayProps> = ({
    navBased = true,
    centeredSize = CenteredSizeDefinition.Narrow,
    dismissCss,
    dismissCircle,
    dismissSize = SizeDefinitions.Medium,
    dismissLabel = 'sluiten',
    dismissLabelColor,
    dismissBackground,
    dismissLabelPosition = 'left',
    dismissRight = true,
    background = ColorDefinitions.Surface,
    children,
}) => {
    const nav = useNavigate();
    const cls = `pageoverlay ${background ? "bg-" + background : ''} shown`;

    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const scrollContextValue = useMemo(() => ({ scrollPosition }), [scrollPosition]);

    const closePageOverlay = () => {
        nav(-1);
    };
    return (
        <motion.div
            initial={{ opacity: 0, transform: 'translateY(100px)' }}
            exit={{ opacity: 0, transform: 'translateY(100px)' }}
            animate={{ opacity: 1, transform: 'translateY(0)' }}
            transition={{ duration: 0.3, type: 'tween', ease: 'easeInOut' }}
            className={cls}
        >
            <DismissButton
                dismissCss={dismissCss}
                circle={dismissCircle}
                size={dismissSize}
                label={dismissLabel}
                labelColor={dismissLabelColor}
                background={dismissBackground}
                labelPosition={dismissLabelPosition}
                right={dismissRight}
                onClick={closePageOverlay}
            />

            <div
                className="pageoverlay__container"
                onScroll={(e: React.UIEvent<HTMLDivElement>) => {
                    setScrollPosition(e.currentTarget.scrollTop);
                }}
            >
                <div className="pageoverlay__content">
                    <div className={`centered centered--${centeredSize}`}>
                        <ScrollContext.Provider value={scrollContextValue}>
                            {children}
                        </ScrollContext.Provider>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PageOverlay;
