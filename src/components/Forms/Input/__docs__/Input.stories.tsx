import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from '../../../../lib/utils/definitions';
import Button from '../../../UI/Button/Button';
import Icon from '../../../UI/Icons/Icon/Icon';
import FormInline from '../../FormInline';
import Input from '../Input';
import StaticInput from '../StaticInput';
import FormInput from '../FormInput';
import React from 'react';

const meta: Meta<typeof Input> = {
    title: 'Forms/Input',
    component: Input,

};

export default meta;
type Story = StoryObj<typeof Input>;


export const Default: StoryFn = () => {
    const [firstName, setFirstName] = useState('');

    return (
        <Input name="firstname" label="Firstname" value={firstName} onChange={e => setFirstName(e.target.value)} />

    );
};

export const Disabled: StoryFn = () => {
    const [firstName, setFirstName] = useState('');

    return (
        <Input name="firstname" label="Firstname" value={firstName} onChange={e => setFirstName(e.target.value)} disabled />
    );
};

export const Readonly: StoryFn = () => {
    const [firstName, setFirstName] = useState('');

    return (
        <Input name="firstname" label="Firstname" value={firstName} onChange={e => setFirstName(e.target.value)} readOnly />

    );
};

export const Color: StoryFn = () => {
    const [firstName, setFirstName] = useState('');

    return (
        <Input name="firstname" label="Firstname" value={firstName} onChange={e => setFirstName(e.target.value)} color={ColorDefinitions.Purple} />

    );
};

export const Background: StoryFn = () => {
    const [firstName, setFirstName] = useState('');

    return (
        <Input name="firstname" label="Firstname" value={firstName} onChange={e => setFirstName(e.target.value)} background={ColorDefinitions.Purple10} />

    );
};

export const ColorAndBackground: StoryFn = () => {
    const [firstName, setFirstName] = useState('');

    return (
        <Input name="firstname" label="Firstname" value={firstName} onChange={e => setFirstName(e.target.value)} color={ColorDefinitions.Purple30} background={ColorDefinitions.Purple10} />

    );
};

export const Utilities: StoryFn = () => {
    const [firstName, setFirstName] = useState('');

    return (
        <Input name="firstname" label="Firstname" value={firstName} onChange={e => setFirstName(e.target.value)} labelCss="text-green-30" inputCss="bg-green-10 text-green-30 border-green-30" />

    );
};


export const LongLabel: StoryFn = () => {
    const [firstName, setFirstName] = useState('');

    return (
        <Input name="firstname" label="I am a very long label that should be truncated" value={firstName} onChange={e => setFirstName(e.target.value)} />

    );
};


export const Small: StoryFn = () => {
    const [firstName, setFirstName] = useState('');

    return (
        <Input name="firstname" label="Firstname" value={firstName} onChange={e => setFirstName(e.target.value)} small />

    );
};

export const Placeholder: StoryFn = () => {
    const [firstName, setFirstName] = useState('');

    return (
        <Input name="firstname" label="Firstname" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Enter your name" />

    );
};

export const InfoText: StoryFn = () => {
    const [firstName, setFirstName] = useState('');

    return (
        <Input name="firstname" label="Firstname" value={firstName} onChange={e => setFirstName(e.target.value)} infoText="Enter your name" />

    );
};


export const ValidationError: StoryFn = () => {
    const [firstName, setFirstName] = useState('');

    return (
        <Input name="firstname" label="Firstname" value={firstName} onChange={e => setFirstName(e.target.value)} validationErrorMessage="Firstname is required" />

    );
};

export const Valid: StoryFn = () => {
    const [firstName, setFirstName] = useState('');

    return (
        <Input name="firstname" label="Firstname" value={firstName} onChange={e => setFirstName(e.target.value)} validationState="valid" />

    );
};


export const Prefix: StoryFn = () => {
    const [firstName, setFirstName] = useState('');

    return (
        <div className="grid">
            <Input name="firstname" label="Firstname" value={firstName} onChange={e => setFirstName(e.target.value)} addonPrefix="€" />
            <Input name="firstname" label="Firstname" value={firstName} onChange={e => setFirstName(e.target.value)} addonPrefix={<Icon size={SizeDefinitions.Small} icon={IconDefinitions.moneybag} />} />


        </div>
    );
};


export const Suffix: StoryFn = () => {
    const [firstName, setFirstName] = useState('');

    return (
        <div className="grid">
            <Input name="firstname" label="Firstname" value={firstName} onChange={e => setFirstName(e.target.value)} addonSuffix="EUR" />

            <Input name="firstname" label="Firstname" value={firstName} onChange={e => setFirstName(e.target.value)} addonSuffix={<Icon size={SizeDefinitions.Small} icon={IconDefinitions.moneybag} />} />

        </div>
    );
};

export const PrefixAndSuffix: StoryFn = () => {
    const [firstName, setFirstName] = useState('');

    return (
        <div className="grid">
            <Input name="firstname" label="Firstname" value={firstName} onChange={e => setFirstName(e.target.value)} addonPrefix="€" addonSuffix="EUR" />

            <Input name="firstname" label="Firstname" value={firstName} onChange={e => setFirstName(e.target.value)} addonPrefix={<Icon size={SizeDefinitions.Small} icon={IconDefinitions.moneybag} />} addonSuffix={<Icon size={SizeDefinitions.Small} icon={IconDefinitions.moneybag} />} />

        </div>
    );
};


export const HookForm: StoryFn = () => {

    const { control, handleSubmit, formState: { isSubmitting } } = useForm({
        mode: "all",
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
    });


    const save = handleSubmit(async (data) => {
        console.log("submit", data);
    });


    return (
        <div>
            <FormInput
                name="firstName"
                control={control}
                label="Voornaam"
                rules={{
                    required: "Voornaam is required",
                    minLength: {
                        value: 2,
                        message: "Minimal 2 characters"
                    }
                }}
            />

            <FormInput
                name="email"
                control={control}
                label="Email"
                type="email"
                rules={{
                    required: "Email is required",
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address"
                    }
                }}
            />

            <FormInput
                name="lastName"
                control={control}
                label="Achternaam"
                rules={{
                    required: "Achternaam is required",
                    minLength: {
                        value: 2,
                        message: "Minimal 2 characters"
                    }
                }}
            />

            <Button onClick={save} disabled={isSubmitting}>Validate me!</Button>

        </div>
    );
};


export const Static: StoryFn = () => {
    return (
        <>
            <StaticInput label="Firstname" value='John' />
            <StaticInput label="Lastname" value='Doe' />
        </>
    );
};

export const StaticSameLine: StoryFn = () => {
    return (
        <>
            <StaticInput label="Firstname" value='John' sameLine/>
            <StaticInput label="Lastname" value='Doe' sameLine/>
        </>
    );
};


export const StaticSameLineWithColon: StoryFn = () => {
    return (
        <>
            <StaticInput label="Firstname" value='John' sameLine colon/>
            <StaticInput label="Lastname" value='Doe' sameLine colon/>
        </>
    );
};

export const StaticInline: StoryFn = () => {
    return (
        <FormInline>
            <StaticInput label="Firstname" value='John' />
            <StaticInput label="Lastname" value='Doe' />
        </FormInline>
    );
};

export const StaticPrefix: StoryFn = () => {
    return (
        <>
            <StaticInput label="Firstname" value='John' addonPrefix='€' />
            <StaticInput label="Lastname" value='Doe' addonPrefix={<Icon size={SizeDefinitions.Small} icon={IconDefinitions.moneybag} />} />
        </>
    );
};

export const StaticSuffix: StoryFn = () => {
    return (
        <>
            <StaticInput label="Firstname" value='John' addonSuffix='€' />
            <StaticInput label="Lastname" value='Doe' addonSuffix={<Icon size={SizeDefinitions.Small} icon={IconDefinitions.moneybag} />} />
        </>
    );
};
export const StaticPrefixAndSuffix: StoryFn = () => {
    return (
        <>
            <StaticInput label="Firstname" value='John' addonPrefix='€' addonSuffix='€' />
            <StaticInput label="Lastname" value='Doe' addonPrefix={<Icon size={SizeDefinitions.Small} icon={IconDefinitions.moneybag} />} addonSuffix={<Icon size={SizeDefinitions.Small} icon={IconDefinitions.moneybag} />} />
        </>
    );
};



export const StaticInlineWithColon: StoryFn = () => {
    return (
        <FormInline>
            <StaticInput label="Firstname" value='John' colon/>
            <StaticInput label="Lastname" value='Doe' colon/>
        </FormInline>
    );
};

export const StaticInlineSameLine: StoryFn = () => {
    return (
        <FormInline>
            <StaticInput label="Firstname" value='John' sameLine/>
            <StaticInput label="Lastname" value='Doe' sameLine/>
        </FormInline>
    );
};

export const StaticInlineSameLineWithColon: StoryFn = () => {
    return (
        <FormInline>
            <StaticInput label="Firstname" value='John' sameLine colon/>
            <StaticInput label="Lastname" value='Doe' sameLine colon/>
        </FormInline>
    );
};
