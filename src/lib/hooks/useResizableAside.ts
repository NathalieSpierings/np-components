import { useEffect, useRef, useState } from "react";

export type ResizeSide = "left" | "right";

export function useResizableAside(
    defaultWidth = 400,
    minWidth = 250,
    maxWidth = 700,
    side: ResizeSide = "right"
) {
    const [width, setWidth] = useState(defaultWidth);
    const [resizing, setResizing] = useState(false);

    const startXRef = useRef(0);
    const startWidthRef = useRef(defaultWidth);

    useEffect(() => {
        if (!resizing) return;

        document.body.style.cursor = "ew-resize";
        document.body.style.userSelect = "none";

        const onPointerMove = (event: PointerEvent) => {
            const delta = event.clientX - startXRef.current;

            const nextWidth =
                side === "left"
                    ? startWidthRef.current + delta
                    : startWidthRef.current - delta;

            setWidth(Math.min(maxWidth, Math.max(minWidth, nextWidth)));
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
    }, [resizing, minWidth, maxWidth, side]);

    const startResize = (event: React.PointerEvent) => {
        startXRef.current = event.clientX;
        startWidthRef.current = width;
        setResizing(true);
    };

    return {
        width,
        resizing,
        startResize,
    };
}