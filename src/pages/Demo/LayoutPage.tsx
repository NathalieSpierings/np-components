import React, { ReactElement, useState } from "react";
import Button from "../../components/UI/Button/Button";
import { Fieldset } from "../../components";
import { ColorDefinitions } from "../../lib/utils/definitions";

const LayoutPage = ({
}): ReactElement => {

    const [parentFullHeight, setParentFullHeight] = useState(false);
    const [nestedFullHeight, setNestedFullHeight] = useState(false);

    return (
        <>
            <Fieldset legend="Options" borderColor={ColorDefinitions.Surface} fieldsetCss="mb-3">
                 <Button key="toggleFullHeightParent" onClick={() => setParentFullHeight(!parentFullHeight)}>{parentFullHeight === false ? "Enable" : "Disible"} parent fullheight</Button>
                 <Button key="toggleFullHeightNested" onClick={() => setNestedFullHeight(!nestedFullHeight)}>{nestedFullHeight === false ? "Enable" : "Disible"} nested fullheight</Button>
            </Fieldset>


            <div className={`pc-layout ${parentFullHeight ? 'pc-layout--full-height' : ''} `}>
                <header className="pc-layout__header bg-olive">
                    Header
                </header>
                <div className="pc-layout__content">
                    <div className="pc-layout__aside pc-layout__aside--left shown bg-orange">
                        <p>Aside</p>
                        <p className="p2000">Long content</p>
                    </div>
                    <div className="pc-layout__aside pc-layout__aside--left shown bg-orange-30">
                        <p>Aside</p>
                        <p className="p2000">Long content</p>
                    </div>
                    <div className="pc-layout__main bg-blue-10">

                        <div className={`pc-layout ${nestedFullHeight ? 'pc-layout--full-height' : ''} `}>
                            <header className="pc-layout__header bg-blue">
                                Header
                            </header>
                            <div className="pc-layout__content bg-red">
                                <p className="p20001">Lange content...</p>
                            </div>
                            <footer className="pc-layout__footer bg-blue">
                                Footer
                            </footer>
                        </div>

                    </div>
                    <div className="pc-layout__aside pc-layout__aside--right shown bg-orange">
                        <p>Aside</p>
                        <p className="p2000">Long content</p>
                    </div>
                </div>
                <footer className="pc-layout__footer bg-olive">
                    Footer
                </footer>
            </div>
        </>
    )
}

export default LayoutPage;