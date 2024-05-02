"use client";

import {
  useReadMarketplaceV3GetAllListings,
  useReadMarketplaceV3TotalListings,
} from "@/generated";
import { getContractAddress } from "@/helpers";
import { Listing } from "@/types";
import { Address, isAddressEqual } from "viem";
import { sepolia } from "viem/chains";

const useAllListings = ({
  listingCreator,
  chainId = sepolia.id,
  tokenId,
}: {
  listingCreator?: Address;
  chainId?: number;
  tokenId?: number;
}) => {
  const marketplaceV3 = getContractAddress("MarketplaceV3", chainId);
  const { data: totalListings } = useReadMarketplaceV3TotalListings({
    address: marketplaceV3,
  });
  const { data: allListings } = useReadMarketplaceV3GetAllListings({
    address: marketplaceV3,
    args: [0n, totalListings ? totalListings - 1n : 0n],
  });
  const filterListings = (listings: any) => {
    return listings.filter((l: Listing) => {
      if (tokenId && listingCreator) {
        return (
          Number(l.tokenId) === Number(tokenId) &&
          isAddressEqual(listingCreator, l.listingCreator)
        );
      } else if (tokenId && !listingCreator) {
        return Number(l.tokenId) === Number(tokenId);
      } else if (!tokenId && listingCreator) {
        return isAddressEqual(listingCreator, l.listingCreator);
      } else {
        return true; // 如果沒有提供 tokenId 和 listingCreator，保留所有列表
      }
    });
  };

  const filteredListings = filterListings(allListings || []);

  return { listings: filteredListings };
};

export default useAllListings;
