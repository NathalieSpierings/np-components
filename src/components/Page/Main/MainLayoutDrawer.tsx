import React, { createContext, CSSProperties, PropsWithChildren, useContext, useMemo } from "react";
import ContentItem from "../../UI/ContentItem/ContentItem";
import DismissButton from "../../UI/DismissButton/DismissButton";
import { MainMenuItem } from "../Navigation/MainMenu/MainMenu";

export interface MainLayoutDrawerContextValue {
    close: () => void;
}

const MainLayoutDrawerContext = createContext<MainLayoutDrawerContextValue>({ close: () => { } });

export const useMainLayoutDrawer = () => useContext(MainLayoutDrawerContext);

export function MainLayoutDrawerHeader({
    css = '',
    dismiss = true,
    children
}: PropsWithChildren<{ css?: string; dismiss?: boolean }>) {

    const { close } = useMainLayoutDrawer();

    return (
        <div className={`pc-layout__header main-layout__drawer__header ${css}`}>
            <ContentItem item={{
                content: children,
                postfix: dismiss ? (
                    <DismissButton
                        circle={true}
                        right={true}
                        onClick={close}
                    />
                ) : undefined
            }} />
        </div>
    );
}


export function MainLayoutDrawerContent({
    css = '',
    children
}: PropsWithChildren<{ css?: string }>) {
    return (
        <div className="pc-layout__content">
            <div className={`pc-layout__main main-layout__drawer__content ${css}`}>{children}</div>
        </div>
    );
}

export function MainLayoutDrawerFooter({
    css = '',
    children
}: PropsWithChildren<{ css?: string }>) {
    return <div className={`pc-layout__footer main-layout__drawer__footer ${css}`}>{children}</div>;
}




export interface MainLayoutDrawerProps {
    shown: boolean;
    item?: MainMenuItem;
    onDismiss: () => void;
}

function MainLayoutDrawer({
    shown,
    item,
    onDismiss
}: Readonly<MainLayoutDrawerProps>) {
    
    const contextValue = useMemo(() => ({ close: onDismiss }), [onDismiss]);

    const style = item?.drawerWidth
        ? ({ '--ml-drawer-width': item.drawerWidth } as CSSProperties)
        : undefined;


    return (
        <div
            className={`pc-layout__aside main-layout__drawer ${shown ? 'shown' : ''}`}
            style={style}
        >

            <MainLayoutDrawerContext.Provider value={contextValue}>
                <div className="pc-layout pc-layout--full-height">
                    {/* Standaard header als er een titel is opgegeven */}
                    {item?.drawerTitle && <MainLayoutDrawerHeader>{item.drawerTitle}</MainLayoutDrawerHeader>}

                    {item?.drawer}
                </div>
            </MainLayoutDrawerContext.Provider>
        </div>
    );
}

export default MainLayoutDrawer;
