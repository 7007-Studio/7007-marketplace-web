import React from "react";
import NFTCard from "../nftCard";

const AigcNftCreated = ({
  tokenIds,
  modelIndex,
}: {
  tokenIds: number[];
  modelIndex: number;
}) => {
  return (
    <div className="flex flex-row flex-wrap gap-6">
      {tokenIds.map((id) => (
        <NFTCard key={id} modelIndex={modelIndex} tokenId={id} />
      ))}
    </div>
  );
};

export default AigcNftCreated;
