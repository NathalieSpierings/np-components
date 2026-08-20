import React from 'react';

export interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
    tabIndex?: number;
}

const Paragraph: React.FC<ParagraphProps> = ({ tabIndex, children, ...props }) => {
    return (
        <p tabIndex={tabIndex} {...props}>
            {children}
        </p>
    );
};

export default Paragraph;
