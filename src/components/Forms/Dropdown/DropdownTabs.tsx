import React, { useState } from "react";
import Search from "../../Base/Search/Search";
import { DropdownMenu, DropdownMenuItem } from "./DropdownMenu";

export interface DropdownTabItem {
  id: string;
  title: React.ReactNode;
  disabled?: boolean;
}

export interface DropdownTabPaneSearch {
  enabled?: boolean;
  placeholder?: string;
  noResultsText?: string;
}

export interface DropdownTabPane {
  tabId: string;
  content?: React.ReactNode;
  menuItems?: DropdownMenuItem[];
  search?: DropdownTabPaneSearch;
}

export interface DropdownTabsProps {
  tabs: DropdownTabItem[];
  tabPanes: DropdownTabPane[];
}

export function DropdownTabs({
  tabs,
  tabPanes
}: Readonly<DropdownTabsProps>) {
  const firstEnabledTab = tabs.find((tab) => !tab.disabled);

  const [activeTab, setActiveTab] = useState(firstEnabledTab?.id);
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});

  const activePane = tabPanes.find(
    (pane) => pane.tabId === activeTab
  );

   const searchTerm = activeTab ? searchTerms[activeTab] ?? "" : "";

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

      {activePane?.menuItems && activePane.search?.enabled && (      

        <Search css="dropdown__search"
          value={searchTerm}
          placeholder={
            activePane.search?.placeholder ?? "Zoeken..."
          }
          onChange={(value) =>
            setSearchTerms((prev) => ({
              ...prev,
              [activePane.tabId]: value
            }))
          }
        />
      )}

      <div className="dropdown__tabber__panes">
        <div className="dropdown__tabber__pane">
          {activePane?.menuItems ? (
            <DropdownMenu
              items={activePane.menuItems}
              searchTerm={searchTerm}
              noResultsText={
                activePane.search?.noResultsText ?? "Geen resultaten"
              }
            />
          ) : (
            activePane?.content
          )}
        </div>
      </div>
    </div>
  );
}