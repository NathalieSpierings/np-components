import { forwardRef, ReactElement } from 'react';
import Box, { BoxProps } from '../../Base/Box/Box';
import React from 'react';

export interface CardHeaderProps extends Omit<BoxProps, 'title'> {
    title?: string | ReactElement;
    sticky?: boolean;
    actions?: ReactElement[];
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ title, sticky = false, actions = [], children, ...boxProps }, ref) => {
        return (
            <Box {...boxProps} css={`card__header ${sticky ? 'sticky' : ''}`} ref={ref}>
                <div className="content-item">
                    <div className="content-item__meta">{title}</div>

                    {actions.length > 0 ? (
                        <div className="content-item__postfix">
                            {actions.map((action, idx) => (
                                <div key={action.key || idx}>{action}</div>
                            ))}
                        </div>
                    ) : null}
                </div>
            </Box>
        );
    }
);

export default CardHeader;
