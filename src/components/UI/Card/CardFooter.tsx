import React, { forwardRef, ReactElement } from 'react';
import Box, { BoxProps } from '../../Base/Box/Box';

export interface CardFooterProps extends Omit<BoxProps, 'title'> {
    title?: string | ReactElement;
    leftContent?: ReactElement;
    rightContent?: ReactElement;
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
    ({ title, leftContent, rightContent, children, ...boxProps }, ref) => {
        return (
            <Box {...boxProps} css="card__footer" ref={ref}>
                <div className="content-item">
                    {leftContent ? <div className="content-item__prefix">{leftContent}</div> : null}

                    {rightContent ? <div className="content-item__postfix">{rightContent}</div> : null}
                </div>
            </Box>
        );
    }
);

export default CardFooter;
