import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import Box, { BoxProps } from "../../Base/Box/Box";
import Icon from "../Icons/Icon/Icon";
import { ColorDefinitions, IconDefinitions } from "../../../lib/utils/definitions";

export type PopoverDirection = "up" | "down";

interface PopoverProps extends BoxProps {
    toggleIcon: IconDefinitions;
    headerContent?: ReactNode;
    direction?: PopoverDirection;
    borderColor?: ColorDefinitions;
    minWidth?: string;
    children?: ReactNode;
}

export const Popover: FC<PopoverProps> = ({
    toggleIcon,
    direction = "down",
    minWidth,
    background,
    borderColor,
    headerContent,
    children,
    ...boxProps
}) => {

    const popoverToggleRef = useRef<HTMLButtonElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const [open, setOpen] = useState(false);

    const closePopover = () => {
        setOpen(false);
    };

    const positionPopover = () => {

        const popoverToggleEl = popoverToggleRef.current;
        const contentEl = contentRef.current;

        if (!popoverToggleEl || !contentEl) {
            return;
        }

        const popoverToggleRect = popoverToggleEl.getBoundingClientRect();
        const viewportOffset = 8;

        contentEl.style.visibility = "hidden";
        contentEl.style.display = "flex";

        contentEl.style.removeProperty("--popover-max-height");

        const height = contentEl.scrollHeight;
        const width = contentEl.offsetWidth;

        const spaceBelow = window.innerHeight - popoverToggleRect.bottom;
        const spaceAbove = popoverToggleRect.top;

        let top = 0;

        if (direction === "down") {

            // popover past volledig onder de trigger
            if (spaceBelow >= height + viewportOffset) {
                top = popoverToggleRect.bottom;
            }

            // anders proberen boven de trigger
            else if (spaceAbove >= height + viewportOffset) {
                top = popoverToggleRect.top - height;
            }

            // geen volledige ruimte -> gebruik grootste beschikbare ruimte
            else {

                if (spaceBelow >= spaceAbove) {

                    top = popoverToggleRect.bottom;

                    contentEl.style.setProperty(
                        "--popover-max-height",
                        `${spaceBelow - viewportOffset}px`
                    );

                } else {

                    top = viewportOffset;

                    contentEl.style.setProperty(
                        "--popover-max-height",
                        `${spaceAbove - viewportOffset}px`
                    );
                }
            }
        }

        // expliciet omhoog openen
        else {

            if (spaceAbove >= height + viewportOffset) {

                top = popoverToggleRect.top - height;

            } else {

                top = viewportOffset;

                contentEl.style.setProperty(
                    "--popover-max-height",
                    `${spaceAbove - viewportOffset}px`
                );
            }
        }

        // horizontale positionering
        let left = popoverToggleRect.right - width;

        // niet buiten viewport links
        if (left < viewportOffset) {
            left = viewportOffset;
        }

        // niet buiten viewport rechts
        if (left + width > window.innerWidth - viewportOffset) {

            left = window.innerWidth - width - viewportOffset;
        }

        contentEl.style.top = `${top}px`;
        contentEl.style.left = `${left}px`;

        // zichtbaar maken
        contentEl.style.visibility = "visible";
    };

    const togglePopover = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpen(prev => !prev);
    };

    useEffect(() => {

        const contentEl = contentRef.current;
        const resetPopoverStyles = () => {

            if (!contentEl) {
                return;
            }

            contentEl.style.removeProperty("top");
            contentEl.style.removeProperty("left");
            contentEl.style.removeProperty("visibility");
            contentEl.style.removeProperty("display");
            contentEl.style.removeProperty("max-height");
            contentEl.style.removeProperty("--dropdown-max-height");
        };


        if (!open) {
            resetPopoverStyles();
            return;
        }

        positionPopover();
        document.addEventListener("click", closePopover);
        window.addEventListener("resize", closePopover);
        window.addEventListener("scroll", closePopover);

        return () => {
            document.removeEventListener("click", closePopover);
            window.removeEventListener("resize", closePopover);
            window.removeEventListener("scroll", closePopover);
        };
    }, [open, direction]);


    return (
        <div className="popover">
            <button ref={popoverToggleRef} onClick={togglePopover} className="popover__toggle">
                <Icon icon={toggleIcon} />
            </button>
            <Box
                {...boxProps}
                ref={contentRef}
                background={background}
                className={`popover__container ${open ? "shown" : ""} ${direction === "up" ? "popover__container--up" : ""}`}
                style={minWidth ? { minWidth } : {}}
            >
                {headerContent && (
                    <div className={`popover__header ${borderColor ? `border-${borderColor}` : ""}`}>
                        {headerContent}                       
                    </div>
                )}

                <div className="popover__content">
                    {children}
                </div>
            </Box>
        </div>
    );
};

export default Popover;