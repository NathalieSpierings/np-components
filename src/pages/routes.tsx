import React from "react";
import DatagridAllPage from "./Demo/Datagrid/DatagridAllPage";
import DatagridFilterToolbarPage from "./Demo/Datagrid/DatagridFilterToolbarPage";
import DatagridPage from "./Demo/Datagrid/DatagridPage";
import DatagridPageActions from "./Demo/Datagrid/DatagridPageActions";
import DatagridPageCheckboxes from "./Demo/Datagrid/DatagridPageCheckboxes";
import DatagridPageNested from "./Demo/Datagrid/DatagridPageNested";
import DatagridPageTableInfo from "./Demo/Datagrid/DatagridPageTableInfo";
import DatagridWithSidebarPage from "./Demo/Datagrid/DatagridWithSidebarPage";
import DatagridWithTabsPage from "./Demo/Datagrid/DatagridWithTabsPage";
import DropdownPage from "./Demo/Dropdown/DropdownPage";
import TooltipPage from "./Demo/Tooltip/TooltipPage";
import DemoPage from "./DemoPage";
import HomePage from "./HomePage";
import DatagridWithSidebarLeftPage from "./Demo/Datagrid/DatagridWithSidebarLeftPage";


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
		path: "/demo/datagrid",
		element: <DatagridPage />
	},
	{
		path: "/demo/datagridtabs",
		element: <DatagridWithTabsPage />
	},
	{
		path: "/demo/datagridsidebarleft",
		element: <DatagridWithSidebarLeftPage />
	},
	{
		path: "/demo/datagridsidebar",
		element: <DatagridWithSidebarPage />
	},
	{
		path: "/demo/datagridall",
		element: <DatagridAllPage />
	},
	{
		path: "/demo/datagridcheckboxes",
		element: <DatagridPageCheckboxes />
	},
	{
		path: "/demo/datagridactions",
		element: <DatagridPageActions />
	},
	{
		path: "/demo/datagridnested",
		element: <DatagridPageNested />
	},
	{
		path: "/demo/datagridtableinfo",
		element: <DatagridPageTableInfo />
	},
{

		path: "/demo/datagridfiltertoolbar",
		element: <DatagridFilterToolbarPage />
	},
	{

		path: "/demo/dropdown",
		element: <DropdownPage />
	},
	{

		path: "/demo/tooltip",
		element: <TooltipPage />
	}
];
