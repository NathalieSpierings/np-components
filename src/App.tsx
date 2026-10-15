import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import { RouterProvider, createBrowserRouter, useNavigation } from 'react-router';
import MainLayout from './components/Page/Main/MainLayout';
import SidebarAccount from './components/Page/Sidebar/SidebarAccount/SidebarAccount';
import { ConfirmDialogProvider, useConfirmDialog } from './components/Providers/ConfirmDialogContext/ConfirmDialogContext';
import { LayoutProvider, useLayoutContext } from './components/Providers/LayoutContext/LayoutContext';
import { ScrollProvider } from './components/Providers/ScrollContext/ScrollContext';
import { ToastrProvider, useToastr } from './components/Providers/ToastrContext/ToastrContext';
import Avatar from './components/UI/Avatar/Avatar';
import ConfirmDialog from './components/UI/ConfirmDialog/ConfirmDialog';
import Toastr from './components/UI/Toastr/Toastr';
import { IconDefinitions, VerticalPositionDefinition } from './lib/utils/definitions';
import { getInitialMenuItem, routes } from './pages/routes';
import Settings from './pages/Settings';
import SidebarDemo from './pages/SidebarDemo';

const queryClient = new QueryClient();

interface TemplateSidebarAccountMenuProps {
    onOpenSettings: () => void;
}

const TemplateSidebarAccountMenu: React.FC<TemplateSidebarAccountMenuProps> = ({
    onOpenSettings,
}) => {

    const auth = {
        name: 'John Do',
        family_name: 'Do'
    }

    const logout = () => {
        return console.info('Logged out!')
    }


    const firstName = auth?.name?.trim() ?? '';
    const familyName = auth?.family_name?.trim() ?? '';

    const initials = (firstName.charAt(0) + familyName.charAt(0)).toUpperCase() || undefined;
    const fullName = [firstName, familyName].filter(Boolean).join(' ') || undefined;

    return (
        <SidebarAccount

            dropdownToggle={{
                prefix: initials
                    ? (<Avatar border autoColor initials={initials} tooltip={fullName} />)
                    : (<Avatar border icon={IconDefinitions.user} />)
            }}
            {...(auth && {
                dropdownHeader: {
                    border: true,
                    content: (<span>Welkom <strong>{auth.name}</strong></span>),
                },
            })}
            menuItems={[
                {
                    id: 'instellingen',
                    label: 'Instellingen',
                    icon: (<svg><use xlinkHref="#svg_icon_cog" /></svg>),
                    onClick: onOpenSettings
                },
                {
                    id: 'divider',
                    divider: true,
                },
                {
                    label: 'Afmelden',
                    icon: (<svg><use xlinkHref="#svg_icon_power" /></svg>),
                    onClick: logout
                }]}
        />
    )
}

const TemplateLayout = () => {

    const menuItems = [
        {
            id: 'home',
            title: 'Home',
            tooltip: 'Home',
            iconName: IconDefinitions.home,
            placement: VerticalPositionDefinition.Top,
            url: '/'
        },
        {
            id: 'demo',
            title: 'demo',
            tooltip: 'Demo',
            url: '/demo',
            iconName: IconDefinitions.paint_palette,
            duotone: true,
            placement: VerticalPositionDefinition.Top,
            sidebar: <SidebarDemo />
        },
        {
            id: "settings",
            title: "Instellingen",
            tooltip: "Instellingen",
            iconName: IconDefinitions.cog,
            placement: VerticalPositionDefinition.Bottom,
            drawerTitle: 'Testkip',
            drawerWidth: '400px',
            drawer: <Settings />,
        },


    ]

    const nav = useNavigation();
    const loading = nav.state === 'loading';
    const { pageTitle, breadcrumbItems } = useLayoutContext();
    const [drawerRequest, setDrawerRequest] = useState<{ item: string; key: number; } | null>(null);

    const openSettingsDrawer = () => {
        setDrawerRequest({ item: 'settings', key: Date.now(), });
    };

    return (
        <MainLayout
            loading={loading}
            pageTitle={pageTitle}
            breadcrumbItems={breadcrumbItems}
            menuItems={menuItems}
            currentMenuItem={getInitialMenuItem(location.pathname)}
            accountMenu={<TemplateSidebarAccountMenu onOpenSettings={openSettingsDrawer} />}
            drawerRequest={drawerRequest}
        />
    )
}


const TemplateToastr = () => {
    const { toasts, dequeue } = useToastr();

    return (
        <Toastr
            duration={15000}
            toasts={toasts}
            removeToastrItem={dequeue}
        />
    );
}

const TemplateConfimDialog = () => {
    const { items, dequeue } = useConfirmDialog();

    return (
        <ConfirmDialog
            confirmDialogs={items}
            removeConfirmDialog={dequeue}
        />
    );
}


export default function App() {

    const proxyPrefix = new URL(document.baseURI).pathname.replace(/\/$/, '');

    const router = createBrowserRouter(
        [
            {
                path: "/",
                element: <TemplateLayout />,
                children: routes,
            }
        ],
        { basename: proxyPrefix || undefined }
    );

    return (
        <QueryClientProvider client={queryClient}>
            <LayoutProvider>
                <ToastrProvider>
                    <ConfirmDialogProvider>
                        <ScrollProvider>
                            <RouterProvider router={router} />
                            <TemplateToastr />
                            <TemplateConfimDialog />
                        </ScrollProvider>
                    </ConfirmDialogProvider>
                </ToastrProvider>
            </LayoutProvider>
        </QueryClientProvider >
    )
}
