import React, { useEffect } from "react";
import { useLayoutContext } from "../../../components";
import { ColumnLayout, ColumnLayoutAside, ColumnLayoutContent, ColumnLayoutHeader, ColumnLayoutMain } from "../../../components/UI/ColumnLayout";

const AsideLeft: React.FC = () => {

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
    <ColumnLayout asidePosition="left">
      <ColumnLayoutMain>
        <ColumnLayoutHeader>
         Main header
        </ColumnLayoutHeader>
        <ColumnLayoutContent>
          <p>Main content goes here...</p>
          
        </ColumnLayoutContent>
      </ColumnLayoutMain>
      <ColumnLayoutAside>
        <ColumnLayoutHeader>Aside header</ColumnLayoutHeader>
        <ColumnLayoutContent>
          <p>Aside content goes here...</p>
        
        </ColumnLayoutContent>
      </ColumnLayoutAside>
    </ColumnLayout>
  );
};

export default AsideLeft;
