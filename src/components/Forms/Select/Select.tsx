import React, { ChangeEvent, forwardRef, ReactElement, ReactNode, SelectHTMLAttributes } from 'react';
import { ColorDefinitions } from '../../../lib/utils/definitions';
import { InputVariant, ValidationState } from '../Input/Input';


export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
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
    defaultValue?: string;
    defaultLabel?: string;
    readOnly?: boolean;
    disabled?: boolean;
    onValueChange?: (value: string) => void;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    (
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
            defaultLabel,
            defaultValue,
            readOnly,
            disabled,
            children,
            ...selectProps
        },
        ref
    ): ReactElement => {

        const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
            onChange?.(event);
            onValueChange?.(event.target.value);
        };


        const hasValue =
            selectProps.value !== undefined &&
            selectProps.value !== '' &&
            selectProps.value !== null;

        const isFloating = hasValue;

        const formGroupCls = [
            'form-group select floating',
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

        const selectCls = [
            'form-control',
            validationErrorMessage && 'input-validation-error',
            readOnly && 'readonly',
            disabled && 'disabled',
            background && `bg-${background}`,
            inputCss,
            className
        ].filter(Boolean)
            .join(' ');

        const lblCls = [
            color && `text-${color}`,
            labelCss,
        ].filter(Boolean).join(' ');

        return (
            <div className={formGroupCls}>
                <select
                    {...selectProps}
                    ref={ref}
                    className={selectCls}
                    onChange={handleChange}
                >
                    {defaultLabel && (
                        <option value={defaultValue ?? ''} disabled>
                            {defaultLabel}
                        </option>
                    )}

                    {children}

                </select>

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

Select.displayName = 'Select';

export default Select;
