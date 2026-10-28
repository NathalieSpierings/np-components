import { ReactElement } from "react";
import StoryDemoPage from "../Stories/StoryDemoPage";
import { dataDemoComponents } from "./dataStories";

const DataDemoPage = (): ReactElement => <StoryDemoPage components={dataDemoComponents} />;

export default DataDemoPage;
