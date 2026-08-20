import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import PasswordInput from '../PasswordInput';

const meta: Meta<typeof PasswordInput> = {
    title: 'Forms/Input password',
    component: PasswordInput,
    parameters: {
        layout: 'centered',
    }
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: StoryFn = () => {
     const [defaultPassword, setDefaultPassword] = useState('');

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDefaultPassword(event.target.value);
    };

    return (
        <PasswordInput 
            name="password" 
            label="Password" 
            onChange={onChangePassword}
            value={defaultPassword} />
    );
};

export const OnTextInput: StoryFn = () => {
    const [password, setPassword] = useState('');

    return (
                   <PasswordInput name="password" label="Password" onTextInput={setPassword} value={password} />

    );
};

export const WithPasswordCheck: StoryFn = () => {
    const [password, setPassword] = useState('');

    const handleKeyUp = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return (
        <PasswordInput
                name="password"
                label="Password"
                value={password}
                usePasswordCheck={true}
                onTextInput={setPassword}
                onKeyUp={() => handleKeyUp}
            />
    );
};
