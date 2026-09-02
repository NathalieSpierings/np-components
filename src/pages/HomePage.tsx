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
       <h3>Welkom to the home page</h3>
    )
}

export default HomePage;