import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import AchoredDropdown from '../AnchoredDropdown';
import { AnchoredDropdown } from '..';
import { useState } from 'react';
import { Button } from '../../../UI/Button';
import { ColorDefinitions } from '../../../../lib/utils/definitions';
import { Card } from '../../../UI/Card';

const meta: Meta<typeof AchoredDropdown> = {
    title: 'Base/AchoredDropdown',
    component: AchoredDropdown
};

export default meta;
type Story = StoryObj<typeof AchoredDropdown>;

export const Default: StoryFn = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <AnchoredDropdown open={open} setOpen={setOpen}>
            <Button onClick={_ => setOpen(b => !b)}>Anchor (click me!)</Button>
            <Card background={ColorDefinitions.Theme100}
                        title={'Dropdown panel'}
                >
            </Card>
        </AnchoredDropdown>
    );
}

export const LongContents: StoryFn = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <AnchoredDropdown open={open} setOpen={setOpen}>
            <Button onClick={_ => setOpen(b => !b)}>Anchor (click me!)</Button>
            <Card background={ColorDefinitions.Theme100}
                        title={'DropdownPane'}
                >
                <p>Renders as part of document.Body, so strechted page if required</p>
                <div style={{minHeight: "100vh", backgroundColor: ColorDefinitions.Black}}>(Long div to show page stretching)</div>
            </Card>
        </AnchoredDropdown>
    );
}