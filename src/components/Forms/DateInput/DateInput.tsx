import moment from 'moment';
import { HTMLProps, ReactElement, ReactNode, forwardRef, useState } from 'react';
import { ColorDefinitions } from '../../../lib/utils/definitions';
import Input, { InputType, InputVariant, ValidationState } from '../Input/Input';


export interface DateInputProps extends Omit<HTMLProps<HTMLInputElement>, 'size' | 'ref' | 'type' | 'value' | 'onChange' | 'placeholder'> {
    value?: Date;
    label?: string;
    infoText?: string;
    color?: ColorDefinitions;
    background?: ColorDefinitions;
    type?: InputType;
    variant?: InputVariant;
     validationErrorMessage?: string;
    validationBottomPosition?: string;
    validationState?: ValidationState;
    small?: boolean;
    addonPrefix?: ReactNode;
    addonSuffix?: ReactNode;
    inputCss?: string;
    labelCss?: string;
    formGroupCss?: string;
    readOnly?: boolean;
    disabled?: boolean;
    onChange?: (date: Date | undefined) => void;
}

const DateInput = forwardRef((props: DateInputProps, ref: React.Ref<any>): ReactElement => {
    let { 
        required,
        value, 
        label, 
        infoText, 
        color,
        background, 
        type = 'date',
        variant, 
        validationErrorMessage, 
        validationBottomPosition,
        validationState,
        small,
        addonPrefix,
        addonSuffix,
        inputCss = '',
        labelCss = '',
        formGroupCss = '',
        readOnly,
        disabled,
        onChange            
        } = props;

    const strVal = value ? moment(value).format('YYYY-MM-DD') : '';
    const [hasBeenUsed, setHasBeenUsed] = useState(false);

    const setDate = (date: string) => {
        try {
            const d = moment(date, 'YYYY-MM-DD').toDate();
            if (d instanceof Date && !Number.isNaN(d.getTime())) {
                onChange?.(d);
            } else {
                onChange?.(undefined);
            }
        } catch (e) {
            console.error('Invalid date:', e);
        }
    };

    return (
        <Input
            required={required}
            label={label}
            infoText={infoText}           
            color={color}
            background={background}
            type={type}
            variant={variant}
            validationErrorMessage={validationErrorMessage}
            validationBottomPosition={validationBottomPosition}
            validationState={validationState}
            small={small}
            addonPrefix={addonPrefix}
            addonSuffix={addonSuffix}
            inputCss={inputCss}
            labelCss={labelCss}
            formGroupCss={formGroupCss}
            onKeyUp={() => hasBeenUsed || setHasBeenUsed(true)}
            onChange={(e) => {
                hasBeenUsed || setHasBeenUsed(true);
                setDate((e.target as HTMLInputElement).value);
            }}
            value={strVal}
            readOnly={readOnly}
            disabled={disabled}
            placeholder=" "
        />
    );
});

DateInput.displayName = 'DateInput';

export default DateInput;