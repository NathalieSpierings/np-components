import React from "react";
import { matchPath } from "react-router";
import ErrorPage from "../components/Page/ErrorPage/ErrorPage";
import { proxyPrefix } from "../config";
import ColumnFilterDemo from "./Demo/Datagrid/ColumnFilterDemo";
import ColumnPinningDemo from "./Demo/Datagrid/ColumnPinningDemo";
import ColumnReorderDemo from "./Demo/Datagrid/ColumnReorderDemo";
import ColumnResizeDemo from "./Demo/Datagrid/ColumnResizeDemo";
import ColumnStickyDemo from "./Demo/Datagrid/ColumnStickyDemo";
import ColumnTotalRowDemo from "./Demo/Datagrid/ColumnTotalRowDemo";
import ColumnVisibilityDemo from "./Demo/Datagrid/ColumnVisibilityDemo";
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
import DropdownPage from "./Demo/Forms/Dropdown/DropdownPage";
import MultiselectDemo from "./Demo/Forms/Multiselect/MultiSelectDemo";
import ToolbarDemo from "./Demo/UI/Toolbar/ToolbarDemo";
import PanelLayoutDefault from "./Demo/UI/PanelLayout/PanelLayoutDefault";
import PanelLayoutOverlays from "./Demo/UI/PanelLayout/PanelLayoutOverlays";
import PanelLayoutOverlayGroup from "./Demo/UI/PanelLayout/PanelLayoutOverlayGroup";
import PanelLayoutSharedHeader from "./Demo/UI/PanelLayout/PanelLayoutSharedHeader";
import PanelLayoutControlled from "./Demo/UI/PanelLayout/PanelLayoutControlled";
import PanelLayoutAlwaysExpanded from "./Demo/UI/PanelLayout/PanelLayoutAlwaysExpanded";
import PanelLayoutMobileStartsOnAside from "./Demo/UI/PanelLayout/PanelLayoutMobileStartsOnAside";
import PanelLayoutMobileScreen from "./Demo/UI/PanelLayout/PanelLayoutMobileScreen";
import PanelLayoutSingleAside from "./Demo/UI/PanelLayout/PanelLayoutSingleAside";
import PanelLayoutWithoutHeaders from "./Demo/UI/PanelLayout/PanelLayoutWithoutHeaders";
import PanelLayoutMainOnly from "./Demo/UI/PanelLayout/PanelLayoutMainOnly";
import FormsDemoPage from "./Demo/Forms/FormsDemoPage";
import FormsOverviewPage from "./Demo/Forms/FormsOverviewPage";
import UiDemoPage from "./Demo/UI/UiDemoPage";
import UiOverviewPage from "./Demo/UI/UiOverviewPage";
import PageDemoPage from "./Demo/Page/PageDemoPage";
import PageOverviewPage from "./Demo/Page/PageOverviewPage";
import DemoPage from "./DemoPage";
import HomePage from "./HomePage";
import ThemePage from "./ThemePage";
import DatagridDetailsAndNestedDetailsDemo from "./Demo/Datagrid/DatagridDetailsAndNestedDetailsDemo";
import ColumnsScrollable from "./Demo/UI/ColumnLayout/Columns/ColumnsScroll";
import ColumnLayoutColumnsDemo from "./Demo/UI/ColumnLayout/Columns/ColumnLayoutColumnsDemo";
import ColumnLayoutToggleFromAsideDemo from "./Demo/UI/ColumnLayout/ToggleFromAside";
import WithTabs from "./Demo/UI/ColumnLayout/WithTabs";
import Scrollable from "./Demo/UI/ColumnLayout/Scrollable";
import MainPrimary from "./Demo/UI/ColumnLayout/MainPrimary";
import MainOnlyNoHeader from "./Demo/UI/ColumnLayout/MainOnlyNoHeader";
import MainOnly from "./Demo/UI/ColumnLayout/MainOnly";
import MainAndAsideWithHeader from "./Demo/UI/ColumnLayout/MainAndAsideWithHeader";
import MainAndAsideNoHeader from "./Demo/UI/ColumnLayout/MainAndAsideNoHeader";
import MainAndAsideMainNoHeader from "./Demo/UI/ColumnLayout/MainAndAsideMainNoHeader";
import MainAndAsideAsideNoHeader from "./Demo/UI/ColumnLayout/MainAndAsideAsideNoHeader";
import FixedHeaders from "./Demo/UI/ColumnLayout/Fixedheaders";
import AsideRight from "./Demo/UI/ColumnLayout/AsideRight";
import AsidePrimary from "./Demo/UI/ColumnLayout/AsidePrimary";
import AsideLeft from "./Demo/UI/ColumnLayout/AsideLeft";
import ArtDemo from "./Demo/UI/Art/ArtDemo";


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
		path: "/demo/theme",
		element: <ThemePage />
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
		path: "/demo/multiselect",
		element: <MultiselectDemo />
	},
	{
		path: "/demo/dropdown",
		element: <DropdownPage />
	},
	{
		path: "/demo/toolbar",
		element: <ToolbarDemo />
	},
	
	{
		path: "/demo/ui/overview",
		element: <UiOverviewPage />
	},
	{
		path: "/demo/ui/:component/:story",
		element: <UiDemoPage />
	},
	{
		path: "/demo/page/overview",
		element: <PageOverviewPage />
	},
	{
		path: "/demo/page/:component/:story",
		element: <PageDemoPage />
	},
	{
		path: "/demo/forms/overview",
		element: <FormsOverviewPage />
	},
	{
		path: "/demo/forms/:component/:story",
		element: <FormsDemoPage />
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
		path: "/demo/columnlayout-fixed-headers",
		element: <FixedHeaders />
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
		path: "/demo/columnlayout-scrollable",
		element: <Scrollable />
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
		path: "/demo/panellayout",
		element: <PanelLayoutDefault />
	},
	{
		path: "/demo/panellayout-overlays",
		element: <PanelLayoutOverlays />
	},
	{
		path: "/demo/panellayout-overlay-group",
		element: <PanelLayoutOverlayGroup />
	},
	{
		path: "/demo/panellayout-shared-header",
		element: <PanelLayoutSharedHeader />
	},
	{
		path: "/demo/panellayout-controlled",
		element: <PanelLayoutControlled />
	},
	{
		path: "/demo/panellayout-always-expanded",
		element: <PanelLayoutAlwaysExpanded />
	},
	{
		path: "/demo/panellayout-mobile-starts-on-aside",
		element: <PanelLayoutMobileStartsOnAside />
	},
	{
		path: "/demo/panellayout-mobile-screen",
		element: <PanelLayoutMobileScreen />
	},
	{
		path: "/demo/panellayout-single-aside",
		element: <PanelLayoutSingleAside />
	},
	{
		path: "/demo/panellayout-without-headers",
		element: <PanelLayoutWithoutHeaders />
	},
	{
		path: "/demo/panellayout-main-only",
		element: <PanelLayoutMainOnly />
	},
{
		path: "/demo/art",
		element: <ArtDemo />
	},

];


export const errorRoutes = [
	{
		path: "*",
		element: <ErrorPage />,
	},
]