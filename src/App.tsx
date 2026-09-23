import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import { RouterProvider, createBrowserRouter, useNavigation } from 'react-router';
import MainLayout from './components/Page/Main/MainLayout';
import { SidebarMenuPlacement } from './components/Page/Navigation/MainMenu/MainMenu';
import SidebarAccount from './components/Page/Sidebar/SidebarAccount/SidebarAccount';
import { ConfirmDialogProvider, useConfirmDialog } from './components/Providers/ConfirmDialogContext/ConfirmDialogContext';
import { LayoutProvider, useLayoutContext } from './components/Providers/LayoutContext/LayoutContext';
import { ScrollProvider } from './components/Providers/ScrollContext/ScrollContext';
import { ToastrProvider, useToastr } from './components/Providers/ToastrContext/ToastrContext';
import Avatar from './components/UI/Avatar/Avatar';
import ConfirmDialog from './components/UI/ConfirmDialog/ConfirmDialog';
import Toastr from './components/UI/Toastr/Toastr';
import { IconDefinitions, SizeDefinitions } from './lib/utils/definitions';
import { getInitialMenuItem, routes } from './pages/routes';
import SidebarDemo from './pages/SidebarDemo';
import Settings from './pages/Settings';

const queryClient = new QueryClient();

interface TemplateSidebarAccountMenuProps {
    onOpenSettings: () => void;
}

const TemplateSidebarAccountMenu: React.FC<TemplateSidebarAccountMenuProps> = ({
    onOpenSettings,
}) => {


    const auth = {
        name: 'John Do',
    }

    const logout = () => {
        return console.info('Logged out!')
    }

    return (
        <SidebarAccount

            dropdownToggle={{
                prefix: (<Avatar size={SizeDefinitions.Small} icon={IconDefinitions.user} />),
                arrow: false
            }}
            dropdownHeader={{
                border: true,
                content: (
                    <>
                        <span>Welkom &nbsp;</span><strong>{auth ? auth.name : ''}</strong>
                    </>
                )
            }}
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




// const TemplateSidebarAccountMenu = () => {

//     return (
//         <SidebarAccount
//             dropdownToggle={{
//                 prefix: (<Avatar border icon={IconDefinitions.user} />)
//             }}
//             dropdownHeader={{
//                 border: true,
//                 content: (
//                     <>
//                         <span>Welkom &nbsp;</span><strong>Testert</strong>
//                     </>
//                 )
//             }}
//             menuItems={[
//                 {
//                     label: 'Afmelden',
//                     icon: (<svg><use xlinkHref="#svg_icon_power" /></svg>),
//                 }]}
//         />
//     )
// }

const TemplateLayout = () => {

    const menuItems = [
        {
            id: 'home',
            title: 'Home',
            tooltip: 'Home',
            iconName: IconDefinitions.home,
            placement: SidebarMenuPlacement.Top,
            url: '/'
        },
        {
            id: 'demo',
            title: 'demo',
            tooltip: 'Demo',
            url: '/demo',
            iconName: IconDefinitions.paint_palette,
            duotone: true,
            placement: SidebarMenuPlacement.Top,
            sidebar: <SidebarDemo />
        },
        {
            id: "settings",
            title: "Instellingen",
            tooltip: "Instellingen",
            iconName: IconDefinitions.cog,
            placement: SidebarMenuPlacement.Bottom,
            sidebarDrawerTitle:
                <>
                    <h4>Mijn voorkeuren</h4>
                    <h6 className="mt-1 text-mute">Instellen</h6>
                </>,
            sidebarDrawerWidth: '400px',
            sidebarDrawer: <Settings />,
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
            accountMenu={<TemplateSidebarAccountMenu onOpenSettings={openSettingsDrawer} />}
            currentMenuItem={getInitialMenuItem(location.pathname)}
            pageTitle={pageTitle}
            breadcrumbItems={breadcrumbItems}
            menuItems={menuItems}
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
