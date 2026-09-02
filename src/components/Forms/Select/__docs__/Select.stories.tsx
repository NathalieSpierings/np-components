import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { useForm } from 'react-hook-form';
import { Button, FormInput, FormSelect, FormTextArea, Icon, Select } from '../../..';
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from '../../../../lib/utils/definitions';

const meta: Meta<typeof Select> = {
    title: 'Forms/Select',
    component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;


export const Default: StoryFn = () => {
    return (
        <Select label="Fruits">
            <option>Apple</option>
            <option>Pear</option>
            <option>Bananna</option>
        </Select>
    );
};
export const Disabled: StoryFn = () => {
    return (
        <Select label="Fruits" disabled>
            <option>Apple</option>
            <option>Pear</option>
            <option>Bananna</option>
        </Select>
    );
};

export const Readonly: StoryFn = () => {
    return (
        <Select label="Fruits" readOnly>
            <option>Apple</option>
            <option>Pear</option>
            <option>Bananna</option>
        </Select>
    );
};

export const Color: StoryFn = () => {
    return (
        <Select label="Fruits" color={ColorDefinitions.Purple}>
            <option>Apple</option>
            <option>Pear</option>
            <option>Bananna</option>
        </Select>
    );
};

export const Background: StoryFn = () => {
    return (
        <Select label="Fruits" background={ColorDefinitions.Purple10}>
            <option>Apple</option>
            <option>Pear</option>
            <option>Bananna</option>
        </Select>
    );
};

export const ColorAndBackground: StoryFn = () => {
    return (
        <Select label="Fruits" color={ColorDefinitions.Purple30} background={ColorDefinitions.Purple10}>
            <option>Apple</option>
            <option>Pear</option>
            <option>Bananna</option>
        </Select>
    );
};

export const Utilities: StoryFn = () => {
    return (
        <Select label="Fruits" labelCss="text-green-30" inputCss="bg-green-10 text-green-30 border-green-30">
            <option>Apple</option>
            <option>Pear</option>
            <option>Bananna</option>
        </Select>
    );
};

export const LongLabel: StoryFn = () => {
    return (
        <Select label="I am a very long label that should be truncated" >
            <option>Apple</option>
            <option>Pear</option>
            <option>Bananna</option>
        </Select>
    );
};

export const Small: StoryFn = () => {
    return (
        <Select label="Fruits" small>
            <option>Apple</option>
            <option>Pear</option>
            <option>Bananna</option>
        </Select>
    );
};

export const DefaultLabel: StoryFn = () => {
    return (
        <Select label="Fruits" defaultLabel="Make a choice...">
            <option>Apple</option>
            <option>Pear</option>
            <option>Bananna</option>
        </Select>
    );
};

export const InfoText: StoryFn = () => {

    return (
        <Select label="Fruits" infoText="Choose a fruit">
            <option>Apple</option>
            <option>Pear</option>
            <option>Bananna</option>
        </Select>
    );
};


export const ValidationError: StoryFn = () => {
    return (
        <Select label="Fruits" validationErrorMessage="Message is required" >
            <option>Apple</option>
            <option>Pear</option>
            <option>Bananna</option>
        </Select>
    );
};

export const Valid: StoryFn = () => {
    return (
        <Select label="Fruits" validationState="valid">
            <option>Apple</option>
            <option>Pear</option>
            <option>Bananna</option>
        </Select>
    );
};



export const Prefix: StoryFn = () => {
    return (
        <div className="grid">
            <Select label="Fruits" defaultLabel="Choose an option..." addonPrefix="€">
                <option>Apple</option>
                <option>Pear</option>
                <option>Bananna</option>
            </Select>
            <Select label="Fruits" defaultLabel="Choose an option..." addonPrefix={<Icon size={SizeDefinitions.Small} icon={IconDefinitions.moneybag} />} >
                <option>Apple</option>
                <option>Pear</option>
                <option>Bananna</option>
            </Select>
        </div>
    );
};


export const Suffix: StoryFn = () => {
    return (
        <div className="grid">
            <Select label="Fruits" defaultLabel="Choose an option..." addonSuffix="EUR">
                <option>Apple</option>
                <option>Pear</option>
                <option>Bananna</option>
            </Select>
            <Select label="Fruits" defaultLabel="Choose an option..." addonSuffix={<Icon size={SizeDefinitions.Small} icon={IconDefinitions.moneybag} />} >
                <option>Apple</option>
                <option>Pear</option>
                <option>Bananna</option>
            </Select>
        </div>
    );
};


export const PrefixAndSuffix: StoryFn = () => {
    return (
        <div className="grid">
            <Select label="Fruits" defaultLabel="Choose an option..." addonPrefix="€" addonSuffix="EUR">
                <option>Apple</option>
                <option>Pear</option>
                <option>Bananna</option>
            </Select>

            <Select label="Fruits" defaultLabel="Choose an option..." addonPrefix={<Icon size={SizeDefinitions.Small} icon={IconDefinitions.moneybag} />} addonSuffix={<Icon size={SizeDefinitions.Small} icon={IconDefinitions.moneybag} />} >
                <option>Apple</option>
                <option>Pear</option>
                <option>Bananna</option>
            </Select>
        </div>
    );
};



export const HookForm: StoryFn = () => {

    const { control, handleSubmit, formState: { isSubmitting } } = useForm({
        mode: "all",
        defaultValues: {
            firstName: '',
            fruits: '',
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

            <FormSelect
                control={control}
                name="fruits"
                label='Fruits'
                defaultLabel='Pick a fruit'
                rules={{
                    required: "Fruit is required",
                }}
            >
                <option>Apple</option>
                <option>Pear</option>
                <option>Bananna</option>
            </FormSelect>

            <Button onClick={save} disabled={isSubmitting}>Validate me!</Button>

        </div>
    );
};
