import React, { ReactNode } from "react";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import { useResizableAside } from "../../Base/Layout/Hooks/useResizableAside";
import { DismissButton } from "../../UI/DismissButton";
import Icon from "../../UI/Icons/Icon/Icon";

export type DatagridSidebarPosition = 'left' | 'right';

export interface DatagridSidebarHeader {
    content?: ReactNode;
    borderColor?: ColorDefinitions;
}

export interface DatagridSidebarFooter {
    content?: ReactNode;
    borderColor?: ColorDefinitions;
}

export interface DatagridSidebarProps {
    header?: DatagridSidebarHeader;
    footer?: DatagridSidebarFooter;
    content?: ReactNode;
    open?: boolean | null;
    setOpen?: (open: boolean | null) => void;
    sidebarPosition?: DatagridSidebarPosition;
}

export function DatagridSidebar({
    header,
    footer,
    content,
    open,
    setOpen,
    sidebarPosition
}: Readonly<DatagridSidebarProps>) {

    const { width, resizing, startResize } = useResizableAside(400, 280, 600, sidebarPosition);

    return (
        <div className={`pc-layout__aside datagrid__sidebar datagrid__sidebar--${sidebarPosition} ${open ? 'shown' : ''}`}
            style={{ "--datagrid-sidebar-width": `${width}px` } as React.CSSProperties}

        >
            {open && (
                <div
                    className={`datagrid__resizer ${resizing ? "resizing" : ""}`}
                    onPointerDown={(e) => {
                        e.preventDefault();
                        startResize(e);
                    }}
                >
                    {/* <Icon icon={IconDefinitions.grip_h} size={SizeDefinitions.Large} duotone={false} /> */}
                </div>
            )}


            <div className="datagrid__sidebar__container">
                <div className={`datagrid__sidebar__header ${header?.borderColor ? 'border-' + header?.borderColor : ''}`}>
                    {header?.content}
                    <DismissButton right size={SizeDefinitions.Small} label="Sluiten" labelPosition="left" onClick={() => setOpen?.(false)} />
                </div>
                <div className="datagrid__sidebar__content">
                    {content}
                </div>
                <div className={`datagrid__sidebar__footer ${footer?.borderColor ? 'border-' + footer?.borderColor : ''}`}>
                    {footer?.content}
                </div>
            </div>
        </div>
    );
}