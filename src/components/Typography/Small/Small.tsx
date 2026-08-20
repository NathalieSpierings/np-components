import React, { PropsWithChildren, ReactElement } from 'react';

export interface SmallProps extends PropsWithChildren {
    mute?: boolean;
}

function Small({ mute = false, children, ...props }: Readonly<SmallProps>): ReactElement {
    return (
        <small className={`${mute ? 'text-mute' : ''}`} {...props}>
            {children}
        </small>
    );
}

export default Small;
