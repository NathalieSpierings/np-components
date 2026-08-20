import React, { ChangeEvent, FC, ReactElement, ReactNode, TextareaHTMLAttributes, forwardRef } from 'react';
import { Control, FieldValues, Path, RegisterOptions, useController } from 'react-hook-form';
import { InputVariant, ValidationState } from '../Input/Input';
import { ColorDefinitions } from '../../..';

export interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
    label?: string;
    infoText?: string;
    variant?: InputVariant;
    validationErrorMessage?: string;
    validationBottomPosition?: string;
    validationState?: ValidationState;
    color?: ColorDefinitions;
    background?: ColorDefinitions;
    small?: boolean;
    addonPrefix?: ReactNode;
    addonSuffix?: ReactNode;
    inputCss?: string;
    labelCss?: string;
    formGroupCss?: string;
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    onValueChange?: (value: string) => void;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((
    {
        label,
        infoText,
        variant = 'default',
        validationErrorMessage,
        validationBottomPosition,
        validationState,
        color,
        background,
        small,
        addonPrefix,
        addonSuffix,
        inputCss = '',
        labelCss = '',
        formGroupCss = '',
        className,
        onChange,
        onValueChange,
        ...textAreaProps
    }, ref): ReactElement => {

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        onChange?.(event);
        onValueChange?.(event.target.value);
    };

    const hasValue =
        textAreaProps.value !== undefined &&
        textAreaProps.value !== '' &&
        textAreaProps.value !== null;

    const hasPlaceholder = !!textAreaProps.placeholder;

    const isFloating = hasValue || hasPlaceholder;

    const formGroupCls = [
        'form-group',
        variant !== 'default' && 'form-group--simple',
        small && 'form-group--sm',
        addonPrefix && 'has-prefix',
        addonSuffix && 'has-suffix',
        validationErrorMessage && 'is-invalid',
        validationState === 'invalid' && 'is-invalid',
        validationState === 'valid' && 'is-valid',
        isFloating && 'floating',
        formGroupCss,
    ]
        .filter(Boolean)
        .join(' ');

    const textAreaCls = [
        'form-control',
        validationErrorMessage && 'input-validation-error',
        background && `bg-${background}`,
        inputCss,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const lblCls = [
        color && `text-${color}`,
        labelCss,
    ].filter(Boolean).join(' ');

    return (
        <div className={formGroupCls}>
            <textarea
                {...textAreaProps}
                ref={ref}
                className={textAreaCls}
                onChange={handleChange}
            />

            {label && <label className={lblCls}>{label}</label>}

            {addonPrefix && (<div className="form-group__prefix">{addonPrefix}</div>)}

            {addonSuffix && (<div className="form-group__suffix">{addonSuffix}</div>)}

            {infoText && <div className="form-text">{infoText}</div>}

            {validationErrorMessage && (
                <span
                    className="field-validation-error"
                    style={
                        validationBottomPosition
                            ? { bottom: validationBottomPosition }
                            : undefined
                    }
                >
                    <span>{validationErrorMessage}</span>
                </span>
            )}
        </div>
    );
}
);

TextArea.displayName = 'TextArea';

export default TextArea;
