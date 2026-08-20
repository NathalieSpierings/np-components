import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ColorDefinitions } from '../../../../lib/utils/definitions';
import Toggle, { FormToggle } from '../Toggle';
import Button from '../../../UI/Button/Button';
import FormInline from '../../FormInline/FormInline';

const meta: Meta<typeof Toggle> = {
    title: 'Forms/Toggle',
    component: Toggle,
};

export default meta;
type Story = StoryObj<typeof Toggle>;




export const Default: StoryFn = () => {
    const [checked, setChecked] = useState(false);

    return (
        <Toggle label="I am a default toggle switch" checked={checked} onChange={setChecked} />
    );
};


export const Disabled: StoryFn = () => {
    const [checked, setChecked] = useState(false);

    return (
        <Toggle label="I am a disabled" disabled checked={checked} onChange={setChecked} />

    );
};
export const ReadOnly: StoryFn = () => {
    const [checked, setChecked] = useState(false);

    return (
        <Toggle label="I am a readonly" readOnly checked={checked} onChange={setChecked} />

    );
};


export const Colored: StoryFn = () => {
    const [checked, setChecked] = useState(false);

    return (
        <Toggle label="I am a default toggle switch" checked={checked} onChange={setChecked} color={ColorDefinitions.Blue} />

    );
};



export const Inline: StoryFn = () => {
    const [checked, setChecked] = useState(false);

  
    return (
        <FormInline>
                <Toggle label="Default" checked={checked} onChange={setChecked} />
                <Toggle label="Accent" checked={checked} onChange={setChecked} color={ColorDefinitions.Accent} />
                <Toggle label="Colored" checked={checked} onChange={setChecked} color={ColorDefinitions.Blue} />
                <Toggle label="Primary" checked={checked} onChange={setChecked} color={ColorDefinitions.Primary} />
            </FormInline>
    );

};


export const Accent: StoryFn = () => {
    const [checked, setChecked] = useState(false);


    return (
        <Toggle label="I am a default toggle switch" checked={checked} onChange={setChecked} color={ColorDefinitions.Accent} />

    );
};

export const LabelLeft: StoryFn = () => {
    const [checked, setChecked] = useState(false);


    return (
        <Toggle checked={checked} onChange={setChecked} labelPosition="left" label="I am a label" />

    );
};

export const NoLabel: StoryFn = () => {
    const [checked, setChecked] = useState(false);
    return (
        <Toggle checked={checked} onChange={setChecked} />

    );
};


export const InvalidState: StoryFn = () => {
    const [checked, setChecked] = useState(false);

    return (
        <Toggle label="I am required" checked={checked} onChange={setChecked} validationState='invalid' validationErrorMessage="Field is required." />

    );
};

export const ValidState: StoryFn = () => {
    const [checked, setChecked] = React.useState(false);

    return (
               <Toggle label="I am required" checked={checked} onChange={setChecked} validationState='valid'/>

    );
};


export const InfoText: StoryFn = () => {
    const [checked, setChecked] = useState(false);

    return (
        <Toggle label="I am a toggle switch" checked={checked} onChange={setChecked} infoText="I am info text" />

    );
};


export const FormHook: StoryFn = () => {

    const { control, handleSubmit, formState: { isSubmitting } } = useForm({
        mode: "all",
        defaultValues: {
            emailBijRapportage: false,
        },
    });

    const save = handleSubmit(async (data) => {
        console.log("submit", data);
    });

    return (
        <>
            <FormToggle
                color={ColorDefinitions.Accent}
                labelPosition="left"
                label="Ik wil graag een e-mail ontvangen als er rapportage(s) worden toegevoegd:"
                name="emailBijRapportage"
                control={control}
                rules={{ required: "Email bij rapportage is required", }}
            />
            <Button onClick={save} disabled={isSubmitting}>Validate me!</Button>

        </>
    );
};
