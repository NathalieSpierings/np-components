import React, { CSSProperties, ReactElement, useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { SvgSprite } from "../../../assets/SvgSprite";
import { useLayoutContext } from "../../Providers/LayoutContext/LayoutContext";
import Burger from "../Burger/Burger";
import Breadcrumb, { BreadcrumbItem } from "../Navigation/Breadcrumb/Breadcrumb";
import { MainMenuItem } from "../Navigation/MainMenu/MainMenu";
import PageLoader from "../PageLoader/PageLoader";
import MainLayoutMenu from "./MainLayoutMenu";
import MainLayoutSidebar from "./MainLayoutSidebar";
import MainLayoutDrawer from "./MainLayoutDrawer";
import Title from "../../Typography/Title/Title";

export interface MainLayoutProps {
    loading?: boolean;

    // Menu
    menuItems?: MainMenuItem[];
    currentMenuItem?: string | null;
    accountMenu?: ReactElement;

    // Drawer: opent de drawer vanaf een andere plek dan het menu-item
    drawerRequest?: {
        item: string;
        key: number;
    } | null;

    // Header
    pageTitle?: string;
    breadcrumbItems?: BreadcrumbItem[];
}


function MainLayout({
    loading,
    menuItems = [],
    currentMenuItem,
    accountMenu,
    drawerRequest,
    pageTitle,
    breadcrumbItems = [],
}: Readonly<MainLayoutProps>) {

    const { fullscreen, hasSidebars, showHeader, showMenu, setShowMenu } = useLayoutContext();

    const [activeMenuItem, setActiveMenuItem] = useState<string | null>(currentMenuItem ?? null);

    // Sidebar: volgt het actieve menu-item (route)
    const [sidebarDismissed, setSidebarDismissed] = useState(false);

    // Drawer
    const [activeDrawerItem, setActiveDrawerItem] = useState<string | null>(null);
    const [drawerShown, setDrawerShown] = useState(false);

    const currentSidebar = menuItems.find((x) => x.id === activeMenuItem && Boolean(x.sidebar));
    const currentDrawer = menuItems.find((x) => x.id === activeDrawerItem && Boolean(x.drawer));

    const sidebarShown = !!currentSidebar && !sidebarDismissed;
    const drawerIsShown = drawerShown && !!currentDrawer;

    // Route bepaalt welk menu-item actief is -> sidebar ja/nee
    useEffect(() => {
        setActiveMenuItem(currentMenuItem ?? null);
        setSidebarDismissed(false);
    }, [currentMenuItem]);

    // Drawer openen via een request van buitenaf
    useEffect(() => {
        if (!drawerRequest) return;
        setActiveDrawerItem(drawerRequest.item);
        setDrawerShown(true);
    }, [drawerRequest]);

    const handleMenuItemClick = (id: string) => {
        setDrawerShown(false);
        setActiveDrawerItem(null);
        setActiveMenuItem(id);
        setSidebarDismissed(false);
    };

    const handleMenuItemDrawerClick = (id: string) => {
        if (id === activeDrawerItem && drawerShown) {
            setDrawerShown(false);
        } else {
            setActiveDrawerItem(id);
            setDrawerShown(true);
        }
    };

    const dismissSidebar = useCallback(() => setSidebarDismissed(true), []);
    const dismissDrawer = useCallback(() => setDrawerShown(false), []);

    const closeAll = () => {
        setShowMenu(false);
        setSidebarDismissed(true);
        setDrawerShown(false);
    };

    const cls = [
        'pc-layout pc-layout--full-height main-layout',
        hasSidebars ? 'has-sidebars' : '',
        fullscreen ? 'main-layout--fullscreen' : ''
     ]
        .filter(Boolean)
        .join(' ');

    return (
        <>
            <PageLoader loading={loading} />

            <div className={cls} >
                <div className="pc-layout__content">
                    {hasSidebars && (
                        <>
                            <MainLayoutMenu
                                shown={showMenu}
                                menuItems={menuItems}
                                activeMenuItem={activeMenuItem}
                                activeDrawerItem={activeDrawerItem}
                                accountMenu={accountMenu}
                                onMenuItemClick={handleMenuItemClick}
                                onMenuItemDrawerClick={handleMenuItemDrawerClick}
                            />

                            <MainLayoutSidebar
                                shown={sidebarShown}
                                item={currentSidebar}
                                onDismiss={dismissSidebar}
                            />

                            <MainLayoutDrawer
                                shown={drawerIsShown}
                                item={currentDrawer}
                                onDismiss={dismissDrawer}
                            />

                            <button
                                type="button"
                                className="main-layout__backdrop"
                                aria-label="Menu sluiten"
                                tabIndex={-1}
                                onClick={closeAll}
                            />
                        </>
                    )}

                    <div className="pc-layout__main">
                        <div className="pc-layout pc-layout--full-height">
                            {showHeader && (
                                <div className="pc-layout__header main-layout__header">
                                    <Burger
                                        hasSidebars={hasSidebars}
                                        showSidebarMobile={showMenu}
                                        setShowSidebarMobile={setShowMenu}
                                    />
                                    <div className="content-item">
                                        <div className="content-item__meta">
                                            {pageTitle ? <Title>{pageTitle}</Title> : null}
                                            {breadcrumbItems.length > 0 ? <Breadcrumb items={breadcrumbItems} /> : null}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="pc-layout__content">
                                <div className="pc-layout__main main-layout__content">
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SvgSprite />
        </>
    );
}

export default MainLayout;