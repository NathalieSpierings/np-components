import React, { FC, ReactNode } from 'react';

export interface StaticTextAreaProps {
    sameLine?: boolean;
    colon?: boolean;
    label: string;
    value?: ReactNode;
    infoText?: string;
    addonPrefix?: ReactNode;
    addonSuffix?: ReactNode;
    css?: string;
}

const StaticTextArea: FC<StaticTextAreaProps> = ({
    sameLine,
    colon,
    label,
    value,
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
            <div className="form-control-textarea">{value}</div>
            <label>{label}</label>

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

 export default StaticTextArea;
