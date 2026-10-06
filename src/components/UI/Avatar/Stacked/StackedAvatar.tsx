import React, { cloneElement, FC, ReactElement } from 'react';
import { SizeDefinitions } from '../../../../lib/utils/definitions';
import { AvatarProps } from '../Avatar';

export interface StackedAvatarProps {
    avatars: ReactElement<AvatarProps>[];
    counter?: number;
    size?: SizeDefinitions;
    autoColor?: boolean;
    css?: string
}

const StackedAvatar: FC<StackedAvatarProps> = ({
    avatars,
    counter = 0,
    size,
    autoColor,
    css = ''
}) => {


    const cls = [
        'avatar-group',
        size && `avatar-group--${size}`,
        css,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <ul className={cls}>
            {avatars.map((item, idx) => (
                <li key={item.key ?? idx}>
                    {autoColor
                        ? cloneElement(item, { autoColor: item.props.autoColor ?? true })
                        : item}
                </li>
            ))}

            {counter > 0 && (
                <li>
                    <div className="avatar avatar--count" title={`Nog ${ counter } personen`}>
                        <div className="avatar__initials">+{counter}</div>
                    </div>
                </li>
            )}
        </ul>
    );
};

export default StackedAvatar;