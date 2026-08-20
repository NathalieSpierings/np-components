import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import moment from 'moment';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../../Input/Input';
import Datepicker, { FormDatepicker } from '../Datepicker';


const meta: Meta<typeof Datepicker> = {
    title: 'Forms/DatePicker',
    component: Datepicker,
    parameters: {
        layout: 'centered',
    }
};

export default meta;
type Story = StoryObj<typeof Datepicker>;

export const Default: StoryFn = () => {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <Datepicker
            selected={startDate}
            onChange={(date: any) => setStartDate(date)}
            customInput={<Input label="Kies een datum" />}
        />
    );
};

export const Inline: StoryFn = () => {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <Datepicker
            selected={startDate}
            onChange={(date: any) => setStartDate(date)}
            inline={true}
            customInput={<Input label="Kies een datum" />}
        />
    );
};

export const Disabled: StoryFn = () => {
    const [startDate, setStartDate] = useState(null);
    return (
        <Datepicker
            selected={startDate}
            onChange={(date: any) => setStartDate(date)}
            disabled
            placeholderText="This is disabled"
            customInput={<Input label="Kies een datum" />}
        />
    );
};

export const Placeholder: StoryFn = () => {
    const [startdatum, setStartdatum] = useState(new Date());

    return (
        <Datepicker
            selected={startdatum}
            placeholderText="Kies een datum"
            onChange={(date: any) => setStartdatum(date)}
            customInput={<Input label="Kies een datum" />}
        />
    );
};

export const WithIcon: StoryFn = () => {
    const [startdatum, setStartdatum] = useState(new Date());

    return (
        <Datepicker
            showIcon={true}
            selected={startdatum}
            onChange={(date: any) => setStartdatum(date)}
            customInput={<Input label="Kies een datum" />}
        />
    );
};

export const ToggleOnIconClick: StoryFn = () => {
    const [startdatum, setStartdatum] = useState(new Date());

    return (
        <Datepicker
            showIcon={true}
            selected={startdatum}
            toggleCalendarOnIconClick={true}
            onChange={(date: any) => setStartdatum(date)}
            customInput={<Input label="Kies een datum" />}
        />
    );
};

export const ClearableInput: StoryFn = () => {
    const [startdatum, setStartdatum] = useState(new Date());

    return (
        <Datepicker
            onChange={(date: any) => setStartdatum(date)}
            isClearable={true}
            selected={startdatum}
            customInput={<Input label="Kies een datum" />}
        />
    );
};

export const CustomInput: StoryFn = () => {
    const [startdatum, setStartdatum] = useState(new Date());

    return (
        <Datepicker
            selected={startdatum}
            onChange={(date: any) => setStartdatum(date)}
            isClearable={true}
            customInput={<Input label="Kies een datum" />}
        />
    );
};

export const Validation: StoryFn = () => {
    const [startdatum, setStartdatum] = useState(new Date());

    return (
        <Datepicker
            selected={startdatum}
            onChange={(date: any) => setStartdatum(date)}
            isClearable={true}
            customInput={<Input label="Kies een datum" validationErrorMessage="Field is required" />}
        />
    );
};

export const Range: StoryFn = () => {
    const [startDate, setStartDate] = useState(new Date('2014/02/08'));
    const [endDate, setEndDate] = useState(new Date('2014/02/10'));
    return (
        <>
            <Datepicker
                selected={startDate}
                onChange={(date: any) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                customInput={<Input label="Kies een start datum" />}
            />
            <Datepicker
                selected={endDate}
                onChange={(date: any) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                customInput={<Input label="Kies een eind datum" />}
            />
        </>
    );
};

export const RangeForOneCalendar: StoryFn = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState();
    
    const onChange = (dates: any) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };
    return (
        <Datepicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
        />
    );
};

export const RangeForOneInput: StoryFn = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState();

    const onChange = (dates: any) => {
        const [startDates, endDates] = dates;
        setStartDate(startDates);
        setEndDate(endDates);
    };
    return (
        <Datepicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            customInput={<Input label="Kies een datum" />}
        />
    );
};

export const RangeQuarterPicker: StoryFn = () => {
    const [startDate, setStartDate] = useState(new Date('2014/02/08'));
    const [endDate, setEndDate] = useState(new Date('2014/07/08'));
    return (
        <>
            <Datepicker
                selected={startDate}
                onChange={(date: any) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="yyyy, QQQ"
                showQuarterYearPicker
                customInput={<Input label="Kies een kwartaal" />}
            />
            <Datepicker
                selected={endDate}
                onChange={(date: any) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                dateFormat="yyyy, QQQ"
                showQuarterYearPicker
                customInput={<Input label="Kies een kwartaal" />}
            />
        </>
    );
};

export const SelectMultipleDates: StoryFn = () => {
    const [selectedDates, setSelectedDates] = useState([new Date()]);
    const onChange = (dates: any) => {
        setSelectedDates(dates);
    };
    return (
        <Datepicker
            selectedDates={selectedDates}
            selectsMultiple
            onChange={onChange}
            shouldCloseOnSelect={false}
            disabledKeyboardNavigation
            customInput={<Input label="Kies een of meerdere datums" />}
        />
    );
};

type FormValues = {
    startDate?: Date;
    endDate?: Date;
};

const validateStartDate =
    () =>
        (startDate?: Date): string | boolean => {
            if (!startDate) {
                return 'Begindatum is verplicht';
            }

            return true;
        };

const validateEndDate =
    (startDate?: Date) =>
        (endDate?: Date): string | boolean => {
            if (!endDate) {
                return 'Einddatum is verplicht';
            }
            if (moment(endDate).format('YYYY-MM-DD') === moment(startDate).format('YYYY-MM-DD')) {
                return 'Einddatum kan niet hetzelfde zijn als de begindatum';
            }
            if (moment(endDate).format('YYYY-MM-DD') < moment(startDate).format('YYYY-MM-DD')) {
                return 'Einddatum kan niet voor begindatum liggen';
            }
            if (moment(endDate).format('YYYY-MM-DD') >= moment(new Date()).format('YYYY-MM-DD')) {
                return 'Einddatum moet voor vandaag liggen';
            }
            return true;
        };

export const FormDatepickerWithError: StoryObj<typeof FormDatepicker> = {
    render: () => {
        const {
            handleSubmit,
            control,
            watch,
            getValues,
        } = useForm<FormValues>({
            mode: 'onSubmit',
            defaultValues: {
                startDate: undefined,
                endDate: undefined,
            },
        });

        const onSubmit: SubmitHandler<FormValues> = (data) => {
            alert(
                'Selected startdate: ' +
                moment(data.startDate).format('YYYY-MM-DD') +
                ' Selected enddate: ' +
                moment(data.endDate).format('YYYY-MM-DD')
            );
        };

        return (
            <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 300 }}>
                <FormDatepicker
                    rules={{ validate: validateStartDate() }}
                    control={control}
                    name="startDate"
                    customInput={<Input label="Kies een startdatum" />}
                />

                <FormDatepicker
                    rules={{ validate: validateEndDate(getValues().startDate) }}
                    control={control}
                    name="endDate"
                    customInput={<Input label="Kies een einddatum" />}
                />

                <button type="submit" style={{ marginTop: 10 }}>
                    Verzenden
                </button>

                <pre>{JSON.stringify(watch(), null, 2)}</pre>
            </form>
        );
    },
};
