import React, { FC, HTMLProps } from 'react';
import { ColorDefinitions } from '../../../lib/utils/definitions';
import Ripple from '../../Base/Ripple/Ripple';

export type LinkVariant = 'default' | 'flat' | 'hover' | 'underlined';

export interface LinkProps extends Omit<HTMLProps<HTMLAnchorElement>, ''> {
    label: string;
    color?: ColorDefinitions;
    accentColor?: ColorDefinitions;
    rippleColor?: ColorDefinitions | string;
    variant?: LinkVariant;
}
const Link: FC<LinkProps> = ({ label, color, accentColor, rippleColor, variant, ...props }) => {
    const cls = [
        'link',
        color ? `text-${color}` : '',
        accentColor ? `accent-${accentColor}` : '',
        variant === 'hover' ? 'link--hover' : '',
        variant === 'underlined' ? 'link--underlined' : '',
    ]
        .filter(Boolean)
        .join(' ');

    return variant === 'flat' ? (
        <a className={`btn btn-flat ${color != 'default' ? "btn-" + color : ''} `} {...props}>
            {label}
            <Ripple color={rippleColor} />
        </a>
    ) : (
        <a className={cls} {...props}>
            {label}
        </a>
    );
};

export default Link;
