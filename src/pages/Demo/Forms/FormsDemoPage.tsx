import { ReactElement } from "react";
import StoryDemoPage from "../Stories/StoryDemoPage";
import { formsDemoComponents } from "./formsStories";

const FormsDemoPage = (): ReactElement => <StoryDemoPage components={formsDemoComponents} />;

export default FormsDemoPage;
