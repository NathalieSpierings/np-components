import React, { ReactElement, ReactNode, useLayoutEffect, useRef, useState } from "react";
import { useResizableAside } from "../../../../lib/hooks/useResizableAside";
import { ColorDefinitions, SizeDefinitions } from "../../../../lib/utils/definitions";
import DismissButton from "../../../UI/DismissButton/DismissButton";
import Tooltip from "../../../UI/Tooltip/Tooltip";
import { DatagridTabsProps as DatagridBaseTabsProps } from "../Datagrid";
export interface DatagridTabPaneHeader {
    content?: ReactNode;
    borderColor?: ColorDefinitions;
}

export interface DatagridTabItem {
    id: string;
    title: ReactNode;
    icon?: ReactNode;
    disabled?: boolean;
}

export interface DatagridTabPane {
    tabId: string;
    content?: ReactNode;
    header?: DatagridTabPaneHeader;
}

export type DatagridTabsComponentProps =
    Required<
        Pick<
            DatagridBaseTabsProps,
            | "tabs"
            | "tabPanes"
        >
    > &
    Pick<
        DatagridBaseTabsProps,
        | "tabberPosition"
        | "tabsMinWidth"
        | "tabsMaxWidth"
        | "tabsDisplay"
    >;


export function DatagridTabs({
    tabs,
    tabPanes,
    tabberPosition,
    tabsMinWidth = 280,
    tabsMaxWidth = 600,
    tabsDisplay = "auto"
}: Readonly<DatagridTabsComponentProps>): ReactElement {

    const { width, startResize } = useResizableAside(
        tabsMinWidth,
        tabsMinWidth,
        tabsMaxWidth,
        tabberPosition
    );

    const [activeTab, setActiveTab] = useState<string | undefined>();

    // Compact: alleen iconen + tooltip wanneer de labels niet in de beschikbare hoogte passen
    const tabsRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);
    const [autoCompact, setAutoCompact] = useState(false);
    const compact = tabsDisplay === "icons" || (tabsDisplay === "auto" && autoCompact);

    useLayoutEffect(() => {
        if (tabsDisplay !== "auto") return;

        const tabsEl = tabsRef.current;
        const measureEl = measureRef.current;
        if (!tabsEl || !measureEl) return;

        const update = () => {
            const available = tabsEl.clientHeight;
            const required = measureEl.scrollHeight;
            setAutoCompact(available > 0 && required > available);
        };

        update();
        const observer = new ResizeObserver(update);
        observer.observe(tabsEl);
        observer.observe(measureEl);
        return () => observer.disconnect();
    }, [tabs, tabsDisplay]);

    const tooltipDirection = tabberPosition === "left" ? "right" : "left";

    const activePane = tabPanes.find(
        (pane) => pane.tabId === activeTab
    );

    const closePane = () => {
        setActiveTab(undefined);
    };

    return (
        <div className={`pc-layout__aside datagrid-layout__tabber datagrid-layout__tabber--${tabberPosition} shown`}
            style={
                activeTab
                    ? ({ "--datagrid-tabber-width": `${width}px` } as React.CSSProperties)
                    : undefined
            }>
            {activeTab && (
                <div
                    className="datagrid__resizer"
                    onPointerDown={(e) => {
                        e.preventDefault();
                        startResize(e);
                    }}
                />
            )}

            <div
                ref={tabsRef}
                className={`datagrid-layout__tabber__tabs${compact ? " datagrid-layout__tabber__tabs--compact" : ""}`}
            >
                {tabs.map((tab, idx) => {
                    const button = (
                        <button
                            type="button"
                            disabled={tab.disabled}
                            aria-label={compact && typeof tab.title === "string" ? tab.title : undefined}
                            className={[
                                "datagrid-layout__tabber__tabs__tab",
                                tab.icon ? "datagrid-layout__tabber__tabs__tab--has-icon" : "",
                                activeTab === tab.id ? "active" : ""
                            ].filter(Boolean).join(" ")}
                            onClick={() => {
                                if (!tab.disabled) {
                                    setActiveTab(tab.id);
                                }
                            }}
                        >
                            <div className="datagrid-layout__tabber__tabs__tab__content">
                                {tab.icon}
                                <div className="datagrid-layout__tabber__tabs__tab__label">
                                    {tab.title}
                                </div>
                            </div>
                        </button>
                    );

                    return (
                        <Tooltip
                            key={tab.id ?? idx}
                            content={tab.title}
                            direction={tooltipDirection}
                            disabled={!compact || !tab.icon}
                        >
                            {button}
                        </Tooltip>
                    );
                })}
            </div>

            {/* onzichtbare meetkopie: hoogte die de tabs mét labels nodig hebben (alleen bij "auto") */}
            {tabsDisplay === "auto" && (
                <div
                    ref={measureRef}
                    aria-hidden="true"
                    className="datagrid-layout__tabber__tabs datagrid-layout__tabber__tabs--measure"
                >
                    {tabs.map((tab, idx) => (
                        <button type="button" tabIndex={-1} key={tab.id ?? idx} className="datagrid-layout__tabber__tabs__tab">
                            <div className="datagrid-layout__tabber__tabs__tab__content">
                                {tab.icon}
                                <div className="datagrid-layout__tabber__tabs__tab__label">{tab.title}</div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
            <div className="datagrid-layout__tabber__panes">

                {activeTab && (
                    <div className={`datagrid-layout__tabber__pane ${activeTab ? 'shown' : ''}`}>
                        <div className="datagrid-layout__tabber__pane__container">
                            <div className={`datagrid-layout__tabber__pane__header ${activePane?.header?.borderColor ? 'border-' + activePane?.header?.borderColor : ''}`}>

                                {activePane?.header?.content}

                                <Tooltip content="Panel sluiten" direction="bottom-left">
                                    <DismissButton
                                        size={SizeDefinitions.ExtraSmall}
                                        right={true}
                                        labelPosition="left"
                                        onClick={closePane}
                                    />
                                </Tooltip>
                            </div>
                            <div className="datagrid-layout__tabber__pane__content">
                                {activePane?.content}
                            </div>
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
}