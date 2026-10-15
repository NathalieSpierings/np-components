import React, { createContext, useContext, useMemo, useState } from 'react';
import { BreadcrumbItem } from '../../Page/Navigation/Breadcrumb';

export interface LayoutContextValue {
    pageTitle: string;
    setPageTitle: (title: string) => void;
    breadcrumbItems: BreadcrumbItem[];
    setBreadcrumbItems: (items: BreadcrumbItem[]) => void;
    fullscreen: boolean;
    setFullscreen: (value: boolean) => void;
    hasSidebars: boolean;
    setHasSidebars: (value: boolean) => void;
    showHeader: boolean;
    setShowHeader: (value: boolean) => void;
    showMenu: boolean;
    setShowMenu: (value: boolean) => void;
}

export const LayoutContext = createContext<LayoutContextValue | undefined>(undefined);

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    // Sets and shows a page title in the header
    const [pageTitle, setPageTitle] = useState('');

    // Sets and shows a breadcrumb in the header
    const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([]);

    // If set, padding of main content container will be set to 0
    const [fullscreen, setFullscreen] = useState(false);

    // If false, no main menu and sidebar and or drawer sections will be rendered. 
    const [hasSidebars, setHasSidebars] = useState(true);

    // If set to false, no header section will be rendered
    const [showHeader, setShowHeader] = useState(true);

    // Main menu open/closed on tablet and mobile (desktop: always visible via CSS)
    const [showMenu, setShowMenu] = useState(false);

    const contextValue = useMemo(
        () => ({
            pageTitle,
            setPageTitle,
            breadcrumbItems,
            setBreadcrumbItems,
            fullscreen,
            setFullscreen,
            hasSidebars,
            setHasSidebars,
            showHeader,
            setShowHeader,
            showMenu,
            setShowMenu,
        }),
        [pageTitle, breadcrumbItems, fullscreen, hasSidebars, showHeader, showMenu]
    );

    return (
        <LayoutContext.Provider value={contextValue}>
            {children}
        </LayoutContext.Provider>
    )   
};


export const useLayoutContext = () => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error('useLayoutContext must be used within a LayoutProvider');
    }
    return context;
};
