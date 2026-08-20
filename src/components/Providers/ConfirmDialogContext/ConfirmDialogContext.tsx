import React, { createContext, useContext, useState } from 'react';
import { ConfirmDialogItemType } from '../../UI/ConfirmDialog/ConfirmDialog';

export interface ConfirmDialogContextType {
    items: ConfirmDialogItemType[];
    enqueue: (item: ConfirmDialogItemType) => void;
    dequeue: () => void;
}

export const ConfirmDialogContext = createContext<ConfirmDialogContextType | undefined>(undefined);

export const ConfirmDialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<ConfirmDialogItemType[]>([]);

    const enqueue = (item: ConfirmDialogItemType) => {
        setItems((prev) => [...prev, item]);
    };

    const dequeue = () => {
        setItems((prev) => prev.slice(1));
    };

    const contextValue = React.useMemo(() => ({ items, enqueue, dequeue }), [items, enqueue, dequeue]);

    return (
        <ConfirmDialogContext.Provider value={contextValue}>{children}</ConfirmDialogContext.Provider>
    );
};

export const useConfirmDialog = () => {
    const context = useContext(ConfirmDialogContext);
    if (!context) {
        throw new Error('useConfirmDialog must be used within a ConfirmDialogProvider');
    }
    return context;
};
