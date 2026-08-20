import { FC, PropsWithChildren } from 'react';
import { ColorDefinitions } from '../../../lib/utils/definitions';
import GridLayoutDrawer from './GridLayoutDrawer';
import React from 'react';

export interface GridLayoutProps extends PropsWithChildren {
    open?: boolean | null;
    openDrawer?: (open: boolean | null) => void;
    drawerContent?: any;
    drawerTitle?: string;
    drawerHeaderBorderColor?: ColorDefinitions;
    dividerBorderColor?: ColorDefinitions;
}

const GridLayout: FC<GridLayoutProps> = ({
    open = false,
    openDrawer,
    drawerContent,
    drawerTitle,
    drawerHeaderBorderColor,
    dividerBorderColor,
    children,
}) => {
    return (
        <div className={`gridlayout ${drawerTitle || drawerContent ? 'has-drawer ' : ''} ${open ? 'shown' : ''}`}>
            {openDrawer ? (
                <GridLayoutDrawer
                    title={drawerTitle}
                    headerBorderColor={drawerHeaderBorderColor}
                    dividerBorderColor={dividerBorderColor}
                    open={open}
                    openDrawer={openDrawer}
                >
                    {drawerContent}
                </GridLayoutDrawer>
            ) : null}

            <div className={`gridlayout__content`}>
                <div className={`gridlayout__content__container`}>{children}</div>
            </div>
        </div>
    );
};

export default GridLayout;
