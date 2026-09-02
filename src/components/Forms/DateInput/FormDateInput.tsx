
import React from 'react';
import { Control, FieldValues, Path, RegisterOptions, useController } from 'react-hook-form';
import { ValidationState } from '../Input/Input';
import DateInput, { DateInputProps } from './DateInput';


export interface FormDateInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues = TFieldValues,
> extends Omit<DateInputProps, "value" | "name"> {
    rules?: Omit<RegisterOptions<TFieldValues>, "disabled" | "valueAsNumber" | "valueAsDate">;
    control: Control<TFieldValues, TContext, TTransformedValues>;
    name: Path<TFieldValues>;
}


const FormDateInput = <
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues = TFieldValues,
>(props: FormDateInputProps<TFieldValues, TContext, TTransformedValues>) => {

    const {
        name,
        control,
        rules,
        onBlur,
        onFocus,
        ...rest
    } = props;

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
        <DateInput
            {...rest}
            ref={field.ref}
            name={field.name}
            value={field.value}
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
            onChange={(e) => {
                props.onChange?.(e);
                field.onChange(e);
            }}
        />
    );
};

export default FormDateInput;
