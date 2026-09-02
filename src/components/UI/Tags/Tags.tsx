import React, { ReactNode, useState } from "react";
import DismissButton from "../../UI/DismissButton/DismissButton";
import { AnimatePresence, motion } from "framer-motion";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import ContentItem from "../ContentItem/ContentItem";
import Icon from "../Icons/Icon/Icon";

export interface TagItem {
    id: string;
    label: string;
    prefix?: ReactNode;
    postfix?: ReactNode;
}

export interface TagsProps {
    tags: TagItem[];
    onAdd?: (value: string) => void;
    onRemove?: (tag: TagItem) => void;
    placeholder?: string;
    tagsCss?: string;
    color?: ColorDefinitions;
    enableMinimalOneTag?: boolean;
}

function Tags({
    tags,
    onAdd,
    onRemove,
    placeholder = "Tag toevoegen",
    color,
    tagsCss = "",
    enableMinimalOneTag = false
}: Readonly<TagsProps>) {

    const [isAdding, setIsAdding] = useState(false);
    const [value, setValue] = useState("");

    const close = () => {
        setValue("");
        setIsAdding(false);
    };

    const addTag = () => {
        const tag = value.trim();

        if (!tag) {
            return;
        }

        onAdd?.(tag);
        close();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addTag();
        }

        if (event.key === "Escape") {
            close();
        }
    };

    const canRemoveTag = !enableMinimalOneTag || tags.length > 1;


    return (
        <div className={`tags  shown ${tagsCss}`}>
            <AnimatePresence initial={false}>
                {tags.map(tag => {

                    return (
                        <motion.div
                            key={tag.id}
                            className={color ? `tag bg-${color}` : "tag"}

                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            layout                        >
                            <ContentItem item={{
                                prefix: tag.prefix,
                                content: tag.label,
                                postfix: tag.postfix,
                            }} />

                            {onRemove && canRemoveTag && (
                          
                                <DismissButton 
                                    size={SizeDefinitions.Tiny} 
                                    onClick={() => onRemove(tag)}
                                /> 
                            )}
                        </motion.div>
                    );
                })}

                {onAdd && (
                    isAdding ? (
                        <input
                            autoFocus
                            className={color ? `tags__input border-${color}` : "tags__input"}
                            value={value}
                            placeholder={placeholder}
                            onChange={event => setValue(event.target.value)}
                            onKeyDown={handleKeyDown}
                            onBlur={close}
                            style={color ? { "--color-primary": color } as React.CSSProperties : undefined}
                        />
                    ) : (
                        <button
                            type="button"
                            className={color ? `tags__add hover:bg-${color}` : "tags__add"}
                            onClick={() => setIsAdding(true)}
                            aria-label="Tag toevoegen"
                        >
                            <Icon icon={IconDefinitions.plus} renderPlainSvg />
                        </button>

                    )
                )}
            </AnimatePresence>
        </div>
    );
}

export default Tags;