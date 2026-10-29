import React, { ReactElement } from 'react';

export interface CaptionProps extends React.HTMLAttributes<HTMLHeadingElement> {
    muted?: boolean;
}

function Caption({ muted = false, children, ...props }: Readonly<CaptionProps>): ReactElement {
    return (
        <h5 className={`caption ${muted ? 'text-muted' : ''}`} {...props}>
            {children}
        </h5>
    );
}

export default Caption;
