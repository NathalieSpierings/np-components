import React, { FC, PropsWithChildren } from 'react';

export interface FormInlineProps extends PropsWithChildren {
    gap?: string;
    css?: string;
};

const FormInline: FC<FormInlineProps> = ({ 
    children, 
    gap, 
    css = ''
 }) => {

    return (
        <div className={`form-inline ${css}`} style={{ gap: gap }}>
            {children}
        </div>
    );
};

export default FormInline;