import React, { ReactElement, useState } from "react";
import Button from "../../components/UI/Button/Button";

const LayoutPage = ({
}): ReactElement => {

    const [enableFullHeight, setEnableFullHeight] = useState(false);

    return (
        <div className={`pc-layout ${enableFullHeight ? 'pc-layout--full-height' : ''}`}>
            <div className="pc-layout__content">

                <div className="pc-layout__aside shown">
                    aside
                    <p className="p2000">Scroll me</p>
                </div>

                <div className="pc-layout__main">

                    <div className="pc-layout">
                        <div className="pc-layout__header">
                            <Button key="enableTabFilters" onClick={() => setEnableFullHeight(!enableFullHeight)}>{enableFullHeight === false ? "Enable" : "Disible"} Full height</Button>,

                            header
                        </div>
                        <div className="pc-layout__content">

                            <div className="pc-layout__aside shown">
                                aside
                                <p className="p2000">Scroll me</p>
                            </div>
                            <div className="pc-layout__main">
                                main
                                <p className="p2000">Scroll me</p>
                            </div>
                            <div className="pc-layout__aside shown">
                                aside
                                <p className="p2000">Scroll me</p>
                            </div>
                        </div>
                        <div className="pc-layout__footer">
                            footer
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LayoutPage;