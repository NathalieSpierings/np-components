import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, ReactElement, useState } from 'react';
import { Control, FieldValues, RegisterOptions, useController } from 'react-hook-form';
import { ColorDefinitions, SizeDefinitions } from '../../../lib/utils/definitions';
import Box, { BoxProps } from '../../Base/Box/Box';
import Input from '../Input/Input';
import Checkbox from '../Checkbox/Checkbox';
import ContentItem from '../../UI/ContentItem/ContentItem';

export type MultiselectItemPosition = 'item-start' | 'item-center' | 'item-end';
export type MultiselectJustifyPosition = 'justify-start' | 'justify-center' | 'justify-end';

export interface MultiselectItemType {
    id: string;
    gap?: string;
    prefix?: string | ReactElement;
    prefixItemPosition?: MultiselectItemPosition;
    prefixGap?: string;
    content?: string | ReactElement;
    contentItemPosition?: MultiselectItemPosition;
    contentJustifyPosition?: MultiselectJustifyPosition;
    postfix?: string | ReactElement;
    postfixItemPosition?: MultiselectItemPosition;
    postfixGap?: string;
    separatorAfterPrefix?: boolean;
    separatorAfterMeta?: boolean;
}
export interface MultiselectProps extends Omit<BoxProps, 'title'> {
    items: MultiselectItemType[] | undefined;
    collectionScrollable?: boolean;
    collectionScrollheight?: string;
    collectionColorMute?: ColorDefinitions;
    collectionColor?: ColorDefinitions;
    collectionBackground?: ColorDefinitions;
    collectionBorderColor?: ColorDefinitions;
    collectionItemBorder?: 'bordered' | 'underlined';
    collectionRounded?: SizeDefinitions;
    collectionCompact?: boolean;
    collectionMedium?: boolean;
    collectionHoverable?: boolean;
    collectionSelectable?: boolean;
    collectionSelectMultiple?: boolean;
    collectionCss?: string;
    selected: string[];
    setSelected: (selected: string[]) => void;
    selectedColor?: ColorDefinitions;
    validationErrorMessage?: string;
    showSearch?: boolean;
    showCheckAll?: boolean;
    showHeader?: boolean;
    checkboxColor?: ColorDefinitions;
    headerBorderColor?: ColorDefinitions;
    title?: string | ReactElement;
    searchPlaceholder?: string;
    searchBackground?: ColorDefinitions;
}


//--- Helpers --- //

const isSelected = (option: MultiselectItemType, selected: string[]) => selected.includes(option.id);

const defaultSearch = (val: string, q: string) => val.toLowerCase().includes(q.toLowerCase());

const toText = (val: unknown): string => {
    if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
        return String(val);
    }
    return '';
};


const MultiselectHeader = ({
    showHeader,
    headerBorderColor,
    title,
    validationErrorMessage,
    showCheckAll,
    showSearch,
    allSelected,
    checkboxColor,
    selectAll,
    selectNone,
    searchTerm,
    setSearchTerm,
    searchPlaceholder,
    searchBackground
}: {
    showHeader: boolean;
    headerBorderColor?: ColorDefinitions;
    title?: string | ReactElement;
    validationErrorMessage?: string;
    showCheckAll: boolean;
    showSearch: boolean;
    allSelected: boolean;
    checkboxColor: ColorDefinitions;
    selectAll: () => void;
    selectNone: () => void;
    searchTerm: string;
    setSearchTerm: (val: string) => void;
    searchPlaceholder: string;
    searchBackground?: ColorDefinitions;

}) => {
    if (!showHeader) return null;

    return (
        <div className={`multiselect__header ${headerBorderColor ? 'border-' + headerBorderColor : ''}`}>
            {title && (
                <div className="subtitle multiselect__header__title">
                    <span>{title}</span>
                    {validationErrorMessage && (
                        <div className="field-validation-error">
                            <span>{validationErrorMessage}</span>
                        </div>
                    )}
                </div>
            )}

            {(showCheckAll || showSearch) && (
                <div className="multiselect__header__content">
                    {showCheckAll && (
                        <div className="multiselect__header__content__checkall">
                            <Checkbox
                                checked={allSelected}
                                color={checkboxColor}
                                onChange={() => (allSelected ? selectNone() : selectAll())}
                            />
                        </div>
                    )}

                    {showSearch && (
                        <div className="multiselect__header__content__search">
                            <Input
                                onValueChange={setSearchTerm}
                                label={searchPlaceholder}
                                value={searchTerm}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const MultiselectItem = ({
    item,
    selected,
    setSelected,
    checkboxColor,
    collectionItemCls,
    selectedColor,
    collectionSelectable,
    collectionSelectMultiple,
}: {
    item: MultiselectItemType;
    selected: string[];
    setSelected: (selected: string[]) => void;
    checkboxColor: ColorDefinitions;
    collectionItemCls: string;
    selectedColor: ColorDefinitions;
    collectionSelectable?: boolean;
    collectionSelectMultiple?: boolean;
}) => {
    const toggleSelect = () => {
        setSelected(
            isSelected(item, selected)
                ? selected.filter((x) => x !== item.id)
                : [...selected, item.id]
        );
    };

    const isItemSelected = isSelected(item, selected);
    const selectedCheckboxColor = checkboxColor === ColorDefinitions.Primary
        ? ColorDefinitions.Offwhite
        : checkboxColor;
    const checkboxColorToUse = isItemSelected ? selectedCheckboxColor : checkboxColor;

    return (
        <motion.div
            key={item.id}
            layout
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring' }}
            className={`collection__item ${isSelected(item, selected) ? 'selected' : ''} ${collectionItemCls}`}
            style={{
                cursor: collectionSelectable || collectionSelectMultiple ? 'pointer' : 'default',
                ...(selectedColor ? { '--color-selected': `var(--color-${selectedColor})` } : {}),
            }}
        >
            <div className="collection__item__container">
                <ContentItem key={item.id} item={{
                    gap: item.gap,
                    prefixGap: item.prefixGap,
                    prefixItemPosition: item.prefixItemPosition,
                    prefix: (
                        <Checkbox
                            checked={isSelected(item, selected)}
                            color={checkboxColorToUse}
                            onChange={toggleSelect}
                        />
                    ),
                    content: (
                        <button className="link link-hover" onClick={toggleSelect}>
                            {item.content}
                        </button>
                    ),
                    contentItemPosition: item.contentItemPosition,
                    contentJustifyPosition: item.contentJustifyPosition,
                    postfix: (item.postfix),
                    postfixItemPosition: item.postfixItemPosition,
                    postfixGap: item.postfixGap,
                    separatorAfterPrefix: item.separatorAfterPrefix,
                    separatorAfterMeta: item.separatorAfterMeta
                }} />
            </div>
        </motion.div>
    );
};

const Multiselect = ({
    items = [],
    collectionScrollable,
    collectionScrollheight,
    collectionColorMute,
    collectionColor,
    collectionBackground,
    collectionBorderColor = ColorDefinitions.Surface,
    collectionItemBorder = 'underlined',
    collectionRounded,
    collectionCompact,
    collectionMedium,
    collectionHoverable,
    collectionSelectable,
    collectionSelectMultiple,
    collectionCss,
    selected,
    setSelected,
    selectedColor = ColorDefinitions.Primary,
    validationErrorMessage,
    showSearch = true,
    showCheckAll = true,
    showHeader = true,
    headerBorderColor,
    checkboxColor = ColorDefinitions.Primary,
    title,
    searchPlaceholder = 'Zoeken...',
    searchBackground,
    children,
    ...boxProps
}: MultiselectProps): ReactElement => {
    const [searchTerm, setSearchTerm] = useState('');

    const allSelected = items.length > 0 && selected.length === items.length;
    const selectAll = () => setSelected(items.map((x) => x.id));
    const selectNone = () => setSelected([]);

    items = items.filter((x) => {
        const text = `${toText(x.prefix)} ${toText(x.content)} ${toText(x.postfix)}`;
        return defaultSearch(text, searchTerm);
    });

    const collectionItemCls = [
        collectionRounded ? `rounded-${collectionRounded}` : '',
        collectionColorMute ? `text-mute-${collectionColorMute}` : '',
        collectionColor ? `text-${collectionColor}` : '',
        collectionBackground ? `bg-${collectionBackground}` : '',
        collectionBorderColor ? `border-${collectionBorderColor}` : '',
    ]
        .filter(Boolean)
        .join(' ');

    const borderClass =
        collectionBorderColor && collectionItemBorder ? `collection--${collectionItemBorder}` : '';

    const collectionCls = [
        'collection',
        collectionCss,
        collectionScrollable ? 'scroll' : '',
        borderClass,
        collectionCompact ? `collection--compact` : '',
        collectionMedium ? `collection--md` : '',
        collectionHoverable ? 'collection--hover' : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <Box {...boxProps} css="multiselect">
            <MultiselectHeader
                showHeader={showHeader}
                headerBorderColor={headerBorderColor}
                title={title}
                validationErrorMessage={validationErrorMessage}
                showCheckAll={showCheckAll}
                showSearch={showSearch}
                allSelected={allSelected}
                checkboxColor={checkboxColor}
                selectAll={selectAll}
                selectNone={selectNone}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                searchPlaceholder={searchPlaceholder}
                searchBackground={searchBackground}
            />

            <div className="multiselect__content">
                <div
                    className={collectionCls}
                    style={
                        {
                            '--collection-scroll-height': collectionScrollheight || '300px',
                        } as React.CSSProperties
                    }
                >
                    <AnimatePresence>
                        {items.map((item) => (
                            <MultiselectItem
                                key={item.id}
                                item={item}
                                selected={selected}
                                setSelected={setSelected}
                                checkboxColor={checkboxColor}
                                collectionItemCls={collectionItemCls}
                                selectedColor={selectedColor}
                                collectionSelectable={collectionSelectable}
                                collectionSelectMultiple={collectionSelectMultiple}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </Box>
    );
};


export interface FormMultiselectProps extends Omit<MultiselectProps, 'selected' | 'setSelected'> {
    rules?: Omit<RegisterOptions<FieldValues, string>, 'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
    control: Control<any, any>;
    name: string;
}

export const FormMultiselect: FC<FormMultiselectProps> = (props) => {
    const { name, control, rules, ...rest } = props;

    const { field, fieldState } = useController({
        name,
        control,
        rules,
    });

    const { invalid, error } = fieldState;
    const validationErr = invalid ? error?.message! : '';

    return (
        <Multiselect
            {...rest}
            selected={field.value}
            setSelected={field.onChange}
            validationErrorMessage={validationErr}
        />
    );
};


export default Multiselect;