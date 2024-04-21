"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import NFTCard from "@/components/nftCard";
import EmptyCard from "@/components/emptyCard";
import useValidListings from "@/hooks/useValidListings";
import { MdOutlineRefresh } from "react-icons/md";
import Card from "@/components/ui/card";

const Marketplace = () => {
  // const [userId, setUserId] = useState('jasonTest');
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
        document.getElementById("my_modal_2")?.showModal();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to fetch images.");
      });
  };

  console.log("images", images);

  const handleFetchData = () => {
    if (!address) {
      alert("Please enter a user ID.");
      return;
    }

    const apiUrl = `https://f3593qhe00.execute-api.ap-northeast-1.amazonaws.com/dev/tasks_status?action=inference`;

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "user-id": address,
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

  console.log("taskStatus", taskStatus);

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <div className="overflow-x-auto">
      <button className="text-white" onClick={handleFetchData}>
        <MdOutlineRefresh />
      </button>
      <table className="table">
        {/* head */}
        <thead className="text-white w-full">
          <tr>
            <th></th>
            <th>Model Name</th>
            <th>Status</th>
            <th>Prompt</th>
            <th>Button</th>
          </tr>
        </thead>
        <tbody>
          {taskStatus.map((item: any, index) => (
            <tr key={item.id}>
              <td>{index}</td>
              <td>{item.modelName}</td>
              <td>{item.status}</td>
              <td>{item.prompt}</td>
              {item.status === "Done" && (
                <td>
                  <button
                    className="border-[1px] border-white"
                    onClick={() => handleViewImage(item.id)}
                  >
                    View
                  </button>
                  <button
                    className="border-[1px] border-white"
                    onClick={() => handleViewImage(item.id)}
                  >
                    Mint
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <dialog id="my_modal_2" className="modal">
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
  );
};

export default Marketplace;
