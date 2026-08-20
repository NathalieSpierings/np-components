import React, { ReactNode } from 'react';
import { ColorDefinitions } from '../../../lib/utils/definitions';

export interface DuoColumnProps {
    background?: ColorDefinitions;
    padding?: boolean;
    duoColumnCss?: string;
    children: ReactNode;
}

const DuoColumn: React.FC<DuoColumnProps> = ({ 
    background, 
    padding = false, 
    duoColumnCss, 
    children 
}) => {
    
     const cssClass = [
        "duo-column__item",
        padding && 'duo-column__item__padding',      
        background && "bg-" + background,
        duoColumnCss,
    ]
        .filter(Boolean)
        .join(' ');
    
    return (
        <div className={cssClass}>{children}</div>
    );
};

export default DuoColumn;
