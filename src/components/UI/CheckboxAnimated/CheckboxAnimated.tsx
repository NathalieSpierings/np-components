import React, { forwardRef, useEffect, useState } from 'react';
import { ColorDefinitions } from '../../../lib/utils/definitions';

export interface CheckboxAnimatedProps {
    id?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    accentColor?: ColorDefinitions;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const CheckboxAnimated = forwardRef(
    (
        { id, checked, defaultChecked, accentColor, disabled = false, onChange, onBlur }: CheckboxAnimatedProps,
        ref: React.Ref<any>
    ) => {
        const [checkedState, setCheckedState] = useState<boolean>(!!defaultChecked);

        useEffect(() => {
            if (checked !== undefined) {
                setCheckedState(checked);
            }
        }, [checked]);

        const handleChange = () => {
            if (checked === undefined) {
                setCheckedState((prev) => !prev);
                onChange?.(!checkedState);
            } else {
                onChange?.(!checked);
            }
        };

        return (
            <div
                className={`animated-checkbox ${checkedState ? 'is-checked' : 'is-unchecked'}`}
                style={
                    accentColor
                        ? ({
                              '--color-accent': `var(--color-${accentColor})`,
                          } as React.CSSProperties)
                        : undefined
                }
            >
                <input
                    id={id}
                    ref={ref}
                    type="checkbox"
                    disabled={disabled}
                    checked={checked ?? checkedState}
                    aria-checked={checked ?? checkedState}
                    aria-disabled={disabled}
                    tabIndex={disabled ? undefined : 0}
                    onChange={(e) => {
                        e.stopPropagation();
                        if (!disabled) {
                            handleChange();
                        }
                    }}
                    onBlur={onBlur}
                />

                <label className="checkmark-wrap">
                     <span className="sr-only"></span> 
                    <div className={`shadow-circle ${checkedState ? 'is-opaque' : ''}`}></div>
                    <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                        <path className="checkmark-check-tiny" fill="none" d="M15 27l5 5 10-10" />
                        <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                    </svg>
                </label>
            </div>
        );
    }
);

export default CheckboxAnimated;
