import React, { forwardRef, PropsWithChildren, ReactElement } from 'react';
import { Control, FieldValues, RegisterOptions, useController, Path } from 'react-hook-form';
import { ColorDefinitions } from '../../../lib/utils/definitions';
import { ValidationState } from '../Input/Input';

export interface RadioButtonProps extends PropsWithChildren {
    name?: string;
    label?: string;
    infoText?: string;
    value: string;
    checked?: boolean;
    color?: ColorDefinitions;
    validationErrorMessage?: string;
    validationBottomPosition?: string;
    validationState?: ValidationState;
    onChange?: (value: string) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    css?: string;
    readOnly?: boolean;
    disabled?: boolean;
}

const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
(
    {
        name,
        label,
        infoText,
        value,
        checked,
        color,
        validationErrorMessage,
        validationBottomPosition,
        validationState,
        onChange,
        onBlur,
        readOnly,
        disabled,
        css = '',
        children,
    },
    ref
) => {
    const handleChange = () => {
        onChange?.(value);
    };

    const formFieldCls = [
        'form-field',
        color ? `form-field-${color}` : '',
        validationErrorMessage && 'is-invalid',
        validationState === 'valid' && 'is-valid',
    ]
        .filter(Boolean)
        .join(' ');

    const cls = ['radio', css].filter(Boolean).join(' ');

    return (
        <div className={formFieldCls}>
            <div className={cls}>
                <label htmlFor={`${name}-${value}`}>
                    <span className="sr-only">{label}</span>

                    <input
                        ref={ref}
                        type="radio"
                        name={name}
                        id={`${name}-${value}`}
                        value={value}
                        disabled={disabled}
                        readOnly={readOnly}
                        checked={checked}
                        onChange={handleChange}
                        onBlur={onBlur}
                    />

                    <span className="checker">
                        <span className="check"></span>
                    </span>
                </label>

                <div>{label}</div>
            </div>

            {infoText && <small className="form-text">{infoText}</small>}

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

            {children}
        </div>
    );
});

export interface FormRadioProps<
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues = TFieldValues,
> extends Omit<RadioButtonProps, 'onChange' | 'checked' | 'ref'> {
    rules?: Omit<
        RegisterOptions<TFieldValues>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
    >;
    control: Control<TFieldValues, TContext, TTransformedValues>;
    name: Path<TFieldValues>;
}

export const FormRadio = <
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues = TFieldValues,
>(
    props: FormRadioProps<TFieldValues, TContext, TTransformedValues>
): ReactElement => {
    const {
        control,
        rules,
        name,
        children,
        ...rest
    } = props;

    const { field, fieldState } = useController({
        name,
        control,
        rules,
    });

    const wasInvalidRef = React.useRef(false);

    const hasError = !!fieldState.error;

    const isSelected = field.value === rest.value;

    React.useEffect(() => {
        if (hasError) {
            wasInvalidRef.current = true;
        }
    }, [hasError]);

    const validationState: ValidationState = (() => {
        if (hasError) return 'invalid';

        if (wasInvalidRef.current && isSelected) return 'valid';

        return 'none';
    })();

    return (
        <RadioButton
            {...rest}
            ref={field.ref}
            name={name}
            checked={isSelected}
            onChange={field.onChange}
            onBlur={field.onBlur}
            validationErrorMessage={fieldState.error?.message}
            validationState={validationState}
        >
            {children}
        </RadioButton>
    );
};

export default RadioButton;
