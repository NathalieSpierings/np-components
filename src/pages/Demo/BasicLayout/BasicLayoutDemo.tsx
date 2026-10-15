import React, { ReactElement, useEffect } from "react";
import { Link } from "react-router";
import { useLayoutContext } from "../../../components/Providers/LayoutContext/LayoutContext";
import Button from "../../../components/UI/Button/Button";
import useBreadcrumb from "../../../lib/hooks/useBreadcrumb";
import usePageTitle from "../../../lib/hooks/usePageTitle";

const BasicLayoutDemo = (): ReactElement => {
    const { showHeader, setShowHeader, fullscreen, setFullscreen } = useLayoutContext();

    usePageTitle("Basic layout", []);

    useBreadcrumb([
        { label: "Home", href: "/" },
        { label: "Demo", href: "/demo" },
        { label: "Basic layout", href: "/basic" },
    ]);

    // Layout-instellingen herstellen bij verlaten van de pagina
    useEffect(() => {
        return () => {
            setShowHeader(true);
            setFullscreen(false);
        };
    }, [setShowHeader, setFullscreen]);

    return (
        <>
            <p>
                De <strong>BasicLayout</strong> is een eenvoudige layout zonder menu, sidebar en drawer. Hij toont
                alleen een header met paginatitel en breadcrumb, en de content. Geschikt voor bijvoorbeeld
                login-, fout- of printpagina's.
            </p>

            <p>
                Titel en breadcrumb worden gezet met <code>usePageTitle</code> en <code>useBreadcrumb</code>, net
                als in de MainLayout.
            </p>

            <div className="flex gap-2 mt-4">
                <Button onClick={() => setShowHeader(!showHeader)}>
                    {showHeader ? "Header verbergen" : "Header tonen"}
                </Button>
                <Button onClick={() => setFullscreen(!fullscreen)}>
                    {fullscreen ? "Fullscreen uit" : "Fullscreen aan"}
                </Button>
            </div>

            <p className="mt-4">
                <Link to="/demo">Terug naar de demo (MainLayout)</Link>
            </p>
        </>
    );
};

export default BasicLayoutDemo;
