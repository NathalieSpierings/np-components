import React from 'react';
import Tooltip from '../Tooltip/Tooltip';

export type CollectionViewSelectorOption = 'list' | 'columns-2' | 'columns-3' | 'columns-4';

export interface CollectionViewSelectorProps {
    defaultView?: string;
    setViewOption: (option: CollectionViewSelectorOption) => void;
}

const CollectionViewSelector: React.FC<CollectionViewSelectorProps> = ({
    defaultView = 'columns-4',
    setViewOption,
}) => {
    return (
        <>
            <Tooltip content="Lijst weergave" direction="bottom-left">
                <button
                    className={`collection__view ${defaultView == 'list' ? 'active' : null}`}
                    onClick={() => setViewOption('list')}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </Tooltip>

            <Tooltip content="2 kolommen" direction="bottom-left">
                <button
                    className={`collection__view ${defaultView == 'columns-2' ? 'active' : null}`}
                    onClick={() => setViewOption('columns-2')}
                >
                    <span></span>
                    <span></span>
                </button>
            </Tooltip>

            <Tooltip content="4 kolommen" direction="bottom-left">
                <button
                    className={`collection__view ${defaultView == 'columns-3' ? 'active' : null}`}
                    onClick={() => setViewOption('columns-3')}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </Tooltip>

            <Tooltip content="4 kolommen" direction="bottom-left">
                <button
                    className={`collection__view ${defaultView == 'columns-4' ? 'active' : null}`}
                    onClick={() => setViewOption('columns-4')}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </Tooltip>
        </>
    );
};

export default CollectionViewSelector;
