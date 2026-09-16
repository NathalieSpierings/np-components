import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';

import React from 'react';
import { ColorDefinitions } from '../../../../lib/utils/definitions';
import Toggle from '../../../Forms/Toggle/Toggle';
import Title from '../../../Typography/Title/Title';
import Button from '../../Button/Button';
import Tabs from '../../Tabs/Tabs';
import Toolbar from '../Toolbar';

const meta: Meta<typeof Toolbar> = {
    title: 'UI kit/Toolbar',
    component: Toolbar,
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

export const Default: StoryFn = (args) => {
    return (
        <Toolbar
            title={<Title size="sm">My Title</Title>}
            prefixItems={[
                <Button key="btn1">Action</Button>,
                <Button key="btn2">Action</Button>
            ]}
            postfixItems={[
                <Toggle key='btnToggleProcessed'
                    color={ColorDefinitions.Primary}
                    label="Verwerkte dossiers verbergen"
                    labelPosition="left" checked={false} onChange={function (checked: boolean): void {
                        throw new Error('Function not implemented.');
                    }} />,
                <Toggle key='btnToggleArchived'
                    color={ColorDefinitions.Primary}
                    label="Gearchiveerd verbergen"
                    labelPosition="left" checked={false} onChange={function (checked: boolean): void {
                        throw new Error('Function not implemented.');
                    }} />
            ]}
        />
    );
};

export const TitleOnly: StoryFn = (args) => {
    return (
        <Toolbar title={<Title size="sm">My Title</Title>} />
    );
};

export const TitleAndPrefixActions: StoryFn = () => {
    return (
        <Toolbar title={<Title size="sm">My Title</Title>}
            prefixItems={[
                <Button key="btn1">Action</Button>,
                <Button key="btn2">Action</Button>
            ]}
        />
    );
};

export const TitleAndPostfixActions: StoryFn = () => {
    return (
        <Toolbar
            title={<Title size="sm">My Title</Title>}
            postfixItems={[
                <Toggle key='btnToggleProcessed'
                    color={ColorDefinitions.Primary}
                    label="Verwerkte dossiers verbergen"
                    labelPosition="left" checked={false} onChange={function (checked: boolean): void {
                        throw new Error('Function not implemented.');
                    }} />,
                <Toggle key='btnToggleArchived'
                    color={ColorDefinitions.Primary}
                    label="Gearchiveerd verbergen"
                    labelPosition="left" checked={false} onChange={function (checked: boolean): void {
                        throw new Error('Function not implemented.');
                    }} />
            ]}
        />
    );
};

export const PreAndPostfixActionsOnly: StoryFn = () => {
    return (
        <Toolbar
            prefixItems={[
                <Button key="btn1">Action</Button>,
                <Button key="btn2">Action</Button>
            ]}
            postfixItems={[
                <Toggle key='btnToggleProcessed'
                    color={ColorDefinitions.Primary}
                    label="Verwerkte dossiers verbergen"
                    labelPosition="left" checked={false} onChange={function (checked: boolean): void {
                        throw new Error('Function not implemented.');
                    }} />,
                <Toggle key='btnToggleArchived'
                    color={ColorDefinitions.Primary}
                    label="Gearchiveerd verbergen"
                    labelPosition="left" checked={false} onChange={function (checked: boolean): void {
                        throw new Error('Function not implemented.');
                    }} />
            ]}
        />
    );
};

export const DefaultAndNavItems: StoryFn = (args) => {
    return (
        <Toolbar
            title={<Title size="sm">My Title</Title>}
            prefixItems={[
                <Button key="btn1">Action</Button>,
                <Button key="btn2">Action</Button>
            ]}
            postfixItems={[
                <Toggle key='btnToggleProcessed'
                    color={ColorDefinitions.Primary}
                    label="Verwerkte dossiers verbergen"
                    labelPosition="left" checked={false} onChange={function (checked: boolean): void {
                        throw new Error('Function not implemented.');
                    }} />,
                <Toggle key='btnToggleArchived'
                    color={ColorDefinitions.Primary}
                    label="Gearchiveerd verbergen"
                    labelPosition="left" checked={false} onChange={function (checked: boolean): void {
                        throw new Error('Function not implemented.');
                    }} />
            ]}
            navItems={(
                <Tabs
                    tabs={[
                        { index: 0, label: "Tab 1" },
                        { index: 1, label: "Tab 2" },
                    ]}
                    borderBottomColor={ColorDefinitions.None} 
                    selectedTab={0}
                    />
            )}
        />
    );
};

export const NavItemsAfterPrefixActions: StoryFn = (args) => {
    return (
        <Toolbar navItemsPosition='after prefix actions'
            title={<Title size="sm">My Title</Title>}
            prefixItems={[
                <Button key="btn1">Action</Button>,
                <Button key="btn2">Action</Button>
            ]}
            postfixItems={[
                <Toggle key='btnToggleProcessed'
                    color={ColorDefinitions.Primary}
                    label="Verwerkte dossiers verbergen"
                    labelPosition="left" checked={false} onChange={function (checked: boolean): void {
                        throw new Error('Function not implemented.');
                    }} />,
                <Toggle key='btnToggleArchived'
                    color={ColorDefinitions.Primary}
                    label="Gearchiveerd verbergen"
                    labelPosition="left" checked={false} onChange={function (checked: boolean): void {
                        throw new Error('Function not implemented.');
                    }} />
            ]}
            navItems={(
                <Tabs
                    tabs={[
                        { index: 0, label: "Tab 1" },
                        { index: 1, label: "Tab 2" },
                    ]}
                    borderBottomColor={ColorDefinitions.None} 
                    selectedTab={0}
                    />
            )}
        />
    );
};

export const NavItemsRight: StoryFn = (args) => {
    return (
        <Toolbar navItemsPosition='right'
            title={<Title size="sm">My Title</Title>}
            prefixItems={[
                <Button key="btn1">Action</Button>,
                <Button key="btn2">Action</Button>
            ]}
            postfixItems={[
                <Toggle key='btnToggleProcessed'
                    color={ColorDefinitions.Primary}
                    label="Verwerkte dossiers verbergen"
                    labelPosition="left" checked={false} onChange={function (checked: boolean): void {
                        throw new Error('Function not implemented.');
                    }} />,
                <Toggle key='btnToggleArchived'
                    color={ColorDefinitions.Primary}
                    label="Gearchiveerd verbergen"
                    labelPosition="left" checked={false} onChange={function (checked: boolean): void {
                        throw new Error('Function not implemented.');
                    }} />
            ]}
            navItems={(
                <Tabs
                    tabs={[
                        { index: 0, label: "Tab 1" },
                        { index: 1, label: "Tab 2" },
                    ]}
                    borderBottomColor={ColorDefinitions.None} 
                    selectedTab={0}
                    />
            )}
        />
    );
};