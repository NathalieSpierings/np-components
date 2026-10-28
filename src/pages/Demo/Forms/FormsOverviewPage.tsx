import { ReactElement } from "react";
import StoryOverviewPage from "../Stories/StoryOverviewPage";
import { formsDemoComponents } from "./formsStories";

const FormsOverviewPage = (): ReactElement => (
    <StoryOverviewPage
        title="Forms overview"
        description="Alle formulier-elementen op één pagina: per component de default en (als die bestaat) de colored variant."
        components={formsDemoComponents}
    />
);

export default FormsOverviewPage;
