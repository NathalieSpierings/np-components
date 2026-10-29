import { PropsWithChildren, ReactElement } from 'react';

export interface SmallProps extends PropsWithChildren {
    muted?: boolean;
}

function Small({ muted = false, children, ...props }: Readonly<SmallProps>): ReactElement {
    return (
        <small className={`${muted ? 'text-muted' : ''}`} {...props}>
            {children}
        </small>
    );
}

export default Small;
