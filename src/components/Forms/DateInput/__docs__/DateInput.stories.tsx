import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import moment from 'moment';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ColorDefinitions,  IconDefinitions, SizeDefinitions } from '../../../..';
import Button from '../../../UI/Button/Button';
import FormInline from '../../FormInline';
import FormInput from '../../Input/FormInput';
import DateInput from '../DateInput';
import { Icon } from '../../../UI/Icons/Icon';
import { StaticInput } from '../../Input';
import FormDateInput from '../FormDateInput';

const meta: Meta<typeof DateInput> = {
    title: 'Forms/DateInput',
    component: DateInput
};

export default meta;
type Story = StoryObj<typeof DateInput>;


export const Default: StoryFn = () => {
    const [startdatum, setStartdatum] = useState(new Date());

    return (
        <>
            <DateInput label="Startdatum" value={startdatum} onChange={(d) => setStartdatum(d!)} />
            <div id="msg">Startdatum is: {moment(startdatum).format('DD-MM-YYYY')}</div>
        </>
    );
};

export const Disabled: StoryFn = () => {
    const [startdatum, setStartdatum] = useState(new Date());

    return (
        <>
            <DateInput label="Startdatum" value={startdatum} onChange={(d) => setStartdatum(d!)} disabled />
            <div id="msg">Startdatum is: {moment(startdatum).format('DD-MM-YYYY')}</div>
        </>
    );
};

export const Readonly: StoryFn = () => {
    const [startdatum, setStartdatum] = useState(new Date());

    return (
        <>
            <DateInput label="Startdatum" value={startdatum} onChange={(d) => setStartdatum(d!)} readOnly />
            <div id="msg">Startdatum is: {moment(startdatum).format('DD-MM-YYYY')}</div>
        </>

    );
};

export const Color: StoryFn = () => {
    const [startdatum, setStartdatum] = useState(new Date());

    return (
        <>
            <DateInput label="Startdatum" value={startdatum} onChange={(d) => setStartdatum(d!)} color={ColorDefinitions.Purple} />
            <div id="msg">Startdatum is: {moment(startdatum).format('DD-MM-YYYY')}</div>
        </>
    );
};

export const Background: StoryFn = () => {
    const [startdatum, setStartdatum] = useState(new Date());

    return (
        <>
            <DateInput label="Startdatum" value={startdatum} onChange={(d) => setStartdatum(d!)} background={ColorDefinitions.Purple10} />
            <div id="msg">Startdatum is: {moment(startdatum).format('DD-MM-YYYY')}</div>
        </>

    );
};

export const ColorAndBackground: StoryFn = () => {
    const [startdatum, setStartdatum] = useState(new Date());

    return (
        <>
            <DateInput label="Startdatum" value={startdatum} onChange={(d) => setStartdatum(d!)} color={ColorDefinitions.Purple30} background={ColorDefinitions.Purple10} />
            <div id="msg">Startdatum is: {moment(startdatum).format('DD-MM-YYYY')}</div>
        </>
    );
};

export const Utilities: StoryFn = () => {
    const [startdatum, setStartdatum] = useState(new Date());

    return (
        <>
            <DateInput label="Startdatum" value={startdatum} onChange={(d) => setStartdatum(d!)} labelCss="text-green-30" inputCss="bg-green-10 text-green-30 border-green-30" />
            <div id="msg">Startdatum is: {moment(startdatum).format('DD-MM-YYYY')}</div>
        </>
    );
};


export const LongLabel: StoryFn = () => {
    const [startdatum, setStartdatum] = useState(new Date());

    return (
        <>
            <DateInput label="I am a very long label that should be truncated" value={startdatum} onChange={(d) => setStartdatum(d!)} />
            <div id="msg">Startdatum is: {moment(startdatum).format('DD-MM-YYYY')}</div>
        </>

    );
};


export const Small: StoryFn = () => {
    const [startdatum, setStartdatum] = useState(new Date());

    return (
        <>
            <DateInput label="Startdatum" value={startdatum} onChange={(d) => setStartdatum(d!)} small />
            <div id="msg">Startdatum is: {moment(startdatum).format('DD-MM-YYYY')}</div>
        </>
    );
};

export const Placeholder: StoryFn = () => {
    const [startdatum, setStartdatum] = useState(new Date());

    return (
        <>
            <DateInput label="Startdatum" value={startdatum} onChange={(d) => setStartdatum(d!)}/>
            <div id="msg">Startdatum is: {moment(startdatum).format('DD-MM-YYYY')}</div>
        </>
    );
};

export const InfoText: StoryFn = () => {
    const [startdatum, setStartdatum] = useState(new Date());

    return (
        <>
            <DateInput label="Startdatum" value={startdatum} onChange={(d) => setStartdatum(d!)} infoText="Enter a date" />
            <div id="msg">Startdatum is: {moment(startdatum).format('DD-MM-YYYY')}</div>
        </>
    );
};


export const ValidationError: StoryFn = () => {
    const [startdatum, setStartdatum] = useState(new Date());

    return (
        <>
            <DateInput label="Startdatum" value={startdatum} onChange={(d) => setStartdatum(d!)} validationErrorMessage="Date is required" />
            <div id="msg">Startdatum is: {moment(startdatum).format('DD-MM-YYYY')}</div>
        </>
    );
};

export const Valid: StoryFn = () => {
    const [startdatum, setStartdatum] = useState(new Date());

    return (
        <>
            <DateInput label="Startdatum" value={startdatum} onChange={(d) => setStartdatum(d!)} validationState="valid" />
            <div id="msg">Startdatum is: {moment(startdatum).format('DD-MM-YYYY')}</div>
        </>
    );
};


export const Prefix: StoryFn = () => {
    const [startdatum, setStartdatum] = useState(new Date());
    const [enddatum, setEnddatum] = useState(new Date());

    return (
        <>
            <div className="grid">
                <DateInput label="Startdatum" value={startdatum} onChange={(d) => setStartdatum(d!)} addonPrefix="⏰" />
                <DateInput label="Einddatum" value={enddatum} onChange={(d) => setEnddatum(d!)} addonPrefix={<Icon size={SizeDefinitions.Small} icon={IconDefinitions.calendar} />} />
            </div>
            <div id="msg">Startdatum is: {moment(startdatum).format('DD-MM-YYYY')}</div>
        </>
    );
};


export const Suffix: StoryFn = () => {
    const [startdatum, setStartdatum] = useState(new Date());
    const [enddatum, setEnddatum] = useState(new Date());

    return (
        <>
            <div className="grid">
                <DateInput label="Startdatum" value={startdatum} onChange={(d) => setStartdatum(d!)} addonSuffix="⏰" />
                <DateInput label="Einddatum" value={enddatum} onChange={(d) => setEnddatum(d!)} addonSuffix={<Icon size={SizeDefinitions.Small} icon={IconDefinitions.calendar} />} />
            </div>
            <div id="msg">Startdatum is: {moment(startdatum).format('DD-MM-YYYY')}</div>
        </>
    );
};

export const PrefixAndSuffix: StoryFn = () => {
    const [startdatum, setStartdatum] = useState(new Date());
    const [enddatum, setEnddatum] = useState(new Date());

    return (
        <>
            <div className="grid">
                <DateInput label="Startdatum" value={startdatum} onChange={(d) => setStartdatum(d!)} addonPrefix="⏰" addonSuffix="⏰" />
                <DateInput label="Einddatum" value={enddatum} onChange={(d) => setEnddatum(d!)} addonPrefix={<Icon size={SizeDefinitions.Small} icon={IconDefinitions.calendar} />} addonSuffix={<Icon size={SizeDefinitions.Small} icon={IconDefinitions.calendar} />} />
            </div>
            <div id="msg">Startdatum is: {moment(startdatum).format('DD-MM-YYYY')}</div>
        </>
    );
};


export const HookForm: StoryFn = () => {

    const { control, handleSubmit, formState: { isSubmitting } } = useForm({
        mode: "all",
        defaultValues: {
            firstName: '',
            startdate: new Date(),
            enddate: '',
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

            <FormDateInput
                name="startdate"
                control={control}
                label="Startdatum"
                rules={{
                    required: "Startdatum is required",
                }}
            />

            <FormDateInput
                name="enddate"
                control={control}
                label="Einddatum"
                rules={{
                    required: "Einddatum is required",
                }}
            />

            <Button onClick={save} disabled={isSubmitting}>Validate me!</Button>

        </div>
    );
};


export const Static: StoryFn = () => {
    return (
        <StaticInput label="Startdatum" value='24-12-2026' />
    );
};

export const StaticSameLine: StoryFn = () => {
    return (
        <StaticInput label="Startdatum" value='24-12-2026' sameLine />
    );
};


export const StaticSameLineWithColon: StoryFn = () => {
    return (
        <StaticInput label="Startdatum" value='24-12-2026' sameLine colon />
    );
};

export const StaticInline: StoryFn = () => {
    return (
        <FormInline>
            <StaticInput label="Startdatum" value='24-12-2026' />
            <StaticInput label="Einddatum" value='24-12-2026' />
        </FormInline>
    );
};

export const StaticPrefix: StoryFn = () => {
    return (
        <>
            <StaticInput label="Startdatum" value='24-12-2026' addonPrefix='⏰' />
            <StaticInput label="Einddatum" value='24-12-2026' addonPrefix={<Icon size={SizeDefinitions.Small} icon={IconDefinitions.calendar_day} />} />
        </>
    );
};

export const StaticSuffix: StoryFn = () => {
    return (
        <>
            <StaticInput label="Startdatum" value='24-12-2026' addonSuffix='⏰' />
            <StaticInput label="Einddatum" value='24-12-2026' addonSuffix={<Icon size={SizeDefinitions.Small} icon={IconDefinitions.calendar_day} />} />
        </>
    );
};
export const StaticPrefixAndSuffix: StoryFn = () => {
    return (
        <>
            <StaticInput label="Startdatum" value='24-12-2026' addonPrefix='⏰' addonSuffix='⏰' />
            <StaticInput label="Einddatum" value='24-12-2026' addonPrefix={<Icon size={SizeDefinitions.Small} icon={IconDefinitions.calendar_day} />} addonSuffix={<Icon size={SizeDefinitions.Small} icon={IconDefinitions.calendar_day} />} />
        </>
    );
};



export const StaticInlineWithColon: StoryFn = () => {
    return (
        <FormInline>
            <StaticInput label="Startdatum" value='24-12-2026' colon />
            <StaticInput label="Einddatum" value='24-12-2026' colon />
        </FormInline>
    );
};

export const StaticInlineSameLine: StoryFn = () => {
    return (
        <FormInline>
            <StaticInput label="Startdatum" value='24-12-2026' sameLine />
            <StaticInput label="Einddatum" value='24-12-2026' sameLine />
        </FormInline>
    );
};

export const StaticInlineSameLineWithColon: StoryFn = () => {
    return (
        <FormInline>
            <StaticInput label="Startdatum" value='24-12-2026' sameLine colon />
            <StaticInput label="Einddatum" value='24-12-2026' sameLine colon />
        </FormInline>
    );
};