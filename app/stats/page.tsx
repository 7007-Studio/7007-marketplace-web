"use client";
import ModelCard from "@/components/modelCard";
import NFTCard from "@/components/nftCard";
import Menu, { MenuList } from "@/components/ui/menu";
import { ModelList } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function HomeModel() {
  const menuOption = [
    { id: "1", label: "All categories", value: "All" },
    { id: "2", label: "text-to-text", value: "text-to-text" },
    { id: "3", label: "text-to-music", value: "text-to-music" },
    { id: "4", label: "Model 3", value: "Model 3" },
  ];
  const { address } = useAccount();
  const [taskStatus, setTaskStatus] = useState<ModelList[]>([]);
  const [select, setSelect] = useState<MenuList>(menuOption[0]);
  const handleSelect = (option: MenuList) => {
    setSelect(option);
  };

  const [type, setType] = useState([
    { id: "1", label: "Trending", selected: true },
    { id: "2", label: "Top", selected: false },
  ]);
  const [time, setTime] = useState([
    { id: "1hr", label: "1hr", selected: true },
    { id: "6hr", label: "6hr", selected: false },
    { id: "24hr", label: "24hr", selected: false },
    { id: "7day", label: "7day", selected: false },
    { id: "30day", label: "30day", selected: false },
    { id: "All", label: "All", selected: false },
  ]);

  const handleFetchData = () => {
    const apiUrl = `https://f3593qhe00.execute-api.ap-northeast-1.amazonaws.com/dev/tasks_status?status=Done&action=train`;

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTaskStatus(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const changeTime = (id: string) => {
    setTime(
      time.map((item) => {
        if (item.id === id) {
          return { ...item, selected: true };
        } else {
          return { ...item, selected: false };
        }
      })
    );
  };
  const changeType = (id: string) => {
    setType(
      type.map((item) => {
        if (item.id === id) {
          return { ...item, selected: true };
        } else {
          return { ...item, selected: false };
        }
      })
    );
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <div className="h-full w-full flex justify-center flex-col gap-16 items-center pt-[150px]">
      {/* <ModelCard modelIndex={ModelIndex} /> */}
      {/* <NFTCard
        nftContract={"0x0B89f60136A91f3B36557F9414cbd157d0ada7bc"}
        tokenId={BigInt(61)}
      />
      <NFTCard
        nftContract={"0x0B89f60136A91f3B36557F9414cbd157d0ada7bc"}
        tokenId={BigInt(2)}
      /> */}
      <div className="w-[75%] flex items-center gap-5">
        <button className="text-white" onClick={handleFetchData}>
          Refresh
        </button>
        <Menu options={menuOption} selected={select} onSelect={handleSelect} />
        {type.map((item, index) => (
          <div
            key={item.id}
            className={`cursor-pointer flex items-center font-bold text-base gap-5 ${
              item.selected ? "text-white" : "text-white/60"
            }`}
            onClick={() => changeType(item.id)}
          >
            {item.label}
            {index !== type.length - 1 && (
              <div className="h-[30px] w-[1.5px] bg-grey" />
            )}
          </div>
        ))}
        <div className="flex-1 h-[1.5px] bg-grey" />
        <div className="gap-5 flex">
          {time.map((item, index) => (
            <div
              key={item.id}
              className={`cursor-pointer flex items-center font-bold text-base gap-5 ${
                item.selected ? "text-white" : "text-white/60"
              }`}
              onClick={() => changeTime(item.id)}
            >
              {item.label}
              {index !== time.length - 1 && (
                <div className="h-[30px] w-[1.5px] bg-grey" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex max-w-[85%] gap-5 w-full">
        <div className="w-full flex flex-col h-full border border-white rounded-lg">
          <div className="h-[45px] w-full flex items-center border-b border-white text-sm font-bold px-4 uppercase">
            <div className="w-[5%] flex items-center justify-center">Rank</div>
            <div className="w-[30%] flex items-center justify-center">
              model
            </div>
            <div className="w-[15%] flex items-center justify-center">
              model type
            </div>
            <div className="w-[15%] flex items-center justify-center">
              floor price
            </div>
            <div className="w-[15%] flex items-center justify-center">
              volume
            </div>
            <div className="w-[10%] flex items-center justify-center">
              %changes
            </div>
            <div className="w-[10%] flex items-center justify-center">
              sales
            </div>
          </div>
          <div className="flex flex-col w-full h-full px-6 py-4 gap-6">
            {taskStatus.map((item: ModelList, index) => (
              <Link
                className="w-full flex items-center rounded hover:bg-grey cursor-pointer"
                key={index}
                href={`/collection/${item.id}&${item.modelAuthorID}`}
              >
                <div className="w-[5%] flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="w-[30%] flex items-center gap-[30px] pl-2">
                  <div className="size-[90px] bg-grey"></div>
                  {item.modelName}
                </div>
                <div className="w-[15%] flex items-center justify-center">
                  text-to-text
                </div>
                <div className="w-[15%] flex items-center justify-center">
                  {0.0007} ETH
                </div>
                <div className="w-[15%] flex items-center justify-center">
                  {7} ETH
                </div>
                <div className="w-[10%] flex items-center justify-center">
                  77%
                </div>
                <div className="w-[10%] flex items-center justify-center">
                  7777
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
