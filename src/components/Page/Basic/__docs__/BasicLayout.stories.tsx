import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { PropsWithChildren, ReactElement, useEffect } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { LayoutProvider, useLayoutContext } from '../../../Providers/LayoutContext/LayoutContext';
import BasicLayout, { BasicLayoutProps } from '../BasicLayout';

/* ------------------------------------------------------------------ */
/* Voorbeeld-content                                                  */
/* ------------------------------------------------------------------ */

const PageContent = (): ReactElement => (
    <>
        <p>
            De <strong>BasicLayout</strong> toont alleen een header met paginatitel en breadcrumb, en de content.
            Er is geen menu, sidebar of drawer.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat.
        </p>
    </>
);

/* ------------------------------------------------------------------ */
/* Story-wrappers                                                     */
/* ------------------------------------------------------------------ */

const renderWithRouter = (args: BasicLayoutProps): ReactElement => (
    <MemoryRouter initialEntries={['/']}>
        <Routes>
            <Route path="/" element={<BasicLayout {...args} />}>
                <Route index element={<PageContent />} />
            </Route>
        </Routes>
    </MemoryRouter>
);

// Zet showHeader / fullscreen in de LayoutContext voor een story
const LayoutSettings = ({
    showHeader = true,
    fullscreen = false,
    children,
}: PropsWithChildren<{ showHeader?: boolean; fullscreen?: boolean }>): ReactElement => {
    const { setShowHeader, setFullscreen } = useLayoutContext();

    useEffect(() => {
        setShowHeader(showHeader);
        setFullscreen(fullscreen);
    }, [showHeader, fullscreen, setShowHeader, setFullscreen]);

    return <>{children}</>;
};

/* ------------------------------------------------------------------ */
/* Meta                                                               */
/* ------------------------------------------------------------------ */

const meta: Meta<typeof BasicLayout> = {
    title: 'Page/Basic layout',
    component: BasicLayout,
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        loading: false,
        pageTitle: 'Mijn pagina',
        breadcrumbItems: [
            { label: 'Home', href: '#' },
            { label: 'Mijn pagina', href: '#' },
        ],
    },
    decorators: [
        (Story) => (
            <LayoutProvider>
                <div style={{ height: '640px' }}>
                    <Story />
                </div>
            </LayoutProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof BasicLayout>;

/* ------------------------------------------------------------------ */
/* Stories                                                            */
/* ------------------------------------------------------------------ */

export const Default: Story = {
    render: (args) => renderWithRouter(args),
};

export const Loading: Story = {
    args: {
        loading: true,
    },
    render: (args) => renderWithRouter(args),
};

export const WithoutHeader: Story = {
    decorators: [
        (Story) => (
            <LayoutSettings showHeader={false}>
                <Story />
            </LayoutSettings>
        ),
    ],
    render: (args) => renderWithRouter(args),
};

export const Fullscreen: Story = {
    decorators: [
        (Story) => (
            <LayoutSettings fullscreen={true}>
                <Story />
            </LayoutSettings>
        ),
    ],
    render: (args) => renderWithRouter(args),
};
