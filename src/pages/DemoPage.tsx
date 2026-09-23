import React, { ReactElement } from "react";
import useBreadcrumb from "../lib/hooks/useBreadcrumb";
import usePageTitle from "../lib/hooks/usePageTitle";
import ColorSwatch from "../components/Base/colors/ColorSwatch";

const DemoPage = ({
}): ReactElement => {

   usePageTitle("Demo Page", []);

    useBreadcrumb([
        { label: "Home", href: "/" },
        { label: "Demo", href: "/demo" },
    ]);


    
    return (       
        <>
            <p> Welcome to the demo page</p>

            <h3>Borders</h3>
            <div className="grid mb-3">
                <div className="bg-surface-light p-2">
                    <div className="box border-surface-light p-2">I have a border</div>
                </div>
                <div className="bg-surface p-2">
                    <div className="box border-surface p-2">I have a border</div>
                </div>
                <div className="bg-surface-dark p-2">
                    <div className="box border-surface p-2">I have a border</div>
                </div>
            </div>


            <h3> Theme Colors</h3>
            <ColorSwatch theme={true}/>

            <h3> Colors</h3>    
            <ColorSwatch/>
          
        </>

    )
}

export default DemoPage;