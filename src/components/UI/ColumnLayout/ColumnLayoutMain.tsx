import React from "react";
import { FC, PropsWithChildren } from "react";

export interface ColumnLayoutMainProps extends PropsWithChildren {
	css?: string;
}

const ColumnLayoutMain: FC<ColumnLayoutMainProps> = ({
	children,
	css = ""
}) => {
	return (
		<div className={`column-layout__main ${css}`}>
			{children}
		</div>
	);
};

ColumnLayoutMain.displayName = "ColumnLayoutMain";

export default ColumnLayoutMain;
