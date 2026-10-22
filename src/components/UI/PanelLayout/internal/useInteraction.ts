import { FocusEvent, HTMLAttributes, RefObject, useContext, useEffect, useMemo, useRef } from "react";
import { PanelLayoutContextValue, usePanelLayout } from "../PanelLayoutContext";
import { handleActivationKey } from "../../../../lib/helpers/helpers";
import { InteractionContext, InteractionContextValue } from "./contexts";
import { asideLabel, AsidePane, canHover, expandMode, HOVER_DELAY, INTERACTIVE, isPersistent, MAIN_ATTRIBUTE } from "./model";

/** Hover-to-expand (with delays), for `expandOn="hover"` asides and their resize handles. */
export function useInteraction({ open, close }: PanelLayoutContextValue): InteractionContextValue {
    const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

    useEffect(() => {
        const pending = timers.current;
        return () => pending.forEach(clearTimeout);
    }, []);

    return useMemo(() => {
        const schedule = (id: string, delay: number, action: () => void) => {
            clearTimeout(timers.current.get(id));
            timers.current.set(id, setTimeout(action, delay));
        };

        return {
            pointerEnter: (pane) => {
                if (expandMode(pane) === "hover" && canHover()) {
                    schedule(pane.key, HOVER_DELAY.open, () => open(pane.key));
                }
            },
            pointerLeave: (pane) => {
                if (expandMode(pane) === "hover" && canHover()) {
                    schedule(pane.key, HOVER_DELAY.close, () => close(pane.key));
                }
            },
        };
    }, [open, close]);
}

/**
 * The props that make an aside expand, for its element (header and body together):
 * - `mode="persistent"`: none (always expanded);
 * - `expandOn="hover"`: pointer and focus handlers, also while expanded (to collapse again);
 * - `expandOn="click"`, while collapsed: the aside acts as a button (`clickable`);
 * - otherwise none.
 */
export function useExpandTrigger(pane: AsidePane, expanded: boolean): { props: HTMLAttributes<HTMLElement>; clickable: boolean } {
    const { open, close } = usePanelLayout();
    const { pointerEnter, pointerLeave } = useContext(InteractionContext);

    // Always expanded: nothing to trigger
    if (isPersistent(pane)) {
        return { props: {}, clickable: false };
    }

    if (expandMode(pane) === "hover") {
        return {
            props: {
                onMouseEnter: () => pointerEnter(pane),
                onMouseLeave: () => pointerLeave(pane),
                onFocus: () => canHover() && open(pane.key),
                onBlur: (e: FocusEvent<HTMLElement>) => {
                    if (canHover() && !e.currentTarget.contains(e.relatedTarget)) {
                        close(pane.key);
                    }
                },
            },
            clickable: false,
        };
    }

    if (expandMode(pane) === "none" || expanded) {
        return { props: {}, clickable: false };
    }

    const expand = () => open(pane.key);

    return {
        props: {
            role: "button",
            tabIndex: 0,
            title: `${asideLabel(pane)} openen`,
            onClick: expand,
            onKeyDown: handleActivationKey(expand),
        },
        clickable: true,
    };
}

/**
 * `collapseOnMainClick`: collapses all asides on a click on empty space in the main pane, or on Escape in the layout.
 * Native listeners on the layout root, like a "click outside" handler: the main pane itself is not interactive.
 */
export function useCollapseOnMainClick(root: RefObject<HTMLDivElement | null>, enabled: boolean, close: () => void) {
    useEffect(() => {
        const element = root.current;

        if (!enabled || !element) {
            return;
        }

        const onClick = (e: globalThis.MouseEvent) => {
            const target = e.target as Element;
            // Only this layout's main pane, not one of a nested PanelLayout
            const main = target.closest(`[${MAIN_ATTRIBUTE}]`);

            if (main?.closest(".panel-layout") === element && !target.closest(INTERACTIVE) && !globalThis.getSelection?.()?.toString()) {
                close();
            }
        };

        const onKeyDown = (e: globalThis.KeyboardEvent) => {
            if (e.key === "Escape" && !e.defaultPrevented) {
                close();
            }
        };

        element.addEventListener("click", onClick);
        element.addEventListener("keydown", onKeyDown);

        return () => {
            element.removeEventListener("click", onClick);
            element.removeEventListener("keydown", onKeyDown);
        };
    }, [root, enabled, close]);
}
