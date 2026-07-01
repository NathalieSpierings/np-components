import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, RouterProvider, createBrowserRouter } from 'react-router';
import { SvgSprite } from './assets/SvgSprite';
import { proxyPrefix } from './config';
import { routes } from './pages/routes';

const queryClient = new QueryClient();


const TemplateLayout = () => {

  const [theme, setTheme] = useState("theme-dark");


  useEffect(() => {
    const html = document.documentElement;
    html.dataset.theme = theme;
    html.className = theme;
  }, [theme]);

  return (
    <div className="page fullscreen">

      <div className="theme shown">
        <button className="theme__item theme-light" onClick={() => setTheme("theme-light")} />
        <button className="theme__item theme-dimmed" onClick={() => setTheme("theme-dimmed")} />
        <button className="theme__item theme-dark" onClick={() => setTheme("theme-dark")} />
      </div>


      <div className="header">
        <div>
          <Link to="/demo">Back to demo</Link>
        </div>
      </div>
      <div className="page__container">
        <div className="page__content">

          <Outlet />
          <SvgSprite />
        </div>
      </div>
    </div>

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
