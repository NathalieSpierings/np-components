import React, { CSSProperties, HTMLAttributes, useMemo } from 'react';
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from '../../../lib/utils/definitions';
import Icon from '../Icons/Icon/Icon';
import { getColorPair } from '../../../lib/helpers/helpers';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    initials?: string;
    tooltip?: string;
    imageUrl?: string;
    alt?: string;
    icon?: IconDefinitions;
    iconDuotone?: boolean;
    square?: boolean;
    border?: boolean;
    shadow?: boolean;
    float?: boolean;
    size?: SizeDefinitions;
    autoColor?: boolean;
    background?: ColorDefinitions;
    color?: ColorDefinitions;
    borderColor?: ColorDefinitions;
    avatarCss?: string;
}

const Avatar: React.FC<AvatarProps> = ({
    initials,
    tooltip,
    imageUrl,
    alt,
    icon,
    iconDuotone,
    square,
    border,
    shadow,
    float,
    size,
    autoColor = false,
    background,
    color,
    borderColor,
    avatarCss = '',
    style,
    title,
    ...rest
}) => {

    let avatarContent: React.ReactNode = null;

    const isImage = !initials && !icon && !!imageUrl;

     const autoColorStyle = useMemo<CSSProperties | undefined>(() => {
        if (!autoColor || isImage) return undefined;
        if (background || color) return undefined; 

        const pair = getColorPair(tooltip || initials);
        return {
            '--avatar-background': pair.background,
            '--avatar-color': pair.foreground,
            '--avatar-shadow-color': pair.shadow,
        } as CSSProperties;
    }, [autoColor, isImage, background, color, tooltip, initials]);

    const cls = [
        'avatar',
        square ? 'avatar--square' : '',
        border ? 'avatar--border' : '',
        shadow ? 'avatar--shadow' : '',
        float ? 'avatar--float' : '',
        size ? `avatar--${size}` : '',
        borderColor ? `border-${borderColor}` : '',
        background ? `bg-${background}` : '',
        background ? 'avatar--has-background' : '',
        autoColorStyle ? 'avatar--auto-color' : '',
        color ? `text-${color}` : '',
        avatarCss,
    ]
        .filter(Boolean)
        .join(' ');


     if (initials) {
        avatarContent = <div className="avatar__initials">{initials}</div>;
    } else if (icon) {
        avatarContent = (
            <div className="avatar__icon">
                <Icon icon={icon} renderPlainSvg duotone={iconDuotone} />
            </div>
        );
    } else if (imageUrl) {
        avatarContent = (
            <span className="avatar__image">
                <img src={imageUrl} alt={alt ?? tooltip ?? ''} />
            </span>
        );
    }

    return (
        <div
            className={cls}
            style={{ ...autoColorStyle, ...style }}
            title={title ?? tooltip}
            {...rest}
        >
            {avatarContent}
        </div>
    );
};

export default Avatar;
