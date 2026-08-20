import React, { ReactElement } from 'react';

export interface CaptionProps extends React.HTMLAttributes<HTMLHeadingElement> {
    mute?: boolean;
}

function Caption({ mute = false, children, ...props }: Readonly<CaptionProps>): ReactElement {
    return (
        <h5 className={`caption ${mute ? 'text-mute' : ''}`} {...props}>
            {children}
        </h5>
    );
}

export default Caption;
