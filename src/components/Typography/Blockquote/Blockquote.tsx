import React from 'react';

export interface BlockquoteProps {
    text: string;
    citeText?: string;
}

const Blockquote: React.FC<BlockquoteProps> = ({ text, citeText }) => {
    return (
        <blockquote>
            {text}
            <cite>{citeText}</cite>
        </blockquote>
    );
};

export default Blockquote;
