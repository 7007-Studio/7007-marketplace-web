"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import EmptyCard from "@/components/emptyCard";
import { MdOutlineRefresh } from "react-icons/md";
import axios from "axios";
import Card from "@/components/ui/card";
import { ModelList } from "@/types";

const Marketplace = () => {
  const [models, setModels] = useState([]);
  const { address, isConnected } = useAccount();
  const emptyCardList = [...Array(1).keys()];

  const handleFetchData = async () => {
    if (!address) return;
    try {
      const apiUrl = `https://v3ni1o3vi8.execute-api.ap-northeast-1.amazonaws.com/dev/tasks_status?action=train`;
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          "user-id": address,
        },
      });
      const data = response.data;
      console.log("Data:", data);
      setModels(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, [address]);
  const modelList = () => {
    if (!models) {
      return emptyCardList.map((item) => <EmptyCard key={item} />);
    } else if (models && models.length > 0) {
      return models.map((item: ModelList) => (
        <Card className="w-[300px] max-h-[390px] h-[390px]" key={item.id}>
          <div className="flex flex-col relative justify-between h-full"
          router.push(`/collection/${modelInfo.id}&${modelInfo.modelAuthorID}`)
          >
            <div className="absolute bg-white/30 top-4 z-10 right-4 px-2 py-1 flex justify-center items-center">
              TEXT-TO-TEXT
            </div>

            <div
              className="size-full"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1608874973445-de098faf870f?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                backgroundSize: "cover",
              }}
            ></div>

            <div className="flex gap-4 h-fit items-start px-4 border-t-[1px] py-2 border-white flex-col">
              <div className="w-full text-center text-lg">
                <a className="">{item.modelName}</a>
              </div>
              <div className="flex flex-col gap-2 w-full ">
                <div className="w-full flex justify-between">
                  Started <span className="font-bold">Jan 1th</span>
                </div>
                <div className=" w-full flex justify-between">
                  action
                  <span className="font-bold">{item.action}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ));
    } else {
      return <div>There is no trained model in your collection.</div>;
    }
  };

  return (
    <div className="w-full relative flex justify-center">
      {models && models.length > 0 && (
        <button
          className="text-white right-[10%] translate-x-[10%] -top-16 absolute"
          onClick={handleFetchData}
        >
          <MdOutlineRefresh size={32} />
        </button>
      )}
      <div className="flex flex-wrap max-w-[85%] gap-14 relative justify-center">
        {modelList()}
      </div>
    </div>
  );
};

export default Marketplace;
