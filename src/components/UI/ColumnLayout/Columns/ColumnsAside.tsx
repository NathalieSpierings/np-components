import { PropsWithChildren } from "react";
import { ColorDefinitions } from "../../../../lib/utils/definitions";


export interface ColumnsAsideProps extends PropsWithChildren {
  borderColor?: ColorDefinitions;
  scrollable?: boolean;
  css?: string;
}

const ColumnsAside = ({ 
  borderColor = ColorDefinitions.Surface,
  children, 
  css,
  scrollable
 }: ColumnsAsideProps) => {
  
  const cssClass = [
    "columns__aside", 
    borderColor && `border-${borderColor}`,
    css,
    scrollable && "columns__aside--scrollable"
  ].filter(Boolean).join(" ");

  return <aside className={cssClass}>{children}</aside>;
};

export default ColumnsAside;
