"use client";
import { useAccount } from "wagmi";

import { ModelIndex } from "@/constants";
import useNftContract from "@/hooks/useNftContract";
import useNftCollection from "@/hooks/useNftCollection";
import NFTCard from "@/components/nftCard";
import EmptyCard from "@/components/emptyCard";

const Collection = () => {
  const { chain } = useAccount();
  const { nftContract } = useNftContract({
    modelIndex: ModelIndex,
    chainId: chain?.id,
  });
  const emptyCardList = [...Array(1).keys()];

  const { tokenIds } = useNftCollection({ nftContract });

  return (
    <>
      {(nftContract && (
       <div className="columns-3 max-w-[828px] xl:columns-4 xl:max-w-[1106px]">
          {tokenIds.map((id) => (
            <NFTCard
              key={`${nftContract}-${id}`}
              nftContract={nftContract}
              tokenId={BigInt(id)}
            />
          )) || emptyCardList.map((l) => <EmptyCard key={l} />)}
        </div>
      )) || (
        <div className="columns-3 max-w-[835px] xl:columns-4 xl:max-w-[1106px]">
          {emptyCardList.map((l) => (
            <EmptyCard key={l} />
          ))}
        </div>
      )}
    </> 
  );
};

export default Collection;
