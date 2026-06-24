import React, { Children } from "react";
import { matchPath } from "react-router";
import { proxyPrefix } from "../config";
import HomePage from "./HomePage";
import DemoPage from "./DemoPage";
import DropdownPage from "./Demo/Dropdown/DropdownPage";
import DatagridPage from "./Demo/Datagrid/DatagridPage";
import TooltipPage from "./Demo/Tooltip/TooltipPage";
import DatagridPageCheckboxes from "./Demo/Datagrid/DatagridPageCheckboxes";
import DatagridPageActions from "./Demo/Datagrid/DatagridPageActions";
import DatagridPageNested from "./Demo/Datagrid/DatagridPageNested";


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

		path: "/demo/dropdown",
		element: <DropdownPage />
	},
	{

		path: "/demo/tooltip",
		element: <TooltipPage />
	}
];
