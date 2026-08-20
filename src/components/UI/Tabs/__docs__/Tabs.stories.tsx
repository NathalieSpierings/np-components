import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import React , { Fragment, useState } from 'react';
import { ColorDefinitions, IconDefinitions } from '../../../../lib/utils/definitions';
import TabPane from '../TabPane';
import TabPanes from '../TabPanes';
import Tabs from '../Tabs';

const meta: Meta<typeof Tabs> = {
    title: 'UI kit/Tabs',
    component: Tabs,
    parameters: {
        layout: 'centered',
    },

};

export default meta;
type Story = StoryObj<typeof Tabs>;

// Create the content components

const ContentOne = () => (
    <Fragment>
        <h3>Tab One</h3>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sint illum iusto nostrum cumque qui
            voluptas tenetur inventore ut quis?
        </p>
    </Fragment>
);
const ContentTwo = () => (
    <Fragment>
        <h3>Tab Two</h3>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sint illum iusto nostrum cumque qui
            voluptas tenetur inventore ut quis?
        </p>
    </Fragment>
);
const ContentThree = () => (
    <Fragment>
        <h3>Tab Three</h3>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sint illum iusto nostrum cumque qui
            voluptas tenetur inventore ut quis?
        </p>
    </Fragment>
);

const Home = () => (
    <Fragment>
        <h3>Home</h3>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sint illum iusto nostrum cumque qui
            voluptas tenetur inventore ut quis?
        </p>
    </Fragment>
);
const About = () => (
    <Fragment>
        <h3>About</h3>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sint illum iusto nostrum cumque qui
            voluptas tenetur inventore ut quis?
        </p>
    </Fragment>
);
const Contact = () => (
    <Fragment>
        <h3>Contact</h3>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sint illum iusto nostrum cumque qui
            voluptas tenetur inventore ut quis?
        </p>
    </Fragment>
);

const Products = () => (
    <Fragment>
        <h3>Products</h3>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sint illum iusto nostrum cumque qui
            voluptas tenetur inventore ut quis?
        </p>
    </Fragment>
);
const Customers = () => (
    <Fragment>
        <h3>Customers</h3>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sint illum iusto nostrum cumque qui
            voluptas tenetur inventore ut quis?
        </p>
    </Fragment>
);
const Sales = () => (
    <Fragment>
        <h3>Sales</h3>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sint illum iusto nostrum cumque qui
            voluptas tenetur inventore ut quis?
        </p>
    </Fragment>
);

const tabs = [
    {
        label: 'Tab One',
        index: 1,
        Component: ContentOne,
    },
    {
        label: 'Tab Two',
        index: 2,
        Component: ContentTwo,
    },
    {
        label: 'Tab Three',
        index: 3,
        Component: ContentThree,
    },
];

const verticalTabs = [
    {
        label: 'Home',
        index: 1,
        Component: Home,
    },
    {
        label: 'About',
        index: 2,
        Component: About,
    },
    {
        label: 'Contact',
        index: 3,
        Component: Contact,
    },
];

const pillTabs = [
    {
        label: 'Products',
        index: 1,
        Component: Products,
    },
    {
        label: 'Customers',
        index: 2,
        Component: Customers,
    },
    {
        label: 'Sales',
        index: 3,
        Component: Sales,
    },
];

export const Default: StoryFn = (args) => {
    const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);

    return <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs} />;
};


const TestTab1: React.FC = () => <div>Test Content 1</div>;
const TestTab2: React.FC = () => <div>Test Content 2</div>;



export const NewStyle: StoryFn = (args) => {
     const [selectedTab, setSelectedTab] = useState(0);

    return (
       <>
        <Tabs
          borderBottomColor={ColorDefinitions.None}
          tabs={[
            {index: 0, label: "Rapportages" },
            {index: 1, label: "Retourinformatie" },
          ]}
          selectedTab={selectedTab}
          onClick={setSelectedTab}
        />

        <TabPanes selectedTab={selectedTab}>
          <TabPane >Rapportages content goes here</TabPane>
          <TabPane>Retourinformatie content goes here</TabPane>
        </TabPanes>
       </>
    );
};

export const Vertical: StoryFn = (args) => {
    const [selectedVerticalTab, setSelectedVerticalTab] = useState<number>(verticalTabs[0].index);

    return (
        <Tabs
            variant="vertical"
            selectedTab={selectedVerticalTab}
            onClick={setSelectedVerticalTab}
            tabs={verticalTabs}
        />
    );
};

export const Pills: StoryFn = (args) => {
    const [selectedPillTab, setSelectedPillTab] = useState<number>(pillTabs[0].index);

    return <Tabs variant="pills" selectedTab={selectedPillTab} onClick={setSelectedPillTab} tabs={pillTabs} />;
};

export const Accent: StoryFn = (args) => {
    const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);
    return <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs} accentColor={ColorDefinitions.Blue} />;
};

export const PillsAccent: StoryFn = (args) => {
    const [selectedPillTab, setSelectedPillTab] = useState<number>(pillTabs[0].index);

    return (
        <Tabs
            variant="pills"
            selectedTab={selectedPillTab}
            onClick={setSelectedPillTab}
            tabs={pillTabs}
            accentColor={ColorDefinitions.Blue}
        />
    );
};

export const Disabled: StoryFn = () => {
    const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);
    return (
        <Tabs
            selectedTab={selectedTab}
            onClick={setSelectedTab}
            tabs={[
                {
                    label: 'Tab One',
                    index: 1,
                    Component: ContentOne,
                },
                {
                    label: 'Tab Two',
                    index: 2,
                    disabled: true,
                    Component: ContentTwo,
                },
                {
                    label: 'Tab Three',
                    index: 3,
                    Component: ContentThree,
                },
            ]}
        />
    );
};

export const WithIcons: StoryFn = () => {
    const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);
    return (
            <Tabs
                selectedTab={selectedTab}
                onClick={setSelectedTab}
                tabs={[
                    {
                        label: 'Tab One',
                        index: 1,
                        iconName: IconDefinitions.star,
                        Component: ContentOne,
                    },
                    {
                        label: 'Tab Two',
                        index: 2,
                        iconName: IconDefinitions.calendar,
                        Component: ContentTwo,
                    },
                    {
                        label: 'Tab Three',
                        index: 3,
                        iconName: IconDefinitions.bulb,
                        Component: ContentThree,
                    },
                ]}
            />
    );
};

export const WithIconsPosition: StoryFn = () => {
    const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);
    return (
            <Tabs
                selectedTab={selectedTab}
                onClick={setSelectedTab}
                tabs={[
                    {
                        label: 'Tab One',
                        index: 1,
                        iconName: IconDefinitions.star,
                        iconPosition: 'left',
                        Component: ContentOne,
                    },
                    {
                        label: 'Tab Two',
                        index: 2,
                        iconName: IconDefinitions.calendar,
                        iconPosition: 'right',
                        Component: ContentTwo,
                    },
                    {
                        label: 'Tab Three',
                        index: 3,
                        iconName: IconDefinitions.bulb,
                        iconPosition: 'left',
                        Component: ContentThree,
                    },
                ]}
            />
    );
};

export const WithAccentColors: StoryFn = () => {
    enum DsTeam {
        Rood = "Rood",
        Oranje = "Oranje",
        Blauw = "Blauw",
    }
    const [selectedTab, setSelectedTab] = useState<DsTeam>(DsTeam.Rood);

    return (
            <Tabs
                selectedTab={selectedTab}
                onClick={setSelectedTab}
                variant="pills"
                tabs={[
                    {
                        label: 'Team rood',
                        index: DsTeam.Rood,
                        accentColor: ColorDefinitions.Rose30,
                    },
                    {
                        label: 'Team oranje',
                        index: DsTeam.Oranje,
                        accentColor: ColorDefinitions.Orange,
                    },
                    {
                        label: 'Team Blauw',
                        index: DsTeam.Blauw,
                        accentColor: ColorDefinitions.Blue,
                    },
                ]}
            />
    );
};
