import React, { ReactElement, useRef, useState } from "react";
import { Link } from "react-router";
import Tooltip from "../../../components/UI/Tooltip/Tooltip";
import { ColorDefinitions, IconDefinitions } from "../../../lib/utils/definitions";
import Icon from "../../../components/UI/Icons/Icon/Icon";
import { Fieldset } from "../../../components/Typography/Fieldset";

const TooltipPage = ({
}): ReactElement => {

    const buttonRef = useRef<HTMLButtonElement>(null);
    const [enabled, setEnabled] = useState(false);
    const [open, setOpen] = useState(false);

    const iconRef = useRef<HTMLSpanElement>(null);
    const [showInfo, setShowInfo] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const [email, setEmail] = useState('test@test.com');

    const isValidEmail = (value: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };

    const helpRef = useRef<HTMLSpanElement>(null);
    const [showHelp, setShowHelp] = useState(false);

    const organisationName = "Grotthenburger middle leben"

    return (
        <section className="centered centered--wide">
            <h3>Welkom to the tooltip demo</h3>

            <Fieldset legend="Directions" className="mt-4">
                <div className="row">
                    <div className="col-3">
                        <Tooltip content="I am a tooltip" direction="top-left">
                            Tooltip top left
                        </Tooltip>
                    </div>
                    <div className="col-3">
                        <Tooltip content="I am a tooltip" direction="top">
                            Tooltip top
                        </Tooltip>
                    </div>
                    <div className="col-3">
                        <Tooltip content="I am a tooltip" direction="top-right">
                            Tooltip top right
                        </Tooltip>
                    </div>
                    <div className="col-3">
                        <Tooltip content="I am a tooltip" direction="bottom-left">
                            Tooltip bottom left
                        </Tooltip>
                    </div>
                    <div className="col-3">
                        <Tooltip content="I am a tooltip" direction="bottom">
                            Tooltip bottom
                        </Tooltip>
                    </div>
                    <div className="col-3">
                        <Tooltip content="I am a tooltip" direction="bottom-right">
                            Tooltip bottom right
                        </Tooltip>
                    </div>
                    <div className="col-3">
                        <Tooltip content="I am a tooltip" direction="left">
                            Tooltip left
                        </Tooltip>
                    </div>
                    <div className="col-3">
                        <Tooltip content="I am a tooltip" direction="right">
                            Tooltip right
                        </Tooltip>
                    </div>
                </div>
            </Fieldset>

            <Fieldset legend="Default" className="mt-4">
                <Tooltip content="Default tooltip">
                    <button type="button">Hover me</button>
                </Tooltip>
            </Fieldset>

            <Fieldset legend="Colored" className="mt-4">
                <Tooltip content="I am a tooltip" background={ColorDefinitions.Magenta}>
                    Hover me
                </Tooltip>
            </Fieldset>


            <Fieldset legend="Render Html" className="mt-4">
                <Tooltip renderHtml content="<strong>Warning!</strong> <p>I am a HTML tooltip</p>"
                    background={ColorDefinitions.Magenta}>
                    Hover me
                </Tooltip>
            </Fieldset>

            <Fieldset legend="OnMobile" className="mt-4">
             <Tooltip
                    content="I will flip to left on mobile or tablet"
                    direction='right'
                    background={ColorDefinitions.Magenta}>
                    Hover me
                </Tooltip>   

<br/><br/>
                 <Tooltip
                    content="I will flip to right on mobile or tablet"
                    direction='left'
                    background={ColorDefinitions.Magenta}>
                    Hover me
                </Tooltip>
            </Fieldset>


            <Fieldset legend="Truncated text" className="mt-4">
                <div
                    style={{
                        width: 150,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        border: '1px solid #ccc',
                        padding: '8px',
                    }}
                >
                    <Tooltip direction="bottom"
                        content="Dit is de volledige tekst die niet volledig zichtbaar is in de container."
                        overflowTooltip
                    >
                        Dit is de volledige tekst die niet volledig zichtbaar is in de container.
                    </Tooltip>
                </div>
                <div className="mt-4">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="truncate" style={{ maxWidth: '200px' }}>
                                    <Tooltip overflowTooltip>
                                        {organisationName}
                                    </Tooltip>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-4">
                    <Tooltip
                        overflowTooltip
                        direction="bottom"
                        content={
                            <>
                                <strong>Organisatie</strong>
                                <br />
                                Dit is extra informatie die buiten de tabelcel mag verschijnen.
                            </>
                        }
                    >
                        Hover voor details
                    </Tooltip>
                </div>
            </Fieldset>


            <Fieldset legend="Tooltips on anchors" className="mt-4">
                <button
                    ref={buttonRef}
                    onMouseEnter={() => setEnabled(true)}
                    onMouseLeave={() => setEnabled(false)}
                >
                    Save
                </button>

                <Tooltip
                    mode="anchored"
                    anchorRef={buttonRef}
                    enabled={enabled}
                    content="Opslaan"
                    direction="top"
                />


                <span
                    ref={iconRef}
                    onMouseEnter={() => setShowInfo(true)}
                    onMouseLeave={() => setShowInfo(false)}
                >
                    ℹ️
                </span>

                <Tooltip
                    mode="anchored"
                    anchorRef={iconRef}
                    enabled={showInfo}
                    content="Meer informatie"
                    direction="right"
                />

            </Fieldset>

            <Fieldset legend="Tooltips on click" className="mt-4">
                <button
                    ref={buttonRef}
                    onClick={() => setOpen(v => !v)}
                >
                    Click me
                </button>

                <Tooltip
                    mode="anchored"
                    anchorRef={buttonRef}
                    enabled={open}
                    content="Toggle tooltip"
                    direction="right"
                />
            </Fieldset>

            <Fieldset legend="Tooltips on validation" className="mt-4">
                <input
                    ref={inputRef}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <Tooltip
                    mode="anchored"
                    anchorRef={inputRef}
                    enabled={email.length > 0 && !isValidEmail(email)}
                    content="Voer een geldig e-mailadres in"
                    direction="bottom"
                    background={ColorDefinitions.Red}
                />
            </Fieldset>

            <Fieldset legend="Tooltips on form label" className="mt-4">
                <label>
                    Gebruikersnaam

                    <span
                        ref={helpRef}
                        onMouseEnter={() => setShowHelp(true)}
                        onMouseLeave={() => setShowHelp(false)}
                    >
                        ❓
                    </span>
                </label>

                <Tooltip
                    mode="anchored"
                    anchorRef={helpRef}
                    enabled={showHelp}
                    content="Minimaal 6 tekens"
                    direction="top-right"
                />
            </Fieldset>

        </section>
    )
}

export default TooltipPage;