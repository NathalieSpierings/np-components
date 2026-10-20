import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import SearchInput from '../SearchInput';

const meta: Meta<typeof SearchInput> = {
    title: 'Forms/SearchInput',
    component: SearchInput,
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

const defaultSearch = (val: string, q: string) => {
    return !!~val.toLowerCase().indexOf(q.toLowerCase());
};

const data = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
    { id: 4, name: 'Bob Brown' },
    { id: 5, name: 'Charlie Davis' },
];

export const Default: StoryFn = () => {
    const [searchTerm, setSearchTerm] = useState('');

    let sample = data.filter((x) => {
        return defaultSearch(`${x.name}$`, searchTerm);
    });

    return (
        <>
           
            <SearchInput placeholder="Search..." onTextInput={setSearchTerm} value={searchTerm} />

            <div className="mt-5">
                {sample.map((item) => (
                    <div key={item.id} className="mb-2">
                        {item.name}
                    </div>
                ))}
            </div>
        </>
    );
};


export const Small: StoryFn = () => {
    const [searchTerm, setSearchTerm] = useState('');

    let sample = data.filter((x) => {
        return defaultSearch(`${x.name}$`, searchTerm);
    });

    return (
        <>
           
            <SearchInput
                placeholder="Search..."
                onTextInput={setSearchTerm}
                value={searchTerm}
                size="sm"
            />

            <div className="mt-5">
                {sample.map((item) => (
                    <div key={item.id} className="mb-2">
                        {item.name}
                    </div>
                ))}
            </div>
        </>
    );
};

export const Medium: StoryFn = () => {
    const [searchTerm, setSearchTerm] = useState('');

    let sample = data.filter((x) => {
        return defaultSearch(`${x.name}$`, searchTerm);
    });

    return (
        <>
           
            <SearchInput
                placeholder="Search..."
                onTextInput={setSearchTerm}
                value={searchTerm}
                size="md"
            />

            <div className="mt-5">
                {sample.map((item) => (
                    <div key={item.id} className="mb-2">
                        {item.name}
                    </div>
                ))}
            </div>
        </>
    );
};


export const Large: StoryFn = () => {
    const [searchTerm, setSearchTerm] = useState('');

    let sample = data.filter((x) => {
        return defaultSearch(`${x.name}$`, searchTerm);
    });

    return (
        <>
           
            <SearchInput
                placeholder="Search..."
                onTextInput={setSearchTerm}
                value={searchTerm}
                size="lg"
            />

            <div className="mt-5">
                {sample.map((item) => (
                    <div key={item.id} className="mb-2">
                        {item.name}
                    </div>
                ))}
            </div>
        </>
    );
};


export const ExtraLarge: StoryFn = () => {
    const [searchTerm, setSearchTerm] = useState('');

    let sample = data.filter((x) => {
        return defaultSearch(`${x.name}$`, searchTerm);
    });

    return (
        <>
           
            <SearchInput
                placeholder="Search..."
                onTextInput={setSearchTerm}
                value={searchTerm}
                size="xl"
            />

            <div className="mt-5">
                {sample.map((item) => (
                    <div key={item.id} className="mb-2">
                        {item.name}
                    </div>
                ))}
            </div>
        </>
    );
};
