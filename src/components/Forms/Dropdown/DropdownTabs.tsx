import React, { ReactNode, useState } from "react";
import { DropdownMenu, DropdownMenuItem } from "./DropdownMenu";

export interface DropdownTabItem {
  id: string;
  title: ReactNode;
  menuItems?: DropdownMenuItem[];
  content?: ReactNode;
}

export interface DropdownTabsProps {
  tabs: DropdownTabItem[];
}

export function DropdownTabs({
  tabs
}: Readonly<DropdownTabsProps>) {

  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);
  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  return (
    <div className="dropdown-tabs">
      <div className="dropdown-tabs__header">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`dropdown-tabs__tab ${activeTabId === tab.id ? "dropdown-tabs__tab--active" : ""
              }`}
            onClick={() => setActiveTabId(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className="dropdown-tabs__content">
        {activeTab?.menuItems && <DropdownMenu items={activeTab.menuItems} />}

        {activeTab?.content}
      </div>
    </div>
  );
}
