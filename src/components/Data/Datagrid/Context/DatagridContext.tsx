import React, { createContext, ReactNode, useContext, useMemo } from "react";

interface DatagridContextValue {
    compactView: boolean;
    setCompactView: React.Dispatch<React.SetStateAction<boolean>>;
}

const DatagridContext = createContext<DatagridContextValue | undefined>(undefined);

interface DatagridProviderProps {
    children: ReactNode;
    compactView: boolean;
    setCompactView: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DatagridProvider({
    children,
    compactView,
    setCompactView,
}: Readonly<DatagridProviderProps>) {

     const value = useMemo(
        () => ({
            compactView,
            setCompactView,
        }),
        [compactView, setCompactView]
    );


    return (
        <DatagridContext.Provider
            value={value}
        >
            {children}
        </DatagridContext.Provider>
    );
}

export function useDatagridContext() {
    const context = useContext(DatagridContext);

    if (!context) {
        return undefined;
    }

    return context;
}