import { ReactElement } from "react";
import StoryDemoPage from "../Stories/StoryDemoPage";
import { uiDemoComponents } from "./uiStories";

const UiDemoPage = (): ReactElement => <StoryDemoPage components={uiDemoComponents} />;

export default UiDemoPage;
