import { ReactElement } from "react";
import StoryDemoPage from "../Stories/StoryDemoPage";
import { pageDemoComponents } from "./pageStories";

const PageDemoPage = (): ReactElement => <StoryDemoPage components={pageDemoComponents} />;

export default PageDemoPage;
