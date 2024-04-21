import useReadAigcContracts from "@/hooks/useReadAigcContracts";
import React from "react";
import { Address, zeroAddress } from "viem";

export default function Stats({
  nftContract = zeroAddress,
}: {
  nftContract?: Address;
}) {
  const { tokenId: minted } = useReadAigcContracts({ nftContract });
  const statItems = [
    {
      name: "Total volume",
      value: "1000 eth",
    },
    {
      name: "Floor price",
      value: "0.49 eth",
    },
    {
      name: "Total quantity",
      value: "8888",
    },
    {
      name: "Listed",
      value: "8888",
    },
    {
      name: "Owners",
      value: "8888",
    },
    {
      name: "sub models",
      value: "12",
    },
    {
      name: "Accumulated profit",
      value: "500 eth",
    },
  ];
  return (
    <div className="flex flex-row w-full justify-between">
      {statItems.map((s, index) => {
        return (
          <div key={s.name} className="flex justify-between w-full">
            <div className="min-w-[120px] border flex-1 text-center border-black border-solid flex justify-center">
              <div className="flex flex-col items-center">
                <a className="font-bold text-[28px]">{s.value}</a>
                <a>{s.name}</a>
              </div>
            </div>
            {index !== statItems.length - 1 && (
              <div className="h-full w-[1.5px] bg-white/60" />
            )}
          </div>
        );
      })}
    </div>
  );
}
