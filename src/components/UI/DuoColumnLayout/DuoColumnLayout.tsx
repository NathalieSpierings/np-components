import React, { CSSProperties, ReactNode } from 'react';

export interface DuoColumnLayoutProps {
    columnDivider?: boolean;
    gap?: string;
    css?: string;
    children: ReactNode;
    firstColumnSize?: string;
    secondColumSize?: string;
}

const DuoColumnLayout: React.FC<DuoColumnLayoutProps> = ({
    columnDivider,
    gap,
    firstColumnSize,
    secondColumSize,
    css = '',
    children
}) => {

    const style: CSSProperties = {
        columnGap: gap,
        ['--duocolumn-left-size' as any]: firstColumnSize ?? '1fr',
        ['--duocolumn-right-size' as any]: secondColumSize ?? '1fr'
    };

    return (
        <div className={`duo-column ${columnDivider ? 'duo-column__border' : ''} ${css}`}
          style={style}>
            {children}
        </div>
    );
};

export default DuoColumnLayout;
