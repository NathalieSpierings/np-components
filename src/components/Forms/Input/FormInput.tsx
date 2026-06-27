import { Control, FieldPath, FieldPathValue, FieldValues, RegisterOptions, useController } from 'react-hook-form';
import { Input, InputProps, ValidationState } from './Input';
import React from 'react';

export interface FormInputProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> extends Readonly<Omit<InputProps, 'name' | 'value' | 'defaultValue' | 'onChange' | 'onValueChange'>> {
    control: Control<TFieldValues>;
    name: TName;
    rules?: Omit<RegisterOptions<TFieldValues, TName>, 'disabled' | 'valueAsNumber' | 'valueAsDate'>;
    sanitize?: (value: string
    ) => FieldPathValue<TFieldValues, TName>;
}

const FormInput = <
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
>({
    control,
    name,
    rules,
    sanitize,
    onBlur,
    onFocus,
    ...props
}: FormInputProps<TFieldValues, TName>) => {

     const { field, fieldState } = useController({ control, name, rules });

    const [isFocused, setIsFocused] = React.useState(false);

    // Was field ever invalid?
    const wasInvalidRef = React.useRef(false);

    // User is currently fixing the field (only relevant if it was ever invalid)
    const [isFixing, setIsFixing] = React.useState(false);

    const hasError = !!fieldState.error;
    const hasValue = (field.value ?? '') !== '';

    React.useEffect(() => {
        if (hasError) {
            wasInvalidRef.current = true;
            setIsFixing(false);
        }
    }, [hasError]);


    const validationState: ValidationState = (() => {

        if (hasError) { 
            return 'invalid'; 
        }

        if (isFocused && isFixing && hasValue) {
            return 'valid';
        }

        return 'none';
    })();

    return (
        <Input
            {...props}
            ref={field.ref}
            name={field.name}
            value={field.value ?? ''}
            validationState={validationState}
            validationErrorMessage={fieldState.error?.message}
            onFocus={(event) => {
                setIsFocused(true);
                onFocus?.(event);
            }}
            onBlur={(event) => {
                setIsFocused(false);
                setIsFixing(false);
                field.onBlur();
                onBlur?.(event);
            }}
            onValueChange={(value) => {

                const sanitized = sanitize
                    ? sanitize(value)
                    : value;
                if (
                    wasInvalidRef.current &&
                    sanitized !== ''
                ) {
                    setIsFixing(true);
                }

                field.onChange(sanitized);
            }}
        />
    );
};

export default FormInput;