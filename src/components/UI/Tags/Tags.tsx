import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode, useMemo, useState } from "react";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import Dropdown, { DropdownHorizontalPosition, DropdownVerticalPosition } from "../../Forms/Dropdown/Dropdown";
import { DropdownMenuItem } from "../../Forms/Dropdown/DropdownMenu";
import DismissButton from "../../UI/DismissButton/DismissButton";
import ContentItem from "../ContentItem/ContentItem";
import Icon from "../Icons/Icon/Icon";

type StringKeyOf<T> = {
    [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

type StringOrNumberKeyOf<T> = {
    [K in keyof T]: T[K] extends string | number ? K : never;
}[keyof T];

const getLabelValue = <T,>(
    item: T,
    key: StringKeyOf<T>
): string => {
    return item[key] as string;
};

const getIdValue = <T,>(
    item: T,
    key: StringOrNumberKeyOf<T>
): string | number => {
    return item[key] as string | number;
};


export interface TagItem {
    id: string | number;
    label: string;
    prefix?: ReactNode;
    postfix?: ReactNode;
}

export interface TagsProps<T = TagItem> {
    tags: TagItem[];
    onAdd?: (value: string) => void;
    onAddItem?: (item: T) => void;
    onRemove?: (tag: TagItem) => void;
    dataSource?: T[];
    dataSourceId?: StringOrNumberKeyOf<T>;
    dataSourceLabel?: StringKeyOf<T>;
    placeholder?: string;
    tagsCss?: string;
    color?: ColorDefinitions;
    enableMinimalOneTag?: boolean;
    addButton?: ReactNode;
    dropdownToggleCss?: string;
    dropdownVerticalPosition?: DropdownVerticalPosition;
    dropdownHorizontalPosition?: DropdownHorizontalPosition;  
    readOnly?: boolean;  
}

function Tags<T = TagItem>({
    tags,
    onAdd,
    onAddItem,
    onRemove,
    dataSource,
    dataSourceId,
    dataSourceLabel,
    placeholder = "Tag toevoegen",
    color,
    tagsCss = "",
    enableMinimalOneTag = false,
    addButton,
    dropdownToggleCss = '',
    dropdownVerticalPosition,
    dropdownHorizontalPosition = DropdownHorizontalPosition.Right,
    readOnly
    
}: Readonly<TagsProps<T>>) {

    const [isAdding, setIsAdding] = useState(false);
    const [value, setValue] = useState("");

    const close = () => {
        setValue("");
        setIsAdding(false);
    };

    const addTag = () => {
        const tag = value.trim();

        if (!tag || dataSource) {
            return;
        }

        onAdd?.(tag);
        close();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && !dataSource) {
            event.preventDefault();
            addTag();
        }

        if (event.key === "Escape") {
            close();
        }
    };

    const canRemoveTag = !enableMinimalOneTag || tags.length > 1 || !readOnly;

    const dropdownItems = useMemo<DropdownMenuItem[]>(() => {
        if (!dataSource || !dataSourceId || !dataSourceLabel) {
            return [];
        }

        return dataSource
            .filter(item => {
                const id = getIdValue(item, dataSourceId);

                return !tags.some(tag => tag.id === id);
            })
            .map(item => {
                const id = getIdValue(item, dataSourceId);
                const label = getLabelValue(item, dataSourceLabel);

                return {
                    id,
                    label,
                    onClick: () => { onAddItem?.(item); }
                };
            });
    }, [dataSource, dataSourceId, dataSourceLabel, tags, onAddItem]);

    const hasDataSource = !!dataSource && !!dataSourceId && !!dataSourceLabel;

    return (
        <div className={`tags shown ${tagsCss}`}>
            <AnimatePresence initial={false}>
                {tags.map(tag => (
                    <motion.div
                        key={tag.id}
                        className={color ? `tag bg-${color}` : "tag"}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        layout
                    >
                        <ContentItem
                            item={{
                                prefix: tag.prefix,
                                content: tag.label,
                                postfix: tag.postfix
                            }}
                        />

                        {onRemove && canRemoveTag && (
                            <DismissButton
                                size={SizeDefinitions.Tiny}
                                onClick={() =>
                                    onRemove(tag)
                                }
                            />
                        )}
                    </motion.div>
                ))}

                {!readOnly && hasDataSource && onAddItem && dropdownItems.length > 0 && (
                    <Dropdown
                        dropdownToggle={{
                            label: addButton ?? (
                                <Icon icon={IconDefinitions.plus}
                                    background={ColorDefinitions.SurfaceDark}
                                    hoverBackground={ColorDefinitions.Primary}
                                />
                            ),
                            dropdownToggleCss: dropdownToggleCss
                        }}
                        menuItems={dropdownItems}
                        enableSearch
                        searchPlaceholder={placeholder}
                        searchNoResultsText="Geen resultaten"
                        verticalPosition={dropdownVerticalPosition}
                        horizontalPosition={dropdownHorizontalPosition}
                    />
                )}

                {!readOnly && !hasDataSource && onAdd && (
                    isAdding ? (
                        <input
                            autoFocus
                            className={color ? `tags__input border-${color}` : "tags__input"}
                            value={value}
                            placeholder={placeholder}
                            onChange={event => setValue(event.target.value)}
                            onKeyDown={handleKeyDown}
                            onBlur={close}
                        />
                    ) : (
                        <button
                            type="button"
                            className={color ? `tags__add hover:bg-${color}` : "tags__add"}
                            onClick={() => setIsAdding(true)}
                            aria-label="Tag toevoegen"
                        >
                            {addButton ?? (
                                <Icon icon={IconDefinitions.plus}
                                    background={ColorDefinitions.SurfaceDark}
                                    hoverBackground={ColorDefinitions.Primary}
                                />
                            )}
                        </button>
                    )
                )}
            </AnimatePresence>
        </div>
    );
}

export default Tags;
