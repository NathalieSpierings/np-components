import React, { InputHTMLAttributes, ReactElement, forwardRef, useMemo, useState } from 'react';
import { Control, FieldPath, FieldPathValue, FieldValues, Path, RegisterOptions, useController } from 'react-hook-form';
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from '../../../lib/utils/definitions';
import { DismissButton } from '../../UI/DismissButton';
import Icon from '../../UI/Icons/Icon/Icon';

const compName = "PasswordInput";

const getPasswordStrength = (password: string) => {
    let score = 0;

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasUpperLower = hasUpper && hasLower;

    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumberAndLetter = hasNumber && hasLetter;

    const hasSpecial = /[!%&@#$^*?_~]/.test(password);
    const hasLength = password.length >= 8;

    if (hasUpperLower) score++;
    if (hasNumberAndLetter) score++;
    if (hasSpecial) score++;
    if (hasLength) score++;

    let label = '';
    let css = '';

    if (password.length > 0) {
        if (score < 2) {
            label = 'Erg zwak';
            css = 'text-rose';
        } else if (score === 4) {
            label = 'Sterk';
            css = 'text-green';
        } else {
            label = 'Zwak';
            css = 'text-orange';
        }
    }

    return { score, label, css, hasUpperLower, hasNumber: hasNumberAndLetter, hasSpecial, hasLength };
};

function usePasswordStrength(password: string) {
    return useMemo(() => getPasswordStrength(password), [password]);
}
export interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'ref' | 'type' | 'disabled' | 'readOnly'> {
    label?: string;
    infoText?: string;
    color?: ColorDefinitions;
    variant?: 'default' | 'simple';
    validationErrorMessage?: string;
    validationBottomPosition?: string;
    onTextInput?: (value: string) => void;
    usePasswordCheck?: boolean;
    feedbackText?: string;
    feedbackMaxLenght?: string;
    feedbackUppercase?: string;
    feedbackNumber?: string;
    feedbackChar?: string;
    inputCss?: string;
    labelCss?: string;
    formGroupCss?: string;
    readOnly?: boolean;
    disabled?: boolean;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
    (
        {
            value = '',
            label,
            infoText,
            placeholder,
            color,
            variant = 'default',
            validationErrorMessage,
            validationBottomPosition,
            onTextInput,
            usePasswordCheck,
            feedbackText = 'Wachtwoord sterkte:',
            feedbackMaxLenght = 'Minstens 8 tekens',
            feedbackUppercase = 'Minstens 1 hoofdletter en 1 kleine letter',
            feedbackNumber = 'Minstens 1 cijfer',
            feedbackChar = 'Minstens 1 speciaal teken (!@#$%^&*)',
            inputCss = '',
            labelCss = '',
            formGroupCss = '',
            className,
            onChange,
            readOnly,
            disabled,
            ...inputProps
        },
        ref
    ): ReactElement => {
        const [showPassword, setShowPassword] = useState(false);
        const [showHints, setShowHints] = useState(false);

        const password = String(value ?? '');
        const strength = usePasswordStrength(password);

        const hasPlaceholder = !!placeholder;
        const isFloating = !!password || hasPlaceholder;

        const formGroupCls = [
            'form-group',
            'password',
            'has-suffix',
            variant !== 'default' && 'form-group--simple',
            validationErrorMessage && 'is-invalid',
            isFloating && 'floating',
            formGroupCss,
        ]
            .filter(Boolean)
            .join(' ');

        const inputCls = [
            'form-control',
            validationErrorMessage && 'input-validation-error',
            inputCss,
            className,
        ]
            .filter(Boolean)
            .join(' ');

        const labelCls = [
            color && `text-${color}`,
            labelCss,
        ]
            .filter(Boolean)
            .join(' ');

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = event.currentTarget.value;

            onChange?.(event);
            onTextInput?.(newValue);

            if (usePasswordCheck) {
                const newStrength = getPasswordStrength(newValue);

                setShowHints(
                    newValue.length > 0 &&
                    newStrength.score !== 4
                );
            }
        };

        const renderHint = (condition: boolean, text: string) => (
            <div
                className={`password-check__hints--${text
                    .toLowerCase()
                    .replaceAll(/\s/g, '-')}`}
            >
                <svg className={condition ? 'shown' : ''}>
                    <use xlinkHref="#svg_icon_checkmark" />
                </svg>

                <span>{text}</span>
            </div>
        );

        return (
            <div className={formGroupCls}>
                <input
                    {...inputProps}
                    ref={ref}
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    disabled={disabled}
                    className={inputCls}
                    autoComplete="off"
                    onChange={handleChange}
                />

                <div className="form-group__suffix">
                    <Icon
                        icon={
                            showPassword
                                ? IconDefinitions.eye_off
                                : IconDefinitions.eye
                        }
                        onClick={() => setShowPassword(current => !current)}
                    />
                </div>


                {label && (
                    <label className={labelCls}>
                        {label}
                    </label>
                )}

                {infoText && (
                    <div className="form-text">
                        {infoText}
                    </div>
                )}

                {usePasswordCheck && (
                    <div className="password-check">
                        <div className="password-check__indicator">
                            {[0, 1, 2, 3].map(index => (
                                <div
                                    key={index}
                                    className={
                                        index < strength.score
                                            ? strength.css.replace('text-', 'bg-')
                                            : ''
                                    }
                                />
                            ))}
                        </div>

                        <div
                            className={[
                                'password-check__feedback',
                                password.length > 0 && 'shown',
                            ]
                                .filter(Boolean)
                                .join(' ')}
                        >
                            <span>{feedbackText}&nbsp;</span>

                            <strong className={strength.css}>
                                {strength.label}
                            </strong>
                        </div>

                        <div
                            className={[
                                'password-check__hints',
                                showHints && 'shown',
                            ]
                                .filter(Boolean)
                                .join(' ')}
                        >
                            <DismissButton
                                label="sluiten"
                                size={SizeDefinitions.Small}
                                circle
                                onClick={() => setShowHints(false)}
                            />

                            <div className="password-check__hints__container">
                                {renderHint(
                                    strength.hasLength,
                                    feedbackMaxLenght
                                )}

                                {renderHint(
                                    strength.hasUpperLower,
                                    feedbackUppercase
                                )}

                                {renderHint(
                                    strength.hasNumber,
                                    feedbackNumber
                                )}

                                {renderHint(
                                    strength.hasSpecial,
                                    feedbackChar
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {validationErrorMessage && (
                    <span
                        className="field-validation-error"
                        style={
                            validationBottomPosition
                                ? { bottom: validationBottomPosition }
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

PasswordInput.displayName = compName;

export default PasswordInput;


export interface FormPasswordInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TContext = any,
    TTransformedValues = TFieldValues,
> extends Omit<PasswordInputProps, 'onChange' | 'value' | 'onBlur' | 'name'> {
    rules?: Omit<RegisterOptions<TFieldValues>, 'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
    control: Control<TFieldValues, TContext, TTransformedValues>;
    name: Path<TFieldValues>;
    sanitize?: (value: string) => FieldPathValue<TFieldValues, TName>;
}

export const FormPasswordInput = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TContext = any,
    TTransformedValues = TFieldValues,
>(
    props: FormPasswordInputProps<TFieldValues, TName, TContext, TTransformedValues>
) => {
    const { name, control, rules, ...rest } = props;

    const { field, fieldState } = useController({
        name,
        control,
        rules,
    });

    const { invalid, error } = fieldState;
    const validationErr = invalid ? error?.message! : '';

    return (
        <PasswordInput
            ref={field.ref}
            onChange={field.onChange}
            onBlur={field.onBlur}
            value={field.value || ''}
            name={field.name}
            validationErrorMessage={invalid ? validationErr : undefined}
            {...rest}
        />
    );
};