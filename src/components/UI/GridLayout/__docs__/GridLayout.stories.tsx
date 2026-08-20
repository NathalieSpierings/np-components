import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { ColorDefinitions } from '../../../../lib/utils/definitions';
import Button from '../../../UI/Button/Button';
import GridLayout from '../GridLayout';
import React from 'react';
import { Toolbar } from '../../Toolbar';

const meta: Meta<typeof GridLayout> = {
    title: 'Layout/Grid layout',
    component: GridLayout,
    parameters: {
        layout: 'fullscreen',
    }
};

export default meta;
type Story = StoryObj<typeof GridLayout>;

export const Default: StoryFn = () => {
    const [open, setOpen] = useState<boolean | null>(null);

    return (

        <GridLayout
            open={open}
            openDrawer={setOpen}
            drawerTitle="Filter"
            drawerContent={<div>Content for drawer goes here...</div>}
        >
            <Toolbar
                navItems={(
                    <Button
                        onClick={() => {
                            setOpen(!open);
                        }}
                    >
                        Filter
                    </Button>
                )}
            />
            I am content
        </GridLayout>

    );
};

export const WithoutDrawer: StoryFn = () => {
    const [open, setOpen] = useState<boolean | null>(null);

    return (
        <GridLayout>
            
            <Toolbar
                navItems={(
                    <Button
                        onClick={() => {
                            setOpen(!open);
                        }}
                    >
                        Filter
                    </Button>
                )}
            />
            I am content
        </GridLayout>
    );
};

export const Divider: StoryFn = () => {
    const [open, setOpen] = useState<boolean | null>(null);

    return (
        <GridLayout
            open={open}
            openDrawer={setOpen}
            drawerTitle="Filter"
            dividerBorderColor={ColorDefinitions.Surface}
            drawerContent={<div>Content for drawer goes here...</div>}
        >
            
            <Toolbar
                navItems={(
                    <Button
                        onClick={() => {
                            setOpen(!open);
                        }}
                    >
                        Filter
                    </Button>
                )}
            />
            I am content
        </GridLayout>
    );
};

export const DrawerHeaderBorder: StoryFn = () => {
    const [open, setOpen] = useState<boolean | null>(null);

    return (
        <GridLayout
            open={open}
            openDrawer={setOpen}
            drawerTitle="Filter"
            drawerHeaderBorderColor={ColorDefinitions.Surface}
            drawerContent={<div>Content for drawer goes here...</div>}
        >
            <Toolbar
                navItems={(
                    <Button
                        onClick={() => {
                            setOpen(!open);
                        }}
                    >
                        Filter
                    </Button>
                )}
            />
            I am content
        </GridLayout>
    );
};
