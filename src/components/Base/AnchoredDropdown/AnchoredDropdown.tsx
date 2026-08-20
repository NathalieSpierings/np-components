import { AnimatePresence, motion } from "framer-motion";
import React, { ReactElement, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const AchoredDropdown = ({
    open,
    setOpen,
    children: [anchor, dropdownContent],
}: {
    open: boolean;
    setOpen: (value: boolean) => void;
    children: [ReactElement, ReactElement];
}) => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [position, setPosition] = useState({ top: 0, left: 0 });

    const recalculatePosition = () => {
        if (!open || !anchorRef.current) return;

        const rect = anchorRef.current.getBoundingClientRect();

        setPosition({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
        });
    };

    // Calculate position of dropdown relative to viewport
    useLayoutEffect(() => {
        recalculatePosition();

        window.addEventListener("scroll", recalculatePosition, true);
        window.addEventListener("resize", recalculatePosition);

        return () => {
            window.removeEventListener("scroll", recalculatePosition, true);
            window.removeEventListener("resize", recalculatePosition);
        };
    }, [open]);

    // Close on outside click
    useEffect(() => {
        if (!open) return;

        const handler = (e: MouseEvent) => {
            const target = e.target as Node;

            if (dropdownRef.current?.contains(target) || anchorRef.current?.contains(target)) {
                return;
            }

            setOpen(false);
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open, setOpen]);

    const dropdown = createPortal(
        <AnimatePresence initial={false}>
            {open ? (
                <motion.div
                    ref={dropdownRef}
                    className="dropdown__menu shown"
                    initial={{ height: 0, opacity: 0, y: -10 }}
                    animate={{ height: "auto", opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: "absolute",
                        top: position.top,
                        left: position.left,
                        zIndex: 50,
                        maxWidth: "60vw",
                    }}
                >
                    {dropdownContent}
                </motion.div>
            ) : null}
        </AnimatePresence>,
        document.body,
    );

    return (
        <>
            <div ref={anchorRef} className="anchorddropdown__base">
                {anchor}
            </div>
            {dropdown}
        </>
    );
};

export default AchoredDropdown;
