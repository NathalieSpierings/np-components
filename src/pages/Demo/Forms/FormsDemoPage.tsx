import { ReactElement } from "react";
import { useParams } from "react-router";
import { formsDemoComponents } from "./formsStories";

const FormsDemoPage = (): ReactElement => {
    const { component, story } = useParams();
    const demoComponent = formsDemoComponents.find((c) => c.id === component);
    const demoStory = demoComponent?.stories.find((s) => s.id === story);

    if (!demoComponent || !demoStory) {
        return <p>Deze sample bestaat niet.</p>;
    }

    const Story = demoStory.Component;

    return (
        <>
            <h3>{demoComponent.title}: {demoStory.title}</h3>
            {/* key: bij wisselen van story begint de state opnieuw */}
            <Story key={`${demoComponent.id}/${demoStory.id}`} />
        </>
    );
};

export default FormsDemoPage;
