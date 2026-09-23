import React, { ReactElement, useEffect, useState } from "react";
import Button from "../../components/UI/Button/Button";
import { Fieldset, useLayoutContext } from "../../components";
import { ColorDefinitions } from "../../lib/utils/definitions";

const LayoutPage = ({
}): ReactElement => {

    const { setFullscreen, setShowHeader, setHasSidebars, setShowSidebarMobile } = useLayoutContext();

    useEffect(() => {
        setFullscreen(true);
        setShowHeader(false);
        setHasSidebars(true);
        setShowSidebarMobile(true);

        return () => {
            setFullscreen(false);
            setShowHeader(true);
            setHasSidebars(true);
            setShowSidebarMobile(true);
        };
    }, [setFullscreen, setShowHeader, setHasSidebars, setShowSidebarMobile]);

    

    const [parentFullHeight, setParentFullHeight] = useState(false);
    const [nestedFullHeight, setNestedFullHeight] = useState(false);
    const [enableAsideLeft, setEnableAsideLeft] = useState(false);
    const [enableAsideRight, setEnableAsideRight] = useState(true);
    const [enableHeader, setEnableHeader] = useState(false);
    const [enableFooter, setEnableFooter] = useState(false);
    const [enableNested, setEnableNested] = useState(false);

    const title = "Organisaties"
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Demo", href: "/demo" },
        { label: "Layout", href: "/demo/layout" },
    ];

    return (
        <>
            <Fieldset legend="Options" borderColor={ColorDefinitions.Surface} fieldsetCss="mb-3">
                <Button onClick={() => setParentFullHeight(!parentFullHeight)}>{parentFullHeight === false ? "Enable" : "Disible"} parent fullheight</Button>
                <Button onClick={() => setNestedFullHeight(!nestedFullHeight)}>{nestedFullHeight === false ? "Enable" : "Disible"} nested fullheight</Button>
                <Button onClick={() => setEnableNested(!enableNested)}>{enableNested === false ? "Enable" : "Disible"} nested content</Button>
                <Button onClick={() => setEnableHeader(!enableHeader)}>{enableHeader === false ? "Enable" : "Disible"} parent header</Button>
                <Button onClick={() => setEnableFooter(!enableFooter)}>{enableFooter === false ? "Enable" : "Disible"} parent footer</Button>
                <Button onClick={() => setEnableAsideLeft(!enableAsideLeft)}>{enableAsideLeft === false ? "Enable" : "Disible"} aside left</Button>
                <Button onClick={() => setEnableAsideRight(!enableAsideRight)}>{enableAsideRight === false ? "Enable" : "Disible"} aside right</Button>
            </Fieldset>


            <div className={`pc-layout ${parentFullHeight ? 'pc-layout--full-height' : ''} `}>
                {enableHeader && (
                    <header className="pc-layout__header bg-olive">
                        Header
                    </header>
                )}

                <div className="pc-layout__content">
                    {enableAsideLeft && (
                        <div className="pc-layout__aside pc-layout__aside--left shown bg-orange">
                            <p>Aside</p>
                            <p className="p2000">Long content</p>
                        </div>
                    )}

                    <div className="pc-layout__main bg-blue-10">

                        {enableNested ? (
                            <div className={`pc-layout ${nestedFullHeight ? 'pc-layout--full-height' : ''} `}>
                                <header className="pc-layout__header bg-blue">
                                    Header
                                </header>
                                <div className="pc-layout__content bg-red">
                                    <p className="p2000">Lange content...</p>
                                </div>
                                <footer className="pc-layout__footer bg-blue">
                                    Footer
                                </footer>
                            </div>
                        )
                            : (
                                <div className="p2000">Long content</div>
                            )
                        }

                    </div>

                    {enableAsideRight && (
                        <div className="pc-layout__aside pc-layout__aside--right shown bg-orange">
                            <p>Aside R</p>
                            <p className="p2000">Long content</p>
                        </div>
                    )}
                </div>
                
                {enableFooter && (
                    <footer className="pc-layout__footer bg-olive">
                        Footer
                    </footer>
                )}
            </div>
        </>
    )
}

export default LayoutPage;