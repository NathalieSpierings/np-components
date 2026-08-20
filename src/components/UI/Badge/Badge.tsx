import React from 'react';
import { SizeDefinitions } from '../../../lib/utils/definitions';
import Box, { BoxProps } from '../../Base/Box/Box';

export type BadgeVariant = 'square' | 'circle';
export type BadgeType = 'outline';

export interface BadgeProps extends BoxProps {
    size?: SizeDefinitions;
    badgeCss?: string;
    variant?: BadgeVariant;
    type?: BadgeType;
}

const Badge: React.FC<BadgeProps> = ({ size, badgeCss = '', variant, type, children, ...boxProps }) => {
    return (
        <Box
            {...boxProps}
            css={[
                'badge',
                variant ? 'badge-' + variant : '',
                type ? 'badge-' + type : '',
                badgeCss,
                size ? 'badge--' + size : ''
            ].filter(Boolean).join(' ')}
            renderAs="span"
        >
            {children}
        </Box>
    );
};

export default Badge;
