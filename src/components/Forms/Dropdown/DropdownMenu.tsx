import React, { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DropdownCoordinates } from "./Dropdown";


export interface DropdownMenuItem {
    id?: string | number;
    label?: ReactNode;
    icon?: ReactNode;
    disabled?: boolean;
    selected?: boolean;
    divider?: boolean;
    onClick?: () => void;
    items?: DropdownMenuItem[];
}


export interface DropdownMenuProps {
    items: DropdownMenuItem[];
}

export function DropdownMenu({
    items
}: Readonly<DropdownMenuProps>) {
    return (
        <div className="dropdown-menu">
            {items.map((item) => (
                <DropdownMenuNode key={item.id} item={item} />
            ))}
        </div>
    );
}


export interface DropdownMenuNodeProps {
    item: DropdownMenuItem;
}

export function DropdownMenuNode({
    item
}: Readonly<DropdownMenuNodeProps>) {

    const itemRef = useRef<HTMLButtonElement>(null);

    const [open, setOpen] = useState(false);
    const [coordinates, setCoordinates] = useState<DropdownCoordinates>({
        top: 0,
        left: 0,
    });

    const hasChildren = !!item.items?.length;

    const updateSubmenuPosition = () => {
        const itemElement = itemRef.current;

        if (!itemElement) {
            return;
        }

        const rect = itemElement.getBoundingClientRect();

        const margin = 8;
        const submenuWidth = 220;

        const opensRight = rect.right + submenuWidth <= window.innerWidth - margin;

        setCoordinates({
            top: Math.max(margin, rect.top),
            left: opensRight
                ? rect.right
                : Math.max(margin, rect.left - submenuWidth),
        });
    };

    useLayoutEffect(() => {
        if (!open || !hasChildren) {
            return;
        }

        updateSubmenuPosition();

        const update = () => updateSubmenuPosition();

        window.addEventListener("resize", update);
        window.addEventListener("scroll", update, true);

        return () => {
            window.removeEventListener("resize", update);
            window.removeEventListener("scroll", update, true);
        };
    }, [open, hasChildren]);

    return (
        <div
            className="dropdown-menu-node"
            onMouseEnter={() => {
                if (hasChildren) {
                    setOpen(true);
                }
            }}
            onMouseLeave={() => {
                if (hasChildren) {
                    setOpen(false);
                }
            }}
        >
            {item.divider ? (
                <div className="dropdown__divider"></div>
            ) :

                (
                    <button
                        ref={itemRef}
                        type="button"
                        className={`dropdown-menu-item ${item.disabled ? "dropdown-menu-item--disabled" : ""
                            }`}
                        disabled={item.disabled}
                        onClick={() => {
                            if (!hasChildren && !item.disabled) {
                                item.onClick?.();
                            }
                        }}
                    >
                        {item.icon && (
                            <span className="dropdown-menu-item__icon">{item.icon}</span>
                        )}

                        <span className="dropdown-menu-item__text">{item.label}</span>

                        {hasChildren && <span className="dropdown-menu-item__arrow">›</span>}
                    </button>
                )
            }


            {
                open &&
                hasChildren &&
                createPortal(
                    <div
                        className="dropdown-submenu-portal"
                        style={{
                            position: "fixed",
                            top: coordinates.top,
                            left: coordinates.left,
                            zIndex: 10000,
                        }}
                    >
                        <DropdownMenu items={item.items ?? []} />
                    </div>,
                    document.body
                )
            }
        </div >
    );
}
