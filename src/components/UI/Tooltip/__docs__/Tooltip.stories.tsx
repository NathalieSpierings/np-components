import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { useRef, useState } from 'react';
import { ColorDefinitions } from '../../../../lib/utils/definitions';
import { Input } from '../../../Forms/Input/Input';
import Tooltip from '../Tooltip';
import { SvgSprite } from '../../../../assets/SvgSprite';

const meta: Meta<typeof Tooltip> = {
    title: 'UI kit/Tooltip',
    component: Tooltip,
    decorators: [
        (Story) => (
            <div style={{ margin: '250px' }}>
                <SvgSprite />
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Directions: StoryFn = () => {
    return (
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
    );
};

export const Default: StoryFn = () => {
    return (
        <Tooltip content="Default tooltip">
            <button type="button">Hover me</button>
        </Tooltip>
    )
};

export const Colored: StoryFn = () => {
    return (
        <Tooltip content="I am a tooltip" background={ColorDefinitions.Magenta}>
            Hover me
        </Tooltip>
    )
};


export const RenderHtml: StoryFn = () => {
    return (
        <Tooltip renderHtml content="<strong>Warning!</strong> <p>I am a HTML tooltip</p>"
            background={ColorDefinitions.Magenta}>
            Hover me
        </Tooltip>
    )
};

export const OnMobile: StoryFn = () => {
    return (
        <>
            <Tooltip
                content="I will flip to left on mobile or tablet"
                direction='right'
                background={ColorDefinitions.Magenta}>
                Hover me
            </Tooltip>

            <br /><br />
            <Tooltip
                content="I will flip to right on mobile or tablet"
                direction='left'
                background={ColorDefinitions.Magenta}>
                Hover me
            </Tooltip>
        </>
    )
};


export const TruncatedText: StoryFn = () => {

    return (
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
    )
};


export const TipOnOverflow: StoryFn = () => {
    const organisationName = "Grotthenburger middle leben"

    return (
        <div  style={{width: "150px"}}>
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
    )
};

export const Anchors: StoryFn = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [enabled, setEnabled] = useState(false);

    const iconRef = useRef<HTMLSpanElement>(null);
    const [showInfo, setShowInfo] = useState(false);

    return (
        <>
            <button
                type="button"
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
        </>
    )
};

export const OnClick: StoryFn = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);

    return (
        <>
            <button 
                type="button"
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
        </>
    )
};

export const OnValidation: StoryFn = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [email, setEmail] = useState('test@test.com');

    const isValidEmail = (value: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };
    return (
        <>
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
                background={ColorDefinitions.Rose30}
            />
        </>
    )
};

export const OnFormlabel: StoryFn = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    const helpRef = useRef<HTMLSpanElement>(null);
    const [showHelp, setShowHelp] = useState(false);

    return (
        <>
            <Input label="I am a test"
                customContent={(
                    <span
                        ref={helpRef}
                        onMouseEnter={() => setShowHelp(true)}
                        onMouseLeave={() => setShowHelp(false)}
                    >
                        ❓
                    </span>
                )

                } />
            <Tooltip
                mode="anchored"
                anchorRef={buttonRef}
                enabled={open}
                content="Toggle tooltip"
                direction="right"
            />
        </>
    )
};

