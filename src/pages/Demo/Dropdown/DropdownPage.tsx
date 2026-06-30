import React from "react";
import { Dropdown, DropdownHorizontalPosition, DropdownVerticalPosition } from "../../../components/Forms/Dropdown/Dropdown";
import { DropdownMenu } from "../../../components/Forms/Dropdown/DropdownMenu";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import Icon from "../../../components/UI/Icons/Icon/Icon";

const DropdownPage: React.FC = () => {

    return (
        <section className="centered centered--wide">
            <p> Welcome to the dropdown demo page</p>


            <Dropdown
                dropdownToggle={{
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
                    label: "Long menu",
                    arrow: true
                }}
                    verticalPosition={DropdownVerticalPosition.Up}
                    menuItems={[{
                        id: '1',
                        label: 'Menu item 1',
                    },
                    {
                        id: '2',
                        label: 'Menu item 2',
                    },
                    {
                        id: '3',
                        label: 'Menu item 3',
                    },
                    {
                        id: '4',
                        label: 'Menu item 4',
                    },
                    {
                        id: '5',
                        label: 'Menu item 5',
                    },
                    {
                        id: '6',
                        label: 'Menu item 6',
                    },
                    {
                        id: '7',
                        label: 'Menu item 7',
                    },
                    {
                        id: '8',
                        label: 'Menu item 8',
                    },
                    {
                        id: '9',
                        label: 'Menu item 9',
                    },
                    {
                        id: '10',
                        label: 'Menu item 10',
                    },
                    {
                        id: '11',
                        label: 'Menu item 11',
                    },
                    {
                        id: '12',
                        label: 'Menu item 12',
                    },
                    {
                        id: '13',
                        label: 'Menu item 13',
                    },
                    {
                        id: '14',
                        label: 'Menu item 14',
                    },
                    ]}
                    dropdownHeader={{ content: (<>Welcome <strong>&nbsp; Guest</strong></>) }}
                />
            </div>

            <div className="mt-4">
                <Dropdown background={ColorDefinitions.Blue}
                    dropdownToggle={{
                        label: "Color dropdown",
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

            </div>



            <div className="mt-4">
                <Dropdown dropdownToggle={{
                    label: "Vertical position up",
                    arrow: true
                }}
                    verticalPosition={DropdownVerticalPosition.Up}
                    menuItems={[{
                        id: '1',
                        label: 'Menu item 1',
                        icon: (<Icon icon={IconDefinitions.star} />)
                    },
                    {
                        id: '2',
                        label: 'Menu item 2',
                        icon: (<Icon icon={IconDefinitions.cog} />)
                    },
                    {
                        id: '3',
                        label: 'Menu item 3',
                        icon: (<Icon icon={IconDefinitions.power} />)
                    }]}
                    dropdownHeader={{ content: (<>Welcome <strong>&nbsp; Guest</strong></>) }}
                />
            </div>

            <div className="mt-4">
                <Dropdown dropdownToggle={{
                    label: "Vertical position down",
                    arrow: true
                }}
                    verticalPosition={DropdownVerticalPosition.Down}
                    menuItems={[{
                        id: '1',
                        label: 'Menu item 1',
                        icon: (<Icon icon={IconDefinitions.star} />)
                    },
                    {
                        id: '2',
                        label: 'Menu item 2',
                        icon: (<Icon icon={IconDefinitions.cog} />)
                    },
                    {
                        id: '3',
                        label: 'Menu item 3',
                        icon: (<Icon icon={IconDefinitions.power} />)
                    }]}
                    dropdownHeader={{ content: (<>Welcome <strong>&nbsp; Guest</strong></>) }}
                />
            </div>

            <div className="mt-4">
                <Dropdown dropdownToggle={{
                    label: "Horizontal position left",
                    arrow: true
                }}
                    horizontalPosition={DropdownHorizontalPosition.Left}
                    menuItems={[{
                        id: '1',
                        label: 'Menu item 1',
                        icon: (<Icon icon={IconDefinitions.star} />)
                    },
                    {
                        id: '2',
                        label: 'Menu item 2',
                        icon: (<Icon icon={IconDefinitions.cog} />)
                    },
                    {
                        id: '3',
                        label: 'Menu item 3',
                        icon: (<Icon icon={IconDefinitions.power} />)
                    }]}
                    dropdownHeader={{ content: (<>Welcome <strong>&nbsp; Guest</strong></>) }}
                />
            </div>

            <div className="mt-4">
                <Dropdown dropdownToggle={{
                    label: "Horizontal position right",
                    arrow: true
                }}
                    horizontalPosition={DropdownHorizontalPosition.Right}
                    menuItems={[{
                        id: '1',
                        label: 'Menu item 1',
                        icon: (<Icon icon={IconDefinitions.star} />)
                    },
                    {
                        id: '2',
                        label: 'Menu item 2',
                        icon: (<Icon icon={IconDefinitions.cog} />)
                    },
                    {
                        id: '3',
                        label: 'Menu item 3',
                        icon: (<Icon icon={IconDefinitions.power} />)
                    }]}
                    dropdownHeader={{ content: (<>Welcome <strong>&nbsp; Guest</strong></>) }}
                />
            </div>

            <div className="mt-4">
                <Dropdown dropdownToggle={{
                    label: "Custom content",
                    arrow: true
                }}
                    dropdownHeader={{ content: (<>Welcome <strong>&nbsp; Guest</strong></>) }}

                >
                    I am custom content. You can put stuff here as much as you like.
                </Dropdown>
            </div>

            <div className="mt-4">
                <Dropdown dropdownToggle={{
                    label: "Custom long content",
                    arrow: true
                }}
                    dropdownHeader={{ content: (<>Welcome <strong>&nbsp; Guest</strong></>) }}

                >
                    <div className="p-1">
                        I am custom content. You can put stuff here as much as you like.

                        <p>Lorem ipsum dolor sit amet. Et officiis optio eum culpa nihil ea distinctio voluptate et tenetur quam. Qui ipsa facilis vel sint impedit sit quisquam quisquam eos quod fugit. </p><p>Qui quasi ipsam cum galisum alias et temporibus sapiente et quae dignissimos est velit doloribus. Non eveniet suscipit et dolorem eligendi ut laboriosam optio. Ad blanditiis dolores est voluptas fugit At dolores iusto et nulla temporibus. </p><p>Non quia sapiente non explicabo maxime ut voluptatem autem aut asperiores quasi nam voluptatibus iusto. Cum enim eaque et sapiente consequatur quo dolorem iure aut reprehenderit maiores qui omnis nesciunt et dolores magnam? A nobis obcaecati qui omnis veritatis et magni quia et maiores repellendus! Aut laboriosam dicta non sequi modi ut quasi voluptatem ut vero aperiam. </p>
                        <p>Lorem ipsum dolor sit amet. Et officiis optio eum culpa nihil ea distinctio voluptate et tenetur quam. Qui ipsa facilis vel sint impedit sit quisquam quisquam eos quod fugit. </p><p>Qui quasi ipsam cum galisum alias et temporibus sapiente et quae dignissimos est velit doloribus. Non eveniet suscipit et dolorem eligendi ut laboriosam optio. Ad blanditiis dolores est voluptas fugit At dolores iusto et nulla temporibus. </p><p>Non quia sapiente non explicabo maxime ut voluptatem autem aut asperiores quasi nam voluptatibus iusto. Cum enim eaque et sapiente consequatur quo dolorem iure aut reprehenderit maiores qui omnis nesciunt et dolores magnam? A nobis obcaecati qui omnis veritatis et magni quia et maiores repellendus! Aut laboriosam dicta non sequi modi ut quasi voluptatem ut vero aperiam. </p>
                        <p>Lorem ipsum dolor sit amet. Et officiis optio eum culpa nihil ea distinctio voluptate et tenetur quam. Qui ipsa facilis vel sint impedit sit quisquam quisquam eos quod fugit. </p><p>Qui quasi ipsam cum galisum alias et temporibus sapiente et quae dignissimos est velit doloribus. Non eveniet suscipit et dolorem eligendi ut laboriosam optio. Ad blanditiis dolores est voluptas fugit At dolores iusto et nulla temporibus. </p><p>Non quia sapiente non explicabo maxime ut voluptatem autem aut asperiores quasi nam voluptatibus iusto. Cum enim eaque et sapiente consequatur quo dolorem iure aut reprehenderit maiores qui omnis nesciunt et dolores magnam? A nobis obcaecati qui omnis veritatis et magni quia et maiores repellendus! Aut laboriosam dicta non sequi modi ut quasi voluptatem ut vero aperiam. </p>


                    </div>

                </Dropdown>
            </div>


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
                                        icon: <Icon icon={IconDefinitions.checkmark} size={SizeDefinitions.Small} />,
                                        label: "Submenu item 1",
                                    },
                                    {
                                        id: "4",
                                        label: "Submenu item 2",
                                    },
                                    {
                                        id: "5",
                                        icon: <Icon icon={IconDefinitions.checkmark} size={SizeDefinitions.Small} />,
                                        label: "Submenu item 3",
                                    },
                                ],
                            },
                            {
                                id: '6',
                                icon: <Icon icon={IconDefinitions.checkmark} size={SizeDefinitions.Small} />,
                                label: 'Menu item 3'
                            },
                            {
                                id: '7',
                                label: 'Menu item 4'
                            },
                            {
                                id: '8',
                                icon: <Icon icon={IconDefinitions.checkmark} size={SizeDefinitions.Small} />,
                                label: 'Menu item 5'
                            }
                            ]} />,
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

            <div className="mt-4">
                <Dropdown dropdownToggle={{
                    label: "Icon",
                    arrow: true
                }}
                    menuItems={[{
                        id: '1',
                        label: 'Menu item 1',
                        icon: (<Icon icon={IconDefinitions.star} />)
                    },
                    {
                        id: '2',
                        label: 'Menu item 2',
                        icon: (<Icon icon={IconDefinitions.cog} />)
                    },
                    {
                        id: '3',
                        label: 'Menu item 3',
                        icon: (<Icon icon={IconDefinitions.power} />)
                    }]}
                    dropdownHeader={{ content: (<>Welcome <strong>&nbsp; Guest</strong></>) }}
                />
            </div>

        </section>
    )
}
export default DropdownPage;