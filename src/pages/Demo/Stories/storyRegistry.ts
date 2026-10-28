import { createElement, type ComponentType, type ReactElement } from "react";
import IsolatedStory from "./IsolatedStory";

/**
 * Leest Storybook-bestanden (`*.stories.tsx`) in, zodat de demo-app dezelfde samples toont als Storybook.
 * Ondersteunt StoryFn (een functie), StoryObj met `render`, en StoryObj met alleen `args` (via `meta.component`).
 */

type Args = Record<string, unknown>;
type RenderFn = (args: Args, context?: unknown) => ReactElement;
type DecoratorFn = (Story: ComponentType, context: unknown) => ReactElement;

interface StoriesMeta {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component?: ComponentType<any>;
    args?: Args;
    render?: RenderFn;
    decorators?: unknown;
}

export interface DemoStory {
    id: string;          // kebab-case, voor de url
    title: string;       // leesbaar, voor het menu
    Component: ComponentType;   // met decorators uit meta
    Raw: ComponentType;         // zonder decorators, voor overzichtspagina's
}

export interface DemoComponent {
    id: string;
    title: string;
    stories: DemoStory[];
}

export interface FromStoriesOptions {
    /**
     * Decorators uit `meta` toepassen (default: true). Zet op false als de decorators een eigen router
     * (`MemoryRouter`) of providers toevoegen die de demo-app zelf al levert.
     */
    decorators?: boolean;
    /** In een eigen React-root en omkaderd vak renderen (voor schermvullende layouts met een eigen router). */
    isolate?: boolean;
}

/** "SingleSelect" -> "Single select" */
const humanize = (name: string) =>
    name.replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase().replace(/^./, (c) => c.toUpperCase());

/** "SingleSelect" -> "single-select" */
const toKebab = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

/** Past de decorators uit `meta` toe, net als Storybook. */
const applyDecorators = (Story: ComponentType, decorators: DecoratorFn[]): ComponentType =>
    decorators.reduce<ComponentType>((Inner, decorate) => () => decorate(Inner, {}), Story);

/** Maakt van een story-export een component, met de args van meta en story samengevoegd. */
const resolveStory = (value: unknown, meta: StoriesMeta | undefined): ComponentType | null => {
    const metaArgs = meta?.args ?? {};

    // StoryFn, eventueel met `Story.args = {...}`
    if (typeof value === 'function') {
        const fn = value as RenderFn & { args?: Args };
        const args = { ...metaArgs, ...(fn.args ?? {}) };
        return () => fn(args, {});
    }

    // StoryObj
    if (value && typeof value === 'object') {
        const story = value as { render?: RenderFn; args?: Args };
        const args = { ...metaArgs, ...(story.args ?? {}) };
        const render = story.render ?? meta?.render;

        if (render) {
            return () => render(args, {});
        }

        if (meta?.component) {
            const Component = meta.component;
            return () => createElement(Component, args);
        }
    }

    return null;
};

export const fromStoriesModule = (
    id: string,
    title: string,
    module: Record<string, unknown>,
    options: FromStoriesOptions = {},
): DemoComponent => {
    const { default: meta, ...exports } = module as { default?: StoriesMeta } & Record<string, unknown>;
    const rawDecorators = options.decorators === false ? undefined : meta?.decorators;
    const decorators = (Array.isArray(rawDecorators) ? rawDecorators : rawDecorators ? [rawDecorators] : []) as DecoratorFn[];

    const stories = Object.entries(exports)
        .map(([name, value]): DemoStory | null => {
            const Story = resolveStory(value, meta);
            if (!Story) return null;

            const Decorated = applyDecorators(Story, decorators);

            if (options.isolate) {
                // Geïsoleerd: altijd met decorators, want de eigen root heeft de providers van de story nodig
                const Isolated = () => createElement(IsolatedStory, { Story: Decorated });
                return { id: toKebab(name), title: humanize(name), Component: Isolated, Raw: Isolated };
            }

            return { id: toKebab(name), title: humanize(name), Component: Decorated, Raw: Story };
        })
        .filter((story): story is DemoStory => story !== null)
        // "Default" eerst, daarna alfabetisch
        .sort((a, b) => (a.id === 'default' ? -1 : b.id === 'default' ? 1 : a.title.localeCompare(b.title)));

    return { id, title, stories };
};
