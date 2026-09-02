import React from "react";
import { matchPath } from "react-router";
import ErrorPage from "../components/Page/ErrorPage/ErrorPage";
import { proxyPrefix } from "../config";
import ButtonDemo from "./Demo/Button/ButtonDemo";
import CollectionPage from "./Demo/Collection/CollectionPage";
import ContentItemPage from "./Demo/ContentItem/ContentItemPage";
import ColumnFilterDemo from "./Demo/Datagrid/ColumnFilterDemo";
import ColumnPinningDemo from "./Demo/Datagrid/ColumnPinningDemo";
import ColumnReorderDemo from "./Demo/Datagrid/ColumnReorderDemo";
import ColumnResizeDemo from "./Demo/Datagrid/ColumnResizeDemo";
import ColumnStickyDemo from "./Demo/Datagrid/ColumnStickyDemo";
import ColumnTotalRowDemo from "./Demo/Datagrid/ColumnTotalRowDemo";
import ColumnVisibilityDemo from "./Demo/Datagrid/ColumnVisibilityDemo";
import DatagridAllDemo from "./Demo/Datagrid/DatagridAllDemo";
import DatagridCheckboxDemo from "./Demo/Datagrid/DatagridCheckboxDemo";
import DatagridDemo from "./Demo/Datagrid/DatagridDemo";
import DatagridHeaderFooterDemo from "./Demo/Datagrid/DatagridHeaderFooterDemo";
import DatagridLoadingDemo from "./Demo/Datagrid/DatagridLoadingDemo";
import DatagridNestedDemo from "./Demo/Datagrid/DatagridNestedDemo";
import DatagridNestedDetailsDemo from "./Demo/Datagrid/DatagridNestedDetailsDemo";
import DatagridPagerDemo from "./Demo/Datagrid/DatagridPagerDemo";
import DatagridRowActionsDemo from "./Demo/Datagrid/DatagridRowActionsDemo";
import DatagridSelectedRowDemo from "./Demo/Datagrid/DatagridSelectedRowDemo";
import DatagridSidebarAndTabsDemo from "./Demo/Datagrid/DatagridSidebarAndTabsDemo";
import DatagridSidebarDemo from "./Demo/Datagrid/DatagridSidebarDemo";
import DatagridTableInfoDemo from "./Demo/Datagrid/DatagridTableInfoDemo";
import DatagridTabsDemo from "./Demo/Datagrid/DatagridTabsDemo";
import DatagridToolbarDemo from "./Demo/Datagrid/DatagridToolbarDemo";
import DatagridTest from "./Demo/Datagrid/Test/DatagridTest";
import DismissButtonDemo from "./Demo/DismissButton/DismissButtonDemo";
import DropdownPage from "./Demo/Dropdown/DropdownPage";
import IconDemo from "./Demo/Icon/IconDemo";
import ModalDemo from "./Demo/Modal/ModalDemo";
import MultiselectDemo from "./Demo/Multiselect/MultiSelectDemo";
import TagsPage from "./Demo/Tags/TagsPage";
import ToolbarDemo from "./Demo/Toolbar/ToolbarDemo";
import TooltipPage from "./Demo/Tooltip/TooltipPage";
import DescriptionListDemo from "./Demo/Typography/DescriptionList";
import DemoPage from "./DemoPage";
import HomePage from "./HomePage";
import ThemePage from "./ThemePage";
import DatagridDetailsAndNestedDetailsDemo from "./Demo/Datagrid/DatagridDetailsAndNestedDetailsDemo";
import LayoutPage from "./Demo/LayoutPage";


export const getInitialMenuItem = (pathname: string) => {

	if (matchPath(proxyPrefix + '/', pathname)) {
		return 'home'
	}

	if (matchPath(proxyPrefix + '/demo/*', pathname)) {
		return "demo";
	}

	if (matchPath(proxyPrefix + '/theme/*', pathname)) {
		return "theme";
	}

	return undefined;
}


export const routes = [
	{
		path: "/",
		element: <HomePage />
	},
	{
		path: "/demo",
		element: <DemoPage />,
	},
	{
		path: "/demo/layout",
		element: <LayoutPage />
	},
	{
		path: "/demo/theme",
		element: <ThemePage />
	},
	{
		path: "/demo/tags",
		element: <TagsPage />
	},
	{
		path: '/demo/dg-details-and-nested-details',
		element: <DatagridDetailsAndNestedDetailsDemo />
	},
	{
		path: "/demo/dg-test",
		element: <DatagridTest />
	},
	{
		path: "/demo/dg-column-filter",
		element: <ColumnFilterDemo />
	},
	{
		path: "/demo/dg-column-pinning",
		element: <ColumnPinningDemo />
	},
	{
		path: "/demo/dg-column-reorder",
		element: <ColumnReorderDemo />
	},
	{
		path: "/demo/dg-column-resize",
		element: <ColumnResizeDemo />
	},
	{
		path: "/demo/dg-column-sticky",
		element: <ColumnStickyDemo />
	},
	{
		path: "/demo/dg-total-row",
		element: <ColumnTotalRowDemo />
	},

	{
		path: "/demo/dg-column-visibility",
		element: <ColumnVisibilityDemo />
	},
	{
		path: "/demo/dg-all",
		element: <DatagridAllDemo />
	},
	{
		path: "/demo/dg-checkbox",
		element: <DatagridCheckboxDemo />
	},
	{
		path: "/demo/dg",
		element: <DatagridDemo />
	},
	{
		path: "/demo/dg-headerfooter",
		element: <DatagridHeaderFooterDemo />
	},
	{
		path: "/demo/dg-loading",
		element: <DatagridLoadingDemo />
	},
	{
		path: "/demo/dg-nested",
		element: <DatagridNestedDemo />
	},
	{
		path: "/demo/dg-nested-detail",
		element: <DatagridNestedDetailsDemo />
	},
	{
		path: "/demo/dg-pager",
		element: <DatagridPagerDemo />
	},
	{
		path: "/demo/dg-actions",
		element: <DatagridRowActionsDemo />
	},
	{
		path: "/demo/dg-selected-row",
		element: <DatagridSelectedRowDemo />
	},
	{
		path: "/demo/dg-sidebarandtabs",
		element: <DatagridSidebarAndTabsDemo />
	},
	{
		path: "/demo/dg-sidebar",
		element: <DatagridSidebarDemo />
	},
	{
		path: "/demo/dg-info",
		element: <DatagridTableInfoDemo />
	},
	{
		path: "/demo/dg-tabs",
		element: <DatagridTabsDemo />
	},
	{
		path: "/demo/dg-toolbar",
		element: <DatagridToolbarDemo />
	},
	{
		path: "/demo/btn",
		element: <ButtonDemo />
	},
	{
		path: "/demo/multiselect",
		element: <MultiselectDemo />
	},
	{
		path: "/demo/modal",
		element: <ModalDemo />
	},
	{
		path: "/demo/contentitem",
		element: <ContentItemPage />
	},
	{
		path: "/demo/dropdown",
		element: <DropdownPage />
	},
	{
		path: "/demo/collection",
		element: <CollectionPage />
	},
	{
		path: "/demo/tooltip",
		element: <TooltipPage />
	},
	{
		path: "/demo/toolbar",
		element: <ToolbarDemo />
	},
	{
		path: "/demo/descriptionlist",
		element: <DescriptionListDemo />
	},
	{
		path: "/demo/dismissbutton",
		element: <DismissButtonDemo />
	},
	{
		path: "/demo/icon",
		element: <IconDemo />
	}
];


export const errorRoutes = [
	{
		path: "*",
		element: <ErrorPage />,
	},
]