import React, { PropsWithChildren } from 'react';
import DismissButton from '../../UI/DismissButton/DismissButton';

export interface BottomSheetProps extends PropsWithChildren {
    open?: boolean;
    openBottomSheet: (open: boolean) => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ open, openBottomSheet, children }) => {
    return (
        <div className={`bottom-sheet ${open ? 'shown' : ''}`}>
            <div className="bottom-sheet__content">
                {children}
                <DismissButton
                    labelPosition="left"
                    label="sluiten"
                    right={true}
                    onClick={() => openBottomSheet(!open)}
                />
            </div>
        </div>
    );
};

export default BottomSheet;
