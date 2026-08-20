import React, { createContext, useContext, useEffect, useState } from 'react';

export interface ScrollContextValue {
    scrollPosition: number;
}

export const ScrollContext = createContext<ScrollContextValue | undefined>(undefined);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [scrollPosition, setScrollPosition] = useState<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            const position = window.scrollY || document.documentElement.scrollTop;
            setScrollPosition(position);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollPosition]);

    const contextValue = React.useMemo(() => ({ scrollPosition }), [scrollPosition]);
    return <ScrollContext.Provider value={contextValue}>{children}</ScrollContext.Provider>;
};

export const useScrollContext = () => {
    const context = useContext(ScrollContext);
    if (!context) {
        throw new Error('useScrollContext must be used within a ScrollProvider');
    }
    return context;
};
