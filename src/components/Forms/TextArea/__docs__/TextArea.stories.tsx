import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, FormInput, FormTextArea, Icon } from '../../..';
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from '../../../../lib/utils/definitions';
import TextArea from '../TextArea';

const meta: Meta<typeof TextArea> = {
    title: 'Forms/TextArea',
    component: TextArea,
};

export default meta;
type Story = StoryObj<typeof TextArea>;


export const Default: StoryFn = () => {
    const [message, setMessage] = useState('');

    return (
        <TextArea name="message" label="Message" value={message} rows={6} onChange={e => setMessage(e.target.value)} />

    );
};
export const Disabled: StoryFn = () => {
    const [message, setMessage] = useState('');

    return (
        <TextArea name="message" label="Message" value={message} rows={6} onChange={e => setMessage(e.target.value)} disabled />
    );
};

export const Readonly: StoryFn = () => {
    const [message, setMessage] = useState('');

    return (
        <TextArea name="message" label="Message" value={message} rows={6} onChange={e => setMessage(e.target.value)} readOnly />

    );
};

export const Color: StoryFn = () => {
    
    const [message, setMessage] = useState('');

    return (
        <TextArea name="message" label="Message" value={message} rows={6} onChange={e => setMessage(e.target.value)} color={ColorDefinitions.Purple} />
    );
};

export const Background: StoryFn = () => {
    
    const [message, setMessage] = useState('');

    return (

        <TextArea name="message" label="Message" value={message} rows={6} onChange={e => setMessage(e.target.value)} background={ColorDefinitions.Purple10} />
    );
};

export const ColorAndBackground: StoryFn = () => {

    const [message, setMessage] = useState('');

    return (
        <TextArea name="message" label="Message" value={message} rows={6} onChange={e => setMessage(e.target.value)} color={ColorDefinitions.Purple30} background={ColorDefinitions.Purple10} />
    );
};

export const Utilities: StoryFn = () => {
    const [message, setMessage] = useState('');

    return (
        <TextArea name="message" label="Message" value={message} rows={6} onChange={e => setMessage(e.target.value)} labelCss="text-green-30" inputCss="bg-green-10 text-green-30 border-green-30" />

    );
};


export const LongLabel: StoryFn = () => {
    const [message, setMessage] = useState('');

    return (
        <TextArea name="message" label="I am a very long label that should be truncated" value={message} rows={6} onChange={e => setMessage(e.target.value)} />

    );
};


export const Small: StoryFn = () => {
    const [message, setMessage] = useState('');

    return (
        <TextArea name="message" label="Message" value={message} rows={6} onChange={e => setMessage(e.target.value)} small />

    );
};

export const Placeholder: StoryFn = () => {
    const [message, setMessage] = useState('');

    return (
        <TextArea name="message" label="Message" value={message} rows={6} onChange={e => setMessage(e.target.value)} placeholder="Enter your message" />

    );
};

export const InfoText: StoryFn = () => {
    const [message, setMessage] = useState('');

    return (
        <TextArea name="message" label="Message" value={message} rows={6} onChange={e => setMessage(e.target.value)} infoText="Enter your message" />

    );
};


export const ValidationError: StoryFn = () => {
    const [message, setMessage] = useState('');

    return (
        <TextArea name="message" label="Message" value={message} rows={6} onChange={e => setMessage(e.target.value)} validationErrorMessage="Message is required" />

    );
};

export const Valid: StoryFn = () => {
    const [message, setMessage] = useState('');

    return (
        <TextArea name="message" label="Message" value={message} rows={6} onChange={e => setMessage(e.target.value)} validationState="valid" />

    );
};


export const Prefix: StoryFn = () => {
    const [message, setMessage] = useState('');

    return (
        <div className="grid">
            <TextArea name="message" label="Message" value={message} rows={6} onChange={e => setMessage(e.target.value)} addonPrefix="€" />
            <TextArea name="message" label="Message" value={message} rows={6} onChange={e => setMessage(e.target.value)} addonPrefix={<Icon size={SizeDefinitions.Small} icon={IconDefinitions.moneybag} />} />


        </div>
    );
};


export const Suffix: StoryFn = () => {
    const [message, setMessage] = useState('');

    return (
        <div className="grid">
            <TextArea name="message" label="Message" value={message} rows={6} onChange={e => setMessage(e.target.value)} addonSuffix="EUR" />

            <TextArea name="message" label="Message" value={message} rows={6} onChange={e => setMessage(e.target.value)} addonSuffix={<Icon size={SizeDefinitions.Small} icon={IconDefinitions.moneybag} />} />

        </div>
    );
};

export const PrefixAndSuffix: StoryFn = () => {
    const [message, setMessage] = useState('');

    return (
        <div className="grid">
            <TextArea name="message" label="Message" value={message} rows={6} onChange={e => setMessage(e.target.value)} addonPrefix="€" addonSuffix="EUR" />

            <TextArea name="message" label="Message" value={message} rows={6} onChange={e => setMessage(e.target.value)} addonPrefix={<Icon size={SizeDefinitions.Small} icon={IconDefinitions.moneybag} />} addonSuffix={<Icon size={SizeDefinitions.Small} icon={IconDefinitions.moneybag} />} />

        </div>
    );
};


export const HookForm: StoryFn = () => {

    const { control, handleSubmit, formState: { isSubmitting } } = useForm({
        mode: "all",
        defaultValues: {
            firstName: '',
            message: '',
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
                    required: "Firstname is required",
                    minLength: {
                        value: 2,
                        message: "Minimal 2 characters"
                    }
                }}
            />

            <FormTextArea
                name="message"
                control={control}
                label="Message"
                rules={{
                    required: "Message is required",
                    minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters"
                    }
                }}
            />


            <Button onClick={save} disabled={isSubmitting}>Validate me!</Button>

        </div>
    );
};
