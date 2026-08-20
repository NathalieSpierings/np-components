import React, { FC } from 'react';
import { ColorDefinitions } from '../../../../lib/utils/definitions';
import { DropdownMenuItem } from '../../../Forms/Dropdown/DropdownMenu';
import Dropdown, { DropdownHeader, DropdownToggle, DropdownVerticalPosition } from '../../../Forms/Dropdown/Dropdown';

export interface SidebarAccountProps {
    direction?: DropdownVerticalPosition;
    dropdownToggle: DropdownToggle;
    dropdownHeader?: DropdownHeader;
    menuItems?: DropdownMenuItem[];
    accentColor?: ColorDefinitions;
}

const SidebarAccount: FC<SidebarAccountProps> = ({
    direction = DropdownVerticalPosition.Up,
    dropdownHeader,
    dropdownToggle,
    accentColor,
    menuItems = [],
}) => {
    return (
        <div className="sidebar-account">
            <Dropdown
                dropdownToggle={dropdownToggle}
                dropdownHeader={dropdownHeader}
                menuItems={menuItems}
                verticalPosition={direction}
                color={accentColor}
            />
        </div>
    );
};

export default SidebarAccount;
