import React, { PropsWithChildren } from "react";

export interface ColumnsContentProps extends PropsWithChildren {
  className?: string;
}

const ColumnsContent = ({ children, className }: ColumnsContentProps) => {
  const cssClass = ["columns__content", className].filter(Boolean).join(" ");

  return <div className={cssClass}>{children}</div>;
};

export default ColumnsContent;
