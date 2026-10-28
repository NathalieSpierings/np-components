import { ReactElement } from "react";
import StoryOverviewPage from "../Stories/StoryOverviewPage";
import { dataDemoComponents } from "./dataStories";

const DataOverviewPage = (): ReactElement => (
    <StoryOverviewPage
        title="Data overview"
        description="Alle Data-componenten op één pagina: per component de default en (als die bestaat) de colored variant."
        components={dataDemoComponents}
    />
);

export default DataOverviewPage;
