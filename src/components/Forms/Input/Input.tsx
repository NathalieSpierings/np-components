import React, { ChangeEvent, forwardRef, InputHTMLAttributes, ReactElement, ReactNode } from 'react';
import { ColorDefinitions } from '../../../lib/utils/definitions';

export type InputType = 'text' | 'password' | 'email' | 'number' | 'date';
export type InputVariant = | 'default' | 'simple';
export type ValidationState = 'none' | 'invalid' | 'valid';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'disabled' | 'readOnly'> {
    label?: string;
    infoText?: string;
    type?: InputType;
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
    readOnly?: boolean;
    disabled?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onValueChange?: (value: string) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
        label,
        infoText,
        type = 'text',
        variant = 'default',
        validationErrorMessage,
        validationBottomPosition,
        validationState,
        small,
        addonPrefix,
        addonSuffix,
        color,
        background,
        inputCss = '',
        labelCss = '',
        formGroupCss = '',
        className,
        onChange,
        onValueChange,
        readOnly,
        disabled,
        ...inputProps
    },
    ref
): ReactElement => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        onChange?.(event);
        onValueChange?.(event.target.value);
    };

    const hasValue =
        inputProps.value !== undefined &&
        inputProps.value !== '' &&
        inputProps.value !== null;

    const hasPlaceholder = !!inputProps.placeholder;

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
    ].filter(Boolean).join(' ');

    const inputCls = [
        'form-control',
        validationErrorMessage && 'input-validation-error',
        background && `bg-${background}`,
        inputCss,
        className,
    ].filter(Boolean).join(' ');

    const lblCls = [
        color && `text-${color}`,
        labelCss,
    ].filter(Boolean).join(' ');

    return (
        <div className={formGroupCls}>

            <input
                {...inputProps}
                ref={ref}
                type={type}
                readOnly={readOnly}
                disabled={disabled}
                className={inputCls}
                onChange={handleChange}
            />

            {label && (<label className={lblCls}>{label}</label>)}

            {addonPrefix && (<div className="form-group__prefix">{addonPrefix}</div>)}

            {addonSuffix && (<div className="form-group__suffix">{addonSuffix}</div>)}

            {infoText && (<div className="form-text">{infoText}</div>)}

            {validationErrorMessage && (
                <span
                    className="field-validation-error"
                    style={
                        validationBottomPosition
                            ? { bottom: validationBottomPosition, }
                            : undefined
                    }
                >
                    <span>
                        {validationErrorMessage}
                    </span>
                </span>
            )}
        </div>
    );
}
);

Input.displayName = 'Input';

export default Input;
