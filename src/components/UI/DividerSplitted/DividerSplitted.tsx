import React from 'react';
import { ColorDefinitions } from '../../../lib/utils/definitions';

export interface DividerSplittedProps {
    label: string;
    color?: ColorDefinitions;
    borderColor?: ColorDefinitions;
    dividerSplittedCss?: string;
}

const DividerSplitted: React.FC<DividerSplittedProps> = ({ 
    label, 
    color, 
    borderColor, 
    dividerSplittedCss = ''
}) => {
    return (
        <div className={`split-divider ${borderColor ? "border-before-" + borderColor + " border-after-" + borderColor : null} ${dividerSplittedCss}`}>
            <div className={`split-divider__content ${color ? "text-" + color : null}`}>{label}</div>
        </div>
    );
};

export default DividerSplitted;
