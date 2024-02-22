import React from "react";
import NFTCard from "../nftCard";
import { Address } from "viem";

const AigcNftCreated = ({
  tokenIds,
  aigcAddress,
}: {
  tokenIds: number[];
  aigcAddress: Address;
}) => {
  return (
    <div className="flex flex-row flex-wrap gap-6 items-start">
      {tokenIds.map((id) => (
        <NFTCard key={id} tokenId={id} aigcAddress={aigcAddress} />
      ))}
    </div>
  );
};

export default AigcNftCreated;
