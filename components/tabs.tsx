import { TabState } from "@/pages/marketPlace";

interface TabsProps {
  currentTab: TabState;
  setCurrentTab: (tabState: TabState) => void;
}

export default function Tabs({ currentTab, setCurrentTab }: TabsProps) {
  return (
    <ul className="menu menu-horizontal">
      <li className="mr-2">
        <a
          className={`hover:bg-white hover:text-black text-lg ${
            currentTab === TabState.All ? "focus" : ""
          }`}
          onClick={() => setCurrentTab(TabState.All)}
        >
          ALL
        </a>
      </li>
      <li className="mr-2">
        <a
          className={`hover:bg-white hover:text-black text-lg ${
            currentTab === TabState.Model ? "focus" : ""
          }`}
          onClick={() => setCurrentTab(TabState.Model)}
        >
          MODEL
        </a>
      </li>
      <li>
        <a
          className={`hover:bg-white hover:text-black text-lg ${
            currentTab === TabState.NFT ? "focus" : ""
          }`}
          onClick={() => setCurrentTab(TabState.NFT)}
        >
          NFT
        </a>
      </li>
    </ul>
  );
}
