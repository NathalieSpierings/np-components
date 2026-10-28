import { AnimatePresence, motion } from "framer-motion";
import { FC, ReactNode, useCallback } from "react";
import { NavLink } from "react-router";
import { useControllableState } from "../../../../lib/hooks/useControllableState";
import { IconDefinitions, SizeDefinitions } from "../../../../lib/utils/definitions";
import ContentItem from "../../../UI/ContentItem/ContentItem";
import Icon from "../../../UI/Icons/Icon/Icon";
import Tooltip from "../../../UI/Tooltip/Tooltip";

export interface CollapsibleMenuItem {
    id: string;
    title: ReactNode;
    description?: ReactNode;
    icon?: ReactNode;               
    badge?: ReactNode;
    url?: string;
    onClick?: (item: CollapsibleMenuItem) => void;
    disabled?: boolean;
    children?: CollapsibleMenuItem[];
}

export interface CollapsibleMenuProps {
    items: CollapsibleMenuItem[];
    openIds?: string[];
    defaultOpenIds?: string[];
    onOpenChange?: (openIds: string[]) => void;
    accordion?: boolean;
    chevronIcon?: ReactNode;
    showLines?: boolean;            // hulplijn langs de submenu's (default: true)
    collapsed?: boolean;            // alleen iconen (bv. in een ingeklapte aside)
    collapsedTooltips?: boolean;    // titel als tooltip in collapsed (default: true)
    onCollapsedClick?: (item: CollapsibleMenuItem) => void;  // klik op een item met children terwijl collapsed
    menuCss?: string;
}

type ToggleFn = (item: CollapsibleMenuItem, siblings: CollapsibleMenuItem[]) => void;

interface MenuListProps {
    items: CollapsibleMenuItem[];
    open: string[];
    toggle: ToggleFn;
    chevronIcon: ReactNode;
    collapsed: boolean;
    collapsedTooltips: boolean;
    onCollapsedClick?: (item: CollapsibleMenuItem) => void;
}

const MenuList: FC<MenuListProps> = ({ items, open, toggle, chevronIcon, collapsed, collapsedTooltips, onCollapsedClick }) => (
    <div className="collapsible-menu__items">
        {items.map((item) => {
            const hasChildren = !!item.children?.length;
            const isOpen = hasChildren && open.includes(item.id);
            const label = collapsed && typeof item.title === 'string' ? item.title : undefined;

            const postfix = (item.badge || hasChildren) ? (
                <>
                    {item.badge && <span className="collapsible-menu__badge">{item.badge}</span>}
                    {hasChildren && (
                        <motion.div
                            className="collapsible-menu__chevron"
                            animate={{ rotate: isOpen ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {chevronIcon}
                        </motion.div>
                    )}
                </>
            ) : undefined;

            const content = (
                <ContentItem item={{
                    id: item.id,
                    prefix: item.icon ?? (collapsed && typeof item.title === 'string'
                        ? <span className="collapsible-menu__initial">{item.title.charAt(0)}</span>
                        : undefined),
                    content: (
                        <>
                            <span className="collapsible-menu__title">{item.title}</span>
                            {item.description && (
                                <span className="collapsible-menu__description">{item.description}</span>
                            )}
                        </>
                    ),
                    postfix,
                }} />
            );

            const link = hasChildren ? (
                <button
                    type="button"
                    className="collapsible-menu__link"
                    aria-expanded={isOpen}
                    aria-label={label}
                    disabled={item.disabled}
                    onClick={() => {
                        if (collapsed) {
                            if (!isOpen) toggle(item, items);   // alvast open voor als het menu uitklapt
                            onCollapsedClick?.(item);
                        } else {
                            toggle(item, items);
                        }
                        item.onClick?.(item);
                    }}
                >
                    {content}
                </button>
            ) : item.url && !item.disabled ? (
                <NavLink
                    to={item.url}
                    className={({ isActive }) => `collapsible-menu__link ${isActive ? 'active' : ''}`}
                    aria-label={label}
                    onClick={() => item.onClick?.(item)}
                >
                    {content}
                </NavLink>
            ) : (
                <button
                    type="button"
                    className="collapsible-menu__link"
                    aria-label={label}
                    disabled={item.disabled}
                    onClick={() => item.onClick?.(item)}
                >
                    {content}
                </button>
            );

            return (
                <div key={item.id} className={`collapsible-menu__item ${isOpen ? 'open' : ''}`}>
                    {collapsed && collapsedTooltips ? (
                        <Tooltip content={item.title} direction="right">{link}</Tooltip>
                    ) : link}

                    {hasChildren && !collapsed && (
                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    className="collapsible-menu__submenu"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <MenuList
                                        items={item.children!}
                                        open={open}
                                        toggle={toggle}
                                        chevronIcon={chevronIcon}
                                        collapsed={collapsed}
                                        collapsedTooltips={collapsedTooltips}
                                        onCollapsedClick={onCollapsedClick}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    )}
                </div>
            );
        })}
    </div>
);

const CollapsibleMenu: FC<CollapsibleMenuProps> = ({
    items,
    openIds,
    defaultOpenIds = [],
    onOpenChange,
    accordion = false,
    chevronIcon = <Icon icon={IconDefinitions.angle_right} size={SizeDefinitions.Small} />,
    showLines = true,
    collapsed = false,
    collapsedTooltips = true,
    onCollapsedClick,
    menuCss = '',
}) => {
    const [open, setOpen] = useControllableState(openIds, defaultOpenIds, onOpenChange);

    const toggle = useCallback<ToggleFn>((item, siblings) => {
        if (open.includes(item.id)) {
            setOpen(open.filter((id) => id !== item.id));
            return;
        }
        const siblingIds = accordion ? siblings.map((s) => s.id) : [];
        setOpen([...open.filter((id) => !siblingIds.includes(id)), item.id]);
    }, [open, setOpen, accordion]);

    const css = [
        'collapsible-menu',
        !showLines && 'collapsible-menu--no-lines',
        collapsed && 'collapsible-menu--collapsed',
        menuCss,
    ].filter(Boolean).join(' ');

    return (
        <nav className={css}>
            <MenuList
                items={items}
                open={open}
                toggle={toggle}
                chevronIcon={chevronIcon}
                collapsed={collapsed}
                collapsedTooltips={collapsedTooltips}
                onCollapsedClick={onCollapsedClick}
            />
        </nav>
    );
};

export default CollapsibleMenu;
