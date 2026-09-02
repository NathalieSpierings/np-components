import { FC, PropsWithChildren } from "react";

export interface ColumnLayoutContentProps extends PropsWithChildren{
	css?: string;
 }

const ColumnLayoutContent: FC<ColumnLayoutContentProps> = ({
	children,
	 css = ''
}) => {
	return (
		<div className={`column-layout__content ${css}`}>
			{children}
		</div>
	);
};

export default ColumnLayoutContent;
