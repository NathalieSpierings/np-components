import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { Button } from '../../..';
import { ColorDefinitions, SizeDefinitions } from '../../../../lib/utils/definitions';
import FileSelect from '../FileSelect';

const meta: Meta<typeof FileSelect> = {
    title: 'Forms/FileSelect',
    component: FileSelect,
    parameters: {
        layout: 'centered',
    }
};

export default meta;
type Story = StoryObj<typeof FileSelect>;

export const Default: StoryFn = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    return (
        <FileSelect
            multiple={true}
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            accept={[".doc", ".docx", ".txt", ".pdf", ".xls", ".xlsx", ".csv", ".zip"]}
        />
    );
};

export const ValidateKlantNummer: StoryFn = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    return (
        <>
            <p> Klantnummer dat gematcht moet worden: 1234. Bestandsnaam moet eindigen op #1234 voor de extensie.</p>
            <FileSelect
                multiple={true}
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
                validateKlantNummer={true}
                klantNummerToMatch="1234"
                accept={[".doc", ".docx", ".txt", ".pdf", ".xls", ".xlsx", ".csv", ".zip"]}
            />
        </>
    );
};

export const ValidateKlantNummerInFileName: StoryFn = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    return (
        <>
            <p> Bestandsnaam moet eindigen op #klantnummer.</p>
            <FileSelect
                multiple={true}
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
                validateKlantnummerInFileName={true}
                klantNummerToMatch="1234"
                accept={[".doc", ".docx", ".txt", ".pdf", ".xls", ".xlsx", ".csv", ".zip"]}
            />
        </>
    );
};
export const ValidateZip: StoryFn = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    return (


        <FileSelect
            multiple={true}
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            validateZip
            accept={[".doc", ".docx", ".txt", ".pdf", ".xls", ".xlsx", ".csv", ".zip"]}
        />

    );
};

export const SingleFile: StoryFn = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    return (


        <FileSelect
            multiple={false}
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            accept={[".doc", ".docx", ".txt", ".pdf", ".xls", ".xlsx", ".csv", ".zip"]}
        />

    );
};

export const RequiredFile: StoryFn = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        setSubmitted(true);
        if (selectedFiles.length < 1) {
            return;
        }
    };

    return (
        <>
            <FileSelect
                multiple
                requiredFileCount={3}
                showValidation={submitted}
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
            />

            <Button onClick={handleSubmit}>Save</Button>
        </>
    );
};

export const Rounded: StoryFn = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    return (
        <FileSelect
            multiple={true}
            rounded={SizeDefinitions.ExtraLarge3}
            backgroundColor={ColorDefinitions.SurfaceLight}
            collectionRounded={SizeDefinitions.Large}
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            accept={[".doc", ".docx", ".txt", ".pdf", ".xls", ".xlsx", ".csv", ".zip"]}
        />

    );
};

export const Accent: StoryFn = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    return (


        <FileSelect
            multiple={true}
            rounded={SizeDefinitions.Large}
            collectionRounded={SizeDefinitions.Large}
            accentColor={ColorDefinitions.Olive}
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            accept={[".doc", ".docx", ".txt", ".pdf", ".xls", ".xlsx", ".csv", ".zip"]}
        />

    );
};

export const Background: StoryFn = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    return (


        <FileSelect
            multiple={true}
            backgroundColor={ColorDefinitions.Olive}
            buttonColor={ColorDefinitions.Olive30}
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            accept={[".doc", ".docx", ".txt", ".pdf", ".xls", ".xlsx", ".csv", ".zip"]}
        />

    );
};

export const Border: StoryFn = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    return (


        <FileSelect
            multiple={true}
            borderColor={ColorDefinitions.Blue30}
            backgroundColor={ColorDefinitions.SurfaceLight}
            buttonColor={ColorDefinitions.Surface}
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            accept={[".doc", ".docx", ".txt", ".pdf", ".xls", ".xlsx", ".csv", ".zip"]}
        />

    );
};

export const Primary: StoryFn = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    return (


        <FileSelect
            multiple={true}
            borderColor={ColorDefinitions.Primary}
            backgroundColor={ColorDefinitions.Primary5}
            buttonColor={ColorDefinitions.Primary}
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            accept={[".doc", ".docx", ".txt", ".pdf", ".xls", ".xlsx", ".csv", ".zip"]}
        />

    );
};