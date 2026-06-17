import React from "react";
import { Dropdown } from "../../../components/Forms/Dropdown/Dropdown";

const DropdownPage: React.FC = () => {

    return (
        <>
            <p> Welcome to the dropdown demo page</p>
            <div className="grid">
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

                <Dropdown dropdownToggle={{
                    label: "Tabs dropdown",
                    arrow: true
                }}
                    tabs={[
                        {
                            id: 'tab1',
                            title: "Menu",
                            menuItems: [{
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
                            }]
                        },
                        {
                            id: "tab2",
                            title: 'Kolommen',
                            content: (
                                <div style={{ padding: "0.75rem", minWidth: 280 }}>
                                    <h4>Custom pane</h4>
                                    <p>Hier kan elke React content staan.</p>
                                    <input placeholder="Zoeken..." />
                                    <button type="button">Toepassen</button>
                                </div>
                            )
                        }
                    ]}

                />
            </div>
        </>
    )
}
export default DropdownPage;