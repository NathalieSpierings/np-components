import { Children, FC, PropsWithChildren, useMemo, useState } from "react";
import { ColumnLayoutContext } from "./ColumnLayoutContext";

export interface ColumnLayoutProps extends PropsWithChildren {
	className?: string;
	enableScrollableContent?: boolean;
	asidePosition?: "left" | "right";
	primaryViewOnMobile?: "main" | "aside";

	enableBurger?: boolean;
	isShown?: boolean;
	onShownChange?: (isShown: boolean) => void;
}

const ColumnLayout: FC<ColumnLayoutProps> = ({
	enableScrollableContent = false,
	asidePosition = "right",
	primaryViewOnMobile = "main",
	children,
	className = "",
	enableBurger = true,
	isShown: controlledIsShown,
	onShownChange,
}) => {

	const [internalIsShown, setInternalIsShown] = useState(false);
	const isControlled = typeof controlledIsShown === 'boolean';

	const isShown = isControlled ? controlledIsShown : internalIsShown;
	const setIsShown = (value: boolean) => {
		if (!isControlled) {
			setInternalIsShown(value);
		}

		onShownChange?.(value);
	};

	const childrenArray = Children.toArray(children);

	const hasMain = useMemo(() => {
		return childrenArray.some((child: any) => {
			return child?.type?.displayName === "ColumnLayoutMain";
		});
	}, [childrenArray]);

	const hasAside = useMemo(() => {
		return childrenArray.some((child: any) => {
			return child?.type?.displayName === "ColumnLayoutAside";
		});
	}, [childrenArray]);


	const contextValue = useMemo(() => ({ isShown, setIsShown, primaryViewOnMobile, hasMain, hasAside, enableBurger }), [isShown, setIsShown, primaryViewOnMobile, hasMain, hasAside, enableBurger]);

	const css = [
		"column-layout",
		enableScrollableContent && "column-layout--scrollable",
		hasAside && asidePosition === "left" && "column-layout--aside-left",
		hasAside && asidePosition === "right" && "column-layout--aside-right",
		primaryViewOnMobile === "main" && "main-primary",
		primaryViewOnMobile === "aside" && "aside-primary",
		isShown && "shown is-shown",
		className,
	]
		.filter(Boolean)
		.join(" ");


	return (
		<ColumnLayoutContext.Provider value={contextValue}
		>
			<div className={css}>{children}</div>
		</ColumnLayoutContext.Provider>
	);
};

export default ColumnLayout;
