"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import NFTCard from "@/components/nftCard";
import EmptyCard from "@/components/emptyCard";
import useValidListings from "@/hooks/useValidListings";
import { MdOutlineRefresh } from "react-icons/md";
import axios from "axios";
import ModelCard from "@/components/modelCard";
import Card from "@/components/ui/card";
import { ModelList } from "@/types";

const Marketplace = () => {
  const [taskStatus, setTaskStatus] = useState([]);
  const { address, chain } = useAccount();
  const { listings } = useValidListings({
    listingCreator: address,
    chainId: chain?.id,
  });
  const emptyCardList = [...Array(1).keys()];

  const handleFetchData = async () => {
    if (!address) return;
    try {
      const apiUrl = `https://f3593qhe00.execute-api.ap-northeast-1.amazonaws.com/dev/tasks_status?action=train`;
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          "user-id": address,
        },
      });
      const data = response.data;
      setTaskStatus(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, [address]);

  return (
    <div className="flex flex-wrap max-w-[85%] gap-14 relative justify-center">
      <button
        className="text-white right-8 -top-10 absolute"
        onClick={handleFetchData}
      >
        <MdOutlineRefresh size={32} />
      </button>
      {taskStatus?.map((item: ModelList) => (
        <Card className="w-[300px] max-h-[390px] h-[390px]" key={item.id}>
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-between items-center p-4">
              <div className="rounded-full border-2 w-16 h-16 flex justify-center items-center">
                ORA
              </div>
              <div className="border-2 w-24 h-8 flex justify-center items-center">
                Type
              </div>
            </div>
            <div className="flex gap-4 h-fit items-start px-4 border-t-[1px] py-2 border-white flex-col">
              <div className="w-full text-center text-lg">
                <a className="">{item.modelName}</a>
              </div>
              <div className="flex flex-col gap-2 w-full ">
                <div className="w-full flex justify-between">
                  status <span className="font-bold">{item.status}</span>
                </div>
                <div className="w-full flex justify-between">
                  action
                  <span className="font-bold">{item.action}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )) || emptyCardList.map((l) => <EmptyCard key={l} />)}
    </div>
  );
};

export default Marketplace;
