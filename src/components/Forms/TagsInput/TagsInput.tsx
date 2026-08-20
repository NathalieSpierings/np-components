import { AnimatePresence, motion } from "framer-motion";
import React, { FocusEventHandler, ReactNode } from "react";
import { ColorDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import { DismissButton } from "../../UI/DismissButton";
import { InputVariant } from "../Input";

type SubtypeOf<TParent, TChild extends TParent> = TChild;

// Tag items keys need to be valid react keys for use in animations (framer-motion)
export type TagItemKey = SubtypeOf<React.Key, string | number | bigint>;

export interface TagItem {
    id: TagItemKey;
    title: ReactNode;
    color?: ColorDefinitions;
}

export interface TagsInputProps {
    selectedTags: TagItem[];
    setSelectedTags: (dispatch: (previousValue: TagItem[]) => TagItem[]) => void;
    textInput: string;
    setTextInput: (value: string) => void;
    onChange?: (items: TagItem[]) => void;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    color?: ColorDefinitions;
    label?: string;
    placeholder?: string;
    style?: React.CSSProperties;

    formGroupCss?: string;
    small?: boolean;
    addonPrefix?: ReactNode;
    addonSuffix?: ReactNode;
    variant?: InputVariant;
}
const TagsInput: React.FC<TagsInputProps> = ({
    selectedTags,
    setSelectedTags,
    textInput,
    setTextInput,
    onChange,
    onFocus,
    color,
    label,
    placeholder = "Press enter to add tags",
    style = {},

    formGroupCss,
    small,
    addonPrefix,
    addonSuffix,
    variant,
}) => {
    const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const inputValue = event.currentTarget.value.trim();
        if (event.key === "Enter" && inputValue !== "") {
            const newTags: TagItem[] = [
                ...selectedTags,
                {
                    id: inputValue,
                    title: inputValue,
                },
            ];
            setTextInput("");
            setSelectedTags(prev => [...prev,
                {
                    id: inputValue,
                    title: inputValue,
                }]);
            onChange?.(newTags);
        }
        if (event.key === "Backspace" && inputValue == "") {
            setSelectedTags(prev => prev.slice(0, -1));
        }
    };

    const removeTags = (idToRemove: TagItemKey) => {
        setSelectedTags(prev => {
            const newTags = prev.filter(tag => tag.id !== idToRemove); 
            onChange?.(newTags);
            return newTags
        });
    };

    const isFloating = placeholder || textInput || selectedTags.length > 0;

    const formGroupCls = [
        'form-group',
        variant !== 'default' && 'form-group--simple',
        small && 'form-group--sm',
        addonPrefix && 'has-prefix',
        addonSuffix && 'has-suffix',
        isFloating && 'floating',

        formGroupCss,
    ].filter(Boolean).join(' ');

    return (
        <div className={formGroupCls} style={style}>
            <div className="tags-input">
                <TagsList selectedTags={selectedTags} onRemove={removeTags} color={color}/>
                <input
                    id="tagsInput"
                    onFocus={onFocus}
                    onClick={e => e.stopPropagation()}
                    onInput={e => setTextInput(e.currentTarget.value)}
                    onKeyUp={onKeyUp}
                    placeholder={placeholder}
                    type="text"
                    value={textInput}
                />

                {label && <label htmlFor="tagsInput">{label}</label>}
                {addonPrefix && (<div className="form-group__prefix">{addonPrefix}</div>)}
                {addonSuffix && (<div className="form-group__suffix">{addonSuffix}</div>)}
            </div>
        </div>
    );
};

export interface TagListProps {
    selectedTags: TagItem[], 
    color?: ColorDefinitions, 
    onRemove?: (idToRemove: TagItemKey) => void
    setSelectedTags?: (dispatch: (oldValues: TagItem[]) => TagItem[]) => void;
    addonPrefix? : ReactNode
}

export const TagsList = ({
    selectedTags, 
    color = undefined, 
    onRemove = undefined,
    setSelectedTags = undefined,
    addonPrefix = undefined,
} : TagListProps) : ReactNode => {
    const hasRemoveButton = onRemove || setSelectedTags ;
    const handleRemove = (idToRemove: TagItemKey) => {
            onRemove?.(idToRemove);
            const dispach = (oldValues : TagItem[]) => oldValues.filter(({id}) => id != idToRemove);
            setSelectedTags?.(dispach);
        } ;

    return <ul className="tags shown" id="tags">
        <AnimatePresence initial={false}>
            {addonPrefix ? <div className="tags__prefix">{addonPrefix}</div> : undefined}
            {selectedTags.map(tag => (
                <motion.div
                    key={tag.id}
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0 }}
                    className={`tags__item bg-${tag.color ?? color}`}
                >
                    <span className={`tags__item__title ${hasRemoveButton ? "dismissable" : undefined}`}>{tag.title}</span>

                    {hasRemoveButton ? <DismissButton circle onClick={() => handleRemove(tag.id)} right size={SizeDefinitions.ExtraSmall} /> : null}
                </motion.div>
            ))}
        </AnimatePresence>
    </ul>
}

export default TagsInput;
