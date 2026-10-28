import { ReactElement } from "react";
import StoryOverviewPage from "../Stories/StoryOverviewPage";
import { pageDemoComponents } from "./pageStories";

const PageOverviewPage = (): ReactElement => (
    <StoryOverviewPage
        title="Page overview"
        description="Alle Page-componenten op één pagina: per component de default en (als die bestaat) de colored variant. De layouts staan in een eigen frame."
        components={pageDemoComponents}
    />
);

export default PageOverviewPage;
