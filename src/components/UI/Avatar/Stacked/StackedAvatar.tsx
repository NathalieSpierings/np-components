import  { FC, ReactElement } from 'react';
import { SizeDefinitions } from '../../../../lib/utils/definitions';
import React from 'react';

export interface StackedAvatarProps {
    avatars: ReactElement[];
    counter: number;
    size?: SizeDefinitions;
}

const StackedAvatar: FC<StackedAvatarProps> = ({ avatars, counter, size }) => {
    return (
        <ul className={`avatar-group ${size ? "avatar-group--" + size : ''} `}>
            {avatars.map((item, idx) => {
                return (
                    <li className="nav__item" key={item.key || idx}>
                        {item}
                    </li>
                );
            })}
            <li>
                <span className="avatar avatar-group__counter">+{counter}</span>
            </li>
        </ul>
    );
};

export default StackedAvatar;
