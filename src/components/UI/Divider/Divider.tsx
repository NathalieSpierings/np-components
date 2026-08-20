import { DetailedHTMLProps, HTMLAttributes } from "react";
import { ColorDefinitions } from "../../../lib/utils/definitions";
import React from "react";

export interface DividerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    color?: ColorDefinitions;
}

const Divider: React.FC<DividerProps> = ({
    color,
    className = '',
    ...rest
}) => {
    return (
        <div
            className={`separator-h ${className}`}
            style={{
                ...(color && {
                    "--color-border": `var(--color-${color})`
                })
            } as React.CSSProperties}
            {...rest}
        />
    );
};

export default Divider;
