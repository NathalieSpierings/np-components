import { FC, PropsWithChildren } from 'react';
import { ColorDefinitions } from '../../../lib/utils/definitions';
import DismissButton from '../../UI/DismissButton/DismissButton';
import React from 'react';

export interface GridLayoutDrawerProps extends PropsWithChildren {
    title?: string;
    headerBorderColor?: ColorDefinitions;
    dividerBorderColor?: ColorDefinitions;
    open?: boolean | null;
    openDrawer: (open: boolean | null) => void;
}

const GridLayoutDrawer: FC<GridLayoutDrawerProps> = ({
    title,
    headerBorderColor,
    dividerBorderColor,
    open,
    openDrawer,
    children,
}) => {
    return (
        <div className="gridlayout__drawer">
            <div
                className={`gridlayout__drawer__container ${dividerBorderColor ? "border-" + dividerBorderColor : ''}`}
            >
                <div className={`gridlayout__drawer__header ${headerBorderColor ? "border-" + headerBorderColor : ''}`}>
                    <h3>{title}</h3>

                    <DismissButton right={true} onClick={() => openDrawer(!open)} />
                </div>
                <div className="gridlayout__drawer__content">{children}</div>
            </div>
        </div>
    );
};

export default GridLayoutDrawer;
