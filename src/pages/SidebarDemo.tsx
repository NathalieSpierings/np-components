import React from "react";
import SidebarMenu, { SidebarMenuItem } from "../components/Page/Navigation/SidebarMenu/SidebarMenu";

const SidebarDemo: React.FC = () => {

    const datagridItems: SidebarMenuItem[] = [
        {
            url: "/demo/dg",
            title: "Default"
        },
        {
            url: "/demo/dg-fullheight",
            title: "Full height"
        },
        {
            url: '/demo/dg-details-and-nested-details',
            title: "Details and nested details"
        },
        {
            title: "Datagrid test",
            url: "/demo/dg-test",
        },
        {
            url: "/demo/dg-all",
            title: "All"
        },
        {
            url: "/demo/dg-checkbox",
            title: "Checkboxes"
        },
        {
            url: "/demo/dg-loading",
            title: "Loading"
        },
        {
            url: "/demo/dg-headerfooter",
            title: "Header footer content"
        },
        {
            url: "/demo/dg-nested",
            title: "Nested"
        },
        {
            url: "/demo/dg-nested-detail",
            title: "Nested with details"
        },

        {
            url: "/demo/dg-toolbar",
            title: "Toolbar"
        },
        {
            url: "/demo/dg-info",
            title: "Table info"
        },
        {
            url: "/demo/dg-sidebar",
            title: "Sidebar"
        },
        {
            url: "/demo/dg-tabs",
            title: "Tabs"
        },
        {
            url: "/demo/dg-sidebarandtabs",
            title: "Sidebar & tabs"
        },
        {
            url: "/demo/dg-pager",
            title: "Pager"
        },
        {
            title: "Column Filters",
            url: "/demo/dg-column-filter",
        },
        {
            title: "Column Pinning",
            url: "/demo/dg-column-pinning",
        },
        {
            title: "Column Reorder",
            url: "/demo/dg-column-reorder",
        },
        {
            title: "Column Resize",
            url: "/demo/dg-column-resize",
        },
        {
            title: "Column Sticky",
            url: "/demo/dg-column-sticky",
        },
        {
            title: "Column Visibility",
            url: "/demo/dg-column-sticky",
        },
        {
            title: "Row totals",
            url: "/demo/dg-total-row",
        },
        {
            title: "Row selection",
            url: "/demo/dg-selected-row",
        },
        {
            title: "Row actions",
            url: "/demo/dg-actions",
        }
    ];

    const uiItems: SidebarMenuItem[] = [
        {
            title: "Theme",
            url: "/demo/theme",
        },
        {
            title: "Layout",
            url: "/demo/layout",
        },
        {
            title: "Column Layout",
            url: "/demo/columnlayout",
        },
        {
            url: '/demo/tags',
            title: "Tags"
        },
        {
            url: '/demo/modal',
            title: "Modal"
        },
        {
            url: '/demo/btn',
            title: "Button"
        },
        {
            url: '/demo/contentitem',
            title: "Content item"
        },
        {
            url: '/demo/collection',
            title: "Collection"
        },
        {
            url: '/demo/tooltip',
            title: "Tooltip"
        },
        {
            url: '/demo/descriptionlist',
            title: "Description list"
        },
        {
            url: '/demo/dismissbutton',
            title: "Dismiss button"
        },
        {
            url: '/demo/icon',
            title: "Icons"
        },
    ];

    const formItems: SidebarMenuItem[] = [
        {
            title: "Multiselect",
            url: "/demo/multiselect",
        },
        {
            url: '/demo/dropdown',
            title: "Dropdown"
        },
        {
            url: '/demo/forms',
            title: "Form controls"
        },
    ];


    return (
        <>
            <h4>UI</h4>
            <SidebarMenu menuItems={uiItems} />


            <h4>Forms</h4>
            <SidebarMenu menuItems={formItems} />

            <h4>Datagrid</h4>
            <SidebarMenu menuItems={datagridItems} />

        </>
    )
}

export default SidebarDemo;