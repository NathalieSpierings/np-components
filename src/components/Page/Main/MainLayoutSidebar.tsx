import { CSSProperties, PropsWithChildren } from "react";
import ContentItem from "../../UI/ContentItem/ContentItem";
import DismissButton from "../../UI/DismissButton/DismissButton";
import { MainMenuItem } from "../Navigation/MainMenu/MainMenu";

export interface MainLayoutSidebarContentProps {
    css?: string;
    paddingX?: string; // bv. '0', '1rem', 'var(--page-padding-sm)'
    paddingY?: string;
}

export function MainLayoutSidebarContent({
    css = '',
    paddingX,
    paddingY,
    children
}: PropsWithChildren<MainLayoutSidebarContentProps>) {
    const style = {
        ...(paddingX !== undefined && { '--ml-sidebar-padding-x': paddingX }),
        ...(paddingY !== undefined && { '--ml-sidebar-padding-y': paddingY }),
    } as CSSProperties;

    return (
        <div className="pc-layout__content">
            <div className={`pc-layout__main main-layout__sidebar__content ${css}`} style={style}>
                {children}
            </div>
        </div>
    );
}

export function MainLayoutSidebarFooter({
    css = '',
    children
}: PropsWithChildren<{ css?: string }>) {
    return <div className={`pc-layout__footer main-layout__sidebar__footer ${css}`}>{children}</div>;
}


export interface MainLayoutSidebarProps {
    shown: boolean;
    item?: MainMenuItem;
    onDismiss: () => void;
}

function MainLayoutSidebar({
    shown,
    item,
    onDismiss
}: Readonly<MainLayoutSidebarProps>) {

  
    const style = item?.sidebarWidth
        ? ({ '--ml-sidebar-width': item.sidebarWidth } as CSSProperties)
        : undefined;


    return (
        <div
            className={`pc-layout__aside main-layout__sidebar ${shown ? 'shown' : ''}`}
            style={style}
        >       

             <div className="pc-layout pc-layout--full-height">
                <div className="pc-layout__header main-layout__sidebar__header">
                    <ContentItem item={{
                        content: item?.sidebarTitle
                            ? item.sidebarTitle
                            : (<div className="caption text-muted">MENU</div>),
                        postfix: (
                            <DismissButton
                                circle={true}
                                right={true}
                                onClick={onDismiss}
                            />
                        )
                    }} />
                </div>

                {item?.sidebar}

            </div> 
        </div>
    );
}

export default MainLayoutSidebar;
