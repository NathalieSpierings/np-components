import React, { ReactElement } from "react";
import useBreadcrumb from "../lib/hooks/useBreadcrumb";
import usePageTitle from "../lib/hooks/usePageTitle";

const DemoPage = ({
}): ReactElement => {

    usePageTitle("Home", []);

    useBreadcrumb([
        { label: "Home", href: "/" },
    ]);
    
    return (       
        <>
        <h3>Welkom to the demo page</h3>
        <p>Select a demo to watch </p>
      
        </>
    )
}

export default DemoPage;