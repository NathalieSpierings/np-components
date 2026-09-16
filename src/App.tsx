import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { RouterProvider, createBrowserRouter, useNavigation } from 'react-router';
import { LayoutProvider, useLayoutContext } from './components/Providers/LayoutContext/LayoutContext';
import { ToastrProvider, useToastr } from './components/Providers/ToastrContext/ToastrContext';
import Toastr from './components/UI/Toastr/Toastr';
import { IconDefinitions } from './lib/utils/definitions';
import { errorRoutes,  getInitialMenuItem,  routes } from './pages/routes';
import Avatar from './components/UI/Avatar/Avatar';
import SidebarAccount from './components/Page/Sidebar/SidebarAccount/SidebarAccount';
import { SidebarMenuPlacement } from './components/Page/Navigation/MainMenu/MainMenu';
import ErrorPage from './components/Page/ErrorPage/ErrorPage';
import BasicLayout from './components/Page/Basic/BasicLayout';
import { ConfirmDialogProvider, useConfirmDialog } from './components/Providers/ConfirmDialogContext/ConfirmDialogContext';
import { ScrollProvider } from './components/Providers/ScrollContext/ScrollContext';
import MainLayout from './components/Page/Main/MainLayout';
import ConfirmDialog from './components/UI/ConfirmDialog/ConfirmDialog';
import SidebarDemo from './pages/SidebarDemo';



const queryClient = new QueryClient();

const TemplateSidebarAccountMenu = () => {

    return (
        <SidebarAccount
            dropdownToggle={{
                prefix: (<Avatar border icon={IconDefinitions.user} />)
            }}
            dropdownHeader={{
                border: true,
                content: (
                    <>
                        <span>Welkom &nbsp;</span><strong>Testert</strong>
                    </>
                )
            }}
            menuItems={[
                {
                    label: 'Afmelden',
                    icon: (<svg><use xlinkHref="#svg_icon_power" /></svg>),
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
            placement: SidebarMenuPlacement.Top,
            sidebar: <SidebarDemo />,
            url: '/'
        },
        {
            id: 'demo',
            title: 'Demo',
            tooltip: 'Demo',
            iconName: IconDefinitions.paint_palette,
            placement: SidebarMenuPlacement.Top,
            // sidebar: <SidebarDemo />,
            url: '/demo'
        },       
    ]

    const nav = useNavigation();
    const loading = nav.state === 'loading';
    const { pageTitle, breadcrumbItems } = useLayoutContext();


    return (
        <MainLayout
            loading={loading}
            accountMenu={<TemplateSidebarAccountMenu />}
            currentMenuItem={getInitialMenuItem(location.pathname)}
            pageTitle={pageTitle}
            breadcrumbItems={breadcrumbItems}
            menuItems={menuItems}
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

  const basename = new URL(document.baseURI).pathname.replace(/\/$/, '');
  
   const router = createBrowserRouter([
        {
            path: "/",
            element: <TemplateLayout />,
            errorElement: <ErrorPage />,
            children: routes,
        },
        {
            path: '*',
            element: <BasicLayout />,
            errorElement: <ErrorPage />,
            children: errorRoutes
        },
    ], { basename: basename || undefined });


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
        </QueryClientProvider>
  )
}
