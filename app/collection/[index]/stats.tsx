import { StableDiffusionQueryQuery, OpmlQueryQuery } from "@/.graphclient";
import useReadAigcContracts from "@/hooks/useReadAigcContracts";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Address, formatEther, zeroAddress } from "viem";

export default function Stats({
  NFTData,
  totalListings,
  totalSupply,
  floorPrice,
  owners,
}: {
  NFTData?: StableDiffusionQueryQuery | OpmlQueryQuery;
  totalListings?: number;
  totalSupply?: string;
  floorPrice?: number;
  owners?: number;
}) {
  //TODO: check token decimals
  const totalVolume = NFTData?.newSales.reduce((accumulator, sale) => {
    return accumulator + Number(formatEther(sale.totalPricePaid));
  }, 0);
  const statItems = [
    {
      name: "Total Volume",
      value:
        NFTData && NFTData.newSales?.length > 0
          ? `${totalVolume?.toFixed(4)} ETH`
          : 0,
    },
    {
      name: "Floor Price",
      value:
        floorPrice &&
        `${Number(formatEther(BigInt(floorPrice))).toFixed(4)} ETH`,
    },
    {
      name: "Total Quantity",
      value: totalSupply,
    },
    {
      name: "Listed",
      value: totalListings?.toString() || "0",
    },
    {
      name: "Owners",
      value: owners,
    },
    // {
    //   name: "sub models",
    //   value: "12",
    // },
    // {
    //   name: "Accumulated profit",
    //   value: "500 eth",
    // },
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
