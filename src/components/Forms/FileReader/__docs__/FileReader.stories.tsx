import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { ColorDefinitions } from '../../../../lib/utils/definitions';
import FileSelect from '../../../Forms/FileSelect/FileSelect';
import FileReader from '../FileReader';

const meta: Meta<typeof FileReader> = {
    title: 'Forms/FileReader',
    component: FileReader,
    parameters: {
        layout: 'fullscreen',
    }
};

export default meta;
type Story = StoryObj<typeof FileReader>;

export const Default: StoryFn = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    return (
        <FileSelect
                multiple={false}
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
                collectionCss="mb-5"
                collectionItemVariant="bordered"
                collectionBorderColor={ColorDefinitions.Surface}
                accept={['.csv']}
            />
    );
};
