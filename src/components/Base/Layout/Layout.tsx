import React, { ReactElement } from "react";
import { Outlet } from "react-router";
import { SvgSprite } from "../../../assets/SvgSprite";

export interface LayoutProps {
    shown?: boolean;
    setShown?: () => void;
}

const Layout = ({
    shown = false,
}: Readonly<LayoutProps>): ReactElement => {


    return (
        <div className="page np-root">
            <div className="np-root__content">
                <div className={`page-menu np-root__aside ${shown}`}>
                    Menu
                    </div>
                <div className="page-submenu np-root__aside shown">
                    Submenu
                    </div>
                <main className="np-root__main">
                    <Outlet />
                </main>
            </div>

            <SvgSprite />
        </div>
    );
};

export default Layout;
