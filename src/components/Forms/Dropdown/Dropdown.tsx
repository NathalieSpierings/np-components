import React, { PropsWithChildren, ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import ContentItem from "../../Base/ContentItem/ContentItem";
import Icon from "../../UI/Icons/Icon/Icon";
import { DropdownMenu, DropdownMenuItem } from "./DropdownMenu";
import { DropdownTabItem, DropdownTabPane, DropdownTabs } from "./DropdownTabs";
import { DropdownSearch } from "./DropdownSearch";

export enum DropdownVerticalPosition { Up = "Up", Down = "Down" }
export enum DropdownHorizontalPosition { Left = "Left", Right = "Right" }


// Toggle
export interface DropdownToggle {
	prefix?: ReactNode;
	label?: ReactNode;
	//formFieldPlaceholder?: string;
	variant?: 'default' | 'input';
	arrow?: boolean;
	dropdownToggleCss?: string;
}

// Header
export interface DropdownHeader {
	content?: ReactNode;
	borderColor?: ColorDefinitions;
	keepOpen?: boolean;
	onClick?: () => void;
}

// Footer
export interface DropdownFooter {
	content?: ReactNode;
	borderColor?: ColorDefinitions;
	keepOpen?: boolean;
	onClick?: () => void;
}

export interface DropdownProps extends PropsWithChildren {
	dropdownToggle: DropdownToggle;
	menuItems?: DropdownMenuItem[];
	dropdownHeader?: DropdownHeader;
	dropdownFooter?: DropdownFooter;
	enableSearch?: boolean;
	searchPlaceholder?: string;
	searchNoResultsText?: string;
	tabs?: DropdownTabItem[];
	tabPanes?: DropdownTabPane[];
	verticalPosition?: DropdownVerticalPosition;
	horizontalPosition?: DropdownHorizontalPosition;
	maxHeight?: number;
	isOpen?: boolean;
	onOpenChange?: (isOpen: boolean) => void;
	dropdownCss?: string;
}

export interface DropdownCoordinates {
	top: number;
	left: number;
}

export function Dropdown({
	dropdownToggle,
	menuItems,
	dropdownHeader,
	dropdownFooter,
	tabs,
	tabPanes,
	enableSearch = false,
	searchPlaceholder,
	searchNoResultsText,
	verticalPosition = DropdownVerticalPosition.Down,
	horizontalPosition = DropdownHorizontalPosition.Left,
	maxHeight = 400,
	isOpen,
	onOpenChange,
	children,
	dropdownCss = ''
}: Readonly<DropdownProps>) {

	const [internalOpen, setInternalOpen] = useState(false);

	const [coordinates, setCoordinates] = useState<DropdownCoordinates>({
		top: 0,
		left: 0,
	});

	const dropdownToggleRef = useRef<HTMLButtonElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const [searchTerm, setSearchTerm] = useState("");

	const open = isOpen ?? internalOpen;

	const setOpen = (value: boolean) => {
		if (isOpen === undefined) {
			setInternalOpen(value);
		}

		onOpenChange?.(value);
	};

	const updatePosition = () => {
		const triggerElement = dropdownToggleRef.current;
		const dropdownElement = dropdownRef.current;

		if (!triggerElement || !dropdownElement) {
			return;
		}

		const triggerRect = triggerElement.getBoundingClientRect();
		const dropdownRect = dropdownElement.getBoundingClientRect();

		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		const gap = 6;
		const margin = 8;

		let actualVerticalPosition = verticalPosition;
		let actualHorizontalPosition = horizontalPosition;

		const downTop = triggerRect.bottom + gap;
		const upTop = triggerRect.top - dropdownRect.height - gap;

		const leftAlignedLeft = triggerRect.right - dropdownRect.width;
		const rightAlignedLeft = triggerRect.left;

		if (
			verticalPosition === DropdownVerticalPosition.Down &&
			downTop + dropdownRect.height > viewportHeight - margin &&
			upTop >= margin
		) {
			actualVerticalPosition = DropdownVerticalPosition.Up;
		}

		if (
			verticalPosition === DropdownVerticalPosition.Up &&
			upTop < margin &&
			downTop + dropdownRect.height <= viewportHeight - margin
		) {
			actualVerticalPosition = DropdownVerticalPosition.Down;
		}

		if (
			horizontalPosition === DropdownHorizontalPosition.Left &&
			leftAlignedLeft < margin &&
			rightAlignedLeft + dropdownRect.width <= viewportWidth - margin
		) {
			actualHorizontalPosition = DropdownHorizontalPosition.Right;
		}

		if (
			horizontalPosition === DropdownHorizontalPosition.Right &&
			rightAlignedLeft + dropdownRect.width > viewportWidth - margin &&
			leftAlignedLeft >= margin
		) {
			actualHorizontalPosition = DropdownHorizontalPosition.Left;
		}

		const top =
			actualVerticalPosition === DropdownVerticalPosition.Down
				? downTop
				: upTop;

		const left =
			actualHorizontalPosition === DropdownHorizontalPosition.Left
				? leftAlignedLeft
				: rightAlignedLeft;

		setCoordinates({
			top: Math.max(
				margin,
				Math.min(top, viewportHeight - dropdownRect.height - margin)
			),
			left: Math.max(
				margin,
				Math.min(left, viewportWidth - dropdownRect.width - margin)
			),
		});
	};

	useLayoutEffect(() => {
		if (!open) {
			return;
		}

		updatePosition();

		const update = () => updatePosition();

		window.addEventListener("resize", update);
		window.addEventListener("scroll", update, true);

		const resizeObserver = new ResizeObserver(update);

		if (dropdownToggleRef.current) {
			resizeObserver.observe(dropdownToggleRef.current);
		}

		if (dropdownRef.current) {
			resizeObserver.observe(dropdownRef.current);
		}

		return () => {
			window.removeEventListener("resize", update);
			window.removeEventListener("scroll", update, true);
			resizeObserver.disconnect();
		};
	}, [open, verticalPosition, horizontalPosition]);

	useEffect(() => {
		if (!open) {
			return;
		}

		const handleMouseDown = (event: MouseEvent) => {
			const target = event.target as Node;

			if (
				dropdownToggleRef.current?.contains(target) ||
				dropdownRef.current?.contains(target) ||
				document.querySelector(".dropdown__submenu")?.contains(target)
			) {
				return;
			}

			setOpen(false);
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handleMouseDown);
		document.addEventListener("keydown", handleEscape);

		return () => {
			document.removeEventListener("mousedown", handleMouseDown);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [open]);



	// Trigger
	const renderDropdownToggle = (
		dropdownToggle.variant === 'input'
			? (
				<div className="dropdown__toggle form-group float">
					<input readOnly className="form-control" />
					<label>{dropdownToggle.label}</label>
				</div>
			)
			: (
				<ContentItem item={{
					prefix: dropdownToggle.prefix,
					content: (
						<div className="dropdown__toggle__container">
							<span>{dropdownToggle.label}</span>
							{dropdownToggle.arrow && (
								<Icon icon={IconDefinitions.angle_down} size={SizeDefinitions.Small} iconCss="dropdown__toggle__arrow" />
							)}
						</div>
					)
				}} />
			)
	);

	const dropdownToggleCss = [
		"dropdown__toggle",
		open ? "shown" : '',
		dropdownToggle.dropdownToggleCss ? dropdownToggle.dropdownToggleCss : ""
	].filter(Boolean).join(" ");


	return (
		<>
			{/* Dropdown toggle */}
			<button
				ref={dropdownToggleRef}
				className={dropdownToggleCss}
				onMouseDown={(e) => {
					e.stopPropagation();
				}}
				onClick={(e) => {
					e.stopPropagation();
					setOpen(!open);
				}}
			>
				{renderDropdownToggle}
			</button>

			{open &&
				createPortal(
					<div
						ref={dropdownRef}
						className={["dropdown", dropdownCss].join(" ")}
						style={{
							position: "fixed",
							top: coordinates.top,
							left: coordinates.left,
							zIndex: 9999,
							maxHeight,
						}}
					>
						{dropdownHeader && (
							<div className={`dropdown__header ${dropdownHeader.borderColor ? "border-" + dropdownHeader.borderColor : ""}`}>
								{dropdownHeader.content}
							</div>
						)}

						{!tabs && enableSearch && (
							<DropdownSearch
								value={searchTerm}
								placeholder={searchPlaceholder}
								onChange={setSearchTerm}
							/>
						)}


						<div className="dropdown__content">
							{tabs && tabPanes && (
								<DropdownTabs tabs={tabs} tabPanes={tabPanes} />
							)}

							{!tabs && menuItems && (
								<DropdownMenu
									items={menuItems}
									searchTerm={searchTerm}
									forceOpenSubmenus={!!searchTerm}
									noResultsText={searchNoResultsText}
								/>
							)}

							{!tabs && !menuItems && children}
						</div>

						{dropdownFooter && (
							<div className={`dropdown__footer ${dropdownFooter.borderColor ? "border-" + dropdownFooter.borderColor : ""}`}>
								{dropdownFooter.content}
							</div>)
						}
					</div>,
					document.body
				)}
		</>
	);
}
