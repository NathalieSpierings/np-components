import React from "react";
import CollectionPage from "./Demo/Collection/CollectionPage";
import ContentItemPage from "./Demo/ContentItem/ContentItemPage";
import DatagridDemo from "./Demo/Datagrid/DatagridDemo";
import DatagridTableInfoDemo from "./Demo/Datagrid/DatagridTableInfoDemo";
import DatagridToolbarDemo from "./Demo/Datagrid/DatagridToolbarDemo";
import DropdownPage from "./Demo/Dropdown/DropdownPage";
import TooltipPage from "./Demo/Tooltip/TooltipPage";
import DemoPage from "./DemoPage";
import HomePage from "./HomePage";
import DatagridLoadingDemo from "./Demo/Datagrid/DatagridLoadingDemo";
import ToolbarDemo from "./Demo/Toolbar/ToolbarDemo";
import DescriptionListDemo from "./Demo/Typography/DescriptionList";
import DismissButtonDemo from "./Demo/DismissButton/DismissButtonDemo";
import DatagridAllDemo from "./Demo/Datagrid/DatagridAllDemo";
import ColumnFilterDemo from "./Demo/Datagrid/ColumnFilterDemo";
import ColumnReorderDemo from "./Demo/Datagrid/ColumnReorderDemo";
import ColumnResizeDemo from "./Demo/Datagrid/ColumnResizeDemo";
import ColumnVisibilityDemo from "./Demo/Datagrid/ColumnVisibilityDemo";
import DatagridNestedDemo from "./Demo/Datagrid/DatagridNestedDemo";
import DatagridSelectedRowDemo from "./Demo/Datagrid/DatagridSelectedRowDemo";
import ColumnStickyDemo from "./Demo/Datagrid/ColumnStickyDemo";
import DatagridTabsDemo from "./Demo/Datagrid/DatagridTabsDemo";
import DatagridSidebarDemo from "./Demo/Datagrid/DatagridSidebarDemo";
import DatagridSidebarAndTabsDemo from "./Demo/Datagrid/DatagridSidebarAndTabsDemo";
import DatagridRowActionsDemo from "./Demo/Datagrid/DatagridRowActionsDemo";
import ColumnPinningDemo from "./Demo/Datagrid/ColumnPinningDemo";
import DatagridCheckboxDemo from "./Demo/Datagrid/DatagridCheckboxDemo";
import IconDemo from "./Demo/Icon/IconDemo";
import ButtonDemo from "./Demo/Button/ButtonDemo";
import DatagridPagerDemo from "./Demo/Datagrid/DatagridPagerDemo";
import DatagridHeaderFooterDemo from "./Demo/Datagrid/DatagridHeaderFooterDemo";
import ModalDemo from "./Demo/Modal/ModalDemo";
import MultiselectDemo from "./Demo/Multiselect/MultiSelectDemo";
import ColumnTotalRowDemo from "./Demo/Datagrid/ColumnTotalRowDemo";
import DatagridTest from "./Demo/Datagrid/Test/DatagridTest";


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
		path: '/demo/dg-all',
		element: <DatagridAllDemo />
	},
	{
		path: '/demo/dg-checkbox',
		element: <DatagridCheckboxDemo />
	},
	{
		path: '/demo/dg',
		element: <DatagridDemo />
	},
	{
		path: '/demo/dg-headerfooter',
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
