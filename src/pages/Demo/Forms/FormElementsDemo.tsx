import React, { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Button, Checkbox, DateInput, Datepicker, FileSelect, FormCheckbox, FormDateInput,
    FormDisplayList, FormInput, FormSelect, FormTextArea, FormToggle, Input, Multiselect,
    MultiselectItem, MultiselectItemId, PasswordInput, RadioButton, SearchInput, Select,
    StaticInput, StaticTagsInput, StaticTextArea, TagsInput, TagsInputTagItem, TextArea, Toggle,
} from "../../../components";
import { FileReader as PdsFileReader } from "../../../components/Forms/FileReader";
import FormInline from "../../../components/Forms/FormInline/FormInline";
import CheckboxAnimated from "../../../components/UI/CheckboxAnimated/CheckboxAnimated";
import Icon from "../../../components/UI/Icons/Icon/Icon";
import { Fieldset } from "../../../components/Typography/Fieldset";
import Title from "../../../components/Typography/Title/Title";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";

const multiselectItems: MultiselectItem[] = [
    { id: "1", content: "Optie 1" },
    { id: "2", content: "Optie 2" },
    { id: "3", content: "Optie 3" },
    { id: "4", content: "Optie 4 (uitgeschakeld)", disabled: true },
];

const initialTags: TagsInputTagItem[] = [
    { id: "1", title: "Amsterdam" },
    { id: "2", title: "Rotterdam", color: ColorDefinitions.Purple },
];

type DemoFormValues = {
    naam: string;
    land: string;
    opmerking: string;
    startdatum?: Date;
    voorwaarden: boolean;
    nieuwsbrief: boolean;
};

const FormElementsDemo = (): ReactElement => {
    // Tekstvelden
    const [text, setText] = useState("");
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState("");
    const [password, setPassword] = useState("");
    const [search, setSearch] = useState("");
    const [textarea, setTextarea] = useState("");
    const [select, setSelect] = useState("");

    // Datums
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [pickerDate, setPickerDate] = useState<Date | null>(new Date());
    const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);

    // Keuzes
    const [checked, setChecked] = useState(false);
    const [radio, setRadio] = useState("optie1");
    const [toggle, setToggle] = useState(false);
    const [animated, setAnimated] = useState(false);
    const [selected, setSelected] = useState<MultiselectItemId[]>([]);
    const [singleSelected, setSingleSelected] = useState<MultiselectItemId[]>([]);

    // Tags en bestanden
    const [tags, setTags] = useState<TagsInputTagItem[]>(initialTags);
    const [tagText, setTagText] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [readFile, setReadFile] = useState<string>("");

    // react-hook-form
    const { control, handleSubmit, formState: { isSubmitting } } = useForm<DemoFormValues>({
        mode: "all",
        defaultValues: { naam: "", land: "", opmerking: "", voorwaarden: false, nieuwsbrief: false },
    });
    const save = handleSubmit(async (data) => console.info("submit", data));

    return (
        <section className="centered centered--wide">
            <Title size="lg">Form elements</Title>
            <p className="text-muted">Overzicht van alle formuliercomponenten en hun varianten.</p>

            {/* ===== Input ===== */}
            <Fieldset legend="Input" className="mt-4">
                <Input label="Tekst" value={text} onValueChange={setText} />
                <Input label="E-mail" type="email" value={email} onValueChange={setEmail} />
                <Input label="Aantal" type="number" value={amount} onValueChange={setAmount} />
                <Input label="Simple variant" variant="simple" />
                <Input label="Small" small />
                <Input label="Met infotekst" infoText="Dit is een hulptekst" />
                <Input label="Gekleurd" color={ColorDefinitions.Purple} background={ColorDefinitions.Purple10} />
                <FormInline>
                    <Input label="Disabled" value="Niet aanpasbaar" disabled />
                    <Input label="Readonly" value="Alleen lezen" readOnly />
                </FormInline>
                <FormInline>
                    <Input label="Ongeldig" validationState="invalid" validationErrorMessage="Dit veld is verplicht." />
                    <Input label="Geldig" validationState="valid" value="Correct" readOnly />
                </FormInline>
                <FormInline>
                    <Input label="Prefix" addonPrefix="€" />
                    <Input label="Suffix" addonSuffix={<Icon size={SizeDefinitions.Small} icon={IconDefinitions.calendar} />} />
                </FormInline>
            </Fieldset>

            {/* ===== StaticInput ===== */}
            <Fieldset legend="StaticInput" className="mt-4">
                <StaticInput label="Klantnummer" value="123456" />
                <StaticInput label="Op dezelfde regel" value="123456" sameLine colon />
            </Fieldset>

            {/* ===== PasswordInput ===== */}
            <Fieldset legend="PasswordInput" className="mt-4">
                <PasswordInput name="pw-default" label="Wachtwoord" value={password} onTextInput={setPassword} />
                <PasswordInput name="pw-check" label="Met wachtwoordcontrole" value={password} onTextInput={setPassword} usePasswordCheck />
                <PasswordInput name="pw-disabled" label="Disabled" disabled />
            </Fieldset>

            {/* ===== SearchInput ===== */}
            <Fieldset legend="SearchInput" className="mt-4">
                <SearchInput placeholder="Zoeken..." value={search} onTextInput={setSearch} css="mb-3"/>
                <SearchInput placeholder="Small" size="sm" css="mb-3"/>
                <SearchInput placeholder="Large" size="lg" css="mb-3"/>
            </Fieldset>

            {/* ===== Select ===== */}
            <Fieldset legend="Select" className="mt-4">
                <Select label="Fruit" value={select} onValueChange={setSelect} defaultLabel="Maak een keuze">
                    <option value="appel">Appel</option>
                    <option value="peer">Peer</option>
                    <option value="banaan">Banaan</option>
                </Select>
                <Select label="Small" small><option>Appel</option></Select>
                <Select label="Disabled" disabled><option>Appel</option></Select>
                    <Select label="Ongeldig" validationState="invalid" validationErrorMessage="Maak een keuze."><option>Appel</option></Select>
            </Fieldset>

            {/* ===== TextArea ===== */}
            <Fieldset legend="TextArea" className="mt-4">
                <TextArea label="Opmerking" rows={4} value={textarea} onValueChange={setTextarea} />
                <TextArea label="Met infotekst" infoText="Maximaal 500 tekens" />
                <TextArea label="Ongeldig" validationState="invalid" validationErrorMessage="Dit veld is verplicht." />
                <StaticTextArea label="StaticTextArea" value="Dit is een lange, alleen-lezen tekst die over meerdere regels kan lopen." />
            </Fieldset>

            {/* ===== DateInput ===== */}
            <Fieldset legend="DateInput" className="mt-4">
                <FormInline>
                    <DateInput label="Startdatum" value={date} onChange={setDate} />
                    <DateInput label="Small" value={date} onChange={setDate} small />
                </FormInline>
                <FormInline>
                    <DateInput label="Disabled" value={date} onChange={setDate} disabled />
                    <DateInput label="Ongeldig" value={undefined} validationErrorMessage="Datum is verplicht" />
                </FormInline>
            </Fieldset>

            {/* ===== Datepicker ===== */}
            <Fieldset legend="Datepicker" className="mt-4">
                <FormInline>
                    <Datepicker
                        selected={pickerDate}
                        onChange={setPickerDate}
                        customInput={<Input label="Kies een datum" />}
                    />
                    <Datepicker
                        selectsRange
                        startDate={range[0]}
                        endDate={range[1]}
                        onChange={setRange}
                        customInput={<Input label="Periode" />}
                    />
                </FormInline>
                <Datepicker
                    selected={pickerDate}
                    onChange={setPickerDate}
                    validationErrorMessage="Datum is verplicht"
                    customInput={<Input label="Met validatie" />}
                />
            </Fieldset>

            {/* ===== Checkbox ===== */}
            <Fieldset legend="Checkbox" className="mt-4">
                <FormInline>
                    <Checkbox label="Default" checked={checked} onChange={setChecked} />
                    <Checkbox label="Accent" checked={checked} onChange={setChecked} color={ColorDefinitions.Accent} />
                    <Checkbox label="Primary" checked={checked} onChange={setChecked} color={ColorDefinitions.Primary} />
                    <Checkbox label="Green" checked={checked} onChange={setChecked} color={ColorDefinitions.Green} />
                </FormInline>
                <FormInline>
                    <Checkbox label="Indeterminate" indeterminate />
                    <Checkbox label="Disabled" disabled />
                    <Checkbox label="Readonly" checked readOnly />
                </FormInline>
                <Checkbox label="Met infotekst" infoText="Dit is een hulptekst" />
                <Checkbox label="Verplicht" validationState="invalid" validationErrorMessage="Dit veld is verplicht." />
            </Fieldset>

            {/* ===== CheckboxAnimated ===== */}
            <Fieldset legend="CheckboxAnimated" className="mt-4">
                <FormInline>
                    <CheckboxAnimated checked={animated} onChange={setAnimated} />
                    <CheckboxAnimated checked={animated} onChange={setAnimated} accentColor={ColorDefinitions.Green} />
                    <CheckboxAnimated disabled />
                </FormInline>
            </Fieldset>

            {/* ===== RadioButton ===== */}
            <Fieldset legend="RadioButton" className="mt-4">
                <FormInline>
                    <RadioButton name="demo-radio" label="Optie 1" value="optie1" checked={radio === "optie1"} onChange={setRadio} />
                    <RadioButton name="demo-radio" label="Optie 2" value="optie2" checked={radio === "optie2"} onChange={setRadio} color={ColorDefinitions.Accent} />
                    <RadioButton name="demo-radio" label="Optie 3" value="optie3" checked={radio === "optie3"} onChange={setRadio} color={ColorDefinitions.Primary} />
                </FormInline>
                <FormInline>
                    <RadioButton name="demo-radio-disabled" label="Disabled" value="x" disabled />
                    <RadioButton name="demo-radio-invalid" label="Ongeldig" value="y" validationState="invalid" validationErrorMessage="Maak een keuze." />
                </FormInline>
            </Fieldset>

            {/* ===== Toggle ===== */}
            <Fieldset legend="Toggle" className="mt-4">
                <Toggle label="Default" checked={toggle} onChange={setToggle} />
                <Toggle label="Accent" checked={toggle} onChange={setToggle} color={ColorDefinitions.Accent} />
                <Toggle label="Label links" labelPosition="left" checked={toggle} onChange={setToggle} />
                <Toggle label="Disabled" checked={false} onChange={() => undefined} disabled />
                <Toggle label="Met infotekst" checked={toggle} onChange={setToggle} infoText="Dit is een hulptekst" />
                <Toggle label="Verplicht" checked={toggle} onChange={setToggle} validationState="invalid" validationErrorMessage="Dit veld is verplicht." />
            </Fieldset>

            {/* ===== Multiselect ===== */}
            <Fieldset legend="Multiselect" className="mt-4">
                <Multiselect items={multiselectItems} selected={selected} onSelectionChange={setSelected} enableSearch enableCheckAll />
                <Title size="sm" css="mt-3">Enkele selectie</Title>
                <Multiselect items={multiselectItems} selected={singleSelected} onSelectionChange={setSingleSelected} selectMultiple={false} />
            </Fieldset>

            {/* ===== TagsInput ===== */}
            <Fieldset legend="TagsInput" className="mt-4">
                <TagsInput
                    label="Steden"
                    placeholder="Typ en druk op Enter"
                    selectedTags={tags}
                    setSelectedTags={setTags}
                    textInput={tagText}
                    setTextInput={setTagText}
                />
                <StaticTagsInput label="StaticTagsInput" selectedTags={tags} />
            </Fieldset>

            {/* ===== FormDisplayList ===== */}
            <Fieldset legend="FormDisplayList" className="mt-4">
                <FormDisplayList label="Lijst" value={["Item 1", "Item 2", "Item 3"]} />
                <FormDisplayList label="Lege lijst" value={[]} placeholder="Geen items" />
            </Fieldset>

            {/* ===== FileSelect ===== */}
            <Fieldset legend="FileSelect" className="mt-4">
                <FileSelect
                    multiple
                    selectedFiles={files}
                    setSelectedFiles={setFiles}
                    accept={[".pdf", ".docx", ".xlsx", ".csv", ".zip"]}
                />
            </Fieldset>

            {/* ===== FileReader ===== */}
            <Fieldset legend="FileReader" className="mt-4">
                <PdsFileReader accept={[".csv"]} processContent={(file) => setReadFile(file.name)} />
                {readFile && <p className="mt-2">Ingelezen: <strong>{readFile}</strong></p>}
            </Fieldset>

            {/* ===== react-hook-form ===== */}
            <Fieldset legend="Formulier met react-hook-form" className="mt-4 mb-5">
                <FormInput name="naam" control={control} label="Naam" rules={{ required: "Naam is verplicht" }} />
                <FormSelect name="land" control={control} label="Land" rules={{ required: "Kies een land" }} defaultLabel="Maak een keuze">
                    <option value="nl">Nederland</option>
                    <option value="be">België</option>
                </FormSelect>
                <FormDateInput name="startdatum" control={control} label="Startdatum" rules={{ required: "Startdatum is verplicht" }} />
                <FormTextArea name="opmerking" control={control} label="Opmerking" />
                <FormToggle name="nieuwsbrief" control={control} label="Nieuwsbrief ontvangen" />
                <FormCheckbox name="voorwaarden" control={control} label="Ik ga akkoord met de voorwaarden" rules={{ required: "Verplicht" }} />
                <Button onClick={save} disabled={isSubmitting} css="mt-3">Valideer</Button>
            </Fieldset>
        </section>
    );
};

export default FormElementsDemo;
