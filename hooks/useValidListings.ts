"use client";

import {
  useReadMarketplaceV3GetAllValidListings,
  useReadMarketplaceV3TotalListings,
} from "@/generated";
import { getContractAddress } from "@/helpers";
import { Listing } from "@/types";
import { Address, isAddressEqual } from "viem";
import { mainnet, sepolia } from "viem/chains";

const useValidListings = ({
  listingCreator,
  assetContract,
  chainId = mainnet.id,
}: {
  listingCreator?: Address;
  assetContract?: Address;
  chainId?: number;
}) => {
  const marketplaceV3 = getContractAddress("MarketplaceV3", chainId);
  const { data: totalListings, refetch: refetchTotalListings } =
    useReadMarketplaceV3TotalListings({
      address: marketplaceV3,
    });
  const { data: allValidListings, refetch: refetchAllValidListings } =
    useReadMarketplaceV3GetAllValidListings({
      address: marketplaceV3,
      args: [0n, totalListings ? totalListings - 1n : 0n],
    });

  const filterListings = (listings: any) => {
    const listingCreatorExists = listingCreator !== undefined;
    const assetContractExists = assetContract !== undefined;

    return listings.filter((l: Listing) => {
      if (listingCreatorExists && assetContractExists) {
        return (
          l.assetContract === assetContract &&
          isAddressEqual(listingCreator, l.listingCreator)
        );
      } else if (listingCreatorExists) {
        return isAddressEqual(listingCreator, l.listingCreator);
      } else if (assetContractExists) {
        return l.assetContract === assetContract;
      } else {
        return true; // 如果沒有提供 tokenId 和 listingCreator，保留所有列表
      }
    });
  };
  const refetch = async () => {
    await refetchTotalListings();
    await refetchAllValidListings();
  };
  const filteredListings = filterListings(allValidListings || []);

  return { listings: filteredListings, refetch };
};

export default useValidListings;
