import { useEffect, useRef, useState } from "react";

export type ResizeSide = "left" | "right";

export const clampWidth = (width: number, minWidth: number, maxWidth: number) =>
    Math.min(maxWidth, Math.max(minWidth, width));

export interface ResizeDragOptions {
    minWidth: number;
    maxWidth: number;
    /** Side of the screen the resized element is on: a left element grows when dragging right, a right one when dragging left. */
    side: ResizeSide;
    onResize: (width: number) => void;
}

/**
 * The pointer-drag part of resizing, for elements whose width is stored elsewhere.
 * Call `startResize` from a resize handle's `onPointerDown` with the current width.
 */
export function useResizeDrag(options: ResizeDragOptions) {
    const [resizing, setResizing] = useState(false);

    const startXRef = useRef(0);
    const startWidthRef = useRef(0);

    // Latest options, so changing them (e.g. a new onResize) does not restart the drag
    const optionsRef = useRef(options);
    optionsRef.current = options;

    useEffect(() => {
        if (!resizing) return;

        document.body.style.cursor = "ew-resize";
        document.body.style.userSelect = "none";

        const onPointerMove = (event: PointerEvent) => {
            const { minWidth, maxWidth, side, onResize } = optionsRef.current;
            const delta = event.clientX - startXRef.current;

            const nextWidth =
                side === "left"
                    ? startWidthRef.current + delta
                    : startWidthRef.current - delta;

            onResize(clampWidth(nextWidth, minWidth, maxWidth));
        };

        const stopResize = () => {
            setResizing(false);
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
        };

        globalThis.addEventListener("pointermove", onPointerMove);
        globalThis.addEventListener("pointerup", stopResize);

        return () => {
            globalThis.removeEventListener("pointermove", onPointerMove);
            globalThis.removeEventListener("pointerup", stopResize);
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
        };
    }, [resizing]);

    const startResize = (event: React.PointerEvent, currentWidth: number) => {
        startXRef.current = event.clientX;
        startWidthRef.current = currentWidth;
        setResizing(true);
    };

    return {
        resizing,
        startResize,
    };
}

export function useResizableAside(
    defaultWidth = 400,
    minWidth = 250,
    maxWidth = 700,
    side: ResizeSide = "right"
) {
    const [width, setWidth] = useState(defaultWidth);
    const { resizing, startResize } = useResizeDrag({ minWidth, maxWidth, side, onResize: setWidth });

    return {
        width,
        resizing,
        startResize: (event: React.PointerEvent) => startResize(event, width),
    };
}
