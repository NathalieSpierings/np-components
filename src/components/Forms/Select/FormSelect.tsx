import React from "react";
import { Select, SelectProps } from "./Select";
import { Control, FieldPath, FieldPathValue, FieldValues, RegisterOptions, useController } from "react-hook-form";
import { ValidationState } from "../Input/Input";

export interface FormSelectProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> extends Readonly<Omit<SelectProps, 'name' | 'value' | 'defaultValue' | 'onChange' | 'onValueChange'>> {
    control: Control<TFieldValues>;
    name: TName;
    rules?: Omit<RegisterOptions<TFieldValues, TName>, 'disabled' | 'valueAsNumber' | 'valueAsDate'>;
    sanitize?: (value: string) => FieldPathValue<TFieldValues, TName>;
}

const FormSelect = <
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
}: FormSelectProps<TFieldValues, TName>) => {
    
    const { field, fieldState } = useController({
        control,
        name,
        rules,
    });

    const [isFocused, setIsFocused] = React.useState(false);

    const wasInvalidRef = React.useRef(false);
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
        if (hasError) return 'invalid';

        if (isFocused && isFixing && hasValue) {
            return 'valid';
        }
        return 'none';
    })();

    return (
        <Select
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
                const sanitized = sanitize ? sanitize(value) : value;

                if (wasInvalidRef.current && sanitized !== '') {
                    setIsFixing(true);
                }

                field.onChange(sanitized);
            }}
        />
    );
};

export default FormSelect;
