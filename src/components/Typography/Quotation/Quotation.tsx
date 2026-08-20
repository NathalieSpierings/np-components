import React from 'react';

export interface QuotationProps {
    text: string;
}

const Quotation: React.FC<QuotationProps> = ({ text }) => {
    return (
        <p>
            <q>{text}</q>
        </p>
    );
};

export default Quotation;
