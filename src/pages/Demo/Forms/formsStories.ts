import type { ComponentType, ReactElement } from "react";
import * as CheckboxStories from "../../../components/Forms/Checkbox/__docs__/Checkbox.stories";
import * as DateInputStories from "../../../components/Forms/DateInput/__docs__/DateInput.stories";
import * as DatepickerStories from "../../../components/Forms/Datepicker/__docs__/Datepicker.stories";
import * as DisplayListStories from "../../../components/Forms/DisplayList/__docs__/FormDisplayList.stories";
import * as DropdownStories from "../../../components/Forms/Dropdown/__docs__/Dropdown.stories";
import * as FileReaderStories from "../../../components/Forms/FileReader/__docs__/FileReader.stories";
import * as FileSelectStories from "../../../components/Forms/FileSelect/__docs__/FileSelect.stories";
import * as InputStories from "../../../components/Forms/Input/__docs__/Input.stories";
import * as MultiselectStories from "../../../components/Forms/Multiselect/__docs__/Multiselect.stories";
import * as PasswordInputStories from "../../../components/Forms/PasswordInput/__docs__/PasswordInput.stories";
import * as RadioButtonStories from "../../../components/Forms/RadioButton/__docs__/RadioButton.stories";
import * as SearchInputStories from "../../../components/Forms/SearchInput/__docs__/SearchInput.stories";
import * as SelectStories from "../../../components/Forms/Select/__docs__/Select.stories";
import * as StaticTagsInputStories from "../../../components/Forms/TagsInput/__docs__/StaticTagsInput.stories";
import * as TagsInputStories from "../../../components/Forms/TagsInput/__docs__/TagsInput.stories";
import * as TextAreaStories from "../../../components/Forms/TextArea/__docs__/TextArea.stories";
import * as ToggleStories from "../../../components/Forms/Toggle/__docs__/Toggle.stories";

type DecoratorFn = (Story: ComponentType, context: unknown) => ReactElement;

export interface FormsDemoStory {
    id: string;          // kebab-case, voor de url
    title: string;       // leesbaar, voor het menu
    Component: ComponentType;
}

export interface FormsDemoComponent {
    id: string;
    title: string;
    stories: FormsDemoStory[];
}

/** "SingleSelect" -> "Single select" */
const humanize = (name: string) =>
    name.replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase().replace(/^./, (c) => c.toUpperCase());

/** "SingleSelect" -> "single-select" */
const toKebab = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

/** Past de decorators uit `meta` toe, net als Storybook. */
const applyDecorators = (Story: ComponentType, decorators: DecoratorFn[]): ComponentType =>
    decorators.reduce<ComponentType>((Inner, decorate) => () => decorate(Inner, {}), Story);

const fromStoriesModule = (id: string, title: string, module: Record<string, unknown>): FormsDemoComponent => {
    const { default: meta, ...exports } = module as { default?: { decorators?: unknown } } & Record<string, unknown>;
    const rawDecorators = meta?.decorators;
    const decorators = (Array.isArray(rawDecorators) ? rawDecorators : rawDecorators ? [rawDecorators] : []) as DecoratorFn[];

    const stories = Object.entries(exports)
        .map(([name, value]): FormsDemoStory | null => {
            // StoryFn: een component; StoryObj: een object met render()
            const render = typeof value === 'function'
                ? value
                : typeof (value as { render?: unknown })?.render === 'function'
                    ? (value as { render: ComponentType }).render
                    : null;

            return render
                ? { id: toKebab(name), title: humanize(name), Component: applyDecorators(render as ComponentType, decorators) }
                : null;
        })
        .filter((story): story is FormsDemoStory => story !== null)
        // "Default" eerst, daarna alfabetisch
        .sort((a, b) => (a.id === 'default' ? -1 : b.id === 'default' ? 1 : a.title.localeCompare(b.title)));

    return { id, title, stories };
};

export const formsDemoComponents: FormsDemoComponent[] = [
    fromStoriesModule('checkbox', 'Checkbox', CheckboxStories),
    fromStoriesModule('dateinput', 'Date input', DateInputStories),
    fromStoriesModule('datepicker', 'Datepicker', DatepickerStories),
    fromStoriesModule('displaylist', 'Display list', DisplayListStories),
    fromStoriesModule('dropdown', 'Dropdown', DropdownStories),
    fromStoriesModule('filereader', 'File reader', FileReaderStories),
    fromStoriesModule('fileselect', 'File select', FileSelectStories),
    fromStoriesModule('input', 'Input', InputStories),
    fromStoriesModule('multiselect', 'Multiselect', MultiselectStories),
    fromStoriesModule('passwordinput', 'Password input', PasswordInputStories),
    fromStoriesModule('radiobutton', 'Radio button', RadioButtonStories),
    fromStoriesModule('searchinput', 'Search input', SearchInputStories),
    fromStoriesModule('select', 'Select', SelectStories),
    fromStoriesModule('tagsinput', 'Tags input', TagsInputStories),
    fromStoriesModule('tagsinput-static', 'Tags input (static)', StaticTagsInputStories),
    fromStoriesModule('textarea', 'Text area', TextAreaStories),
    fromStoriesModule('toggle', 'Toggle', ToggleStories),
];
