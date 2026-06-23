import React, { Children } from "react";
import { matchPath } from "react-router";
import { proxyPrefix } from "../config";
import HomePage from "./HomePage";
import DemoPage from "./DemoPage";
import DropdownPage from "./Demo/Dropdown/DropdownPage";
import DatagridPage from "./Demo/Datagrid/DatagridPage";
import TooltipPage from "./Demo/Tooltip/TooltipPage";


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

		path: "/demo/dropdown",
		element: <DropdownPage />
	},
	{

		path: "/demo/tooltip",
		element: <TooltipPage />
	}
];
