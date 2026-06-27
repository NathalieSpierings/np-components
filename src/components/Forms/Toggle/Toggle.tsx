import React, { PropsWithChildren, ReactElement, forwardRef } from 'react';
import { Control, FieldValues, Path, RegisterOptions, useController } from 'react-hook-form';
import { ColorDefinitions } from '../../../lib/utils/definitions';
import { ValidationState } from '../Input/Input';

export interface ToggleProps extends PropsWithChildren {
    checked: boolean;
    label?: string;
    labelPosition?: 'left' | 'right';
    infoText?: string;
    color?: ColorDefinitions;
    onChange: (checked: boolean) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    validationErrorMessage?: string;
    validationBottomPosition?: string;
    validationState?: ValidationState;
    css?: string;
    readOnly?: boolean;
    disabled?: boolean;
}

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(({
    checked,
    label,
    infoText,
    labelPosition = 'right',
    color,
    onChange,
    onBlur,
    validationErrorMessage,
    validationBottomPosition,
    validationState,
    css = '',
    readOnly,
    disabled,
    children,
}, ref
) => {
    const formFieldCls = [
        'form-field',
        color ? `form-field-${color}` : '',

        validationErrorMessage && 'is-invalid',
        validationState === 'valid' && 'is-valid',
    ]
        .filter(Boolean)
        .join(' ');

    const cls = ['switch', css].filter(Boolean).join(' ');

    return (
        <div className={formFieldCls}>
            <div className="toggle-switch">
                {labelPosition === 'left' && <div className="mr-1">{label}</div>}

                <label className={cls}>
                    <span className="sr-only">{label}</span>

                    <input
                        type="checkbox"
                        ref={ref}
                        disabled={disabled}
                        readOnly={readOnly}
                        checked={checked}
                        onChange={(e) => onChange(e.target.checked)}
                        onBlur={onBlur}
                        aria-checked={checked}
                    />

                    <i />
                </label>

                {labelPosition === 'right' && <div>{label}</div>}
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

export interface FormToggleProps<
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues = TFieldValues,
> extends Omit<ToggleProps, 'onChange' | 'checked' | 'ref'> {
    rules?: Omit<
        RegisterOptions<TFieldValues>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
    >;
    control: Control<TFieldValues, TContext, TTransformedValues>;
    name: Path<TFieldValues>;
}

export const FormToggle = <
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues = TFieldValues,
>(
    props: FormToggleProps<TFieldValues, TContext, TTransformedValues>
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
    const isChecked = !!field.value;

    React.useEffect(() => {
        if (hasError) {
            wasInvalidRef.current = true;
        }
    }, [hasError]);

    const validationState: ValidationState = (() => {
        if (hasError) return 'invalid';

        if (wasInvalidRef.current && isChecked) return 'valid';

        return 'none';
    })();

    return (
        <Toggle
            {...rest}
            ref={field.ref}
            checked={isChecked}
            onChange={field.onChange}
            onBlur={field.onBlur}
            validationErrorMessage={fieldState.error?.message}
            validationState={validationState}
        >
            {children}
        </Toggle>
    );
};

export default Toggle;
