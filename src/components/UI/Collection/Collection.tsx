import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, KeyboardEvent, ReactNode, useState } from 'react';
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from '../../../lib/utils/definitions';
import ContentItem, { ContentItemType } from '../ContentItem/ContentItem';
import Icon from '../Icons/Icon/Icon';
import { CollectionViewSelectorOption } from './CollectionViewSelector';

export type CollectionItemVariant = 'default' | 'bordered' | 'underlined';

export interface CollectionItem {
    id: string;
    content: ContentItemType;
    collapsibleContent?: ReactNode;
    defaultOpen?: boolean;
    collapsibleArrowPosition?: 'left' | 'right';
    active?: boolean;
    background?: ColorDefinitions;
    borderColor?: ColorDefinitions;
    collectionItemCss?: string;
}

export interface CollectionProps {
    items: CollectionItem[];
    itemVariant?: CollectionItemVariant;
    view?: CollectionViewSelectorOption;
    scrollable?: boolean;
    scrollheight?: number;
    colorMute?: ColorDefinitions;
    color?: ColorDefinitions;
    background?: ColorDefinitions;
    borderColor?: ColorDefinitions;
    rounded?: SizeDefinitions;
    compact?: boolean;
    medium?: boolean;
    hoverable?: boolean;
    selectable?: boolean;
    selectMultiple?: boolean;
    selected?: string[];
    setSelected?: (selected: string[]) => void;
    activeItem?: string;
    setActiveItem?: (id: string | undefined) => void;
    collectionCss?: string;
}


const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

const NESTED_INTERACTIVE_SELECTOR = [
    'a[href]',
    'button',
    'input',
    'select',
    'textarea',
    'label',
    '[role="button"]',
    '[role="checkbox"]',
    '[role="switch"]',
    '[role="link"]',
    '[role="menuitem"]',
    '[contenteditable="true"]',
    '[data-collection-ignore]',
].join(', ');

const isFromNestedInteractive = (event: React.SyntheticEvent<HTMLElement>): boolean => {
    const container = event.currentTarget;
    const target = event.target as HTMLElement | null;
    const interactive = target?.closest(NESTED_INTERACTIVE_SELECTOR);

    return !!interactive && interactive !== container && container.contains(interactive);
};

const getNewSelection = (id: string, selected: string[], selectMultiple: boolean): string[] => {
    if (!selectMultiple) return [id];

    return selected.includes(id)
        ? selected.filter(itemId => itemId !== id)
        : [...selected, id];
};



const Collection: FC<CollectionProps> = ({
    items = [],
    itemVariant = 'default',
    view,
    scrollable,
    scrollheight,
    compact,
    medium,
    colorMute,
    color,
    background,
    borderColor,
    rounded,
    hoverable = false,
    selectable = false,
    selectMultiple = false,
    collectionCss = '',
    selected = [],
    setSelected,
    activeItem,
    setActiveItem,
}) => {

    const isControlled = setActiveItem !== undefined;
    const [internalActiveItem, setInternalActiveItem] = useState<string>();
    const [hasToggled, setHasToggled] = useState(false);

    const defaultOpenItem = items.find(item => item.defaultOpen)?.id;
    const resolvedActiveItem = isControlled ? activeItem : internalActiveItem;
    const currentActiveItem = hasToggled ? resolvedActiveItem : resolvedActiveItem ?? defaultOpenItem;

    const toggleOpen = (id: string) => {
        const next = currentActiveItem === id ? undefined : id;
        setHasToggled(true);

        if (isControlled) {
            setActiveItem(next);
        } else {
            setInternalActiveItem(next);
        }
    };

    const canSelect = selectable && !!setSelected;
    const selectedSet = new Set(selected);

    const handleActivate = (id: string, hasCollapsibleContent: boolean) => {
        if (hasCollapsibleContent) {
            toggleOpen(id);
            return;
        }

        if (canSelect) {
            setSelected(getNewSelection(id, selected, selectMultiple));
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, id: string, hasCollapsibleContent: boolean) => {
        if (event.target !== event.currentTarget) return;

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleActivate(id, hasCollapsibleContent);
        }
    };

    const hasCollapsibleItems = items.some(item => !!item.collapsibleContent);
    const roundedCls = rounded && `rounded-${rounded}`;

    const collectionCls = cx(
        'collection',
        hasCollapsibleItems && 'collection--collapsible',
        view,
        collectionCss,
        scrollable && 'scroll',
        `collection--${itemVariant}`,
        compact && 'collection--compact',
        medium && 'collection--md',
        hoverable && 'collection--hover',
    );

    const collectionStyle = scrollheight == null
        ? undefined
        : ({ '--collection-scroll-height': `${scrollheight}px` } as React.CSSProperties);



    const renderItemButton = (id: string,isInteractive: boolean, isOpen: boolean, isSelected: boolean, hasCollapsibleContent: boolean) => {
        return isInteractive
            ? {
                role: 'button',
                tabIndex: 0,
                onClick: (event: React.MouseEvent<HTMLDivElement>) => {
                    if (isFromNestedInteractive(event)) return;
                    handleActivate(id, hasCollapsibleContent);
                },
                onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => handleKeyDown(event, id, hasCollapsibleContent),
                'aria-expanded': hasCollapsibleContent ? isOpen : undefined,
                'aria-pressed': !hasCollapsibleContent ? isSelected : undefined,
            }
            : {};
    }


    return (
        <div className={collectionCls} style={collectionStyle}>
            <AnimatePresence>
                {items.map(item => {
                    const { id, content } = item;
                    const arrowPosition = item.collapsibleArrowPosition ?? 'left';
                    const hasCollapsibleContent = !!item.collapsibleContent;
                    const isOpen = hasCollapsibleContent && currentActiveItem === id;
                    const isSelected = selectedSet.has(id);
                    const isInteractive = hasCollapsibleContent || canSelect;

                    const arrow = hasCollapsibleContent && (
                        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                            <Icon icon={IconDefinitions.angle_down} />
                        </motion.div>
                    );

                    const showArrowLeft = hasCollapsibleContent && arrowPosition === 'left';
                    const showArrowRight = hasCollapsibleContent && arrowPosition === 'right';

                    const prefix = (content.prefix || showArrowLeft || item.active) ? (
                        <>
                            {showArrowLeft && arrow}
                            {item.active && <div className="dot-indicator bg-primary" />}
                            {content.prefix}
                        </>
                    ) : undefined;

                    const postfix = (content.postfix || showArrowRight) ? (
                        <>
                            {content.postfix}
                            {showArrowRight && arrow}
                        </>
                    ) : undefined;

                    const itemBackground = item.background ?? background;
                    const itemBorderColor = item.borderColor ?? borderColor;

                    const itemCls = cx(
                        'collection__item',
                        isOpen && 'active',
                        isSelected && 'selected',
                        colorMute && `text-mute-${colorMute}`,
                        color && `text-${color}`,
                        itemBackground && `bg-${itemBackground}`,
                        itemBorderColor && `border-${itemBorderColor}`,
                        roundedCls,
                        item.collectionItemCss,
                    );

                    const interactiveProps = renderItemButton(id, isInteractive, isOpen, isSelected, hasCollapsibleContent);

                    return (
                        <motion.div
                            key={id}
                            layout
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring' }}
                            className={itemCls}
                        >
                            <div
                                className={cx('collection__item__container', roundedCls)}
                                style={{ cursor: isInteractive ? 'pointer' : 'default' }}
                                {...interactiveProps}
                            >
                                <ContentItem item={{ ...content, id, prefix, postfix }} />
                            </div>

                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        className={cx('collection__item__collapsible', borderColor && `border-${borderColor}`)}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <motion.div
                                            className="collection__item__collapsible__container"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ delay: 0.15 }}
                                        >
                                            {item.collapsibleContent}
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

export default Collection;
