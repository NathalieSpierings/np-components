import { CSSProperties, FC, ReactNode } from "react";
import { NavLink } from "react-router";
import { useControllableState } from "../../../lib/hooks/useControllableState";
import { ArtDefinitions, IconDefinitions } from "../../../lib/utils/definitions";
import Art from "../../Base/Art/Art";
import Dropdown, { DropdownHorizontalPosition, DropdownVerticalPosition } from "../../Forms/Dropdown/Dropdown";
import Icon from "../Icons/Icon/Icon";

export interface QuickAccessMenuItem {
    id: string;
    label: ReactNode;
    art?: ArtDefinitions;           // illustratie in de tegel
    icon?: ReactNode;               // of een eigen visual, bv. <Icon/>, als er geen art is
    url?: string;                   // NavLink
    onClick?: (item: QuickAccessMenuItem) => void;
    disabled?: boolean;
}

export interface QuickAccessMenuProps {
    items: QuickAccessMenuItem[];
    title?: ReactNode;              // header van de dropdown
    footer?: ReactNode;             // footer van de dropdown, bv. een link "Alle apps"
    toggleIcon?: ReactNode;         // default: <Icon icon={list_apps} />
    toggleLabel?: ReactNode;        // optioneel label naast het icoon
    columns?: number;               // aantal tegels naast elkaar (default: 3)
    maxHeight?: number;             // maximale hoogte van de dropdown in px, daarna scrollen (default: 420)
    open?: boolean;                 // controlled
    onOpenChange?: (open: boolean) => void;
    verticalPosition?: DropdownVerticalPosition;
    horizontalPosition?: DropdownHorizontalPosition;
    menuCss?: string;
}

const QuickAccessMenu: FC<QuickAccessMenuProps> = ({
    items,
    title,
    footer,
    toggleIcon = <Icon icon={IconDefinitions.list_apps} />,
    toggleLabel,
    columns = 3,
    maxHeight = 420,
    open,
    onOpenChange,
    verticalPosition,
    horizontalPosition = DropdownHorizontalPosition.Right,
    menuCss = '',
}) => {
    const [isOpen, setOpen] = useControllableState(open, false, onOpenChange);

    const select = (item: QuickAccessMenuItem) => {
        item.onClick?.(item);
        setOpen(false);
    };

    return (
        <Dropdown
            dropdownToggle={{
                label: toggleLabel ? <>{toggleIcon} <span>{toggleLabel}</span></> : toggleIcon,
                arrow: false,
            }}
            dropdownHeader={title ? { content: title } : undefined}
            dropdownFooter={footer ? { content: footer } : undefined}
            verticalPosition={verticalPosition}
            horizontalPosition={horizontalPosition}
            maxHeight={maxHeight}
            // Het raster heeft een vaste breedte (bv. 4 kolommen): niet beperken tot 48rem, wel tot het scherm
            maxWidth="calc(100vw - 2rem)"
            open={isOpen}
            setOpen={setOpen}
        >
            <div
                className={`quick-access-menu ${menuCss}`}
                style={{ '--quick-access-menu-columns': columns } as CSSProperties}
            >
                {items.map((item) => {
                    const content = (
                        <>
                            <span className="quick-access-menu__visual">
                                {item.art ? <Art art={item.art} /> : item.icon}
                            </span>
                            <span className="quick-access-menu__label">{item.label}</span>
                        </>
                    );

                    return item.url && !item.disabled ? (
                        <NavLink
                            key={item.id}
                            to={item.url}
                            className={({ isActive }) => `quick-access-menu__tile ${isActive ? 'active' : ''}`}
                            onClick={() => select(item)}
                        >
                            {content}
                        </NavLink>
                    ) : (
                        <button
                            key={item.id}
                            type="button"
                            className="quick-access-menu__tile"
                            disabled={item.disabled}
                            onClick={() => select(item)}
                        >
                            {content}
                        </button>
                    );
                })}
            </div>
        </Dropdown>
    );
};

export default QuickAccessMenu;
