import { PropsWithChildren } from "react";

export interface ColumnsMainProps extends PropsWithChildren {
  scrollable?: boolean;
  css?: string;
}

const ColumnsMain = ({
  scrollable,
  children,
  css
}: ColumnsMainProps) => {

  const cssClass = [
    "columns__main", 
    scrollable && "columns__main--scrollable",
    css,    
  ].filter(Boolean).join(" ");

  return <main className={cssClass}>{children}</main>;
};

export default ColumnsMain;
