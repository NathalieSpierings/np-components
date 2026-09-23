import React, { useEffect } from "react";
import { ColumnLayout, ColumnLayoutContent, ColumnLayoutMain, useLayoutContext } from "../../../components";

const MainOnlyNoHeader: React.FC = () => {
    
      const { setFullscreen } = useLayoutContext();
      const { setShowHeader } = useLayoutContext();
    
      useEffect(() => {
        setFullscreen(true);
        setShowHeader(false);
        return () => {
          setFullscreen(false);
          setShowHeader(true);
        };
      }, [setFullscreen, setShowHeader]);
    
  return (
    <ColumnLayout>
      <ColumnLayoutMain>
        <ColumnLayoutContent>     
          <p>Main content goes here...</p>          
        </ColumnLayoutContent>
      </ColumnLayoutMain>
    </ColumnLayout>
  );
};

export default MainOnlyNoHeader;
