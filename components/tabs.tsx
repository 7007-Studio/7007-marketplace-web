interface TabsProps {
  isAllTab: boolean;
  setIsAllTab: (isAllTab: boolean) => void;
  isModelTab: boolean;
  setIsModelTab: (isModelTab: boolean) => void;
  isNFTTab: boolean;
  setIsNFTTab: (isNFTTab: boolean) => void;
}

export default function Tabs({
  isAllTab,
  isModelTab,
  isNFTTab,
  setIsAllTab,
  setIsModelTab,
  setIsNFTTab,
}: TabsProps) {
  return (
    <ul className="menu menu-horizontal">
      <li className="mr-2">
        <a
          className={`text-white hover:bg-white hover:text-black text-lg ${
            isAllTab && "focus"
          }`}
          onClick={() => {
            setIsAllTab(true);
            setIsModelTab(false);
            setIsNFTTab(false);
          }}
        >
          ALL
        </a>
      </li>
      <li className="mr-2">
        <a
          className={`text-white hover:bg-white hover:text-black text-lg ${
            isModelTab && "focus"
          }`}
          onClick={() => {
            setIsAllTab(false);
            setIsModelTab(true);
            setIsNFTTab(false);
          }}
        >
          MODEL
        </a>
      </li>
      <li>
        <a
          className={`text-white hover:bg-white hover:text-black text-lg ${
            isNFTTab && "focus"
          }`}
          onClick={() => {
            setIsAllTab(false);
            setIsModelTab(false);
            setIsNFTTab(true);
          }}
        >
          NFT
        </a>
      </li>
    </ul>
  );
}
