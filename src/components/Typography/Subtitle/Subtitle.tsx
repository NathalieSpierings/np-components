import React, { ReactElement } from 'react';

export interface SubtitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    muted?: boolean;
}

function Subtitle({ muted = false, children, ...props }: Readonly<SubtitleProps>): ReactElement {
    return (
        <div className={`subtitle ${muted ? 'text-muted' : ''}`} {...props}>
            {children}
        </div>
    );
}

export default Subtitle;
