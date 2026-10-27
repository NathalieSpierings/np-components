import { Children, Fragment, isValidElement, ReactElement, ReactNode } from "react";
import PanelLayoutAside, { PanelLayoutAsideProps } from "../PanelLayoutAside";
import PanelLayoutGroup, { PanelLayoutGroupProps } from "../PanelLayoutGroup";
import PanelLayoutHeader, { PanelLayoutHeaderProps } from "../PanelLayoutHeader";
import PanelLayoutMain, { PanelLayoutMainProps } from "../PanelLayoutMain";
import { AsidePane, GroupInfo, HeaderSlot, MAIN_KEY, Pane, reportError, RowItem, SharedItem, SharedRowItem } from "./model";

/** Where in the tree the parser is: inside a shared header and/or a group. */
interface ParseContext {
    /** The `PanelLayout.Header` being parsed, which the panes and items are added to. */
    shared?: SharedItem;
    /** The `PanelLayout.Group` being parsed, which the asides are added to. */
    group?: GroupInfo;
}

/** Reports a percentage in a `width`, which is not supported (it would resolve against different elements). */
const checkWidth = (width: string | undefined, of: string) => {
    if (width?.includes("%")) {
        reportError(`width "${width}" of ${of} contains a percentage, which is not supported: use e.g. px, rem or vw.`);
    }
};

/** Props of an aside that are ignored (with an error) inside a `PanelLayout.Group`: they belong on the group. */
const GROUP_SIZING_PROPS = ["width", "resizable", "overlay"] as const;

/**
 * Parses the children (including fragments, headers and groups) into:
 * - `items`: what to render, in visual order: the main pane, blocks of asides, and shared headers around items;
 * - `panes`: all panes, in visual order;
 * - `slots`: all headers: each pane's own, and the shared ones.
 */
export function parseChildren(children: ReactNode) {
    const panes: Pane[] = [];
    const slots: HeaderSlot[] = [];
    const items: RowItem[] = [];
    const hasMain = () => panes.some((pane) => pane.kind === "main");

    const createAside = (props: PanelLayoutAsideProps, group?: GroupInfo): AsidePane => {
        if (props.id === MAIN_KEY || panes.some((pane) => pane.key === props.id)) {
            reportError(`aside id "${props.id}" is not unique.`);
        }

        const misplaced = group && GROUP_SIZING_PROPS.filter((prop) => props[prop] !== undefined);

        if (misplaced?.length) {
            reportError(`${misplaced.join(", ")} of aside "${props.id}" is ignored: set it on its PanelLayout.Group.`);
        }

        checkWidth(props.width, `aside "${props.id}"`);

        // A persistent aside is always expanded, which contradicts "at most one expanded" of a group or exclusive link
        if (props.mode === "persistent" && (group || props.exclusive !== undefined)) {
            reportError(`aside "${props.id}" with mode="persistent" cannot be in a PanelLayout.Group or have an exclusive link.`);
        }

        return { kind: "aside", key: props.id, side: hasMain() ? "right" : "left", props, group };
    };

    const createPane = (child: ReactElement, group?: GroupInfo): Pane | undefined => {
        if (child.type === PanelLayoutMain) {
            if (group) {
                reportError("PanelLayout.Main cannot be inside a PanelLayout.Group.");
            }

            return { kind: "main", key: MAIN_KEY, props: child.props as PanelLayoutMainProps };
        }

        if (child.type === PanelLayoutAside) {
            return createAside(child.props as PanelLayoutAsideProps, group);
        }

        reportError("only PanelLayout.Main, PanelLayout.Aside, PanelLayout.Group and PanelLayout.Header are allowed as children.");
        return undefined;
    };

    /** Adds an item to the shared header being parsed, or to the layout itself. */
    const addItem = (item: SharedRowItem, context: ParseContext) => {
        (context.shared?.items ?? items).push(item);
    };

    const addSharedHeader = (element: ReactElement, context: ParseContext) => {
        const { content, children: headerChildren } = element.props as PanelLayoutHeaderProps;

        if (context.shared || context.group) {
            reportError("PanelLayout.Header cannot be inside another PanelLayout.Header or a PanelLayout.Group.");
            // Still show its panes, as if it were not there
            walk(headerChildren, context);
            return;
        }

        const shared: SharedItem = { type: "shared", slot: { key: "", panes: [], header: content, isShared: true }, items: [] };

        walk(headerChildren, { shared });

        if (shared.slot.panes.length > 0) {
            shared.slot.key = `shared:${shared.slot.panes[0].key}`;
            slots.push(shared.slot);
            items.push(shared);
        }
    };

    const addGroup = (element: ReactElement, context: ParseContext) => {
        const { children: groupChildren, ...props } = element.props as PanelLayoutGroupProps;

        if (context.group) {
            reportError("PanelLayout.Group cannot be nested.");
            // Still show its asides, as part of the outer group
            walk(groupChildren, context);
            return;
        }

        checkWidth(props.width, "a PanelLayout.Group");

        const group: GroupInfo = { key: "", props, members: [] };

        walk(groupChildren, { ...context, group });

        if (group.members.length > 0) {
            group.key = `group:${group.members[0].key}`;
            addItem({ type: "block", block: { key: group.key, side: group.members[0].side, members: group.members } }, context);
        }
    };

    const addPane = (element: ReactElement, context: ParseContext) => {
        const pane = createPane(element, context.group);

        if (!pane) {
            return;
        }

        panes.push(pane);

        if (context.shared) {
            context.shared.slot.panes.push(pane);
        } else {
            slots.push({ key: pane.key, panes: [pane], header: pane.props.header, isShared: false });
        }

        if (pane.kind === "main") {
            addItem({ type: "main", pane }, context);
        } else if (pane.group) {
            // Added as part of its group's block, once the whole group is parsed
            pane.group.members.push(pane);
        } else {
            addItem({ type: "block", block: { key: pane.key, side: pane.side, members: [pane] } }, context);
        }
    };

    function walk(nodes: ReactNode, context: ParseContext = {}) {
        Children.forEach(nodes, (child) => {
            if (!isValidElement(child)) {
                return;
            }

            if (child.type === Fragment) {
                walk((child.props as { children?: ReactNode }).children, context);
            } else if (child.type === PanelLayoutHeader) {
                addSharedHeader(child, context);
            } else if (child.type === PanelLayoutGroup) {
                addGroup(child, context);
            } else {
                addPane(child, context);
            }
        });
    }

    walk(children);

    const mainCount = panes.filter((pane) => pane.kind === "main").length;

    if (mainCount !== 1) {
        reportError(`expected exactly one PanelLayout.Main, found ${mainCount}.`);
    }

    return { items, panes, slots };
}
