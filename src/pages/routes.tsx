import React from "react";
import { matchPath } from "react-router";
import { proxyPrefix } from "../config";
import HomePage from "./HomePage";


export const routes = [
	{
		path: "/",
		element: <HomePage />
	},
];
