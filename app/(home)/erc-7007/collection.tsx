"use client";
import { useAccount } from "wagmi";

import { ModelIndex } from "@/constants";
import useNftContract from "@/hooks/useNftContract";
import useNftCollection from "@/hooks/useNftCollection";
import NFTCard from "@/components/nftCard";

const Collection = () => {
  const { address, chain } = useAccount();
  const { nftContract } = useNftContract({
    modelIndex: ModelIndex,
    chainId: chain?.id,
  });

  const { tokenIds } = useNftCollection({ nftContract });

  return (
    <>
      {nftContract && (
        <div className="flex flex-row flex-wrap gap-6 items-start">
          {tokenIds.map((id) => (
            <NFTCard
              key={`${nftContract}-${id}`}
              nftContract={nftContract}
              tokenId={BigInt(id)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Collection;
