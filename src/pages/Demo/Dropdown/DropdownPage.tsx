import React from "react";
import { Dropdown } from "../../../components/Forms/Dropdown/Dropdown";
import { DropdownMenu } from "../../../components/Forms/Dropdown/DropdownMenu";
import { ColorDefinitions } from "../../../lib/utils/definitions";

const DropdownPage: React.FC = () => {

    return (
        <>
            <p> Welcome to the dropdown demo page</p>


            <Dropdown dropdownToggle={{
                label: "Default dropdown",
                arrow: true
            }}
                menuItems={[{
                    id: '1',
                    label: 'Menu item 1'
                },
                {
                    id: '2',
                    label: 'Menu item 2'
                },
                {
                    id: '3',
                    label: 'Menu item 3'
                }]}
            />

            <div className="mt-4">
                <Dropdown dropdownToggle={{
                    label: "With header",
                    arrow: true
                }}
                    menuItems={[{
                        id: '1',
                        label: 'Menu item 1'
                    },
                    {
                        id: '2',
                        label: 'Menu item 2'
                    },
                    {
                        id: '3',
                        label: 'Menu item 3'
                    }]}
                    dropdownHeader={{ content: (<>Welcome <strong>&nbsp; Guest</strong></>) }}
                />
            </div>

            <div className="mt-4">
                <Dropdown dropdownToggle={{
                    label: "With header and border",
                    arrow: true
                }}
                    menuItems={[{
                        id: '1',
                        label: 'Menu item 1'
                    },
                    {
                        id: '2',
                        label: 'Menu item 2'
                    },
                    {
                        id: '3',
                        label: 'Menu item 3'
                    }]}
                    dropdownHeader={{ content: (<>Welcome <strong>&nbsp; Guest</strong></>), borderColor: ColorDefinitions.Surface }}
                />
            </div>

            <div className="mt-4">
                <Dropdown dropdownToggle={{
                    label: "With footer",
                    arrow: true
                }}
                    menuItems={[{
                        id: '1',
                        label: 'Menu item 1'
                    },
                    {
                        id: '2',
                        label: 'Menu item 2'
                    },
                    {
                        id: '3',
                        label: 'Menu item 3'
                    }]}
                    dropdownFooter={{ content: (<>Footer content...</>) }}
                />
            </div>

            <div className="mt-4">
                <Dropdown dropdownToggle={{
                    label: "With footer and border",
                    arrow: true
                }}
                    menuItems={[{
                        id: '1',
                        label: 'Menu item 1'
                    },
                    {
                        id: '2',
                        label: 'Menu item 2'
                    },
                    {
                        id: '3',
                        label: 'Menu item 3'
                    }]}
                    dropdownFooter={{ content: (<>Footer content...</>), borderColor: ColorDefinitions.Surface }}
                />
            </div>

            <div className="mt-4">
                <Dropdown dropdownToggle={{
                    label: "With header and footer",
                    arrow: true
                }}
                    menuItems={[{
                        id: '1',
                        label: 'Menu item 1'
                    },
                    {
                        id: '2',
                        label: 'Menu item 2'
                    },
                    {
                        id: '3',
                        label: 'Menu item 3'
                    }]}
                    dropdownHeader={{ content: (<>Welcome <strong>&nbsp; Guest</strong></>), borderColor: ColorDefinitions.Surface }}
                    dropdownFooter={{ content: (<>Footer content...</>), borderColor: ColorDefinitions.Surface }}
                />
            </div>

            <div className="mt-4">
                <Dropdown dropdownToggle={{
                    label: "With search",
                    arrow: true
                }}
                    menuItems={[{
                        id: '1',
                        label: 'Menu item 1'
                    },
                    {
                        id: '2',
                        label: 'Menu item 2'
                    },
                    {
                        id: '3',
                        label: 'Menu item 3'
                    }]}
                    dropdownHeader={{ content: (<>Welcome <strong>&nbsp; Guest</strong></>), borderColor: ColorDefinitions.Surface }}
                    enableSearch

                />
            </div>


            <div className="mt-4">
                <Dropdown dropdownToggle={{
                    label: "With header and search",
                    arrow: true
                }}
                    menuItems={[{
                        id: '1',
                        label: 'Menu item 1'
                    },
                    {
                        id: '2',
                        label: 'Menu item 2'
                    },
                    {
                        id: '3',
                        label: 'Menu item 3'
                    }]}
                    dropdownHeader={{ content: (<>Welcome <strong>&nbsp; Guest</strong></>), borderColor: ColorDefinitions.Surface }}
                    enableSearch
                />
            </div>

            <div className="mt-4">
                <Dropdown dropdownToggle={{
                    label: "Tabs dropdown",
                    arrow: true
                }}
                    tabs={[
                        { id: "tabMenu", title: "Menu" },
                        { id: "tabColumns", title: "Kolommen" },
                    ]}
                    tabPanes={[
                        {
                            tabId: "tabMenu",
                            content: <DropdownMenu items={[{
                                id: '1',
                                label: 'Menu item 1'
                            },
                            {
                                id: "2",
                                label: "Menu item 2",
                                items: [
                                    {
                                        id: "3",
                                        label: "Submenu item 1",
                                    },
                                    {
                                        id: "4",
                                        label: "Submenu item 2",
                                    },
                                ],
                            },
                            {
                                id: '7',
                                label: 'Menu item 3'
                            }]} />,
                        },
                        {
                            tabId: "tabColumns",
                            content: (
                                <div>
                                    <h4>Custom pane</h4>
                                    <p className="p2000">Hier kan elke React content staan.</p>
                                    <input placeholder="Zoeken..." />
                                    <button type="button">Toepassen</button>
                                </div>
                            ),
                        },
                    ]}
                />
            </div>

            <div className="mt-4">
                <Dropdown
                    dropdownToggle={{
                        label: "Tabs with search",
                        arrow: true
                    }}

                    tabs={[
                        { id: "tabMenu", title: "Menu" },
                        { id: "tabColumns", title: "Kolommen" },
                    ]}
                    tabPanes={[
                        {
                            tabId: "tabMenu",
                            search: {
                                enabled: true,
                                placeholder: "Zoek menu item...",
                                noResultsText: "Geen resultaten"
                            },

                            menuItems: [
                                {
                                    id: "1",
                                    label: "Menu item 1"
                                },
                                {
                                    id: "2",
                                    label: "Menu item 2",
                                    items: [
                                        {
                                            id: "3",
                                            label: "Submenu item 1",
                                        },
                                        {
                                            id: "4",
                                            label: "Submenu item 2",
                                        },
                                    ],
                                },
                                {
                                    id: "7",
                                    label: "Menu item 3"
                                }
                            ],
                        },
                        {
                            tabId: "tabColumns",
                            content: (
                                <div>
                                    <h4>Custom pane</h4>
                                    <p className="p2000">Hier kan elke React content staan.</p>
                                    <input placeholder="Zoeken..." />
                                    <button type="button">Toepassen</button>
                                </div>
                            ),
                        },
                    ]}
                />
            </div>


            <div className="mt-4">
                <Dropdown dropdownToggle={{
                    label: "Multilevel menu dropdown",
                    arrow: true
                }}
                    menuItems={[{
                        id: '1',
                        label: 'Menu item 1'
                    },
                    {
                        id: "2",
                        label: "Menu item 2",
                        items: [
                            {
                                id: "3",
                                label: "Submenu item 1",
                            },
                            {
                                id: "4",
                                label: "Submenu item 2",
                                items: [
                                    {
                                        id: "5",
                                        label: "Sub submenu item 1",
                                    },
                                    {
                                        id: "6",
                                        label: "Sub submenu item 2",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: '7',
                        label: 'Menu item 3'
                    }]}
                />
            </div>

            <div className="mt-4">
                <Dropdown
                    dropdownToggle={{
                        label: "Multilevel menu and search",
                        arrow: true
                    }}
                    menuItems={[{
                        id: '1',
                        label: 'Menu item 1'
                    },
                    {
                        id: "2",
                        label: "Settings",
                        items: [
                            {
                                id: "3",
                                label: "Account",
                            },
                            {
                                id: "4",
                                label: "Profile",
                                items: [
                                    {
                                        id: "5",
                                        label: "Address",
                                    },
                                    {
                                        id: "6",
                                        label: "Notifications",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: '7',
                        label: 'Menu item 3'
                    }]}
                    dropdownHeader={{ content: (<>Welcome <strong>&nbsp; Guest</strong></>), borderColor: ColorDefinitions.Surface }}
                    enableSearch
                />
            </div>


        </>
    )
}
export default DropdownPage;