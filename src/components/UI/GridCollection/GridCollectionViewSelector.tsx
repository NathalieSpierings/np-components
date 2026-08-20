import React from 'react';
import Tooltip from '../Tooltip/Tooltip';

export type GridCollectionViewSelectorOption = 'list' | 'columns-2' | 'columns-3' | 'columns-4';

export interface GridCollectionViewSelectorProps {
    defaultView?: string;
    setViewOption: (option: GridCollectionViewSelectorOption) => void;
}

const GridCollectionViewSelector: React.FC<GridCollectionViewSelectorProps> = ({
    defaultView = 'columns-4',
    setViewOption,
}) => {
    return (
        <>
            <Tooltip content="Lijst weergave" direction="bottom-left">
                <button
                    className={`grid-collection--view-option ${defaultView == 'list' ? 'active' : null}`}
                    onClick={() => setViewOption('list')}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </Tooltip>

            <Tooltip content="2 kolommen" direction="bottom-left">
                <button
                    className={`grid-collection--view-option ${defaultView == 'columns-2' ? 'active' : null}`}
                    onClick={() => setViewOption('columns-2')}
                >
                    <span></span>
                    <span></span>
                </button>
            </Tooltip>

            <Tooltip content="4 kolommen" direction="bottom-left">
                <button
                    className={`grid-collection--view-option ${defaultView == 'columns-3' ? 'active' : null}`}
                    onClick={() => setViewOption('columns-3')}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </Tooltip>

            <Tooltip content="4 kolommen" direction="bottom-left">
                <button
                    className={`grid-collection--view-option ${defaultView == 'columns-4' ? 'active' : null}`}
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

export default GridCollectionViewSelector;
