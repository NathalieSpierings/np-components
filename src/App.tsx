import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, RouterProvider, createBrowserRouter, useNavigation } from 'react-router';
import { SvgSprite } from './assets/SvgSprite';
import { proxyPrefix } from './config';
import { routes } from './pages/routes';
import PageLoader from './components/Page/PageLoader/PageLoader';
import { LayoutProvider } from './components/Providers/LayoutContext/LayoutContext';
import { ToastrProvider, useToastr } from './components/Providers/ToastrContext/ToastrContext';
import Toastr from './components/UI/Toastr/Toastr';

const queryClient = new QueryClient();


const TemplateLayout = () => {

  const [theme, setTheme] = useState("theme-light");


  useEffect(() => {
    const html = document.documentElement;
    html.dataset.theme = theme;
    html.className = theme;
  }, [theme]);

  const nav = useNavigation();
  const loading = nav.state === 'loading';

  return (
    <>
      <PageLoader loading={loading} />
      <div className="page page--fullscreen">

        <div className="theme shown">
          <button type="button" className="theme__item theme-light" onClick={() => setTheme("theme-light")} />
          <button type="button" className="theme__item theme-dimmed" onClick={() => setTheme("theme-dimmed")} />
          <button type="button" className="theme__item theme-dark" onClick={() => setTheme("theme-dark")} />
        </div>

        <div className="page__container">
          <div className="page__content">
            <div>
              <Link to="/demo">Back to demo</Link>
            </div>
            <Outlet />

          </div>
        </div>
      </div>
      <SvgSprite />
    </>
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
    // <QueryClientProvider client={queryClient}>
    //   <RouterProvider router={router} />
    // </QueryClientProvider>

    <QueryClientProvider client={queryClient}>
      <LayoutProvider>
        <ToastrProvider>
          <RouterProvider router={router} />
          <TemplateToastr />
        </ToastrProvider>
      </LayoutProvider>
    </QueryClientProvider>

  )
}
