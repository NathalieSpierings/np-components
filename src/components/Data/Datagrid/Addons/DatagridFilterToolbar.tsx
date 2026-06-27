import React, { useLayoutEffect, useRef, useState } from "react";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../../lib/utils/definitions";
import Icon from "../../../UI/Icons/Icon/Icon";
import { Popover } from "../../../UI/Popover/Popover";
import Tooltip from "../../../UI/Tooltip/Tooltip";
import { DatagridRowConfig } from "../Config/DatagridRowConfig";
import { DatagridColumnFilterValue, isActiveColumnFilter } from "../Filters/DatagridColumnFilter";
import DatagridFilterDropdown from "../Filters/DatagridFilterDropdown";

export interface DatagridFilterToolbarProps<TData> {
    data?: TData[];
    dataRaw?: TData[];
    properties?: DatagridRowConfig<TData>[];
    searchTerm: string;
    onSearchChange: (value: string) => void;
    columnFilters: Record<string, DatagridColumnFilterValue | undefined>;
    setColumnFilters: React.Dispatch<
        React.SetStateAction<Record<string, DatagridColumnFilterValue | undefined>>
    >;
    searchPlaceholder?: string;
    removeFiltersTooltip?: string;
    filterButtonColor?: ColorDefinitions;
    filterButtonArrow?: boolean;
    filterGhostButton?: boolean;
    borderBottom?: boolean;
    borderColor?: ColorDefinitions;
    enableInfoPopover?: boolean;
    infoPopoverToggleIcon?: IconDefinitions;
    infoPopoverContent?: React.ReactNode;
}

function DatagridFilterToolbar<TData>({
    dataRaw,
    properties,
    searchTerm,
    onSearchChange,
    columnFilters,
    setColumnFilters,
    searchPlaceholder = "Filteren...",
    removeFiltersTooltip = "Filters wissen",
    borderBottom = false,
    borderColor = ColorDefinitions.Surface,
    enableInfoPopover = false,
    infoPopoverContent,
    infoPopoverToggleIcon = IconDefinitions.info_square,
}: Readonly<DatagridFilterToolbarProps<TData>>) {

    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [isScrollable, setIsScrollable] = useState(false);

    const updateScrollButtons = () => {
        const el = scrollRef.current;
        if (!el) return;

        const scrollable = el.scrollWidth > el.clientWidth;
        setIsScrollable(scrollable);
        setCanScrollLeft(scrollable && el.scrollLeft > 0);
        setCanScrollRight(
            scrollable && el.scrollWidth > el.clientWidth + el.scrollLeft
        );
    };

    useLayoutEffect(() => {
        updateScrollButtons();

        const el = scrollRef.current;
        if (!el) return;

        el.addEventListener("scroll", updateScrollButtons);
        window.addEventListener("resize", updateScrollButtons);

        return () => {
            el.removeEventListener("scroll", updateScrollButtons);
            window.removeEventListener("resize", updateScrollButtons);
        };
    }, [properties, columnFilters]);

    if (!properties) return null;

    const filterColumns = properties.filter((p) => p.filter);


    const clearAll = () => {
        onSearchChange("");
        setColumnFilters({});
    };

    const scrollBy = (direction: "prev" | "next") => {
        const el = scrollRef.current;
        if (!el) return;

        el.scrollBy({
            left: direction === "next" ? 200 : -200,
            behavior: "smooth",
        });
    };

    const hasFilters = searchTerm.trim().length > 0 || Object.values(columnFilters).some(isActiveColumnFilter);

    return (
        <div className={`filterbar ${borderBottom ? "border-" + borderColor : ""}`}>
            <div className="filterbar__container">
                <div
                    className="filterbar__left"
                    ref={scrollRef}
                    onScroll={updateScrollButtons}
                >
                    <div className="filterbar__item">
                        {enableInfoPopover && (
                            <Popover toggleIcon={infoPopoverToggleIcon}>
                                {infoPopoverContent}
                            </Popover>
                        )}
                    </div>

                    {/* Search */}
                    <div className="filterbar__item filterbar__item--keyword">
                        <div className="filterbar__keyword__filter">
                            <Icon icon={IconDefinitions.filter} />
                            <input
                                type="text"
                                className="filterbar__input"
                                placeholder={searchPlaceholder}
                                value={searchTerm}
                                onChange={(e) => onSearchChange(e.target.value)}
                            />
                        </div>
                    </div>

                    {filterColumns.map((col) => (
                        <div
                            key={col.prop}
                            className="filterbar__item filterbar__item--dropdown"
                        >
                            <DatagridFilterDropdown
                            enableDropdownToggleLabel
                                column={col}
                                dataRaw={dataRaw}
                                value={columnFilters[col.prop]}
                                onChange={(value) =>
                                    setColumnFilters((current) => {
                                        const next = { ...current };

                                        if (!value) {
                                            delete next[col.prop];
                                        } else {
                                            next[col.prop] = value;
                                        }

                                        return next;
                                    })
                                }
                            />
                        </div>
                    ))}
                </div>



                <div className="filterbar__right">
                    {isScrollable && (
                        <>
                            <button
                                className="filterbar__control filterbar__control--prev"
                                onClick={() => scrollBy("prev")}
                                disabled={!canScrollLeft}
                                aria-disabled={!canScrollLeft}
                            >
                                <Icon icon={IconDefinitions.angle_left} size={SizeDefinitions.Small}/>
                            </button>

                            <button
                                className="filterbar__control filterbar__control--next"
                                onClick={() => scrollBy("next")}
                                disabled={!canScrollRight}
                                aria-disabled={!canScrollRight}
                            >
                                <Icon icon={IconDefinitions.angle_right} size={SizeDefinitions.Small}/>
                            </button>
                        </>
                    )}

                    {hasFilters && (
                        <Tooltip content={removeFiltersTooltip}>
                            <button
                                className="filterbar__control filterbar__control--dismiss"
                                onClick={clearAll}
                            >
                                <Icon icon={IconDefinitions.cross} size={SizeDefinitions.Small} />
                            </button>
                        </Tooltip>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DatagridFilterToolbar;
