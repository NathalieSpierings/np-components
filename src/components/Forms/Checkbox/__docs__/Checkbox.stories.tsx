import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import React, { ReactElement, useState } from 'react';
import { ColorDefinitions } from '../../../../lib/utils/definitions';
import Checkbox, { FormCheckbox } from '../Checkbox';
import { useForm } from 'react-hook-form';
import FormInline from '../../FormInline';
import Button from '../../../UI/Button/Button';

const meta: Meta<typeof Checkbox> = {
    title: 'Forms/Checkbox',
    component: Checkbox
};

export default meta;
type Story = StoryObj<typeof Checkbox>;


export const Default: StoryFn = () => {
    const [checked, setChecked] = useState(false);

    return (
        <Checkbox label="I am a default checkbox" defaultChecked={checked} onChange={setChecked} />
    );
};

export const Disabled: StoryFn = () => {
    const [checked, setChecked] = useState(false);

    return (
        <Checkbox label="I am a disabled" disabled defaultChecked={checked} onChange={setChecked} />
    );
};


export const ReadOnly: StoryFn = () => {
    const [checked, setChecked] = useState(false);

    return (
        <Checkbox label="I am a readonly" readOnly defaultChecked={checked} onChange={setChecked} />
    );
};

export const Color: StoryFn = () => {
    const [checked, setChecked] = useState(false);


    return (
        <div className="grid">

            <div className="bg-surface-light p-3">
                <Checkbox label="I am a colored checkbox" defaultChecked={checked} onChange={setChecked} color={ColorDefinitions.Blue} />
                <Checkbox label="I am a primary checkbox" defaultChecked={checked} onChange={setChecked} color={ColorDefinitions.Primary} />

            </div>

            <div className="bg-surface p-3">
                <Checkbox label="I am a colored checkbox" defaultChecked={checked} onChange={setChecked} color={ColorDefinitions.Blue} />
                <Checkbox label="I am a primary checkbox" defaultChecked={checked} onChange={setChecked} color={ColorDefinitions.Primary} />

            </div>

            <div className="bg-surface-dark p-3">
                <Checkbox label="I am a colored checkbox" defaultChecked={checked} onChange={setChecked} color={ColorDefinitions.Blue} />
                <Checkbox label="I am a primary checkbox" defaultChecked={checked} onChange={setChecked} color={ColorDefinitions.Primary} />

            </div>
        </div>

    );
};


export const Inline: StoryFn = () => {
    const [checked, setChecked] = useState(false);

    return (
        <FormInline>
            <Checkbox label="Default" defaultChecked={checked} onChange={setChecked} />
            <Checkbox label="Accent" defaultChecked={checked} onChange={setChecked} color={ColorDefinitions.Accent} />
            <Checkbox label="Colored" defaultChecked={checked} onChange={setChecked} color={ColorDefinitions.Blue} />
            <Checkbox label="Primary" defaultChecked={checked} onChange={setChecked} color={ColorDefinitions.Primary} />
        </FormInline>
    );
};

export const Accent: StoryFn = () => {
    const [checked, setChecked] = useState(false);

    return (
        <Checkbox label="I am an accent checkbox" defaultChecked={checked} onChange={setChecked} color={ColorDefinitions.Accent} />
    );
};

export const NoLabel: StoryFn = () => {
    const [checked, setChecked] = useState(false);

    return (
        <Checkbox defaultChecked={checked} onChange={setChecked} />
    );
};

export const InvalidState: StoryFn = () => {
    const [checked, setChecked] = React.useState(false);

    return (
        <Checkbox label="I am required" defaultChecked={checked} onChange={setChecked} validationState='invalid' validationErrorMessage="Field is required." />
    );
};

export const ValidState: StoryFn = () => {
    const [checked, setChecked] = React.useState(false);

    return (
        <Checkbox label="I am required" defaultChecked={checked} onChange={setChecked} validationState='valid' />
    );
};

export const InfoText: StoryFn = () => {
    const [checked, setChecked] = React.useState(false);

    return (
        <Checkbox label="I am a checkbox" infoText="I am info text" defaultChecked={checked} onChange={setChecked} />
    );
};

export const Forms: StoryFn = () => {

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
            <FormCheckbox
                color={ColorDefinitions.Accent}
                label="Ik wil graag een e-mail ontvangen als er rapportage(s) worden toegevoegd:"
                name="emailBijRapportage"
                control={control}
                rules={{ required: "Email bij rapportage is required", }}
            />
            <Button onClick={save} disabled={isSubmitting}>Validate me!</Button>
        </>
    );
};


export const indeterminate: StoryFn = () => {
    const [items, setItems] = useState([
        { id: 1, label: "Kolom 1", checked: true },
        { id: 2, label: "Kolom 2", checked: true },
        { id: 3, label: "Kolom 3", checked: false },
    ]);

    const allChecked = items.every((i) => i.checked);
    const someChecked = items.some((i) => i.checked);


    return (
        <div>
            <Checkbox
                label="Alle kolommen"
                checked={allChecked}
                indeterminate={someChecked && !allChecked}
                onChange={(checked) =>
                    setItems((current) =>
                        current.map((item) => ({
                            ...item,
                            checked,
                        }))
                    )
                }
            />

            <hr />

            {items.map((item) => (
                <Checkbox
                    key={item.id}
                    label={item.label}
                    checked={item.checked}
                    onChange={(checked) =>
                        setItems((current) =>
                            current.map((i) =>
                                i.id === item.id
                                    ? { ...i, checked }
                                    : i
                            )
                        )
                    }
                />
            ))}
        </div>
    );
};
