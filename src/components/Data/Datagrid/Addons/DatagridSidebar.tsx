import React, { ReactElement, ReactNode } from "react";
import { useResizableAside } from "../../../../lib/hooks/useResizableAside";
import { ColorDefinitions, SizeDefinitions } from "../../../../lib/utils/definitions";
import { DismissButton } from "../../../UI/DismissButton";
import { DatagridSidebarConfig, DatagridSidebarProps } from "../Datagrid";

export interface DatagridSidebarHeader {
    content?: ReactNode;
    borderColor?: ColorDefinitions;
}

export interface DatagridSidebarFooter {
    content?: ReactNode;
    borderColor?: ColorDefinitions;
}

export type DatagridSidebarComponentProps<TData> =
    Pick<
        DatagridSidebarProps<TData>,
        | "sidebarPosition"
        | "sidebarMinWidth"
        | "sidebarMaxWidth"
    > &
    DatagridSidebarConfig<TData> & {
        item: TData | null;
        open?: boolean;
        setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    };


export function DatagridSidebar<TData>({
    item,
    header,
    footer,
    content,
    open,
    setOpen,
    sidebarPosition,
    sidebarMinWidth = 600,
    sidebarMaxWidth = 900
}: Readonly<DatagridSidebarComponentProps<TData>>): ReactElement {

    const { width, resizing, startResize } = useResizableAside(
        sidebarMinWidth,
        sidebarMinWidth,
        sidebarMaxWidth,
        sidebarPosition
    );

    return (
        <div
            className={["pc-layout__aside datagrid__sidebar",
                `datagrid__sidebar--${sidebarPosition}`,
                open ? "shown" : ""
            ].filter(Boolean).join(" ")}
            style={{ "--datagrid-sidebar-width": `${width}px` } as React.CSSProperties}
        >
            {open && (
                <div className={`datagrid__resizer ${resizing ? "resizing" : ""}`}
                    onPointerDown={(event) => {
                        event.preventDefault();
                        startResize(event);
                    }}
                />
            )}

            <div className="datagrid__sidebar__container">
                <div
                    className={["datagrid__sidebar__header", header?.borderColor ? `border-${header.borderColor}` : ""]
                        .filter(Boolean)
                        .join(" ")}
                >
                    {header?.content}

                    <DismissButton
                        right
                        size={SizeDefinitions.Small}
                        label="Sluiten"
                        labelPosition="left"
                        onClick={() => setOpen?.(false)}
                    />
                </div>

                <div className="datagrid__sidebar__content">
                    {content?.({ item })}
                </div>

                {footer && (
                    <div
                        className={["datagrid__sidebar__footer", footer.borderColor ? `border-${footer.borderColor}` : ""]
                            .filter(Boolean)
                            .join(" ")}
                    >
                        {footer.content}
                    </div>
                )}
            </div>
        </div>
    );
}