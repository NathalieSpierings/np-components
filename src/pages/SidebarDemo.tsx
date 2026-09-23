import React from "react";
import SidebarMenu, { SidebarMenuItem } from "../components/Page/Navigation/SidebarMenu/SidebarMenu";

const SidebarDemo: React.FC = () => {

    const datagridItems: SidebarMenuItem[] = [
        {
            url: "/demo/dg",
            title: "Default"
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
    ];


    const columnLayoutItems: SidebarMenuItem[] = [
        { title: 'Default', url: '/demo/columnlayout' },
        { title: 'Aside left', url: '/demo/columnlayout-aside-left' },
        { title: 'Aside right', url: '/demo/columnlayout-aside-right' },
        { title: 'Mobile primary viw aside', url: '/demo/columnlayout-aside-primary' },
        { title: 'Mobile primary viw main', url: '/demo/columnlayout-main-primary' },
        { title: 'Main and aside | aside no header', url: '/demo/columnlayout-main-and-aside-aside-no-header' },
        { title: 'Main and aside | main no header', url: '/demo/columnlayout-main-and-aside-main-no-header' },
        { title: 'Main and aside | no header', url: '/demo/columnlayout-main-and-aside-no-header' },
        { title: 'Main only', url: '/demo/columnlayout-main-only' },
        { title: 'Main only | no header', url: '/demo/columnlayout-main-only-no-header' },
        { title: 'Fixed headers', url: '/demo/columnlayout-fixed-headers' },
        { title: 'Scrollable content', url: '/demo/columnlayout-scrollable' },
        { title: 'Tabs', url: '/demo/columnlayout-tabs' },
        { title: 'Toggle mobile from aside', url: '/demo/columnlayout-toggle-from-aside' },
        { title: 'Columns inside main', url: '/demo/columnlayout-columns' },
        { title: 'Columns aside scrollable', url: '/demo/columnlayout-columns-aside-scrollable' },
    ]



    return (
        <>
            <h4>Column layout</h4>
            <SidebarMenu menuItems={columnLayoutItems} />

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