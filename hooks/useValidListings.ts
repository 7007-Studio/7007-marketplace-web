"use client";

import {
  useReadMarketplaceV3GetAllValidListings,
  useReadMarketplaceV3TotalListings,
} from "@/generated";
import { getContractAddress } from "@/helpers";
import { Address, isAddressEqual } from "viem";

const useValidListings = ({
  listingCreator,
  chainId,
}: {
  listingCreator?: Address;
  chainId?: number;
}) => {
  const marketplaceV3 = getContractAddress("MarketplaceV3", chainId);
  const { data: totalListings } = useReadMarketplaceV3TotalListings({
    address: marketplaceV3,
  });

  const { data: allValidListings } = useReadMarketplaceV3GetAllValidListings({
    address: marketplaceV3,
    args: [0n, totalListings ? totalListings - 1n : 0n],
  });

  if (!listingCreator) {
    return { listings: allValidListings };
  }

  const listings = allValidListings?.filter((l) =>
    isAddressEqual(listingCreator, l.listingCreator)
  );

  return { listings };
};

export default useValidListings;
