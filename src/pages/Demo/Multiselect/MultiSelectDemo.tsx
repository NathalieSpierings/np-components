import React, { ReactElement, useState } from "react";
import { Fieldset } from "../../../components/Typography/Fieldset";
import { ColorDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import Dropdown from "../../../components/Forms/Dropdown/Dropdown";
import Multiselect, { MultiselectItem, MultiselectItemId } from "../../../components/Forms/Multiselect/Multiselect";
import Title from "../../../components/Typography/Title/Title";

const MultiselectDemo = ({
}): ReactElement => {

    const [selected, setselected] = useState<MultiselectItemId[]>([]);
    const [singleSelected, setSingleSelected] = useState<MultiselectItemId[]>([]);

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

    return (
        <section className="centered centered--wide">
            <h3>Welcome to the multiselect demo</h3>

            <Fieldset legend="Default" className="mt-4">
                <Multiselect
                    items={items}
                    selected={selected}
                    onSelectionChange={setselected}
                />
            </Fieldset>

            <Fieldset legend="Single select" className="mt-4">
                <Multiselect
                    items={items}
                    selected={singleSelected}
                    onSelectionChange={setSingleSelected}
                    selectMultiple={false}
                />
            </Fieldset>


            <Fieldset legend="Items bordered" className="mt-4">
                <Multiselect
                    items={items}
                    selected={selected}
                    onSelectionChange={setselected}
                    collectionItemVariant="bordered"
                />
            </Fieldset>

            <Fieldset legend="Items underlined" className="mt-4">
                <Multiselect
                    items={items}
                    selected={selected}
                    onSelectionChange={setselected}
                    collectionItemVariant="underlined"
                />
            </Fieldset>

            <Fieldset legend="Items rounded" className="mt-4 pb-4">
                <Multiselect
                    items={items}
                    selected={selected}
                    onSelectionChange={setselected}
                    collectionItemVariant="bordered"
                    collectionRounded={SizeDefinitions.ExtraLarge}
                />
            </Fieldset>


            <Fieldset legend="With header" className="mt-4">
                <Multiselect
                    items={items}
                    selected={selected}
                    onSelectionChange={setselected}
                    multiselectHeader={{
                        content: <Title size="sm"> My title goes here...</Title>
                    }}
                />
            </Fieldset>

            <Fieldset legend="No check all" className="mt-4">
                <Multiselect
                    items={items}
                    selected={selected}
                    onSelectionChange={setselected}
                    enableCheckAll={false}
                />
            </Fieldset>

            <Fieldset legend="No search" className="mt-4">
                <Multiselect
                    items={items}
                    selected={selected}
                    onSelectionChange={setselected}
                    enableSearch={false}
                />
            </Fieldset>

            <Fieldset legend="No header" className="mt-4">
                <Multiselect
                    items={items}
                    selected={selected}
                    onSelectionChange={setselected}

                />
            </Fieldset>

            <Fieldset legend="Long content" className="mt-4">
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
            </Fieldset>

            <Fieldset legend="Inside dropdown" className="mt-4">
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
            </Fieldset>

            <Fieldset legend="Background" className="mt-4">
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

            </Fieldset>

            <Fieldset legend="Selected values" className="mt-4">
                <pre>{JSON.stringify(selected, null, 2)}</pre>
            </Fieldset>


        </section>
    );
}

export default MultiselectDemo;