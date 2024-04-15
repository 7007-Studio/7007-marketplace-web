"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import NFTCard from "@/components/nftCard";
import EmptyCard from "@/components/emptyCard";
import useValidListings from "@/hooks/useValidListings";
import { MdOutlineRefresh } from "react-icons/md";

const Marketplace = () => {
  const [taskStatus, setTaskStatus] = useState([]);
  const { address, chain } = useAccount();
  const { listings } = useValidListings({
    listingCreator: address,
    chainId: chain?.id,
  });
  const emptyCardList = [...Array(1).keys()];

  const handleFetchData = () => {
    console.log(address);
    if (!address) {
      alert('Please enter a user ID.');
      return;
    }

    const apiUrl = `https://f3593qhe00.execute-api.ap-northeast-1.amazonaws.com/dev/tasks_status?action=train`;

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'user-id': address
      }
    })
      .then(response => response.json())
      .then(data => {
        setTaskStatus(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  console.log('taskStatus', taskStatus)
  useEffect(() => {
    handleFetchData()
  }, [])

  return (
    <div className="flex flex-wrap max-w-[85%] gap-14 justify-center">
      <button className="text-white" onClick={handleFetchData}><MdOutlineRefresh /></button>
      <table className="table">
        {/* head */}
        <thead className="text-white w-full">
          <tr>
            <th></th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {taskStatus.map((item, index) => (
            <tr key={item.id}>
              <td>{index}</td>
              <td>{item.modelName}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Marketplace;
