import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import Wizard from '../Wizard';

const meta: Meta<typeof Wizard> = {
    title: 'UI kit/Wizard',
    component: Wizard,
};

export default meta;
type Story = StoryObj<typeof Wizard>;

const Step1 = ({ firstName, onChange }: { firstName: string; onChange: (value: string) => void }) => {
    return (
        <div>
            <label htmlFor="firstName">FirstName:</label>
            <input id="firstName" type="text" value={firstName} onChange={(e) => onChange(e.target.value)} placeholder="FirstName" />
        </div>
    );
};

const Step2 = ({ lastName, onChange }: { lastName: string; onChange: (value: string) => void }) => {
    return (
        <div>
            <label htmlFor="lastName">LastName:</label>
            <input id="lastName" type="text" value={lastName} onChange={(e) => onChange(e.target.value)} placeholder="LastName" />
        </div>
    );
};

const Step3 = ({ subject, onChange }: { subject: string; onChange: (value: string) => void }) => {
    return (
        <div>
            <label htmlFor="subject">Subject:</label>
            <input id="subject" type="text" value={subject} onChange={(e) => onChange(e.target.value)} placeholder="Subject" />
        </div>
    );
};

const Step4 = ({ message, onChange }: { message: string; onChange: (value: string) => void }) => {
    return (
        <div>
            <label htmlFor="message">Message:</label>
            <input id="message"  type="text" value={message} onChange={(e) => onChange(e.target.value)} placeholder="Message" />
        </div>
    );
};

export const Default: StoryFn = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const steps = [
        {
            title: 'Selecteer zorggroep',
            content: <Step1 firstName={firstName} onChange={setFirstName} />,
            isValid: () => firstName.trim().length > 0,
        },
        {
            title: 'Selecteer periode',
            content: <Step2 lastName={lastName} onChange={setLastName} />,
            isValid: () => lastName.trim().length > 0,
        },
        {
            title: 'Configuratie controle',
            content: <Step3 subject={subject} onChange={setSubject} />,
            isValid: () => subject.trim().length > 0,
        },
        {
            title: 'Controleer overzicht',
            content: <Step4 message={message} onChange={setMessage} />,
            isValid: () => message.trim().length > 0,
        },
    ];

    const handleFinish = () => {
        alert('Wizard completed!');
    };

    return <Wizard steps={steps} onComplete={handleFinish} onCompleteLabel="Start batch" />;
};
