import React, { ReactElement } from "react";
import useBreadcrumb from "../lib/hooks/useBreadcrumb";
import usePageTitle from "../lib/hooks/usePageTitle";

const HomePage = ({
}): ReactElement => {

    usePageTitle("Home", []);

    useBreadcrumb([
        { label: "Home", href: "/" },
    ]);

    return (
        <>
        Home
        </>
    )
}

export default HomePage;