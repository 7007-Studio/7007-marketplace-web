"use client";

import { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";

import NFTCard from "@/components/nftCard";
import EmptyCard from "@/components/emptyCard";
import useValidListings from "@/hooks/useValidListings";
import { MdOutlineRefresh } from "react-icons/md";
import Card from "@/components/ui/card";
import axios from "axios";
import ModelCard from "@/components/modelCard";
import { ModelList } from "@/types";

const Marketplace = () => {
  // const [userId, setUserId] = useState('jasonTest');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [taskStatus, setTaskStatus] = useState([]);
  const { address, chain } = useAccount();
  const { listings } = useValidListings({
    listingCreator: address,
    chainId: chain?.id,
  });
  const emptyCardList = [...Array(1).keys()];
  // const [requestId, setRequestId] = useState('ca2aea37-4c65-4265-aae5-07315d9c1887');
  const [images, setImages] = useState([]);

  const handleViewImage = (requestId: any) => {
    if (!address) {
      alert("Please enter a User ID.");
      return;
    }
    if (!requestId) {
      alert("Please enter a Request ID.");
      return;
    }

    fetch(
      `https://f3593qhe00.execute-api.ap-northeast-1.amazonaws.com/dev/genImages?requestID=${requestId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "user-id": address,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setImages(data.images);
        dialogRef.current?.showModal();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to fetch images.");
      });
  };

  console.log("images", images);

  const handleFetchData = async () => {
    if (!address) return;

    try {
      const apiUrl = `https://f3593qhe00.execute-api.ap-northeast-1.amazonaws.com/dev/tasks_status?action=inference`;
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

  const modelList = () => {
    if (!taskStatus) {
      return emptyCardList.map((item) => <EmptyCard key={item} />);
    } else if (taskStatus && taskStatus.length > 0) {
      return taskStatus.map((item: ModelList) => (
        <Card className="w-[300px] max-h-[390px] h-[390px]" key={item.id}>
          <div className="flex flex-col relative justify-between h-full">
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
      return <div>There is no inference model in your collection.</div>;
    }
  };

  return (
    <div className="flex w-full flex-col relative max-w-[85%]">
      {taskStatus && taskStatus.length > 0 && (
        <button
          className="text-white right-8 -top-16 absolute"
          onClick={handleFetchData}
        >
          <MdOutlineRefresh size={32} />
        </button>
      )}
      <div className="flex flex-wrap w-full relative gap-14 justify-center">
        {modelList()}
        <dialog id="my_modal_2" ref={dialogRef} className="modal">
          <div className="modal-box">
            {images.map((imgData, index) => (
              <img
                key={index}
                src={`data:image/jpeg;base64,${imgData}`}
                alt={`Image ${index}`}
              />
            ))}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default Marketplace;
