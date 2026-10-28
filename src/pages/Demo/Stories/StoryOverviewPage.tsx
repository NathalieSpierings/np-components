import { ReactElement, ReactNode } from "react";
import { DemoComponent } from "./storyRegistry";

export interface StoryOverviewPageProps {
    title: string;
    description?: ReactNode;
    components: DemoComponent[];
    /** Alleen deze story-ids komen in het overzicht */
    storyIds?: string[];
    /** Extra story-ids per component-id, bv. { alert: ['positive', 'negative'] } */
    extraStoryIds?: Record<string, string[]>;
}

/** Alle componenten op één pagina, met per component de gekozen stories naast elkaar (zonder decorators). */
const StoryOverviewPage = ({
    title,
    description,
    components,
    storyIds = ['default', 'color', 'colored'],
    extraStoryIds = {},
}: StoryOverviewPageProps): ReactElement => (
    <>
        <h3>{title}</h3>
        {description && <p>{description}</p>}

        {components.map((component) => {
            const ids = [...storyIds, ...(extraStoryIds[component.id] ?? [])];
            const stories = component.stories.filter((s) => ids.includes(s.id));
            if (stories.length === 0) return null;

            return (
                <section key={component.id} className="mt-4">
                    <h4>{component.title}</h4>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 32rem), 1fr))',
                            gap: 'var(--page-padding)',
                            alignItems: 'start',
                        }}
                    >
                        {stories.map((story) => {
                            const Story = story.Raw;
                            return (
                                <div key={story.id} style={{ minWidth: 0 }}>
                                    <small style={{ display: 'block', marginBottom: 'var(--page-padding-2xs)', opacity: 0.7 }}>
                                        {story.title}
                                    </small>
                                    <Story />
                                </div>
                            );
                        })}
                    </div>
                </section>
            );
        })}
    </>
);

export default StoryOverviewPage;
