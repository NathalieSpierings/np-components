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
		path: "/demo/dg",
		element: <DatagridDemo />
	},	
	{
		path: "/demo/dginfo",
		element: <DatagridTableInfoDemo />
	},
	{
		path: "/demo/dgtoolbar",
		element: <DatagridToolbarDemo />
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
	}
];
