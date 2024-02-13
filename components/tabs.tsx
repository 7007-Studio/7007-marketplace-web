import clsx from "clsx";

export enum TabState {
  ModelLaunchpad,
  Marketplace,
  Created,
  Collected,
}

interface TabsProps {
  currentTab: TabState;
  setCurrentTab: (tabState: TabState) => void;
}

function Tab({
  isActive = false,
  onClick,
  children,
}: {
  isActive?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <a
      className={clsx("tab", {
        "tab-active": isActive,
      })}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

export default function Tabs({ currentTab, setCurrentTab }: TabsProps) {
  return (
    <div className="tabs tabs-lg tabs-bordered gap-4">
      <Tab
        isActive={currentTab === TabState.ModelLaunchpad}
        onClick={() => setCurrentTab(TabState.ModelLaunchpad)}
      >
        Model Launchpad
      </Tab>
      <Tab
        isActive={currentTab === TabState.Marketplace}
        onClick={() => setCurrentTab(TabState.Marketplace)}
      >
        AIGC NFT Marketplace
      </Tab>
      <Tab
        isActive={currentTab === TabState.Created}
        onClick={() => setCurrentTab(TabState.Created)}
      >
        Created
      </Tab>
      <Tab
        isActive={currentTab === TabState.Collected}
        onClick={() => setCurrentTab(TabState.Collected)}
      >
        Collected
      </Tab>
    </div>
  );
}
