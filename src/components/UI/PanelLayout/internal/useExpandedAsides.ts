import { useEffect, useMemo, useRef } from "react";
import { useControllableState } from "../../../../lib/hooks/useControllableState";
import type { PanelLayoutProps } from "../PanelLayout";
import { PanelLayoutContextValue } from "../PanelLayoutContext";
import { AsidePane, exclusiveKeys, isExpanded, isPersistent, MAIN_KEY, NONE } from "./model";

/**
 * The expanded asides and the screen shown on mobile (each controlled or not), the API to change them, and the pane
 * that is shown on mobile: the screen's aside while it is expanded, or main.
 *
 * The two stay consistent: an aside shown on mobile is expanded (also when shown from outside), and when the aside
 * shown on mobile collapses, mobile goes back to the main screen.
 */
export function useExpandedAsides(
    {
        expandedAsides: controlledExpanded,
        defaultExpandedAsides = NONE,
        onExpandedAsidesChange,
        mobileScreen: controlledScreen,
        defaultMobileScreen = null,
        onMobileScreenChange,
    }: PanelLayoutProps,
    asides: AsidePane[],
) {
    // An aside shown on mobile from the start is expanded from the start too (no animation on load)
    const initialExpanded =
        defaultMobileScreen === null || defaultExpandedAsides.includes(defaultMobileScreen)
            ? defaultExpandedAsides
            : [...defaultExpandedAsides, defaultMobileScreen];

    const [expandedIds, setExpandedIds] = useControllableState(controlledExpanded, initialExpanded, onExpandedAsidesChange);
    const [screen, setScreen] = useControllableState<string | null>(controlledScreen, defaultMobileScreen, onMobileScreenChange);

    // Refs, so the API also works from timers (hover) without stale state
    const latest = useRef({ expandedIds, setExpandedIds, screen, setScreen, asides });
    latest.current = { expandedIds, setExpandedIds, screen, setScreen, asides };

    const api = useMemo(() => {
        const update = (next: string[]) => {
            if (next === latest.current.expandedIds) return;

            // Right away, so several changes in a row (e.g. close and open) build on each other
            latest.current.expandedIds = next;
            latest.current.setExpandedIds(next);
        };

        const showScreen = (id: string | null) => {
            if (id === latest.current.screen) return;

            latest.current.screen = id;
            latest.current.setScreen(id);
        };

        const asideOf = (id: string) => latest.current.asides.find((candidate) => candidate.key === id);

        const keysOf = (id: string) => {
            const aside = asideOf(id);
            return aside ? exclusiveKeys(aside) : NONE;
        };

        const isOpenNow = (id: string) => {
            const aside = asideOf(id);
            return aside ? isExpanded(aside, latest.current.expandedIds) : latest.current.expandedIds.includes(id);
        };

        /** Expands the aside (collapsing the others it is exclusive with), without changing the mobile screen. */
        const expand = (id: string) => {
            // Already expanded (persistent asides always are)
            if (isOpenNow(id)) return;

            const keys = keysOf(id);
            const current = latest.current.expandedIds;
            update([...current.filter((other) => !keysOf(other).some((key) => keys.includes(key))), id]);
        };

        const open = (id: string) => {
            showScreen(id);
            expand(id);
        };

        const close = (id?: string) => {
            const current = latest.current.expandedIds;
            const screenAside = latest.current.screen === null ? undefined : asideOf(latest.current.screen);

            // Leave the mobile screen of what collapses (a persistent aside cannot collapse: closing it only leaves its screen)
            if (id === undefined ? screenAside && !isPersistent(screenAside) : latest.current.screen === id) {
                showScreen(null);
            }

            if (id === undefined) {
                update(current.length > 0 ? NONE : current);
            } else if (current.includes(id)) {
                update(current.filter((other) => other !== id));
            }
        };

        const toggle = (id: string) => (isOpenNow(id) ? close(id) : open(id));

        return { open, close, toggle, expand, showScreen };
    }, []);

    // Keep the mobile screen and the expanded asides consistent when either changes from outside (controlled).
    // Before the first run, the screen counts as just set (so an initial screen gets expanded).
    const previous = useRef<{ expandedIds: string[]; screen?: string | null }>({ expandedIds });

    useEffect(() => {
        const { expandedIds: previousExpandedIds, screen: previousScreen } = previous.current;
        previous.current = { expandedIds, screen };

        // An aside expanded from outside: show it on mobile as well
        if (expandedIds !== previousExpandedIds) {
            const added = expandedIds.find((id) => !previousExpandedIds.includes(id));

            if (added) {
                api.showScreen(added);
                return;
            }
        }

        const screenAside = screen === null ? undefined : asides.find((aside) => aside.key === screen);

        if (!screenAside || isExpanded(screenAside, expandedIds)) {
            return;
        }

        if (screen !== previousScreen) {
            // Shown on mobile from outside: expand it (as `open` does)
            api.expand(screenAside.key);
        } else {
            // Collapsed from outside: back to the main screen
            api.showScreen(null);
        }
    }, [expandedIds, screen, asides, api]);

    const contextValue = useMemo<PanelLayoutContextValue>(() => ({
        open: api.open,
        close: api.close,
        toggle: api.toggle,
        expandedAsides: expandedIds,
        isOpen: (id) => {
            const aside = asides.find((candidate) => candidate.key === id);
            return aside ? isExpanded(aside, expandedIds) : expandedIds.includes(id);
        },
    }), [api, expandedIds, asides]);

    // The pane shown on mobile: the screen's aside, while it is expanded
    const screenIsOpen = screen !== null && asides.some((aside) => aside.key === screen && isExpanded(aside, expandedIds));

    return { expandedIds, contextValue, activeKey: screenIsOpen ? screen : MAIN_KEY };
}
