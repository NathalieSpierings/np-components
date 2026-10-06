import React from "react";
import { matchPath } from "react-router";
import ErrorPage from "../components/Page/ErrorPage/ErrorPage";
import { proxyPrefix } from "../config";
import ButtonDemo from "./Demo/Button/ButtonDemo";
import CollectionPage from "./Demo/Collection/CollectionPage";
import AsideLeft from "./Demo/ColumnLayout/AsideLeft";
import AsidePrimary from "./Demo/ColumnLayout/AsidePrimary";
import AsideRight from "./Demo/ColumnLayout/AsideRight";
import ColumnLayoutPage from "./Demo/ColumnLayout/ColumnLayoutPage";
import ColumnLayoutColumnsDemo from "./Demo/ColumnLayout/Columns/ColumnLayoutColumnsDemo";
import ColumnsScrollable from "./Demo/ColumnLayout/Columns/ColumnsScroll";
import MainAndAsideAsideNoHeader from "./Demo/ColumnLayout/MainAndAsideAsideNoHeader";
import MainAndAsideMainNoHeader from "./Demo/ColumnLayout/MainAndAsideMainNoHeader";
import MainAndAsideNoHeader from "./Demo/ColumnLayout/MainAndAsideNoHeader";
import MainAndAsideWithHeader from "./Demo/ColumnLayout/MainAndAsideWithHeader";
import MainOnly from "./Demo/ColumnLayout/MainOnly";
import MainOnlyNoHeader from "./Demo/ColumnLayout/MainOnlyNoHeader";
import MainPrimary from "./Demo/ColumnLayout/MainPrimary";
import ColumnLayoutToggleFromAsideDemo from "./Demo/ColumnLayout/ToggleFromAside";
import WithTabs from "./Demo/ColumnLayout/WithTabs";
import ContentItemPage from "./Demo/ContentItem/ContentItemPage";
import ColumnFilterDemo from "./Demo/Datagrid/ColumnFilterDemo";
import ColumnPinningDemo from "./Demo/Datagrid/ColumnPinningDemo";
import ColumnReorderDemo from "./Demo/Datagrid/ColumnReorderDemo";
import ColumnResizeDemo from "./Demo/Datagrid/ColumnResizeDemo";
import ColumnStickyDemo from "./Demo/Datagrid/ColumnStickyDemo";
import ColumnTotalRowDemo from "./Demo/Datagrid/ColumnTotalRowDemo";
import ColumnVisibilityDemo from "./Demo/Datagrid/ColumnVisibilityDemo";
import DatagridCheckboxDemo from "./Demo/Datagrid/DatagridCheckboxDemo";
import DatagridDemo from "./Demo/Datagrid/DatagridDemo";
import DatagridDetailsAndNestedDetailsDemo from "./Demo/Datagrid/DatagridDetailsAndNestedDetailsDemo";
import DatagridExternalFilterDemo from "./Demo/Datagrid/DatagridExternalFilterDemo";
import DatagridHeaderFooterDemo from "./Demo/Datagrid/DatagridHeaderFooterDemo";
import DatagridHeightDemo from "./Demo/Datagrid/DatagridHeightDemo";
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
import DismissButtonDemo from "./Demo/DismissButton/DismissButtonDemo";
import DropdownPage from "./Demo/Dropdown/DropdownPage";
import FormsDemo from "./Demo/Forms/FormsDemo";
import IconDemo from "./Demo/Icon/IconDemo";
import LayoutPage from "./Demo/LayoutPage";
import ModalDemo from "./Demo/Modal/ModalDemo";
import MultiselectDemo from "./Demo/Multiselect/MultiSelectDemo";
import TagsPage from "./Demo/Tags/TagsPage";
import ToolbarDemo from "./Demo/Toolbar/ToolbarDemo";
import TooltipPage from "./Demo/Tooltip/TooltipPage";
import DescriptionListDemo from "./Demo/Typography/DescriptionList";
import DemoPage from "./DemoPage";
import HomePage from "./HomePage";
import ThemePage from "./ThemePage";
import DatagridSearchDemo from "./Demo/Datagrid/DatagridSearchDemo";
import DatagridExternalFilterToolbarDemo from "./Demo/Datagrid/DatagridExternalFilterToolbarDemo";
import DatagridExternalFilterCustomDemo from "./Demo/Datagrid/DatagridExternalFilterCustomDemo";
import AvatarDemo from "./Demo/UI/AvatarDemo";


export const getInitialMenuItem = (pathname: string) => {

	if (matchPath(proxyPrefix + '/', pathname)) {
		return 'home'
	}

	if (matchPath(proxyPrefix + "/demo/*", pathname)) {
		return "demo";
	}

	return undefined;
}

const routesLayout = [

]

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
		path: "/demo/columnlayout",
		element: <ColumnLayoutPage />
	},
	{
		path: "/demo/columnlayout-aside-left",
		element: <AsideLeft />
	},
	{
		path: "/demo/columnlayout-aside-primary",
		element: <AsidePrimary />
	},
	{
		path: "/demo/columnlayout-aside-right",
		element: <AsideRight />
	},
	{
		path: "/demo/columnlayout-main-and-aside-aside-no-header",
		element: <MainAndAsideAsideNoHeader />
	},
	{
		path: "/demo/columnlayout-main-and-aside-main-no-header",
		element: <MainAndAsideMainNoHeader />
	},
	{
		path: "/demo/columnlayout-main-and-aside-no-header",
		element: <MainAndAsideNoHeader />
	},
	{
		path: "/demo/columnlayout",
		element: <MainAndAsideWithHeader />
	},
	{
		path: "/demo/columnlayout-main-only",
		element: <MainOnly />
	},
	{
		path: "/demo/columnlayout-main-only-no-header",
		element: <MainOnlyNoHeader />
	},
	{
		path: "/demo/columnlayout-main-primary",
		element: <MainPrimary />
	},
	{
		path: "/demo/columnlayout-tabs",
		element: <WithTabs />
	},
	{
		path: "/demo/columnlayout-toggle-from-aside",
		element: <ColumnLayoutToggleFromAsideDemo />
	},
	{
		path: "/demo/columnlayout-columns",
		element: <ColumnLayoutColumnsDemo />
	},
	{
		path: "/demo/columnlayout-columns-aside-scrollable",
		element: <ColumnsScrollable />
	},
	{
		path: "/demo/theme",
		element: <ThemePage />
	},
	{
		path: "/demo/forms",
		element: <FormsDemo />
	},
	{
		path: "/demo/tags",
		element: <TagsPage />
	},
	// Datagrid
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
		path: "/demo/dg-checkbox",
		element: <DatagridCheckboxDemo />
	},
	{
		path: "/demo/dg",
		element: <DatagridDemo />
	},
	{
		path: '/demo/dg-details-and-nested-details',
		element: <DatagridDetailsAndNestedDetailsDemo />
	},	
	{
		path: "/demo/dg-filters-external",
		element: <DatagridExternalFilterDemo />
	},
	{
		path: "/demo/dg-filters-external-toolbar",
		element: <DatagridExternalFilterToolbarDemo />
	},
	{
		path: "/demo/dg-filters-external-custom",
		element: <DatagridExternalFilterCustomDemo />
	},
	{
		path: "/demo/dg-headerfooter",
		element: <DatagridHeaderFooterDemo />
	},
	{
		path: "/demo/dg-fullheight",
		element: <DatagridHeightDemo />
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
		path: "/demo/dg-global-search",
		element: <DatagridSearchDemo />
	},
	// Forms
	{
		path: "/demo/btn",
		element: <ButtonDemo />
	},
	{
		path: "/demo/multiselect",
		element: <MultiselectDemo />
	},
	// UI
	{
		path: "/demo/modal",
		element: <ModalDemo />
	},
	{
		path: "/demo/avatar",
		element: <AvatarDemo />
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
	},


];


export const errorRoutes = [
	{
		path: "*",
		element: <ErrorPage />,
	},
]