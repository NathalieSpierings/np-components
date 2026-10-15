import React, { ReactElement } from "react";
import Logo from "../Logo/Logo";
import MainMenu, { MainMenuItem } from "../Navigation/MainMenu/MainMenu";

export interface MainLayoutMenuProps {
    shown: boolean;
    menuItems: MainMenuItem[];
    activeMenuItem: string | null;
    activeDrawerItem: string | null;
    accountMenu?: ReactElement;
    onMenuItemClick: (id: string) => void;
    onMenuItemDrawerClick: (id: string) => void;
}

function MainLayoutMenu({
    shown,
    menuItems,
    activeMenuItem,
    activeDrawerItem,
    accountMenu,
    onMenuItemClick,
    onMenuItemDrawerClick,
}: Readonly<MainLayoutMenuProps>) {
    return (
        <div className={`pc-layout__aside main-layout__menu ${shown ? 'shown' : ''}`}>
            <Logo />
            <MainMenu
                menuItems={menuItems}
                activeMenuItem={activeMenuItem}
                activeDawerMenuItem={activeDrawerItem}
                themeSwitch={true}
                accountMenu={accountMenu}
                handleMenuItemClick={onMenuItemClick}
                handleMenuItemDrawerClick={onMenuItemDrawerClick}
            />
        </div>
    );
}

export default MainLayoutMenu;
