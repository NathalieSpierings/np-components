import React, { ChangeEvent, ReactElement, useRef, useState } from 'react';
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from '../../../lib/utils/definitions';
import { filesize, hasKlantnummerAtEndOfFileName, matchFileType, matchKlantNummer } from '../../../lib/utils/files';
import Alert from '../../UI/Alert/Alert';
import Button from '../../UI/Button/Button';
import { Collection, CollectionItemVariant } from '../../UI/Collection';
import { DividerSplitted } from '../../UI/DividerSplitted';
import Icon from '../../UI/Icons/Icon/Icon';
import Modal from '../../UI/Modal/Modal';
import Tooltip from '../../UI/Tooltip/Tooltip';

export interface FileuploadValidationError {
    fileName: string;
    reasons: (ReactElement | string)[];
}

export enum FileSelectError {
    InvalidFileType = 0,
    OneFileAllowed = 1,
}

export type ErrFunc = (error: FileSelectError, details?: ReactElement | string) => void;

interface ZipValidationResult {
    fileCount: number;
    containsFolder: boolean;
    containsZip: boolean;
}


const validateZipFile = async (file: File): Promise<ZipValidationResult> => {
    const buffer = await file.arrayBuffer();
    const view = new DataView(buffer);

    let fileCount = 0;
    let containsFolder = false;
    let containsZip = false;
    let offset = 0;

    while (offset < view.byteLength - 4) {
        // Lokale file header signature: 0x04034b50
        if (view.getUint32(offset, true) === 0x04034b50) {
            const fileNameLength = view.getUint16(offset + 26, true);
            const extraFieldLength = view.getUint16(offset + 28, true);
            const fileNameBytes = new Uint8Array(buffer, offset + 30, fileNameLength);
            const decoder = new TextDecoder();
            const fileName = decoder.decode(fileNameBytes);

            if (fileName.endsWith('/')) {
                containsFolder = true;
            }

            if (fileName.toLowerCase().endsWith('.zip')) {
                containsZip = true;
            }

            fileCount++;
            offset += 30 + fileNameLength + extraFieldLength;
        } else {
            offset++;
        }
    }

    return { fileCount, containsFolder, containsZip };
};



export interface FileSelectProps {
    selectedFiles: File[];
    setSelectedFiles: (files: File[]) => void;
    requiredFileCount?: number;
    showValidation?: boolean;
    validationMessage?: string;

    multiple?: boolean;
    maxTotalSize?: number;
    accept?: string[];
    validateKlantNummer?: boolean;
    validateKlantnummerInFileName?: boolean;
    klantNummerToMatch?: string;
    validateZip?: boolean;
    onError?: ErrFunc;
    rounded?: SizeDefinitions;
    icon?: IconDefinitions;
    iconFloating?: boolean;
    backgroundColor?: ColorDefinitions;
    borderColor?: ColorDefinitions;
    colorMute?: ColorDefinitions;
    accentColor?: ColorDefinitions;
    buttonColor?: ColorDefinitions;
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
}


const FileSelect = ({
    selectedFiles,
    setSelectedFiles,
    requiredFileCount = 0,
    showValidation = false,
    validationMessage = "Upload minimaal het vereiste aantal bestanden",
    multiple = false,
    maxTotalSize = 1024 * 1024 * 50,
    accept = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".csv", ".txt", ".ei", ".xml", ".zip"],
    validateKlantNummer = false,
    validateKlantnummerInFileName = false,
    klantNummerToMatch = '',
    validateZip = false,
    onError,
    rounded,
    icon = IconDefinitions.cloud_download,
    iconFloating = false,
    backgroundColor,
    borderColor,
    colorMute,
    accentColor,
    buttonColor,
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
}: FileSelectProps): ReactElement => {

    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [errorModalTitle, setErrorModalTitle] = useState<string>("Er is een fout opgetreden");
    const [errorModalContent, setErrorModalContent] = useState<ReactElement | null>(null);

    const handleError: ErrFunc = onError ?? ((_, details) => setErrorModalContent(<>{details}</>));


    const validateZipReasons = async (file: File): Promise<(string | ReactElement)[]> => {
        const reasons: (string | ReactElement)[] = [];

        const zipValidation = await validateZipFile(file);

        if (zipValidation.containsFolder) {
            reasons.push(<>Bevat een folder</>);
        }

        if (zipValidation.containsZip) {
            reasons.push(<>Bevat een ander ZIP-bestand</>);
        }

        if (zipValidation.fileCount > 1) {
            reasons.push(<>Bevat meerdere bestanden (<strong>maximaal 1 toegestaan</strong>)</>);
        }

        return reasons;
    };

    const validateFile = async (file: File): Promise<FileuploadValidationError | null> => {
        const reasons: (ReactElement | string)[] = [];

        if (validateZip && file.name.toLowerCase().endsWith('.zip')) {
            reasons.push(...await validateZipReasons(file));
        }

        if (validateKlantNummer && !matchKlantNummer(true, file, klantNummerToMatch)) {
            reasons.push(<>Bestandsnaam bevat geen geldig klantnummer of het klantummer is niet gelijk aan het huidige klantnummer.</>);
        }

        if (validateKlantnummerInFileName && !hasKlantnummerAtEndOfFileName(file)) {
            reasons.push(
                <>
                    De bestandsnaam moet eindigen op <strong>#klantnummer</strong>.
                </>
            );
        }

        if (accept && !matchFileType(accept, file)) {
            reasons.push(<>Ongeldig bestandstype</>);
        }

        return reasons.length
            ? { fileName: file.name, reasons }
            : null;
    };


    const dedupeFiles = (files: File[]) =>
        files.filter((file, index, self) =>
            index === self.findIndex(
                f =>
                    f.name === file.name &&
                    f.size === file.size &&
                    f.lastModified === file.lastModified
            )
        );

    const applyMultipleRule = (files: File[], allowed: boolean) => {
        if (allowed) return files;

        return files.length > 1 ? files.slice(0, 1) : files;
    };

    const handleFiles = async (files: File[]) => {
        if (!files.length) return;

        const validFiles: File[] = [];
        const fileErrors: FileuploadValidationError[] = [];

        for (const file of files) {
            const error = await validateFile(file);

            if (error) {
                fileErrors.push(error);
            } else {
                validFiles.push(file);
            }
        }

        const filteredValidFiles = applyMultipleRule(validFiles, multiple);

        const mergedFiles = multiple
            ? [...selectedFiles, ...filteredValidFiles]
            : filteredValidFiles;

        const newFiles = dedupeFiles(mergedFiles);

        if (fileErrors.length > 0) {
            setErrorModalTitle("Ongeldige bestanden gedetecteerd");

            handleError(
                FileSelectError.InvalidFileType,
                <>
                    <Alert variant='default' alertCss='mb-2'>
                        <p>Bestandsupload mislukt!</p>
                        <p>De volgende bestanden kunnen niet worden geüpload:</p>
                    </Alert>

                    <ul className="list-upload-warnings ">
                        {fileErrors.map((err) => (
                            <li key={err.fileName}>
                                <strong>{err.fileName}</strong>
                                <ul>
                                    {err.reasons.map((reason, idx) => (
                                        <li key={err.fileName + '_' + idx}>{reason}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </>
            );

            setSelectedFiles([]);
        } else if (newFiles.length > 0) {
            setSelectedFiles(newFiles);
        }
    };

    const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        await handleFiles(files ? Array.from(files) : []);
        event.target.value = ''; // reset input altijd
    };


    const hasValidationError = showValidation && requiredFileCount > 0 && selectedFiles.length < requiredFileCount;

    const cls = [
        'fileupload__zone',
        borderColor ? `border-${borderColor}` : '',
        colorMute ? `text-mute-${colorMute}` : '',
        backgroundColor ? `bg-${backgroundColor}` : '',
        rounded ? `rounded-${rounded}` : '',
        dragActive ? 'drag-active' : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <>
            {errorModalContent && (
                <Modal
                    variant="negative"
                    isOpen={true}
                    title={errorModalTitle}
                    onClose={() => setErrorModalContent(null)}
                    footerActions={
                        <Button color={ColorDefinitions.Rose30} shadow onClick={() => setErrorModalContent(null)}>
                            Ok
                        </Button>
                    }
                >
                    {errorModalContent}
                </Modal>
            )}


            <div className={`fileupload`}>
                <div className={cls}
                    onDragEnter={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setDragActive(true);
                    }}
                    onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        e.dataTransfer.dropEffect = 'copy';
                        setDragActive(true);
                    }}
                    onDragLeave={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setDragActive(false);
                    }}
                    onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        setDragActive(false);

                        const files = Array.from(e.dataTransfer.files);
                        void handleFiles(files);
                    }}
                    aria-label="File drop zone"
                >
                    <input
                        ref={inputRef}
                        onChange={onFileChange}
                        style={{ pointerEvents: 'none' }}
                        className="fileupload__input"
                        type="file"
                        multiple={multiple}
                        accept={accept ? accept.join(',') : undefined}
                    />

                    <Icon icon={icon} duotone={true} size={SizeDefinitions.ExtraLarge3} iconCss={`${iconFloating ? 'ani-floating' : ''}`} />

                    <p>
                        <strong>Drop of sleep</strong> bestanden om te uploaden
                    </p>

                    <DividerSplitted label="of selecteer bestanden" dividerSplittedCss="mt-1 mb-1" />

                    <Button
                        color={buttonColor}
                        shadow
                        style={{ pointerEvents: 'all' }}
                        onClick={() => inputRef.current?.click()}
                    >
                        Selecteer bestanden
                    </Button>
                </div>

                {hasValidationError && (
                    <span className="field-validation-error">
                        <span>
                            {validationMessage} ({requiredFileCount} vereist)
                        </span>
                    </span>

                )}


                <div className="fileupload__info">
                    <small>
                        Maximum bestandgrootte: <strong>{filesize(maxTotalSize)}</strong>
                    </small>
                    {selectedFiles.length && multiple ? (
                        <div className="fileupload__info__totalfiles">
                            Aantal bestanden: <span className={`text-${accentColor}`}> {selectedFiles.length}</span>
                        </div>
                    ) : null}
                </div>


                <div className="fileupload__uploads">

                    {selectedFiles.length > 0 && (
                        <Collection
                            scrollable={collectionScrollable}
                            scrollheight={collectionScrollheight}
                            colorMute={collectionColorMute}
                            color={collectionColor}
                            background={collectionBackground}
                            borderColor={collectionBorderColor}
                            itemVariant={collectionItemVariant}
                            rounded={collectionRounded}
                            compact={collectionCompact}
                            medium={collectionMedium}
                            hoverable={collectionHoverable}
                            selectable={collectionSelectable}
                            selectMultiple={collectionSelectMultiple}
                            collectionCss={collectionCss}
                            items={selectedFiles?.map((item, idx) => ({
                                id: idx.toString(),
                                content: {
                                    prefix: (
                                        <Icon icon={IconDefinitions.doc} duotone={true} size={SizeDefinitions.Medium} />
                                    ),
                                    content: (
                                        <div className="flex flex-column align-start">
                                            <span>{item.name}</span>
                                            <small className="text-mute">{filesize(item.size)} </small>
                                        </div>
                                    ),
                                    postfix: (
                                        <Tooltip content="Verwijderen">

                                            <Icon
                                                icon={IconDefinitions.bin}
                                                iconCss="pointer"
                                                ring={true}
                                                ringSize="ring-1"
                                                ringHoverColor={ColorDefinitions.Rose30}
                                                hoverBackground={ColorDefinitions.Rose30}
                                                rounded={SizeDefinitions.Full}
                                                size={SizeDefinitions.Small}
                                                onClick={() => {
                                                    const files = selectedFiles.filter((file) => file !== item);

                                                    if (!files.length && inputRef.current) {
                                                        inputRef.current.value = ''; // reset input zodat dezelfde file opnieuw gekozen kan worden
                                                    }

                                                    setSelectedFiles(files);
                                                }}
                                            />
                                        </Tooltip>

                                    ),
                                }
                            }))}
                        />
                    )}
                </div>

            </div>

        </>
    );
};

export default FileSelect;
