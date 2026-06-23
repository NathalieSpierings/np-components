import React, { ReactNode, useMemo, useState } from "react";
import { DismissButton } from "../../UI/DismissButton";
import { ColorDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import Tooltip from "../../UI/Tooltip/Tooltip";

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

export interface DatagridTabsProps {
    tabs: DatagridTabItem[];
    tabPanes: DatagridTabPane[];
    enableTabs?: boolean;
    enableColumnChooserTab?: boolean;
    columnChooserContent?: ReactNode;
}

export function DatagridTabs({
    tabs,
    tabPanes,
    enableTabs,
    enableColumnChooserTab,
    columnChooserContent
}: Readonly<DatagridTabsProps>) {

    const effectiveTabs = useMemo(() => {
        if (!enableColumnChooserTab || !columnChooserContent) return tabs;

        return [
            {
                id: "__columns",
                title: "Kolommen",
            },
            ...tabs,
        ];
    }, [tabs, enableColumnChooserTab, columnChooserContent]);

    const effectiveTabPanes = useMemo(() => {
        if (!enableColumnChooserTab || !columnChooserContent) return tabPanes;

        return [
            {
                tabId: "__columns",
                content: columnChooserContent,
                header: {
                    content: "Kolommen",
                },
            },
            ...tabPanes,
        ];
    }, [tabPanes, enableColumnChooserTab, columnChooserContent]);

    const firstEnabledTab = effectiveTabs.find((tab) => !tab.disabled);

    const [activeTab, setActiveTab] = useState<string | undefined>(
        firstEnabledTab?.id
    );

    const activePane = effectiveTabPanes.find(
        (pane) => pane.tabId === activeTab
    );

    const closePane = () => {
        setActiveTab(undefined);
    };

    return (
        <div className={`datagrid__tabber pc-layout__aside ${enableTabs ? 'shown' : ''}`}>
            <div className="datagrid__tabber__tabs">
                {effectiveTabs.map((tab, idx) => (
                    <button
                        key={tab.id ?? idx}
                        disabled={tab.disabled}
                        className={
                            activeTab === tab.id
                                ? "datagrid__tabber__tabs__tab active"
                                : "datagrid__tabber__tabs__tab"
                        }
                        onClick={() => {
                            if (!tab.disabled) {
                                setActiveTab(tab.id);
                            }
                        }}
                    >
                        <div className="datagrid__tabber__tabs__tab__content">
                            {tab.icon}
                            <div className="datagrid__tabber__tabs__tab__label">
                                {tab.title}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
            <div className="datagrid__tabber__panes">

                {activeTab && (
                    <div className="datagrid__tabber__pane shown">
                        <div className="datagrid__tabber__pane__container">
                            <div className={`datagrid__tabber__pane__header ${activePane?.header?.borderColor ? 'border-' + activePane?.header?.borderColor : ''}`}>

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
                            <div className="datagrid__tabber__pane__content">
                                {activePane?.content}
                            </div>
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
}