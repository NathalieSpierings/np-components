import { ReactElement } from "react";
import StoryOverviewPage from "../Stories/StoryOverviewPage";
import { uiDemoComponents } from "./uiStories";

const UiOverviewPage = (): ReactElement => (
    <StoryOverviewPage
        title="UI overview"
        description="Alle UI-componenten op één pagina: per component de default en (als die bestaat) de colored variant. Bij Alert ook alle varianten."
        components={uiDemoComponents}
        extraStoryIds={{
            alert: ['informational', 'positive', 'negative', 'warning'],
        }}
    />
);

export default UiOverviewPage;
