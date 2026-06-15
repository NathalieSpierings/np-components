import React, { ReactElement } from "react";
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import Icon from "../../UI/Icons/Icon/Icon";
import ContentItem from "../../Base/ContentItem/ContentItem";
import Box, { BoxProps } from "../../Base/Box/Box";

export enum DropdownVerticalPosition { Up = "Up", Down = "Down" }
export enum DropdownHorizontalPosition { Left = "Left", Right = "Right" }

// Search
export interface DropdownSearch {
    placeholder?: string;
    noResultsText?: string;
}

// Toggle
export interface DropdownToggle {
    prefix?: ReactElement | string;
    label?: ReactElement | string;
    renderArrow?: boolean;
    renderAsGhostButton?: boolean;
    ghostButtonColor?: ColorDefinitions;
    renderAsFormField?: boolean;
    formFieldPlaceholder?: string;
}


// Header
export interface DropdownHeader {
    content?: ReactElement | string;
    borderColor?: ColorDefinitions;
    keepOpen?: boolean;
    onClick?: () => void;
}

// Footer
export interface DropdownFooter {
    content?: ReactElement | string;
    borderColor?: ColorDefinitions;
    keepOpen?: boolean;
    onClick?: () => void;
}


export interface DropdownMenuItem {
    id: string;
    label: string;
    icon?: IconDefinitions;
    disabled?: boolean;
    selected?: boolean;
    divider?: boolean;
    onClick?: () => void;
    items?: DropdownMenuItem[];
}

export interface DropdownTabItem {
    id: string;
    title: ReactNode;
    menuItems?: DropdownMenuItem[];
    content?: ReactNode;
}

export interface DropdownProps extends BoxProps {
    dropdownToggle: DropdownToggle;
    children?: ReactNode;
    menuItems?: DropdownMenuItem[];
    tabs?: DropdownTabItem[];
    dropdownHeader?: DropdownHeader;
    dropdownFooter?: DropdownFooter;
    verticalPosition?: DropdownVerticalPosition;
    horizontalPosition?: DropdownHorizontalPosition;
    maxHeight?: number;
    className?: string;
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
    enableSearch?: boolean;
    search?: DropdownSearch;
}

interface DropdownCoordinates {
    top: number;
    left: number;
}

export function Dropdown({
    dropdownToggle,
    children,
    menuItems,
    tabs,
    dropdownHeader,
    dropdownFooter,
    verticalPosition = DropdownVerticalPosition.Down,
    horizontalPosition = DropdownHorizontalPosition.Left,
    maxHeight = 320,
    className,
    isOpen,
    onOpenChange,
    enableSearch,
    search,
    background,
    ...boxProps
}: DropdownProps) {

    const [internalOpen, setInternalOpen] = useState(false);
    const [coordinates, setCoordinates] = useState<DropdownCoordinates>({
        top: 0,
        left: 0,
    });

    const dropdownToggleRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [searchTerm, setSearchTerm] = useState("");
    const open = isOpen ?? internalOpen;

    const setOpen = (value: boolean) => {
        if (isOpen === undefined) {
            setInternalOpen(value);
        }

        onOpenChange?.(value);
    };

    const updatePosition = () => {
        const dropdownToggleElement = dropdownToggleRef.current;
        const dropdownElement = dropdownRef.current;

        if (!dropdownToggleElement || !dropdownElement) {
            return;
        }

        const dropdownToggleRect = dropdownToggleElement.getBoundingClientRect();
        const dropdownRect = dropdownElement.getBoundingClientRect();

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const gap = 6;
        const margin = 8;

        let actualVerticalPosition = verticalPosition;
        let actualHorizontalPosition = horizontalPosition;

        const downTop = dropdownToggleRect.bottom + gap;
        const upTop = dropdownToggleRect.top - dropdownRect.height - gap;

        const leftAlignedLeft = dropdownToggleRect.right - dropdownRect.width;
        const rightAlignedLeft = dropdownToggleRect.left;

        if (
            verticalPosition === DropdownVerticalPosition.Down &&
            downTop + dropdownRect.height > viewportHeight - margin &&
            upTop >= margin
        ) {
            actualVerticalPosition = DropdownVerticalPosition.Up;
        }

        if (
            verticalPosition === DropdownVerticalPosition.Up &&
            upTop < margin &&
            downTop + dropdownRect.height <= viewportHeight - margin
        ) {
            actualVerticalPosition = DropdownVerticalPosition.Down;
        }

        if (
            horizontalPosition === DropdownHorizontalPosition.Left &&
            leftAlignedLeft < margin &&
            rightAlignedLeft + dropdownRect.width <= viewportWidth - margin
        ) {
            actualHorizontalPosition = DropdownHorizontalPosition.Right;
        }

        if (
            horizontalPosition === DropdownHorizontalPosition.Right &&
            rightAlignedLeft + dropdownRect.width > viewportWidth - margin &&
            leftAlignedLeft >= margin
        ) {
            actualHorizontalPosition = DropdownHorizontalPosition.Left;
        }

        const top =
            actualVerticalPosition === DropdownVerticalPosition.Down
                ? downTop
                : upTop;

        const left =
            actualHorizontalPosition === DropdownHorizontalPosition.Left
                ? leftAlignedLeft
                : rightAlignedLeft;

        setCoordinates({
            top: Math.max(
                margin,
                Math.min(top, viewportHeight - dropdownRect.height - margin)
            ),
            left: Math.max(
                margin,
                Math.min(left, viewportWidth - dropdownRect.width - margin)
            ),
        });
    };

    useLayoutEffect(() => {
        if (!open) {
            return;
        }

        updatePosition();

        const update = () => updatePosition();

        window.addEventListener("resize", update);
        window.addEventListener("scroll", update, true);

        const resizeObserver = new ResizeObserver(update);

        if (dropdownToggleRef.current) {
            resizeObserver.observe(dropdownToggleRef.current);
        }

        if (dropdownRef.current) {
            resizeObserver.observe(dropdownRef.current);
        }

        return () => {
            window.removeEventListener("resize", update);
            window.removeEventListener("scroll", update, true);
            resizeObserver.disconnect();
        };
    }, [open, verticalPosition, horizontalPosition]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleMouseDown = (event: MouseEvent) => {
            const target = event.target as Node;

            if (
                dropdownToggleRef.current?.contains(target) ||
                dropdownRef.current?.contains(target) ||
                document.querySelector(".dropdown-submenu-portal")?.contains(target)
            ) {
                return;
            }

            setOpen(false);
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [open]);

    // Dropdown toggle
    const toggleCss = [
        "dropdown__toggle",
        dropdownToggle.renderAsGhostButton && "btn btn-ghost",
        dropdownToggle.renderAsGhostButton && dropdownToggle.ghostButtonColor && `btn-${dropdownToggle.ghostButtonColor}`,
    ]
        .filter(Boolean)
        .join(" ");


    const renderToggleContent = () => (
        <ContentItem item={{
            prefix: dropdownToggle.prefix ? <>{dropdownToggle.prefix}</> : undefined,
            content: dropdownToggle.label ?
                <div className="dropdown__toggle__title">
                    {dropdownToggle.label}
                    {dropdownToggle.renderArrow ? <Icon icon={IconDefinitions.angle_down} /> : null}
                </div> : undefined,
        }} />
    );
    return (
        <>
            {dropdownToggle.renderAsFormField ? (
                <button
                    ref={dropdownToggleRef}
                    className="dropdown__toggle form-group float"
                    onClick={() => setOpen(!open)}>

                    <input id="ddl_option" className="form-control" readOnly />

                    {dropdownToggle.formFieldPlaceholder && (
                        <div className="form-option">{dropdownToggle.formFieldPlaceholder}</div>
                    )}

                    <label htmlFor="ddl_option">{dropdownToggle.label}</label>
                </button>
            ) : (
                <button
                    ref={dropdownToggleRef}
                    className={toggleCss}
                    onClick={() => setOpen(!open)}>
                    {renderToggleContent()}
                </button>
            )}



            {open &&
                createPortal(
                    <Box
                        {...boxProps}
                        background={background}
                        ref={dropdownRef}
                        className={`dropdown ${className ?? ""}`}
                        style={{
                            position: "fixed",
                            top: coordinates.top,
                            left: coordinates.left,
                            zIndex: 9999,
                            maxHeight,
                        }}
                    >
                        {dropdownHeader && <div className={`dropdown__header ${dropdownHeader.borderColor ? "border-" + dropdownHeader.borderColor : ""}`}> {dropdownHeader.content}</div>}

                        {enableSearch && (
                            <div className="dropdown__menu__search">
                                <div className="dropdown__menu__search__container">
                                    <Icon icon={IconDefinitions.search} size={SizeDefinitions.Small} />
                                    <input
                                        type="text"
                                        placeholder={search?.placeholder ?? "Zoeken..."}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                            </div>
                        )}


                        <div className="dropdown__content">
                            {tabs && <DropdownTabs tabs={tabs} />}

                            {!tabs && menuItems && <DropdownMenu items={menuItems} />}

                            {!tabs && !menuItems && children}
                        </div>


                        {dropdownFooter && <div className={`dropdown__footer ${dropdownFooter.borderColor ? "border-" + dropdownFooter.borderColor : ""}`}> {dropdownFooter.content}</div>}
                    </Box>,
                    document.body
                )}
        </>
    );
}

interface DropdownTabsProps {
    tabs: DropdownTabItem[];
}

function DropdownTabs({ tabs }: DropdownTabsProps) {
    const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);

    const activeTab = tabs.find((tab) => tab.id === activeTabId);

    return (
        <div className="dropdown-tabs">
            <div className="dropdown-tabs__header">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        className={`dropdown-tabs__tab ${activeTabId === tab.id ? "dropdown-tabs__tab--active" : ""
                            }`}
                        onClick={() => setActiveTabId(tab.id)}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>

            <div className="dropdown-tabs__content">
                {activeTab?.menuItems && <DropdownMenu items={activeTab.menuItems} />}

                {activeTab?.content}
            </div>
        </div>
    );
}

interface DropdownMenuProps {
    items: DropdownMenuItem[];
}

function DropdownMenu({ items }: DropdownMenuProps) {
    return (
        <div className="dropdown-menu">
            {items.map((item) => (
                <DropdownMenuNode key={item.id} item={item} />
            ))}
        </div>
    );
}

interface DropdownMenuNodeProps {
    item: DropdownMenuItem;
}

function DropdownMenuNode({ item }: DropdownMenuNodeProps) {
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
                    <span className="dropdown-menu-item__icon">
                        <Icon icon={item.icon} />
                    </span>
                )}

                <span className="dropdown-menu-item__label">{item.label}</span>

                {hasChildren && <span className="dropdown-menu-item__arrow">›</span>}
            </button>

            {open &&
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
                        <DropdownMenu items={item.items!} />
                    </div>,
                    document.body
                )}
        </div>
    );
}
