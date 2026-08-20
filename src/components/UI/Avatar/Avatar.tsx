import React, { ImgHTMLAttributes } from 'react';
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from '../../../lib/utils/definitions';

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    avatarCss?: string;
    initials?: string;
    icon?: IconDefinitions;
    iconDuotone?: boolean;
    imageUrl?: string;
    border?: boolean;
    shadow?: boolean;
    borderColor?: ColorDefinitions;
    background?: ColorDefinitions;
    size?: SizeDefinitions;
    square?: boolean;
    float?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
    avatarCss = '',
    initials,
    imageUrl,
    icon,
    iconDuotone,
    size,
    square,
    border,
    shadow,
    borderColor,
    background,
    float,
    ...rest
}) => {
    const cls = [
        'avatar',
        avatarCss,
        square ? 'avatar--square' : '',
        border ? 'avatar--border' : '',
        shadow ? 'avatar--shadow' : '',
        borderColor ? `border-${borderColor}` : '',
        background ? `bg-${background}` : '',
        float ? 'avatar--float' : '',
        size ? `avatar--${size}` : '',
    ]
        .filter(Boolean)
        .join(' ');

    let avatarContent: React.ReactNode = null;

    if (initials) {
        avatarContent = <span className="avatar__name">{initials}</span>;
    } else if (icon) {
        avatarContent = (
           <span className="avatar__icon">
             <svg xmlns="http://www.w3.org/2000/svg" className={iconDuotone ? 'icon-duotone' : ''} >
                <use xlinkHref={`#svg_icon_${icon}`} />
            </svg>
           </span>
        );
    } else if (imageUrl) {
        avatarContent = (
            <span className="avatar__image">
                <img src={imageUrl} alt="Avatar" />
            </span>
        )
    } 

    return (
        <div className={cls} {...rest}>
            {avatarContent}
        </div>
    );
};

export default Avatar;
