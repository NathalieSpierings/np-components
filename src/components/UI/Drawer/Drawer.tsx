import { FC, PropsWithChildren, ReactElement, useCallback, useEffect } from 'react';
import { ColorDefinitions, SizeDefinitions } from '../../../lib/utils/definitions';
import DismissButton from '../../UI/DismissButton/DismissButton';
import React from 'react';

export interface DrawerProps extends PropsWithChildren {
    title?: string;
    position?: 'left' | 'right';
    extraWide?: boolean;
    footerContent?: ReactElement;
    open: boolean | null;
    openDrawer: (open: boolean | null) => void;
    useOverlay?: boolean;
    dismissButtonCircle?: boolean;
    dismissButtonSize?: SizeDefinitions;
    dismissButtonRight?: boolean;
    dismissButtonLabel?: string;
    dismissButtonLabelPosition?: 'left' | 'right';
    background?: ColorDefinitions;
    headerBorderColor?: ColorDefinitions;
    footerBorderColor?: ColorDefinitions;
    drawerCss?: string;
}

const Drawer: FC<DrawerProps> = ({
    title,
    position = 'right',
    extraWide = false,
    open = false,
    openDrawer,
    footerContent,
    useOverlay = true,
    dismissButtonCircle = false,
    dismissButtonSize = SizeDefinitions.Small,
    dismissButtonRight = true,
    dismissButtonLabel = 'sluiten',
    dismissButtonLabelPosition = 'left',
    background = ColorDefinitions.Surface,
    headerBorderColor = ColorDefinitions.Surface,
    footerBorderColor,
    drawerCss = '',
    children,
}) => {
    const closeDrawer = useCallback(() => {
        openDrawer(false);
    }, []);

    useEffect(() => {
        if (open && !useOverlay) {
            // add eventlistener
            globalThis.addEventListener('click', closeDrawer);
        } else {
            // remove eventlistener
            globalThis.removeEventListener('click', closeDrawer);
        }
    }, [open]);

    return (
        <>
            <div
                className={`drawer  ${background ? "bg-" + background : ''} ${extraWide ? 'drawer--extra-wide' : ''} drawer--${position} ${open ? 'shown' : ''} ${drawerCss} `}
            >
                <div className="drawer__container">
                    <DismissButton
                        circle={dismissButtonCircle}
                        size={dismissButtonSize}
                        right={dismissButtonRight}
                        label={dismissButtonLabel}
                        labelPosition={dismissButtonLabelPosition}
                        onClick={() => openDrawer(!open)}
                    />

                    <div className={`drawer__header ${headerBorderColor ? "border-" + headerBorderColor : ''}`}>
                        <h3>{title}</h3>
                    </div>
                    <div className="drawer__content">{children}</div>

                    {footerContent ? (
                        <div className={`drawer__footer ${footerBorderColor ? "border-" + footerBorderColor : ''}`}>
                            {footerContent}
                        </div>
                    ) : null}
                </div>
            </div>

            {useOverlay ? <button className="drawer__overlay" onClick={() => openDrawer(false)}></button> : null}
        </>
    );
};

export default Drawer;
