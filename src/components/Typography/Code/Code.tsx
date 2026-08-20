import React from 'react';

export interface CodeProps {
    label: string;
}

const Code: React.FC<CodeProps> = ({ label }) => {
    return <code>{label}</code>;
};

export default Code;
