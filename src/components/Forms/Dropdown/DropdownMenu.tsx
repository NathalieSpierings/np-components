import React, { ReactNode, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DropdownCoordinates } from "./Dropdown";
import { IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import Icon from "../../UI/Icons/Icon/Icon";


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
    forceOpenSubmenus?: boolean;
    noResultsText?: string;
}

export function DropdownMenu({
    items,
    forceOpenSubmenus = false,
    noResultsText = "Geen resultaten",

}: Readonly<DropdownMenuProps>) {

    if (items.length === 0) {
        return (
            <div className="dropdown__menu">
                <div className="dropdown__menu__node">
                    <div className="dropdown__menu__item disabled">
                        <div className="dropdown__menu__item__content">
                            {noResultsText}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="dropdown__menu">
            {items.map((item, idx) => (
                <DropdownMenuNode
                    key={item.id ?? idx}
                    item={item}
                    forceOpenSubmenus={forceOpenSubmenus}
                />
            ))}
        </div>
    );
}

export interface DropdownMenuNodeProps {
    item: DropdownMenuItem;
    forceOpenSubmenus?: boolean;
}

export function DropdownMenuNode({
    item,
    forceOpenSubmenus = false
}: Readonly<DropdownMenuNodeProps>) {

    const itemRef = useRef<HTMLButtonElement>(null);

    const [open, setOpen] = useState(false);
    const [coordinates, setCoordinates] = useState<DropdownCoordinates>({
        top: 0,
        left: 0,
    });

    const hasChildren = !!item.items?.length;
    const isOpen = forceOpenSubmenus ? true : open;

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
        if (!isOpen || !hasChildren) {
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


    useEffect(() => {
        if (!forceOpenSubmenus) {
            setOpen(false);
        }
    }, [forceOpenSubmenus]);


    const gridTemplateColumns = useMemo(() => {
        let col = "1fr";

        if (item.icon) {
            col = "20px 1fr";
        }

        if (hasChildren) {
            col = item.icon
                ? "20px 1fr 20px"
                : "1fr 20px";
        }

        return col;
    }, [item.icon, hasChildren]);


    return (
        <div
            className="dropdown__menu__node"
            onMouseEnter={() => {
                if (hasChildren && !forceOpenSubmenus) {
                    setOpen(true);
                }
            }}

            onMouseLeave={() => {
                if (hasChildren && !forceOpenSubmenus) {
                    setOpen(false);
                }
            }}
        >
            {item.divider ? (
                <div className="dropdown__divider"></div>
            ) : (
                <button
                    ref={itemRef}
                    type="button"
                    className={`dropdown__menu__item  ${item.disabled ? "disabled" : ""}`}
                    style={{ gridTemplateColumns }}
                    disabled={item.disabled}
                    onClick={() => {
                        if (!hasChildren && !item.disabled) {
                            item.onClick?.();
                        }
                    }}
                >
                    {item.icon && (<>{item.icon}</>)}

                    <div className="dropdown__menu__item__content">
                        {item.label}
                    </div>

                    {hasChildren && <span className="dropdown__menu__item__arrow">
                        <Icon icon={IconDefinitions.angle_right} size={SizeDefinitions.Small} />
                    </span>}
                </button>
            )
            }


            {isOpen && hasChildren && (
                createPortal(
                    <div
                        className="dropdown__submenu"
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
            )}
        </div >
    );
}
