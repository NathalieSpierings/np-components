import React from "react";
import { useLocation } from "react-router";
import { MainLayoutSidebarContent, MainLayoutSidebarFooter } from "../components/Page/Main/MainLayoutSidebar";
import CollapsibleMenu, { CollapsibleMenuItem } from "../components/UI/CollapsibleMenu/CollapsibleMenu";
import Button from "../components/UI/Button/Button";
import { formsDemoComponents } from "./Demo/Forms/formsStories";

interface DemoLink {
    title: string;
    url: string;
}

const toMenuGroup = (id: string, title: string, links: DemoLink[]): CollapsibleMenuItem => ({
    id,
    title,
    children: links.map((link) => ({ id: `${id}:${link.url}`, title: link.title, url: link.url })),
});

const SidebarDemo: React.FC = () => {
    const { pathname } = useLocation();

    const datagridItems: DemoLink[] = [
        { title: "Default", url: "/demo/dg" },
        { title: "Details and nested details", url: "/demo/dg-details-and-nested-details" },
        { title: "Datagrid test", url: "/demo/dg-test" },
        { title: "All", url: "/demo/dg-all" },
        { title: "Checkboxes", url: "/demo/dg-checkbox" },
        { title: "Loading", url: "/demo/dg-loading" },
        { title: "Header footer content", url: "/demo/dg-headerfooter" },
        { title: "Nested", url: "/demo/dg-nested" },
        { title: "Nested with details", url: "/demo/dg-nested-detail" },
        { title: "Toolbar", url: "/demo/dg-toolbar" },
        { title: "Table info", url: "/demo/dg-info" },
        { title: "Sidebar", url: "/demo/dg-sidebar" },
        { title: "Tabs", url: "/demo/dg-tabs" },
        { title: "Sidebar & tabs", url: "/demo/dg-sidebarandtabs" },
        { title: "Pager", url: "/demo/dg-pager" },
        { title: "Column Filters", url: "/demo/dg-column-filter" },
        { title: "Column Pinning", url: "/demo/dg-column-pinning" },
        { title: "Column Reorder", url: "/demo/dg-column-reorder" },
        { title: "Column Resize", url: "/demo/dg-column-resize" },
        { title: "Column Sticky", url: "/demo/dg-column-sticky" },
        { title: "Column Visibility", url: "/demo/dg-column-visibility" },
        { title: "Row totals", url: "/demo/dg-total-row" },
        { title: "Row selection", url: "/demo/dg-selected-row" },
        { title: "Row actions", url: "/demo/dg-actions" },
    ];

    const uiItems: DemoLink[] = [
        { title: "Theme", url: "/demo/theme" },
        { title: "Art", url: "/demo/art" },
        { title: "Layout", url: "/demo/layout" },
        { title: "Tags", url: "/demo/tags" },
        { title: "Modal", url: "/demo/modal" },
        { title: "Button", url: "/demo/btn" },
        { title: "Content item", url: "/demo/contentitem" },
        { title: "Collection", url: "/demo/collection" },
        { title: "Tooltip", url: "/demo/tooltip" },
        { title: "Description list", url: "/demo/descriptionlist" },
        { title: "Dismiss button", url: "/demo/dismissbutton" },
        { title: "Icons", url: "/demo/icon" },
        { title: "Collapsible menu", url: "/demo/collapsiblemenu" },
    ];

    const formsGroup: CollapsibleMenuItem = {
        id: 'forms',
        title: 'Forms',
        children: formsDemoComponents.map((c) => ({
            id: `forms:${c.id}`,
            title: c.title,
            children: c.stories.map((s) => ({
                id: `forms:${c.id}:${s.id}`,
                title: s.title,
                url: `/demo/forms/${c.id}/${s.id}`,
            })),
        })),
    };

    const columnLayoutItems: DemoLink[] = [
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
    ];

    const panelLayoutItems: DemoLink[] = [
        { title: 'Default', url: '/demo/panellayout' },
        { title: 'Overlays', url: '/demo/panellayout-overlays' },
        { title: 'Overlay group', url: '/demo/panellayout-overlay-group' },
        { title: 'Shared header', url: '/demo/panellayout-shared-header' },
        { title: 'Controlled from outside', url: '/demo/panellayout-controlled' },
        { title: 'Always expanded', url: '/demo/panellayout-always-expanded' },
        { title: 'Mobile starts on aside', url: '/demo/panellayout-mobile-starts-on-aside' },
        { title: 'Mobile screen from outside', url: '/demo/panellayout-mobile-screen' },
        { title: 'Single aside', url: '/demo/panellayout-single-aside' },
        { title: 'Without headers', url: '/demo/panellayout-without-headers' },
        { title: 'Main only', url: '/demo/panellayout-main-only' },
    ];

    const menuItems: CollapsibleMenuItem[] = [
        toMenuGroup('columnlayout', 'Column layout', columnLayoutItems),
        toMenuGroup('panellayout', 'Panel layout', panelLayoutItems),
        toMenuGroup('ui', 'UI', uiItems),
        formsGroup,
        toMenuGroup('datagrid', 'Datagrid', datagridItems),
    ];

    // Alle bovenliggende items van de huidige pagina openklappen (op elk niveau)
    const findOpenPath = (items: CollapsibleMenuItem[], trail: string[] = []): string[] | undefined => {
        for (const item of items) {
            if (item.url === pathname) return trail;
            const found = item.children && findOpenPath(item.children, [...trail, item.id]);
            if (found) return found;
        }
        return undefined;
    };

    return (
        <>
            <MainLayoutSidebarContent>
                <CollapsibleMenu
                    items={menuItems}
                    accordion
                    defaultOpenIds={findOpenPath(menuItems) ?? []}
                />
            </MainLayoutSidebarContent>
            <MainLayoutSidebarFooter>
                <Button>Nieuw product</Button>
            </MainLayoutSidebarFooter>
        </>
    );
};

export default SidebarDemo;
