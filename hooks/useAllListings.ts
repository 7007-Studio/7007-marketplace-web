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
  assetContract,
  chainId = sepolia.id,
  tokenId,
}: {
  listingCreator?: Address;
  assetContract?: Address;
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
    const tokenIdExists = tokenId !== undefined;
    const listingCreatorExists = listingCreator !== undefined;
    const assetContractExists = assetContract !== undefined;

    return listings.filter((l: Listing) => {
      if (tokenIdExists && listingCreatorExists && assetContractExists) {
        return (
          Number(l.tokenId) === Number(tokenId) &&
          l.assetContract === assetContract &&
          isAddressEqual(listingCreator, l.listingCreator)
        );
      } else if (tokenIdExists && assetContractExists) {
        return (
          Number(l.tokenId) === Number(tokenId) &&
          l.assetContract === assetContract
        );
      } else if (tokenIdExists && listingCreatorExists) {
        return (
          Number(l.tokenId) === Number(tokenId) &&
          isAddressEqual(listingCreator, l.listingCreator)
        );
      } else if (listingCreatorExists && assetContractExists) {
        return (
          isAddressEqual(listingCreator, l.listingCreator) &&
          l.assetContract === assetContract
        );
      } else if (tokenIdExists) {
        return Number(l.tokenId) === Number(tokenId);
      } else if (listingCreatorExists) {
        return isAddressEqual(listingCreator, l.listingCreator);
      } else if (assetContractExists) {
        return l.assetContract === assetContract;
      } else {
        return true; // 如果沒有提供 tokenId 和 listingCreator，保留所有列表
      }
    });
  };

  const filteredListings = filterListings(allListings || []);

  return { listings: filteredListings };
};

export default useAllListings;
