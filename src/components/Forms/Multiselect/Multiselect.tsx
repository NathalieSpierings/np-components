import React, { PropsWithChildren, ReactNode, useMemo, useState } from "react";
import { ColorDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import Search from "../../Base/Search/Search";
import Collection, { CollectionItem, CollectionItemVariant } from "../../UI/Collection/Collection";
import { ContentItemType } from "../../UI/ContentItem";
import Checkbox from "../Checkbox/Checkbox";

export type MultiselectItemId = string | number;

export interface MultiselectHeader {
	content?: ReactNode;
	borderColor?: ColorDefinitions;
}
export interface MultiselectItem {
	id: MultiselectItemId;
	content: ContentItemType | string;
	disabled?: boolean;
}

export interface MultiselectProps extends PropsWithChildren {
	items: MultiselectItem[];
	selected?: MultiselectItemId[];
	onSelectionChange?: (selected: MultiselectItemId[]) => void;
	selectMultiple?: boolean;

	multiselectHeader?: MultiselectHeader;

	enableSearch?: boolean;
	searchPlaceholder?: string;
	searchNoResultsText?: string;

	toolbarBorderColor?: ColorDefinitions;
	validationErrorMessage?: string;
	enableCheckAll?: boolean;
	maxHeight?: number;
	multiselectCss?: string;
	collectionBorderColor?: ColorDefinitions;
	collectionBackground?: ColorDefinitions;
	collectionItemVariant?: CollectionItemVariant;
	collectionScrollable?: boolean;
	collectionScrollheight?: string;
	collectionRounded?: SizeDefinitions;
	collectionCompact?: boolean;
	collectionMedium?: boolean;
	collectionColorMute?: ColorDefinitions;
	collectionColor?: ColorDefinitions;
}

function Multiselect({
	items = [],
	selected = [],
	onSelectionChange,
	selectMultiple = true,
	multiselectHeader,
	enableSearch = true,
	searchPlaceholder = "Zoeken...",
	searchNoResultsText = "Geen resultaten gevonden",
	toolbarBorderColor,
	validationErrorMessage,
	enableCheckAll = true,
	maxHeight = 300,
	multiselectCss = "",
	collectionBorderColor,
	collectionBackground,
	collectionItemVariant = "default",
	collectionScrollable,
	collectionRounded,
	collectionCompact,
	collectionMedium,
	collectionColorMute,
	collectionColor
}: Readonly<MultiselectProps>) {

	const [searchTerm, setSearchTerm] = useState("");

	const isSelected = (id: MultiselectItemId) =>
		selected.some(
			(selectedId) => selectedId === id
		);


	const filteredItems = useMemo(() => {
		const normalizedSearchTerm = searchTerm.trim().toLowerCase();

		if (!normalizedSearchTerm) {
			return items;
		}

		return items.filter((item) => {
			const text =
				typeof item.content === "string"
					? item.content
					: item.content.content;

			if (typeof text !== "string") {
				return true;
			}

			return text
				.toLowerCase()
				.includes(normalizedSearchTerm);
		});
	}, [items, searchTerm]);

	const toggleItem = (
		item: MultiselectItem,
		checked: boolean
	) => {
		if (item.disabled) {
			return;
		}

		if (!checked) {
			onSelectionChange?.(
				selected.filter(
					(selectedId) =>
						selectedId !== item.id
				)
			);

			return;
		}

		if (!selectMultiple) {
			onSelectionChange?.([item.id]);
			return;
		}

		onSelectionChange?.([
			...selected.filter(
				(selectedId) =>
					selectedId !== item.id
			),
			item.id
		]);
	};

	const collectionItems = useMemo<CollectionItem[]>(() => {
		return filteredItems.map((item) => {
			const checked = isSelected(item.id);

			const content: ContentItemType =
				typeof item.content === "string"
					? {
						content: item.content
					}
					: item.content;


			return {
				id: item.id.toString(),
				selected: checked,
				disabled: item.disabled,
				content: {
					...content,
					prefix: (
						<Checkbox
							color={
								checked
									? ColorDefinitions.Offwhite
									: ColorDefinitions.Accent
							}
							checked={checked}
							disabled={item.disabled}
							onChange={(value) =>
								toggleItem(item, value)
							}
						/>
					)
				}
			};
		});
	}, [filteredItems, selected, selectMultiple, onSelectionChange]);

	const selectableItems = useMemo(() =>
            items.filter(
                (item) => !item.disabled
            ),
        [items]
    );

	const allItemsChecked =
		selectableItems.length > 0 &&
		selectableItems.every((item) =>
			isSelected(item.id)
		);

	const someItemsChecked = !allItemsChecked && selectableItems.some((item) =>
			isSelected(item.id)
		);

	const selectedCollectionItems = useMemo(
		() => selected.map((id) => id.toString()),
		[selected]
	);

	const handleCheckAll = (checked: boolean) => {
		if (!selectMultiple) {
            return;
        }
		
		if (checked) {
			onSelectionChange?.(
				selectableItems.map((item) => item.id)
			);

			return;
		}

		onSelectionChange?.([]);
	};


	return (
		<div className={["multiselect", multiselectCss].join(" ")} >

			{multiselectHeader && (
				<div className={`multiselect__header ${multiselectHeader.borderColor ? "border-" + multiselectHeader.borderColor : ""}`}>
					{multiselectHeader.content}
					{validationErrorMessage && (
						<div className="field-validation-error">
							<span>{validationErrorMessage}</span>
						</div>
					)}
				</div>
			)}

			{(enableCheckAll || enableSearch) && (
				<div className={`multiselect__toolbar ${toolbarBorderColor ? "border-" + toolbarBorderColor : ""}`}>
					{enableCheckAll && onSelectionChange && (
						<div className="multiselect__toolbar__checkall">
							<Checkbox
								color={ColorDefinitions.Accent}
								checked={allItemsChecked}
								indeterminate={someItemsChecked}
								onChange={handleCheckAll}
							/>
						</div>
					)}

					{enableSearch && (
						<div className="multiselect__toolbar__search">
							<Search
								value={searchTerm}
								placeholder={searchPlaceholder}
								onChange={setSearchTerm}
							/>
						</div>
					)}
				</div>
			)}

			<div className="multiselect__content" style={{ maxHeight: maxHeight }}>
				<div className="multiselect__content__container">
					{collectionItems.length > 0 ? (
						<Collection
							items={collectionItems}
							itemVariant={collectionItemVariant}
							scrollable={collectionScrollable}
							scrollheight={maxHeight}
							rounded={collectionRounded}
							compact={collectionCompact}
							medium={collectionMedium}
							selected={selectedCollectionItems}
							borderColor={collectionBorderColor}
							background={collectionBackground}
							color={collectionColor}
							colorMute={collectionColorMute}
						/>
					) : (
						<div className="multiselect__no-results">
							{searchNoResultsText}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Multiselect;