import React, { useState } from "react";
import { DropdownSearch } from "./Dropdown";
import { IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import { Icon } from "../../UI/Icons/Icon";

export interface DropdownTabItem {
  id: string;
  title: React.ReactNode;
  disabled?: boolean;
}

export interface DropdownTabPane {
  tabId: string;
  content: React.ReactNode;
}

export interface DropdownTabsProps {
  tabs: DropdownTabItem[];
  tabPanes: DropdownTabPane[];
  enableSearch?: boolean;
  search?: DropdownSearch;
}

export function DropdownTabs({
  tabs,
  tabPanes,
  enableSearch = false,
  search,
}: Readonly<DropdownTabsProps>) {
  const firstEnabledTab = tabs.find((tab) => !tab.disabled);
  const [activeTab, setActiveTab] = useState(firstEnabledTab?.id);

  const activePane = tabPanes.find((pane) => pane.tabId === activeTab);

  return (
    <div className="dropdown__tabber">
      <div className="dropdown__tabber__tabs">
        {tabs.map((tab, idx) => (
          <button
            key={tab.id ?? idx}
            disabled={tab.disabled}
            className={activeTab === tab.id ? "dropdown__tabber__tab active" : "dropdown__tabber__tab"}
            onClick={() => {
              if (!tab.disabled) {
                setActiveTab(tab.id);
              }
            }}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="dropdown__tabber__panes">
        <div className="dropdown__tabber__pane">
          {activePane?.content}
        </div>
      </div>
    </div>
  );
}