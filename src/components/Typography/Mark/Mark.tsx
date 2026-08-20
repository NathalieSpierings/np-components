import React, { PropsWithChildren } from 'react';

export interface MarkProps extends PropsWithChildren {
}

const Mark: React.FC<MarkProps> = ({ children }) => {
    return (
        <mark>{children}</mark>
    );
};

export default Mark;
