import { FC, PropsWithChildren } from "react";
import { ColorDefinitions } from "../../../lib/utils/definitions";


export interface ColumnLayoutAsideProps extends PropsWithChildren {
	borderColor?: ColorDefinitions;
	css?: string;
}

const ColumnLayoutAside: FC<ColumnLayoutAsideProps> = ({
	borderColor = ColorDefinitions.Surface,
	css,
	children,
	...props
}) => {
	const cssClass = [
		"column-layout__aside",
		borderColor && `border-${borderColor}`,
		css
	].filter(Boolean)
		.join(" ");

	return (
		<div className={cssClass} {...props}>
			{children}
		</div>
	);
};

ColumnLayoutAside.displayName = "ColumnLayoutAside";

export default ColumnLayoutAside;
