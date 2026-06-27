import React, { FC, ReactNode } from 'react';

type WithValueOrChildren<T> =
  T & ({
    value: ReactNode;
    children?: never;
} | {
    value?: never;
    children: ReactNode;
});

export type StaticInputProps = WithValueOrChildren<{
    sameLine?: boolean;
    colon?: boolean;
    label: string | null;
    infoText?: string;
    addonPrefix?: ReactNode;
    addonSuffix?: ReactNode;
    css?: string;
}>;

const StaticInput: FC<StaticInputProps> = ({
    sameLine,
    colon,
    label,
    value,
    children,
    infoText,
    addonPrefix,
    addonSuffix,
    css = '',
}) => {
    const formGroupCls = [
        'form-group-static',
        sameLine && 'form-group-static--inline',
        colon && 'form-group-static--colon',
        css,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={formGroupCls}>
            <div className="form-control">{value ?? children}</div>
            {label === null ? null : <label>{label}</label>}

            {addonPrefix && (
                <div className="form-group__prefix">{addonPrefix}</div>
            )}

            {addonSuffix && (
                <div className="form-group__suffix">{addonSuffix}</div>
            )}

            {infoText && (<div className="form-text">{infoText}</div>)}
        </div>
    );
};

 export default StaticInput;
