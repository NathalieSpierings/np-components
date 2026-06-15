import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, RouterProvider, createBrowserRouter, useNavigation } from 'react-router';
import { proxyPrefix } from './config';
import { IconDefinitions } from './lib/utils/definitions';
import { routes } from './pages/routes';
import { SvgSprite } from './assets/scss/SvgSprite';

const queryClient = new QueryClient();

const TemplateLayout = () => {

  // const menuItems = [
  //   {
  //     id: 'home',
  //     title: 'Home',
  //     tooltip: 'Home',
  //     iconName: IconDefinitions.home,
  //     placement: SidebarMenuPlacement.Top,
  //     url: '/'
  //   },
  //   {
  //     id: 'demo',
  //     title: 'demo',
  //     tooltip: 'Demo',
  //     url: '/demo',
  //     iconName: IconDefinitions.themes,
  //     duotone: true,
  //     placement: SidebarMenuPlacement.Top,
  //     sidebar: <SidebarDemo />
  //   },
  // ]

  const nav = useNavigation();
  // const loading = nav.state === 'loading';
  // const { pageTitle, breadcrumbItems } = useLayoutContext();
  // const [drawerRequest, setDrawerRequest] = useState<{ item: string; key: number; } | null>(null);

  return (
    <div className="page">
      <div className="page__container">
        <div className="page__content">
          <Outlet />
          <SvgSprite />
        </div>
      </div>
    </div>
    // <MainLayout
    //   loading={loading}
    //   currentMenuItem={getInitialMenuItem(location.pathname)}
    //   pageTitle={pageTitle}
    //   breadcrumbItems={breadcrumbItems}
    //   menuItems={menuItems}
    //   drawerRequest={drawerRequest}
    // />
  )
}



export default function App() {

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
      <RouterProvider router={router} />
    </QueryClientProvider>

    // <QueryClientProvider client={queryClient}>
    //   <LayoutProvider>
    //     <ToastrProvider>
    //       <RouterProvider router={router} />
    //       <TemplateToastr />
    //     </ToastrProvider>
    //   </LayoutProvider>
    // </QueryClientProvider>

  )
}
