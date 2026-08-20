import React, { FC, PropsWithChildren } from "react";

export interface TabPanesProps extends PropsWithChildren {
  selectedTab: number;
  keepMounted?: boolean;
}

const TabPanes: FC<TabPanesProps> = ({
  selectedTab,
  keepMounted = false,
  children,
}) => {
  return (
    <div className="tabs__panes">
      {React.Children.map(children, (child, index) => {
        const active = selectedTab === index;
        const content = keepMounted || active ? child : null;

        return (
          <div
            className={`pane ${active ? "shown" : ""}`}
            style={
              keepMounted
                ? { display: active ? "block" : "none" }
                : undefined
            }
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};

export default TabPanes;