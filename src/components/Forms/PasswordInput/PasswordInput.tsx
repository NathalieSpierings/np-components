import React, { FC, InputHTMLAttributes, ReactElement, forwardRef, useMemo, useState } from 'react';
import { Control, FieldPath, FieldPathValue, FieldValues, Path, RegisterOptions, useController } from 'react-hook-form';
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from '../../../lib/utils/definitions';
import { DismissButton } from '../../UI/DismissButton';
import Icon from '../../UI/Icons/Icon/Icon';

function usePasswordStrength(password: string) {
    return useMemo(() => {
        let score = 0;

        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasUpperLower = hasUpper && hasLower;

        const hasNumber = /\d/.test(password);
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumberAndLetter = hasNumber && hasLetter;

        const hasSpecial = /[!%&@#$^*?_~]/.test(password);
        const hasLength = password.length > 7;

        if (hasUpperLower) score++;
        if (hasNumberAndLetter) score++;
        if (hasSpecial) score++;
        if (hasLength) score++;

        let label = '';
        let css = '';

        if (password.length) {
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

        return {
            score,
            label,
            css,
            hasUpperLower,
            hasNumber: hasNumberAndLetter,
            hasSpecial,
            hasLength,
        };
    }, [password]);
}

export interface PasswordInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'ref' | 'type'> {
    label?: string;
    inline?: boolean;
    infoText?: string;
    inputSize?: SizeDefinitions;
    color?: ColorDefinitions;
    variant?: 'default' | 'simple';
    validationErrorMessage?: string;
    validationBottomPosition?: string;
    onTextInput?: (val: string) => void;
    usePasswordCheck?: boolean;
    feedbackText?: string;
    feedbackMaxLenght?: string;
    feedbackUppercase?: string;
    feedbackNumber?: string;
    feedbackChar?: string;
}


const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
    (props, ref): ReactElement => {
        const {
            value = '',
            label,
             infoText,
            inline,
            placeholder = '',
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
            className,
            onChange,
            ...rest
        } = props;

        const [showPassword, setShowPassword] = useState(false);
        const [showHints, setShowHints] = useState(false);

        const password = String(value);
        const strength = usePasswordStrength(password);

        const cls = [
            'form-group password prefix__inline prefix__inline--right',
            variant === 'default' ? '' : 'form-group__simple',
            color ? `form-group-${color}` : '',
            inline ? 'form-group__inline' : '',
            password ? 'floating' : '',
            validationErrorMessage ? 'form-group__invalid' : '',
        ]
            .filter(Boolean)
            .join(' ');

        const inputCls = [
            className,
            'form-control',
            validationErrorMessage ? 'input-validation-error' : '',
        ]
            .filter(Boolean)
            .join(' ');

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(e);
            onTextInput?.(e.currentTarget.value);

            if (usePasswordCheck) {
                setShowHints(e.currentTarget.value.length > 0 && strength.score !== 4);
            }
        };

        const renderHint = (condition: boolean, text: string) => (
            <div className={`password-check__hints--${text.toLowerCase().replaceAll(/\s/g, '-')}`}>
                <svg className={condition ? 'shown' : ''}>
                    <use xlinkHref="#svg_icon_checkmark" />
                </svg>
                <span>{text}</span>
            </div>
        );

        return (
            <div className={cls}>
                <input
                    ref={ref}
                    className={inputCls}
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    placeholder={placeholder}
                    autoComplete="off"
                    {...rest}
                    onChange={handleChange}
                />

                {validationErrorMessage && (
                    <span className="field-validation-error" style={validationBottomPosition ? { bottom: validationBottomPosition } : undefined}>
                        <span>{validationErrorMessage}</span>
                    </span>
                )}

                {infoText ? <div className="form-text">{infoText}</div> : null}

                {label && <label>{label}</label>}

                <div className={showPassword ? 'on' : ''}>
                    <Icon
                        icon={showPassword ? IconDefinitions.eye_off : IconDefinitions.eye}
                        onClick={() => setShowPassword((s) => !s)}
                    />
                </div>

                {usePasswordCheck && (
                    <div className="password-check">
                        <div className="password-check__indicator">
                            {[0, 1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className={i < strength.score ? strength.css.replace('text-', 'bg-') : ''}
                                />
                            ))}
                        </div>

                        <div className={`password-check__feedback ${password.length ? 'shown' : ''}`}>
                            <span>{feedbackText}&nbsp;</span>
                            <strong className={strength.css}>{strength.label}</strong>
                        </div>

                        <div className={`password-check__hints ${showHints ? 'shown' : ''}`}>
                            <DismissButton
                                label="sluiten"
                                size={SizeDefinitions.Small}
                                circle
                                onClick={() => setShowHints(false)}
                            />
                            <div className="password-check__hints__container">
                                {renderHint(strength.hasLength, feedbackMaxLenght)}
                                {renderHint(strength.hasUpperLower, feedbackUppercase)}
                                {renderHint(strength.hasNumber, feedbackNumber)}
                                {renderHint(strength.hasSpecial, feedbackChar)}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
);

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