"use client";
import { useAccount } from "wagmi";

import { ModelIndex } from "@/constants";
import useNftContract from "@/hooks/useNftContract";
import useNftCollection from "@/hooks/useNftCollection";
import NFTCard from "@/components/nftCard";
import EmptyCard from "@/components/emptyCard";
import { CiSearch } from "react-icons/ci";

const Collection = () => {
  const { chain } = useAccount();
  const { nftContract } = useNftContract({
    modelIndex: ModelIndex,
    chainId: chain?.id,
  });
  const emptyCardList = [...Array(1).keys()];

  const { tokenIds } = useNftCollection({ nftContract });

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex w-full justify-end pt-20 pb-11">
        {/* <div className="w-[330px] h-[58px] flex items-center px-6 border-white border rounded-sm">
          <CiSearch
            size={30}
            color="white"
            className="opacity-60 cursor-pointer"
          />
        </div> */}
      </div>
      {(nftContract && (
        <div className="flex flex-wrap w-full justify-items-center justify-center gap-12">
          {tokenIds.map((id) => (
            <NFTCard
              key={`${nftContract}-${id}`}
              nftContract={nftContract}
              tokenId={BigInt(id)}
            />
          )) || emptyCardList.map((l) => <EmptyCard key={l} />)}
        </div>
      )) || (
        <div className="grid grid-cols-3 2xl:grid-cols-4 max-w-[85%] gap-14">
          {emptyCardList.map((l) => (
            <EmptyCard key={l} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Collection;
