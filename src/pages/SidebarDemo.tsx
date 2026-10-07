import React from "react";
import SidebarMenu, { SidebarMenuItem } from "../components/Page/Navigation/SidebarMenu/SidebarMenu";
import SidebarContentPanel from "../components/Page/Sidebar/SidebarContentPanel/SidebarContentPanel";

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
            url: "/demo/dg-headerfooter",
            title: "Header footer content"
        },
        {
            url: "/demo/dg-toolbar",
            title: "Toolbar"
        },
        {
            url: "/demo/dg-loading",
            title: "Loading"
        },
        {
            title: "Row totals",
            url: "/demo/dg-total-row",
        },
         {
            url: "/demo/dg-pager",
            title: "Pager"
        },
        {
            title: "Global search",
            url: "/demo/dg-global-search",
        },
        {
            title: "External filters (infotoolbar)",
            url: "/demo/dg-filters-external",
        },
        {
            title: "External filters (toolbar)",
            url: "/demo/dg-filters-external-toolbar",
        },
        {
            title: "External filters (custom)",
            url: "/demo/dg-filters-external-custom",
        },
        {
            title: "Column Filters",
            url: "/demo/dg-column-filter",
        },
        {
            title: "Column Filter Array",
            url: "/demo/dg-column-filter-array",
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
            title: "Column Visibility",
            url: "/demo/dg-column-sticky",
        },
        {
            title: "Header Sticky",
            url: "/demo/dg-column-sticky",
        },       

        // Actions
        {
            url: "/demo/dg-checkbox",
            title: "Checkboxes"
        },
        {
            url: "/demo/dg-info",
            title: "Table info"
        },
         {
            title: "Row selection",
            url: "/demo/dg-selected-row",
        },
         {
            title: "Row actions",
            url: "/demo/dg-actions",
        },
        // Nested
        {
            url: "/demo/dg-details-and-nested-details",
            title: "Details & Nested with details"
        },      
        {
            url: "/demo/dg-nested",
            title: "Nested"
        },
        {
            url: "/demo/dg-nested-detail",
            title: "Nested with details"
        },
       
        // Tabs & Sidebar
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
    ];


    const uiItems: SidebarMenuItem[] = [
        {
            title: "Theme",
            url: "/demo/theme",
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
            url: '/demo/avatar',
            title: "Avatar"
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

    const layoutItems: SidebarMenuItem[] = [
        {
            title: "Layout",
            url: "/demo/layout",
        },
        {
            title: "Column Layout",
            url: "/demo/columnlayout",
        },
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
        { title: 'Tabs', url: '/demo/columnlayout-tabs' },
        { title: 'Toggle mobile from aside', url: '/demo/columnlayout-toggle-from-aside' },
        { title: 'Columns inside main', url: '/demo/columnlayout-columns' },
        { title: 'Columns aside scrollable', url: '/demo/columnlayout-columns-aside-scrollable' },
    ]


    return (
        <>
            <SidebarContentPanel>
                <h4>Layout</h4>
            </SidebarContentPanel>
            <SidebarMenu menuItems={layoutItems} />

            <SidebarContentPanel>
                <h4>UI elements</h4>
            </SidebarContentPanel>
            <SidebarMenu menuItems={uiItems} />

            <SidebarContentPanel>
                <h4>Form elements</h4>
            </SidebarContentPanel>
            <SidebarMenu menuItems={formItems} />

            <SidebarContentPanel>
                <h4>Datagrid</h4>
            </SidebarContentPanel>
            <SidebarMenu menuItems={datagridItems} />

        </>
    )
}

export default SidebarDemo;