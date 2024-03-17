"use client";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { ModelIndex } from "@/constants";
import useNftContract from "@/hooks/useNftContract";
import useNftCollection from "@/hooks/useNftCollection";
import NFTCard from "@/components/nftCard";
import EmptyCard from "@/components/emptyCard";

// variables
const ITEMS_PER_PAGE = 8;
const SCROLL_THRESHOLD = 800;
const INITIAL_EMPTY_CARDS_COUNT = 1;
let PREV_SCROLL_Y= 0;

const Collection = () => {
  const { chain } = useAccount();
  const { nftContract } = useNftContract({
    modelIndex: ModelIndex,
    chainId: chain?.id,
  });
  const [tokenIds, setTokenIds] = useState<any[]>([]);
  const [startIndex, setStartIndex] = useState(1);
  const { tokenIds: initialTokenIds } = useNftCollection({ nftContract });
  const emptyCardList = Array.from({ length: INITIAL_EMPTY_CARDS_COUNT });

  const handleScroll = () => {
    const currentScrollY = window.scrollY + 500;
    if (currentScrollY - PREV_SCROLL_Y > SCROLL_THRESHOLD) {
      PREV_SCROLL_Y = currentScrollY;
      setStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    if (nftContract) {
      setTokenIds(initialTokenIds.slice(0, ITEMS_PER_PAGE * startIndex));
    }
  }, [nftContract, startIndex, initialTokenIds]);

  useEffect(() => {
    if (nftContract) {
      setTokenIds(initialTokenIds.slice(0, ITEMS_PER_PAGE));
    }
  }, [initialTokenIds, nftContract]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="columns-3 max-w-[828px] xl:columns-4 xl:max-w-[1106px]">
        {tokenIds.length > 0
          ? tokenIds.map((id) => (
              <NFTCard
                key={`${nftContract}-${id}`}
                nftContract={nftContract}
                tokenId={BigInt(id)}
              />
            ))
          : emptyCardList.map((_, index) => <EmptyCard key={index} />)}
      </div>
    </>
  );
};

export default Collection;