import { DemoComponent, DemoStory, fromStoriesModule } from "../Stories/storyRegistry";
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

/** @deprecated gebruik DemoStory uit storyRegistry */
export type FormsDemoStory = DemoStory;
/** @deprecated gebruik DemoComponent uit storyRegistry */
export type FormsDemoComponent = DemoComponent;

export const formsDemoComponents: DemoComponent[] = [
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
