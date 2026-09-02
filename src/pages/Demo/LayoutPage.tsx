import React, { ReactElement } from "react";

const LayoutPage = ({
}): ReactElement => {

    return (
        <div className="pc-layout">            
            <div className="pc-layout__content">
               
                <div className="pc-layout__main">
                    
                    <div className="pc-layout">
            <div className="pc-layout__header">
                header
            </div>
            <div className="pc-layout__content">
                <div className="pc-layout__aside shown">
                    aside
                </div>
                <div className="pc-layout__aside shown">
                    aside
                </div>
                <div className="pc-layout__main">
                    main
                </div>
                <div className="pc-layout__aside shown">
                    aside
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