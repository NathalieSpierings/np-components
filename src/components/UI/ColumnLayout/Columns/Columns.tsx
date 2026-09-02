import { PropsWithChildren } from "react";

export interface ColumnsProps extends PropsWithChildren {
  asidePosition?: "left" | "right";
  className?: string;
  hasAside?: boolean;
}

const Columns = ({
  children,
  asidePosition = "right",
  className,
  hasAside = false,
}: ColumnsProps) => {
  
  const cssClass = [
    "columns",
    hasAside ? `columns--aside-${asidePosition}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={cssClass}>{children}</div>;
};

export default Columns;
