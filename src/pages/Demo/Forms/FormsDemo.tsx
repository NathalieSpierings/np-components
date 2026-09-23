import React, { ReactElement, useState } from "react";
import { Checkbox, PasswordInput, RadioButton, Toggle } from "../../../components";
import FormInline from "../../../components/Forms/FormInline/FormInline";
import { ColorDefinitions } from "../../../lib/utils/definitions";


const FormsDemo = (): ReactElement => {
    const [defaultPassword, setDefaultPassword] = useState('');
    const [password, setPassword] = useState('');

    const [checked, setChecked] = useState(false);
    const [radioChecked, setRadioChecked] = useState('');
    const [toggleChecked, setToggleChecked] = useState(false);

    return (
        <div className="grid">
            <div className="bg-surface-light p-3">

                <h3>Password</h3>
                <PasswordInput
                    name="password"
                    label="Password"
                    onChange={(e) => setDefaultPassword(e.target.value)}
                    value={defaultPassword} />

                <h3>OnTextInput</h3>
                <PasswordInput name="password" label="Password" onTextInput={setPassword} value={password} />


                <h3>WithPasswordCheck</h3>
                <PasswordInput
                    name="password"
                    label="Password"
                    value={password}
                    usePasswordCheck={true}
                    onTextInput={setPassword}
                    onKeyUp={() => handleKeyUp}
                />



                <h3>Checkbox</h3>
                <Checkbox
                    label="I am a default checkbox"
                    defaultChecked={checked}
                    onChange={setChecked}
                />
                <Checkbox
                    label="I am an accent checkbox"
                    defaultChecked={checked}
                    onChange={setChecked}
                    color={ColorDefinitions.Accent}
                />
                <Checkbox
                    label="I am an colored checkbox"
                    defaultChecked={checked}
                    onChange={setChecked}
                    color={ColorDefinitions.Green}
                />
                <Checkbox
                    label="I am an primary checkbox"
                    defaultChecked={checked}
                    onChange={setChecked}
                    color={ColorDefinitions.Primary}
                />

                <h3 className="mt-3">Checkbox inline</h3>
                <FormInline>
                    <Checkbox label="Default" defaultChecked={checked} onChange={setChecked} />
                    <Checkbox label="Accent" defaultChecked={checked} onChange={setChecked} color={ColorDefinitions.Accent} />
                    <Checkbox label="Colored" defaultChecked={checked} onChange={setChecked} color={ColorDefinitions.Blue} />
                    <Checkbox label="Primary" defaultChecked={checked} onChange={setChecked} color={ColorDefinitions.Primary} />
                </FormInline>

                <h3 className="mt-3">Checkbox validation </h3>
                <Checkbox
                    label="I am required"
                    defaultChecked={checked}
                    onChange={setChecked}
                    validationState='invalid'
                    validationErrorMessage="Field is required."
                />

                <h3 className="mt-5">Checkbox infotext</h3>
                <Checkbox
                    label="I am a checkbox"
                    infoText="I am info text"
                    defaultChecked={checked}
                    onChange={setChecked}
                />

                <h3 className="mt-3">Radio</h3>
                <RadioButton
                    label="I am a default checkbox"
                    value="option1"
                    checked={radioChecked === 'option1'}
                    onChange={setRadioChecked}
                />
                <RadioButton
                    label="I am an accent checkbox"
                    value="option2"
                    checked={radioChecked === 'option1'}
                    onChange={setRadioChecked}
                    color={ColorDefinitions.Accent}
                />
                <RadioButton
                    label="I am an colored checkbox"
                    value="option3"
                    checked={radioChecked === 'option1'}
                    onChange={setRadioChecked}
                    color={ColorDefinitions.Green}
                />
                <RadioButton
                    label="I am an primary checkbox"
                    value="option4"
                    checked={radioChecked === 'option1'}
                    onChange={setRadioChecked}
                    color={ColorDefinitions.Primary}
                />

                <h3 className="mt-3">Radio inline</h3>
                <FormInline>
                    <RadioButton label="Default" value="option1" checked={radioChecked === 'option1'} onChange={setRadioChecked} />
                    <RadioButton label="Accent" value="option1" checked={radioChecked === 'option1'} onChange={setRadioChecked} color={ColorDefinitions.Accent} />
                    <RadioButton label="Colored" value="option1" checked={radioChecked === 'option1'} onChange={setRadioChecked} color={ColorDefinitions.Blue} />
                    <RadioButton label="Primary" value="option1" checked={radioChecked === 'option1'} onChange={setRadioChecked} color={ColorDefinitions.Primary} />
                </FormInline>

                <h3 className="mt-3">Toggle</h3>
                <Toggle label="I am a default toggle switch" checked={toggleChecked} onChange={setToggleChecked} />
                <Toggle label="I am a accent toggle switch" checked={toggleChecked} onChange={setToggleChecked} color={ColorDefinitions.Accent} />
                <Toggle label="I am a colored toggle switch" checked={toggleChecked} onChange={setToggleChecked} color={ColorDefinitions.Blue} />
                <Toggle label="I am a primary toggle switch" checked={toggleChecked} onChange={setToggleChecked} color={ColorDefinitions.Primary} />


                <h3 className="mt-3">Toggle validation </h3>
                <Toggle label="I am required"
                    checked={toggleChecked}
                    onChange={setToggleChecked}
                    validationState='invalid'
                    validationErrorMessage="Field is required."
                />


                <h3 className="mt-5">Toggle infotext</h3>
                <Toggle
                    label="I am a toggle switch"
                    checked={toggleChecked}
                    onChange={setToggleChecked}
                    infoText="I am info text"
                />



            </div>
        </div>
    );
};

export default FormsDemo;