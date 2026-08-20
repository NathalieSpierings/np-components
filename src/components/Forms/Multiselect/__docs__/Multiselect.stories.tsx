import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { ColorDefinitions, SizeDefinitions } from '../../../../lib/utils/definitions';
import Multiselect, { MultiselectItem, MultiselectItemId } from '../Multiselect';
import Dropdown from '../../Dropdown/Dropdown';
import Title from '../../../Typography/Title/Title';
import React from 'react';

const meta: Meta<typeof Multiselect> = {
    title: 'Forms/Multiselect',
    component: Multiselect,
    parameters: {
        layout: 'centered',
    }
};

export default meta;
type Story = StoryObj<typeof Multiselect>;

 const items: MultiselectItem[] = [
        {
            id: '1',
            content: {
                content: 'Option 1',
                postfix: <small>54949881</small>,
            }
        },
        {
            id: '2',
            content: {
                content: 'Option 2',
                postfix: <small>54949882</small>,
            }
        },
        {
            id: '3',
            content: {
                content: 'Option 3',
                postfix: <small>54949883</small>,
            }
        },
        {
            id: '4',
            content: {
                content: 'Option 4',
                postfix: <small>54949884</small>,
            }
        },
        {
            id: '5',
            content: {
                content: 'Option 5',
                postfix: <small>54949885</small>,
            }
        },
    ];

export const Default: StoryFn = () => {
     const [selected, setselected] = useState<MultiselectItemId[]>([]);

    return (
        <>
            <Multiselect
                    items={items}
                    selected={selected}
                    onSelectionChange={setselected}
                />

            <pre>{JSON.stringify(selected, null, 2)}</pre>
        </>
    )
};


export const SingleSelect: StoryFn = () => {
     const [singleSelected, setSingleSelected] = useState<MultiselectItemId[]>([]);
    
    return (
        <>
           <Multiselect
                    items={items}
                    selected={singleSelected}
                    onSelectionChange={setSingleSelected}
                    selectMultiple={false}
                />

            <pre>{JSON.stringify(singleSelected, null, 2)}</pre>
        </>
    )
};


export const ItemsBordered: StoryFn = () => {
     const [selected, setselected] = useState<MultiselectItemId[]>([]);

    return (
        <>
            <Multiselect
                    items={items}
                    selected={selected}
                    onSelectionChange={setselected}
                    collectionItemVariant="bordered"
                />

            <pre>{JSON.stringify(selected, null, 2)}</pre>
        </>
    );
};

export const ItemsUnderlined: StoryFn = () => {
     const [selected, setselected] = useState<MultiselectItemId[]>([]);

    return (
        <>
            <Multiselect
                items={items}
                selected={selected}
                onSelectionChange={setselected}
                collectionItemVariant="underlined"
            />

            <pre>{JSON.stringify(selected, null, 2)}</pre>
        </>
    );
};

export const ItemsRounded: StoryFn = () => {
     const [selected, setselected] = useState<MultiselectItemId[]>([]);

    return (
        <>
            <Multiselect
                items={items}
                selected={selected}
                onSelectionChange={setselected}
                collectionItemVariant="bordered"
                collectionRounded={SizeDefinitions.ExtraLarge}
            />

            <pre>{JSON.stringify(selected, null, 2)}</pre>
        </>
    );
};

export const WithHeader: StoryFn = () => {
     const [selected, setselected] = useState<MultiselectItemId[]>([]);

    return (
        <>
            <Multiselect
                items={items}
                selected={selected}
                onSelectionChange={setselected}
                multiselectHeader={{
                    content: <Title size="sm"> My title goes here...</Title>
                }}
            />

            <pre>{JSON.stringify(selected, null, 2)}</pre>
        </>
    );
};

export const WithoutCheckAll: StoryFn = () => {
     const [selected, setselected] = useState<MultiselectItemId[]>([]);

    return (
        <>
            <Multiselect
                items={items}
                selected={selected}
                onSelectionChange={setselected}
                enableCheckAll={false}
            />

            <pre>{JSON.stringify(selected, null, 2)}</pre>
        </>
    );
};

export const WithouSearch: StoryFn = () => {
     const [selected, setselected] = useState<MultiselectItemId[]>([]);

    return (
        <>
            <Multiselect
                items={items}
                selected={selected}
                onSelectionChange={setselected}
                enableSearch={false}
            />

            <pre>{JSON.stringify(selected, null, 2)}</pre>
        </>
    );
};

export const NoHeader: StoryFn = () => {
     const [selected, setselected] = useState<MultiselectItemId[]>([]);

    return (
        <>
            <Multiselect
                items={items}
                selected={selected}
                onSelectionChange={setselected}
            />

            <pre>{JSON.stringify(selected, null, 2)}</pre>
        </>
    );
};

export const LongContent: StoryFn = () => {
     const [selected, setselected] = useState<MultiselectItemId[]>([]);

    return (
        <>
            <Multiselect
                items={[
                    {
                        id: '1',
                        content: {
                            content: 'Option 1',
                            postfix: <small>54949881</small>,
                        }
                    },
                    {
                        id: '2',
                        content: {
                            content: 'Option 2',
                            postfix: <small>54949882</small>,
                        }
                    },
                    {
                        id: '3',
                        content: {
                            content: 'Option 3',
                            postfix: <small>54949883</small>,
                        }
                    },
                    {
                        id: '4',
                        content: {
                            content: 'Option 4',
                            postfix: <small>54949884</small>,
                        }
                    },
                    {
                        id: '5',
                        content: {
                            content: 'Option 5',
                            postfix: <small>54949885</small>,
                        }
                    },
                    {
                        id: '6',
                        content: {
                            content: 'Option 6',
                            postfix: <small>54949881</small>,
                        }
                    },
                    {
                        id: '7',
                        content: {
                            content: 'Option 7',
                            postfix: <small>54949882</small>,
                        }
                    },
                    {
                        id: '8',
                        content: {
                            content: 'Option 8',
                            postfix: <small>54949883</small>,
                        }
                    },
                    {
                        id: '9',
                        content: {
                            content: 'Option 9',
                            postfix: <small>54949884</small>,
                        }
                    },
                    {
                        id: '10',
                        content: {
                            content: 'Option 10',
                            postfix: <small>54949885</small>,
                        }
                    }
                ]}
                selected={selected}
                onSelectionChange={setselected}
            />

            <pre>{JSON.stringify(selected, null, 2)}</pre>
        </>
    );
};

export const InsideDropdown: StoryFn = () => {
     const [selected, setselected] = useState<MultiselectItemId[]>([]);

    return (
        <>
            <Dropdown
                background={ColorDefinitions.Surface}
                dropdownToggle={{
                    label: "Click me"
                }}
            >
                <Multiselect
                    items={items}
                    selected={selected}
                    onSelectionChange={setselected}
                    multiselectHeader={{
                        content: "My label goes here...",
                        borderColor: ColorDefinitions.Theme100
                    }}
                    toolbarBorderColor={ColorDefinitions.Theme100}

                />
            </Dropdown>

            <pre>{JSON.stringify(selected, null, 2)}</pre>
        </>
    );
};

export const Background: StoryFn = () => {
     const [selected, setselected] = useState<MultiselectItemId[]>([]);

    return (
        <>
            <Multiselect
                collectionBackground={ColorDefinitions.Olive}
                collectionBorderColor={ColorDefinitions.Olive}
                toolbarBorderColor={ColorDefinitions.Olive}
                collectionColorMute={ColorDefinitions.Olive}
                items={items}
                selected={selected}
                onSelectionChange={setselected}
                multiselectHeader={{
                    content: "My label goes here...",
                    borderColor: ColorDefinitions.Olive
                }}
            />

            <pre>{JSON.stringify(selected, null, 2)}</pre>
        </>
    );
};
