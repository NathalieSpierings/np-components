import React from "react";
import Dropdown, { DropdownHorizontalPosition, DropdownVerticalPosition } from "../../../components/Forms/Dropdown/Dropdown";
import DropdownMenu from "../../../components/Forms/Dropdown/DropdownMenu";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import Icon from "../../../components/UI/Icons/Icon/Icon";



const DropdownPage: React.FC = () => {

    const handleMenuItemClick = (item: string) => {
        console.log(`${item} clicked`);
    };

    return (
        <section className="centered centered--wide">
            <p> Welcome to the dropdown demo page</p>

            <h3>Default</h3>
            <Dropdown
                dropdownToggle={{
                    label: "Click me!",
                    arrow: true
                }}
                menuItems={[
                    {
                        id: "1",
                        label: "Menu item 1",
                        onClick: () => handleMenuItemClick("Menu item 1")
                    },
                    {
                        id: "2",
                        label: "Menu item 2",
                        onClick: () => handleMenuItemClick("Menu item 2")
                    },
                    {
                        id: "3",
                        label: "Menu item 3",
                        onClick: () => handleMenuItemClick("Menu item 3")
                    }
                ]}
            />

            <div className="mt-4">
                <Dropdown dropdownToggle={{
                    label: "Long menu",
                    arrow: true
                }}
                    verticalPosition={DropdownVerticalPosition.Up}
                    menuItems={[
                        {
                            id: "1",
                            label: "Menu item 1",
                            onClick: () => handleMenuItemClick("Menu item 1")
                        },
                        {
                            id: "2",
                            label: "Menu item 2",
                            onClick: () => handleMenuItemClick("Menu item 2")
                        },
                        {
                            id: "3",
                            label: "Menu item 3",
                            onClick: () => handleMenuItemClick("Menu item 3")
                        },
                        {
                            id: '4',
                            label: 'Menu item 4',
                            onClick: () => handleMenuItemClick("Menu item 4")
                        },
                        {
                            id: '5',
                            label: 'Menu item 5',
                            onClick: () => handleMenuItemClick("Menu item 5")
                        },
                        {
                            id: '6',
                            label: 'Menu item 6',
                            onClick: () => handleMenuItemClick("Menu item 6")
                        },
                        {
                            id: '7',
                            label: 'Menu item 7',
                            onClick: () => handleMenuItemClick("Menu item 7")
                        },
                        {
                            id: '8',
                            label: 'Menu item 8',
                            onClick: () => handleMenuItemClick("Menu item 8")
                        },
                        {
                            id: '9',
                            label: 'Menu item 9',
                            onClick: () => handleMenuItemClick("Menu item 9")
                        },
                        {
                            id: '10',
                            label: 'Menu item 10',
                            onClick: () => handleMenuItemClick("Menu item 10")
                        },
                        {
                            id: '11',
                            label: 'Menu item 11',
                            onClick: () => handleMenuItemClick("Menu item 11")
                        },
                        {
                            id: '12',
                            label: 'Menu item 12',
                            onClick: () => handleMenuItemClick("Menu item 12")
                        },
                        {
                            id: '13',
                            label: 'Menu item 13',
                            onClick: () => handleMenuItemClick("Menu item 13")
                        },
                        {
                            id: '14',
                            label: 'Menu item 14',
                            onClick: () => handleMenuItemClick("Menu item 14")
                        },
                    ]}
                    dropdownHeader={{ content: (<>Welcome <strong>&nbsp; Guest</strong></>) }}
                />
            </div>

            <div className="mt-4">
                <h3>Background</h3>
                <Dropdown
                    background={ColorDefinitions.Blue}
                    dropdownToggle={{
                        label: "Click me!",
                        arrow: true
                    }}
                    menuItems={[
                        {
                            id: "1",
                            label: "Menu item 1",
                            onClick: () => handleMenuItemClick("Menu item 1")
                        },
                        {
                            id: "2",
                            label: "Menu item 2",
                            onClick: () => handleMenuItemClick("Menu item 2")
                        },
                        {
                            id: "3",
                            label: "Menu item 3",
                            onClick: () => handleMenuItemClick("Menu item 3")
                        }
                    ]}
                />

            </div>

            <div className="mt-4">
                <h3>Vertical position up</h3>

                <Dropdown dropdownToggle={{
                    label: "Click me!",
                    arrow: true
                }}
                    verticalPosition={DropdownVerticalPosition.Up}
                    menuItems={[{
                        id: '1',
                        label: 'Menu item 1',
                        icon: (<Icon icon={IconDefinitions.star} />),
                        onClick: () => handleMenuItemClick("Menu item 1")
                    },
                    {
                        id: '2',
                        label: 'Menu item 2',
                        icon: (<Icon icon={IconDefinitions.cog} />),
                        onClick: () => handleMenuItemClick("Menu item 2")
                    },
                    {
                        id: '3',
                        label: 'Menu item 3',
                        icon: (<Icon icon={IconDefinitions.power} />),
                        onClick: () => handleMenuItemClick("Menu item 3")
                    }]}
                    dropdownHeader={{ content: (<>Welcome <strong>&nbsp; Guest</strong></>) }}
                />
            </div>

            <div className="mt-4">
                <h3>Vertical position down</h3>
                <Dropdown dropdownToggle={{
                    label: "Click me!",
                    arrow: true
                }}
                    verticalPosition={DropdownVerticalPosition.Down}
                    menuItems={[{
                        id: '1',
                        label: 'Menu item 1',
                        icon: (<Icon icon={IconDefinitions.star} />),
                         onClick: () => handleMenuItemClick("Menu item 1")
                    },
                    {
                        id: '2',
                        label: 'Menu item 2',
                        icon: (<Icon icon={IconDefinitions.cog} />),
                         onClick: () => handleMenuItemClick("Menu item 2")
                    },
                    {
                        id: '3',
                        label: 'Menu item 3',
                        icon: (<Icon icon={IconDefinitions.power} />),
                         onClick: () => handleMenuItemClick("Menu item 3")
                    }]}
                    dropdownHeader={{ content: (<>Welcome <strong>&nbsp; Guest</strong></>) }}
                />
            </div>

            <div className="mt-4">
                <h3>Horizontal position left</h3>
                <Dropdown dropdownToggle={{
                    label: "Click me!",
                    arrow: true
                }}
                    horizontalPosition={DropdownHorizontalPosition.Left}
                    menuItems={[{
                        id: '1',
                        label: 'Menu item 1',
                        icon: (<Icon icon={IconDefinitions.star} />),
                         onClick: () => handleMenuItemClick("Menu item 1")
                    },
                    {
                        id: '2',
                        label: 'Menu item 2',
                        icon: (<Icon icon={IconDefinitions.cog} />),
                         onClick: () => handleMenuItemClick("Menu item 2")
                    },
                    {
                        id: '3',
                        label: 'Menu item 3',
                        icon: (<Icon icon={IconDefinitions.power} />),
                         onClick: () => handleMenuItemClick("Menu item 3")
                    }]}
                    dropdownHeader={{ content: (<>Welcome <strong>&nbsp; Guest</strong></>) }}
                />
            </div>

            <div className="mt-4">
                <h3>Horizontal position right</h3>
                <Dropdown dropdownToggle={{
                    label: "Click me!",
                    arrow: true
                }}
                    horizontalPosition={DropdownHorizontalPosition.Right}
                    menuItems={[{
                        id: '1',
                        label: 'Menu item 1',
                        icon: (<Icon icon={IconDefinitions.star} />),
                         onClick: () => handleMenuItemClick("Menu item 1")
                    },
                    {
                        id: '2',
                        label: 'Menu item 2',
                        icon: (<Icon icon={IconDefinitions.cog} />),
                         onClick: () => handleMenuItemClick("Menu item 2")
                    },
                    {
                        id: '3',
                        label: 'Menu item 3',
                        icon: (<Icon icon={IconDefinitions.power} />),
                         onClick: () => handleMenuItemClick("Menu item 3")
                    }]}
                    dropdownHeader={{ content: (<>Welcome <strong>&nbsp; Guest</strong></>) }}
                />
            </div>

            <div className="mt-4">
                <h3>Custom content</h3>
                <Dropdown dropdownToggle={{
                    label: "Click me!",
                    arrow: true
                }}
                    dropdownHeader={{ content: (<>Welcome <strong>&nbsp; Guest</strong></>) }}

                >
                    I am custom content. You can put stuff here as much as you like.
                </Dropdown>
            </div>

            <div className="mt-4">
                <h3>Custom long content</h3>
                <Dropdown dropdownToggle={{
                    label: "Click me!",
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
                <h3>With header</h3>
                <Dropdown dropdownToggle={{
                    label: "Click me!",
                    arrow: true
                }}
                    menuItems={[
                        {
                            id: "1",
                            label: "Menu item 1",
                            onClick: () => handleMenuItemClick("Menu item 1")
                        },
                        {
                            id: "2",
                            label: "Menu item 2",
                            onClick: () => handleMenuItemClick("Menu item 2")
                        },
                        {
                            id: "3",
                            label: "Menu item 3",
                            onClick: () => handleMenuItemClick("Menu item 3")
                        }
                    ]}
                    dropdownHeader={{ content: (<>Welcome <strong>&nbsp; Guest</strong></>) }}
                />
            </div>

            <div className="mt-4">
                <h3>With header and border</h3>
                <Dropdown dropdownToggle={{
                    label: "Click me!",
                    arrow: true
                }}
                    menuItems={[
                        {
                            id: "1",
                            label: "Menu item 1",
                            onClick: () => handleMenuItemClick("Menu item 1")
                        },
                        {
                            id: "2",
                            label: "Menu item 2",
                            onClick: () => handleMenuItemClick("Menu item 2")
                        },
                        {
                            id: "3",
                            label: "Menu item 3",
                            onClick: () => handleMenuItemClick("Menu item 3")
                        }
                    ]}
                    dropdownHeader={{ content: (<>Welcome <strong>&nbsp; Guest</strong></>), border: true }}
                />
            </div>

            <div className="mt-4">
                <h3>With footer</h3>
                <Dropdown dropdownToggle={{
                    label: "Click me!",
                    arrow: true
                }}
                    menuItems={[
                        {
                            id: "1",
                            label: "Menu item 1",
                            onClick: () => handleMenuItemClick("Menu item 1")
                        },
                        {
                            id: "2",
                            label: "Menu item 2",
                            onClick: () => handleMenuItemClick("Menu item 2")
                        },
                        {
                            id: "3",
                            label: "Menu item 3",
                            onClick: () => handleMenuItemClick("Menu item 3")
                        }
                    ]}
                    dropdownFooter={{ content: (<>Footer content...</>) }}
                />
            </div>

            <div className="mt-4">
                <h3>With footer and border</h3>
                <Dropdown dropdownToggle={{
                    label: "Click me!",
                    arrow: true
                }}
                    menuItems={[
                        {
                            id: "1",
                            label: "Menu item 1",
                            onClick: () => handleMenuItemClick("Menu item 1")
                        },
                        {
                            id: "2",
                            label: "Menu item 2",
                            onClick: () => handleMenuItemClick("Menu item 2")
                        },
                        {
                            id: "3",
                            label: "Menu item 3",
                            onClick: () => handleMenuItemClick("Menu item 3")
                        }
                    ]}
                    dropdownFooter={{ content: (<>Footer content...</>), border: true }}
                />
            </div>

            <div className="mt-4">
                <h3>With header and footer</h3>
                <Dropdown dropdownToggle={{
                    label: "Click me!",
                    arrow: true
                }}
                    menuItems={[
                        {
                            id: "1",
                            label: "Menu item 1",
                            onClick: () => handleMenuItemClick("Menu item 1")
                        },
                        {
                            id: "2",
                            label: "Menu item 2",
                            onClick: () => handleMenuItemClick("Menu item 2")
                        },
                        {
                            id: "3",
                            label: "Menu item 3",
                            onClick: () => handleMenuItemClick("Menu item 3")
                        }
                    ]}
                    dropdownHeader={{ content: (<>Welcome <strong>&nbsp; Guest</strong></>), border: true }}
                    dropdownFooter={{ content: (<>Footer content...</>), border: true }}
                />
            </div>

            <div className="mt-4">
                <h3>With search</h3>
                <Dropdown dropdownToggle={{
                    label: "Click me!",
                    arrow: true
                }}
                    menuItems={[
                        {
                            id: "1",
                            label: "Menu item 1",
                            onClick: () => handleMenuItemClick("Menu item 1")
                        },
                        {
                            id: "2",
                            label: "Menu item 2",
                            onClick: () => handleMenuItemClick("Menu item 2")
                        },
                        {
                            id: "3",
                            label: "Menu item 3",
                            onClick: () => handleMenuItemClick("Menu item 3")
                        }
                    ]}
                    enableSearch
                />
            </div>

            <div className="mt-4">
                <h3>With search and border</h3>
                <Dropdown
                    dropdownToggle={{
                        label: "Click me!",
                        arrow: true
                    }}
                    menuItems={[
                        {
                            id: "1",
                            label: "Menu item 1",
                            onClick: () => handleMenuItemClick("Menu item 1")
                        },
                        {
                            id: "2",
                            label: "Menu item 2",
                            onClick: () => handleMenuItemClick("Menu item 2")
                        },
                        {
                            id: "3",
                            label: "Menu item 3",
                            onClick: () => handleMenuItemClick("Menu item 3")
                        }
                    ]}
                    enableSearch
                    searchBorder
                />
            </div>

            <div className="mt-4">
                <h3>With header and search</h3>
                <Dropdown dropdownToggle={{
                    label: "Click me!",
                    arrow: true
                }}
                    menuItems={[
                        {
                            id: "1",
                            label: "Menu item 1",
                            onClick: () => handleMenuItemClick("Menu item 1")
                        },
                        {
                            id: "2",
                            label: "Menu item 2",
                            onClick: () => handleMenuItemClick("Menu item 2")
                        },
                        {
                            id: "3",
                            label: "Menu item 3",
                            onClick: () => handleMenuItemClick("Menu item 3")
                        }
                    ]}
                    dropdownHeader={{
                        content: (<>Welcome <strong>&nbsp; Guest</strong></>),
                        border: true
                    }}
                    enableSearch
                />
            </div>

            <div className="mt-4">
                <h3>Tabs dropdown</h3>
                <Dropdown dropdownToggle={{
                    label: "Click me!",
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
                                label: 'Menu item 1',
                                 onClick: () => handleMenuItemClick("Menu item 3")
                            },
                            {
                                id: "2",
                                label: "Menu item 2",
                                items: [
                                    {
                                        id: "3",
                                        icon: <Icon icon={IconDefinitions.checkmark} size={SizeDefinitions.Small} />,
                                        label: "Submenu item 1",
                                         onClick: () => handleMenuItemClick("Submenu item 1")
                                    },
                                    {
                                        id: "4",
                                        label: "Submenu item 2",
                                         onClick: () => handleMenuItemClick("Submenu item 2")
                                    },
                                    {
                                        id: "5",
                                        icon: <Icon icon={IconDefinitions.checkmark} size={SizeDefinitions.Small} />,
                                        label: "Submenu item 3",
                                         onClick: () => handleMenuItemClick("Submenu item 3")
                                    },
                                ],
                            },
                            {
                                id: '6',
                                icon: <Icon icon={IconDefinitions.checkmark} size={SizeDefinitions.Small} />,
                                label: 'Menu item 3',
                                 onClick: () => handleMenuItemClick("Menu item 3")
                            },
                            {
                                id: '7',
                                label: 'Menu item 4',
                                 onClick: () => handleMenuItemClick("Menu item 4")
                            },
                            {
                                id: '8',
                                icon: <Icon icon={IconDefinitions.checkmark} size={SizeDefinitions.Small} />,
                                label: 'Menu item 5',
                                 onClick: () => handleMenuItemClick("Menu item 5")
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
                <h3>Tabs with search</h3>
                <Dropdown
                    dropdownToggle={{
                        label: "Click me!",
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
                                    label: "Menu item 1",
                                     onClick: () => handleMenuItemClick("Menu item 1")
                                },
                                {
                                    id: "2",
                                    label: "Menu item 2",
                                     onClick: () => handleMenuItemClick("Menu item 2"),
                                    items: [
                                        {
                                            id: "3",
                                            label: "Submenu item 1",
                                             onClick: () => handleMenuItemClick("Submenu item 1")
                                        },
                                        {
                                            id: "4",
                                            label: "Submenu item 2",
                                             onClick: () => handleMenuItemClick("Submenu item 2")
                                        },
                                    ],
                                },
                                {
                                    id: "7",
                                    label: "Menu item 3",
                                     onClick: () => handleMenuItemClick("Menu item 3")
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
                <h3>Multilevel menu dropdown</h3>
                <Dropdown dropdownToggle={{
                    label: "Click me!",
                    arrow: true
                }}
                    menuItems={[{
                        id: '1',
                        label: 'Menu item 1',
                        onClick: () => handleMenuItemClick("Menu item 1")
                    },
                    {
                        id: "2",
                        label: "Menu item 2",
                        onClick: () => handleMenuItemClick("Menu item 2"),
                        items: [
                            {
                                id: "3",
                                label: "Submenu item 1",
                                onClick: () => handleMenuItemClick("Submenu item 1")
                            },
                            {
                                id: "4",
                                label: "Submenu item 2", 
                                onClick: () => handleMenuItemClick("Submenu item 2"),
                                items: [
                                    {
                                        id: "5",
                                        label: "Sub submenu item 1", 
                                        onClick: () => handleMenuItemClick("Sub submenu item 1")
                                    },
                                    {
                                        id: "6",
                                        label: "Sub submenu item 2",
                                         onClick: () => handleMenuItemClick("Sub submenu item 2")
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: '7',
                        label: 'Menu item 3',
                         onClick: () => handleMenuItemClick("Menu item 3")
                    }]}
                />
            </div>

            <div className="mt-4">
                <h3>Multilevel menu and search</h3>
                <Dropdown
                    dropdownToggle={{
                        label: "Click me!",
                        arrow: true
                    }}
                    menuItems={[{
                        id: '1',
                        label: 'Menu item 1',
                        onClick: () => handleMenuItemClick("Menu item 1")
                    },
                    {
                        id: "2",
                        label: "Settings",
                        onClick: () => handleMenuItemClick("Settings"),
                        items: [
                            {
                                id: "3",
                                label: "Account",
                                onClick: () => handleMenuItemClick("Account")
                            },
                            {
                                id: "4",
                                label: "Profile",
                                onClick: () => handleMenuItemClick("Profile"),
                                items: [
                                    {
                                        id: "5",
                                        label: "Address",
                                        onClick: () => handleMenuItemClick("Address")
                                    },
                                    {
                                        id: "6",
                                        label: "Notifications",
                                        onClick: () => handleMenuItemClick("Notifications")
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: '7',
                        label: 'Menu item 3'
                    }]}
                    dropdownHeader={{ content: (<>Welcome <strong>&nbsp; Guest</strong></>), border: true }}
                    enableSearch
                />
            </div>

            <div className="mt-4">
                <h3>With icon</h3>
                <Dropdown
                    dropdownToggle={{
                        label: (<Icon icon={IconDefinitions.user} />),
                        arrow: false
                    }}
                    menuItems={[{
                        id: '1',
                        label: 'Menu item 1',
                        icon: (<Icon icon={IconDefinitions.star} />),
                        onClick: () => handleMenuItemClick("Menu item 1")
                    },
                    {
                        id: '2',
                        label: 'Menu item 2',
                        icon: (<Icon icon={IconDefinitions.cog} />),
                        onClick: () => handleMenuItemClick("Menu item 2")
                    },
                    {
                        id: '3',
                        label: 'Menu item 3',
                        icon: (<Icon icon={IconDefinitions.power} />),
                        onClick: () => handleMenuItemClick("Menu item 3")
                    }]}
                    dropdownHeader={{ content: (<>Welcome <strong>&nbsp; Guest</strong></>) }}
                />
            </div>

        </section>
    )
}
export default DropdownPage;