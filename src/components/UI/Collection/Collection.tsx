import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, PropsWithChildren, ReactElement, ReactNode, useEffect } from 'react';
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from '../../../lib/utils/definitions';
import { CollectionViewSelectorOption } from './CollectionViewSelector';
import ContentItem from '../ContentItem/ContentItem';
import Icon from '../Icons/Icon/Icon';

const isSelected = (option: CollectionItemType, selected: string[]) => {
    return selected.includes(option.id ?? '');
};

export type CollectionItemPosition = 'item-start' | 'item-center' | 'item-end';
export type contentJustifyPosition = 'justify-start' | 'justify-center' | 'justify-end';

export interface CollectionItemType {
    id: string;
    gap?: string;
    prefix?: string | ReactElement;
    prefixItemPosition?: CollectionItemPosition;
    prefixGap?: string;
    contentCss?: string;
    content?: string | ReactElement;
    contentItemPosition?: CollectionItemPosition;
    contentJustifyPosition?: contentJustifyPosition;
    postfix?: string | ReactElement;
    postfixItemPosition?: CollectionItemPosition;
    postfixGap?: string;
    separatorAfterPrefix?: boolean;
    separatorAfterMeta?: boolean;
    collapsibleContent?: ReactNode;
    defaultOpen?: boolean;
    collapsibleArrowPosition?: 'left' | 'right';
    active?: boolean;
}

export interface CollectionProps extends PropsWithChildren {
    items: CollectionItemType[] | undefined;
    view?: CollectionViewSelectorOption;
    scrollable?: boolean;
    scrollheight?: string;
    colorMute?: ColorDefinitions;
    color?: ColorDefinitions;
    background?: ColorDefinitions;
    borderColor?: ColorDefinitions;
    itemBorder?: 'bordered' | 'underlined';
    rounded?: SizeDefinitions;
    compact?: boolean;
    medium?: boolean;
    hoverable?: boolean;
    selectable?: boolean;
    selectMultiple?: boolean;
    collectionCss?: string;
    selected?: string[];
    setSelected?: (selected: string[]) => void;

    activeItem?: string;
    setActiveItem?: (id: string | undefined) => void;
}

const Collection: FC<CollectionProps> = ({
    items = [],
    view,
    scrollable,
    scrollheight,
    compact,
    medium,
    colorMute,
    color,
    background,
    borderColor,
    itemBorder,
    rounded,
    hoverable,
    selectable,
    selectMultiple,
    collectionCss = '',
    selected,
    setSelected,
    activeItem,
    setActiveItem
}) => {

    const [internalActiveItem, setInternalActiveItem] = React.useState<string | undefined>(
        items.find((item) => item.defaultOpen)?.id
    );

    const [manuallyClosedItems, setManuallyClosedItems] = React.useState<string[]>([]);

    const defaultOpenItem = items.find(
        (item) => item.defaultOpen && !manuallyClosedItems.includes(item.id)
    )?.id;

    const currentActiveItem = activeItem ?? internalActiveItem ?? defaultOpenItem;

    const setCurrentActiveItem = setActiveItem ?? setInternalActiveItem;

    React.useEffect(() => {
        if (!defaultOpenItem) return;
        if (currentActiveItem) return;

        setCurrentActiveItem(defaultOpenItem);
    }, [defaultOpenItem, currentActiveItem, setCurrentActiveItem]);

    const toggleOpen = (id: string) => {
        if (currentActiveItem === id) {
            setManuallyClosedItems((current) => [...current, id]);
            setCurrentActiveItem(undefined);
            return;
        }

        setManuallyClosedItems((current) =>
            current.filter((itemId) => itemId !== id)
        );

        setCurrentActiveItem(id);
    };

    useEffect(() => {
        const activeDefaultOpenIds = new Set(items.filter((item) => item.defaultOpen).map((item) => item.id)
        );

        setManuallyClosedItems((current) =>
            current.filter((id) => activeDefaultOpenIds.has(id))
        );
    }, [items]);

  

    const handleItemClick = (id: string) => {
        if (!selectable || !setSelected) return;

        const currentSelected = selected ?? [];

        if (selectMultiple) {
            const isAlreadySelected = currentSelected.includes(id);
            const newSelection = isAlreadySelected
                ? currentSelected.filter((itemId) => itemId !== id)
                : [...currentSelected, id];
            setSelected(newSelection);
        } else {
            setSelected([id]);
        }
    };

    const hasCollapsibleItems = items.some((item) => !!item.collapsibleContent);

    const cls = [
        'collection',
        hasCollapsibleItems ? 'collection--collapsible' : '',
        view,
        collectionCss,
        scrollable ? 'scroll' : '',
        borderColor && itemBorder ? `collection--${itemBorder}` : '',
        compact ? `collection--compact` : '',
        medium ? `collection--md` : '',
        hoverable ? 'collection--hover' : '',
    ].filter(Boolean).join(' ');

    return (
        <div
            className={cls}
            style={
                {
                    '--collection-scroll-height': scrollheight || '300px',
                } as React.CSSProperties
            }
        >
            <AnimatePresence>
                {items?.map((item, idx) => {

                    const arrowPosition = item.collapsibleArrowPosition ?? 'left';
                    const hasCollapsibleContent = !!item.collapsibleContent;
                    const isOpen = currentActiveItem === item.id;

                    const arrow = hasCollapsibleContent ? (
                        <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Icon icon={IconDefinitions.angle_down} />
                        </motion.div>
                    ) : undefined;

                    const prefix = (
                        <>
                            {arrowPosition === 'left' && arrow}

                            {item.active && (
                                <div className={`dot-indicator ${item.active ? 'bg-primary' : ''}`} />
                            )}

                            {item.prefix}
                        </>
                    );

                    const postfix = (
                        <>
                            {item.active && (
                                <div className={`dot-indicator ${item.active ? 'bg-primary' : ''}`} />
                            )}
                            {item.postfix}

                            {arrowPosition === 'right' && arrow}
                        </>
                    );

                    const cls = [
                        'collection__item',
                        hasCollapsibleContent && isOpen ? 'active' : '',
                        isSelected(item, selected || []) ? 'selected' : '',
                        colorMute ? `text-mute-${colorMute}` : ``,
                        color ? `text-${color}` : ``,
                        background ? `bg-${background}` : ``,
                        borderColor ? `border-${borderColor}` : ``,
                        rounded ? `rounded-${rounded}` : '',
                    ]
                        .filter(Boolean)
                        .join(' ');

                    return (
                        <motion.div
                            key={item.id || idx}
                            layout
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring' }}
                            className={cls}
                            style={{ cursor: selectable || selectMultiple || hasCollapsibleContent ? 'pointer' : 'default' }}
                        >
                            <div
                                className={`collection__item__container ${rounded ? `rounded-${rounded}` : ''}`}
                                onClick={() => {
                                    if (hasCollapsibleContent) {
                                        toggleOpen(item.id);
                                        return;
                                    }

                                    if ((selectable || selectMultiple) && setSelected) {
                                        handleItemClick(item.id);
                                    }
                                }}
                            >
                                <ContentItem
                                    item={{
                                        id: item.id,
                                        gap: item.gap,
                                        prefixGap: item.prefixGap,
                                        prefixItemPosition: item.prefixItemPosition,
                                        prefix: item.prefix || arrowPosition === 'left' ? prefix : undefined,
                                        contentCss: item.contentCss,
                                        content: item.content,
                                        contentItemPosition: item.contentItemPosition,
                                        contentJustifyPosition: item.contentJustifyPosition,
                                        postfix: item.postfix || arrowPosition === 'right' ? postfix : undefined,
                                        postfixItemPosition: item.postfixItemPosition,
                                        postfixGap: item.postfixGap,
                                        separatorAfterPrefix: item.separatorAfterPrefix,
                                        separatorAfterMeta: item.separatorAfterMeta,
                                    }}
                                />
                            </div>

                            <AnimatePresence initial={false}>
                                {hasCollapsibleContent && isOpen && (
                                    <motion.div
                                        className={`collection__item__collapsible ${borderColor ? 'border-' + borderColor : ''}`}
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
