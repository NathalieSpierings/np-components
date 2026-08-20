import { FC, ReactElement, useState } from 'react';
import { ColorDefinitions, SizeDefinitions } from '../../../lib/utils/definitions';
import Button from '../../UI/Button/Button';
import FileSelect from '../FileSelect/FileSelect';
import { CollectionItemVariant } from '../../UI/Collection/Collection';
import React from 'react';

export interface FileReaderProps {
    processContent: (file: File) => void;
    accept?: string[];

    // Collection props
    collectionScrollable?: boolean;
    collectionScrollheight?: number;
    collectionColorMute?: ColorDefinitions;
    collectionColor?: ColorDefinitions;
    collectionBackground?: ColorDefinitions;
    collectionBorderColor?: ColorDefinitions;
    collectionItemVariant?: CollectionItemVariant;
    collectionRounded?: SizeDefinitions;
    collectionCompact?: boolean;
    collectionMedium?: boolean;
    collectionHoverable?: boolean;
    collectionSelectable?: boolean;
    collectionSelectMultiple?: boolean;
    collectionCss?: string;

    fileUploadRounded?: SizeDefinitions;
    fileUploadBackgroundColor?: ColorDefinitions;
    fileUploadColorMute?: ColorDefinitions;
    fileUploadAccentColor?: ColorDefinitions;
    fileUploadBorderColor?: ColorDefinitions;
    fileUploadButtonColor?: ColorDefinitions;

    buttonColor?: ColorDefinitions;
    buttonCss?: string;
}

const FileReader: FC<FileReaderProps> = ({
    processContent,
    accept,
    buttonColor = ColorDefinitions.Green,
    buttonCss = '',

    // Fileupload props
    fileUploadRounded,
    fileUploadBackgroundColor,
    fileUploadColorMute,
    fileUploadBorderColor,
    fileUploadAccentColor = ColorDefinitions.Primary,
    fileUploadButtonColor = ColorDefinitions.Primary,

    //Collection props
    collectionScrollable,
    collectionScrollheight,
    collectionColorMute,
    collectionColor,
    collectionBackground,
    collectionBorderColor,
    collectionItemVariant,
    collectionRounded,
    collectionCompact,
    collectionMedium,
    collectionHoverable,
    collectionSelectable,
    collectionSelectMultiple,
    collectionCss = '',
}): ReactElement => {
    const [file, setFile] = useState<File | null>(null);
    const [reading, setReading] = useState<boolean>(false);
    // Initially, no file is selected

    const read = async () => {
        setReading(true);
        processContent(file!);
        setReading(false);
        setFile(null);
    };

    return (
        <div>
            <FileSelect
                selectedFiles={file ? [file] : []}
                setSelectedFiles={(f) => setFile(f[0])}
                accept={accept}
                multiple={false}
                rounded={fileUploadRounded}
                backgroundColor={fileUploadBackgroundColor}
                borderColor={fileUploadBorderColor}
                colorMute={fileUploadColorMute}
                accentColor={fileUploadAccentColor}
                buttonColor={fileUploadButtonColor}
                collectionScrollable={collectionScrollable}
                collectionScrollheight={collectionScrollheight}
                collectionColorMute={collectionColorMute}
                collectionColor={collectionColor}
                collectionBackground={collectionBackground}
                collectionBorderColor={collectionBorderColor}
                collectionItemVariant={collectionItemVariant}
                collectionRounded={collectionRounded}
                collectionCompact={collectionCompact}
                collectionMedium={collectionMedium}
                collectionHoverable={collectionHoverable}
                collectionSelectable={collectionSelectable}
                collectionSelectMultiple={collectionSelectMultiple}
                collectionCss={collectionCss}
            />

            <Button
                css={buttonCss}
                shadow={true}
                color={buttonColor}
                ripple={true}
                disabled={!file || reading}
                onClick={read}
            >
                Bestand inlezen
            </Button>
        </div>
    );
};

export default FileReader;
