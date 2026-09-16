import React, { ReactElement, ReactNode, useState } from "react";
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
    >;


export function DatagridTabs({
    tabs,
    tabPanes,
    tabberPosition,
    tabsMinWidth = 280,
    tabsMaxWidth = 600
}: Readonly<DatagridTabsComponentProps>): ReactElement {

    const { width, startResize } = useResizableAside(
        tabsMinWidth,
        tabsMinWidth,
        tabsMaxWidth,
        tabberPosition
    );

    const [activeTab, setActiveTab] = useState<string | undefined>();

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

            <div className="datagrid-layout__tabber__tabs">
                {tabs.map((tab, idx) => (
                    <button
                        type="button"
                        key={tab.id ?? idx}
                        disabled={tab.disabled}
                        className={
                            activeTab === tab.id
                                ? "datagrid-layout__tabber__tabs__tab active"
                                : "datagrid-layout__tabber__tabs__tab"
                        }
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
                ))}
            </div>
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