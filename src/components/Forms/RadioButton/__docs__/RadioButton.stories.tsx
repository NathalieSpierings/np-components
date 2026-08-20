import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { ColorDefinitions } from '../../../../lib/utils/definitions';
import RadioButton, { FormRadio } from '../RadioButton';
import React from 'react';
import { useForm } from 'react-hook-form';
import FormInline from '../../FormInline/FormInline';
import Button from '../../../UI/Button/Button';

const meta: Meta<typeof RadioButton> = {
    title: 'Forms/RadioButton',
    component: RadioButton,
};

export default meta;
type Story = StoryObj<typeof RadioButton>;


export const Default: StoryFn = () => {
    const [checked, setChecked] = useState('');

    return (
        <RadioButton label="I am a default checkbox" value="option1" checked={checked === 'option1'} onChange={setChecked} />

    );
};

export const Disabled: StoryFn = () => {
    const [checked, setChecked] = useState('');

    return (
        <RadioButton disabled label="I am a default checkbox" value="option1" checked={checked === 'option1'} onChange={setChecked} />

    );
};

export const ReadOnly: StoryFn = () => {
    const [checked, setChecked] = useState('');

    return (
        <RadioButton readOnly label="I am a default checkbox" value="option1" checked={checked === 'option1'} onChange={setChecked} />

    );
};
export const Color: StoryFn = () => {
    const [checked, setChecked] = useState('');

    return (
        <RadioButton label="I am an accent checkbox" value="option1" checked={checked === 'option1'} onChange={setChecked} color={ColorDefinitions.Blue} />
    );
};

export const Inline: StoryFn = () => {
    const [checked, setChecked] = useState('');

    return (
        <FormInline>
            <RadioButton label="Default" value="option1" checked={checked === 'option1'} onChange={setChecked} />
            <RadioButton label="Accent" value="option1" checked={checked === 'option1'} onChange={setChecked} color={ColorDefinitions.Accent} />
            <RadioButton label="Colored" value="option1" checked={checked === 'option1'} onChange={setChecked} color={ColorDefinitions.Blue} />
            <RadioButton label="Primary" value="option1" checked={checked === 'option1'} onChange={setChecked} color={ColorDefinitions.Primary} />
        </FormInline>
    );
};

export const Accent: StoryFn = () => {
    const [checked, setChecked] = useState('');

    return (
        <RadioButton label="I am an accent checkbox" value="option1" checked={checked === 'option1'} onChange={setChecked} color={ColorDefinitions.Accent} />
    );
};

export const NoLabel: StoryFn = () => {
    const [checked, setChecked] = useState('');

    return (
        <RadioButton value="option1" checked={checked === 'option1'} onChange={setChecked} />
    );
};


export const InvalidState: StoryFn = () => {
    const [checked, setChecked] = useState('');

    return (
        <RadioButton label="I am a default checkbox" validationState='invalid' validationErrorMessage="Field is required." value="option1" checked={checked === 'option1'} onChange={setChecked} />

    );
};

export const ValidState: StoryFn = () => {
    const [checked, setChecked] = useState('');

    return (
        <RadioButton label="I am a default checkbox" validationState='valid' value="option1" checked={checked === 'option1'} onChange={setChecked} />
    );
};


export const InfoText: StoryFn = () => {
    const [checked, setChecked] = useState('');

    return (
        <RadioButton label="I am a default checkbox" infoText="I am info text" value="option1" checked={checked === 'option1'} onChange={setChecked} />
    );
};

export const RadiobuttonGroup: StoryFn = () => {
    const [checked, setChecked] = useState('option1');

    return (
        <>
            <div>
                <RadioButton
                    value="option1"
                    label="Option 1"
                    name="group1"
                    checked={checked === 'option1'}
                    onChange={setChecked}
                />
                <RadioButton
                    value="option2"
                    label="Option 2"
                    name="group1"
                    checked={checked === 'option2'}
                    onChange={setChecked}
                />
            </div>
            <p>Selected value: {checked}</p>
        </>
    );
};


export const Forms: StoryFn = () => {
    const { control, handleSubmit, formState: { isSubmitting } } = useForm({
        mode: "all",
        defaultValues: {
            emailBijRapportage: '',
        },
    });

    const save = handleSubmit(async (data) => {
        console.log("submit", data);
    });
    return (
        <>
            <div>
                <FormRadio
                    color={ColorDefinitions.Accent}
                    label="Ja, ik wil e-mails ontvangen"
                    name="emailBijRapportage"
                    value="yes"
                    control={control}
                    rules={{ required: 'Maak een keuze' }}
                />

                <FormRadio
                    color={ColorDefinitions.Accent}
                    label="Nee, ik wil geen e-mails ontvangen"
                    name="emailBijRapportage"
                    value="no"
                    control={control}
                    rules={{ required: 'Maak een keuze' }}
                />
            </div>

            <Button onClick={save} disabled={isSubmitting}>
                Validate me!
            </Button>
        </>
    );
};

