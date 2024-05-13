"use client";
import { useAccount } from "wagmi";
import useNftCollection from "@/hooks/useNftCollection";
import NFTCard from "@/components/nftCard";
import EmptyCard from "@/components/emptyCard";
import { Address } from "viem";

const Collection = ({ NFTAddress }: { NFTAddress: Address }) => {
  const { chain } = useAccount();
  const emptyCardList = [...Array(1).keys()];

  const { tokenIds } = useNftCollection({ nftContract: NFTAddress });

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex w-full justify-end pt-20 pb-11"></div>
      {(NFTAddress && (
        <div className="flex flex-wrap w-full justify-items-center justify-center gap-12">
          {tokenIds.map((id) => (
            <NFTCard
              key={`${NFTAddress}-${id}`}
              nftContract={NFTAddress}
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
