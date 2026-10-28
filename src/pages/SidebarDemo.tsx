import React from "react";
import { useLocation } from "react-router";
import { MainLayoutSidebarContent, MainLayoutSidebarFooter } from "../components/Page/Main/MainLayoutSidebar";
import CollapsibleMenu, { CollapsibleMenuItem } from "../components/Page/Navigation/CollapsibleMenu/CollapsibleMenu";
import Button from "../components/UI/Button/Button";
import { formsDemoComponents } from "./Demo/Forms/formsStories";
import { DemoComponent } from "./Demo/Stories/storyRegistry";
import { uiDemoComponents } from "./Demo/UI/uiStories";
import { pageDemoComponents } from "./Demo/Page/pageStories";
import { dataDemoComponents } from "./Demo/Data/dataStories";

interface DemoLink {
    title: string;
    url: string;
}

const toMenuGroup = (id: string, title: string, links: DemoLink[]): CollapsibleMenuItem => ({
    id,
    title,
    children: links.map((link) => ({ id: `${id}:${link.url}`, title: link.title, url: link.url })),
});

/** Menu voor componenten uit Storybook: Overview, eventuele extra items, daarna component > story. */
const toStoriesMenu = (
    prefix: string,
    basePath: string,
    components: DemoComponent[],
    extraItems: CollapsibleMenuItem[] = [],
): CollapsibleMenuItem[] => [
    { id: `${prefix}:overview`, title: 'Overview', url: `${basePath}/overview` },
    ...extraItems,
    ...components.map((c) => ({
        id: `${prefix}:${c.id}`,
        title: c.title,
        children: c.stories.map((s) => ({
            id: `${prefix}:${c.id}:${s.id}`,
            title: s.title,
            url: `${basePath}/${c.id}/${s.id}`,
        })),
    })),
];

const SidebarDemo: React.FC = () => {
    const { pathname } = useLocation();

    const dataGroup: CollapsibleMenuItem = {
        id: 'data',
        title: 'Data',
        children: toStoriesMenu('data', '/demo/data', dataDemoComponents),
    };

    const formsGroup: CollapsibleMenuItem = {
        id: 'forms',
        title: 'Forms',
        children: toStoriesMenu('forms', '/demo/forms', formsDemoComponents),
    };

    const pageGroup: CollapsibleMenuItem = {
        id: 'page',
        title: 'Page',
        children: toStoriesMenu('page', '/demo/page', pageDemoComponents),
    };

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

    const uiGroup: CollapsibleMenuItem = {
        id: 'ui',
        title: 'UI',
        children: toStoriesMenu('ui', '/demo/ui', uiDemoComponents, [
            { id: 'ui:art', title: 'Art', url: '/demo/art' },
            { id: 'ui:theme', title: 'Theme', url: '/demo/theme' },
            toMenuGroup('ui:panellayout', 'Panel layout', panelLayoutItems),
            toMenuGroup('ui:columnlayout', 'Column layout', columnLayoutItems),
        ]),
    };

    const menuItems: CollapsibleMenuItem[] = [
        uiGroup,
        formsGroup,
        pageGroup,
        dataGroup,
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
