import { FC, PropsWithChildren } from 'react';
import { GridCollectionViewSelectorOption } from './GridCollectionViewSelector';
import React from 'react';

export interface GridCollectionProps extends PropsWithChildren {
    view: GridCollectionViewSelectorOption;
}

const GridCollection: FC<GridCollectionProps> = ({ view, children }) => {
    const cls = ['grid-collection', view].filter(Boolean).join(' ');

    return <div className={cls}>{children}</div>;
};

export default GridCollection;
