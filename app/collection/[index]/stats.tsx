import { GraphQueryQuery } from "@/.graphclient";
import useReadAigcContracts from "@/hooks/useReadAigcContracts";
import React from "react";
import { Address, formatEther, zeroAddress } from "viem";

export default function Stats({
  nftContract = zeroAddress,
  NFTData,
}: {
  nftContract?: Address;
  NFTData?: GraphQueryQuery;
}) {
  const { tokenId: minted } = useReadAigcContracts({ nftContract });

  //TODO: check token decimals
  const totalVolume = NFTData?.newSales.reduce((accumulator, sale) => {
    return accumulator + Number(formatEther(sale.totalPricePaid));
  }, 0);
  const floorPrice = NFTData?.newListings.reduce((minPrice, listing) => {
    const price = Number(formatEther(listing.listing_pricePerToken));
    return price < minPrice ? price : minPrice;
  }, Infinity);

  const statItems = [
    {
      name: "Total volume",
      value:
        NFTData && NFTData.newSales?.length > 0
          ? `${totalVolume?.toFixed(4)} ETH`
          : 0,
    },
    {
      name: "Floor price",
      value:
        NFTData && NFTData.newListings?.length > 0 ? `${floorPrice} ETH` : 0,
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
