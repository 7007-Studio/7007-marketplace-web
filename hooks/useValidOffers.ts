"use client";

import {
  useReadMarketplaceV3GetAllValidOffers,
  useReadMarketplaceV3TotalOffers,
} from "@/generated";
import { getContractAddress } from "@/helpers";
import { Offer } from "@/types";
import { Address, isAddressEqual } from "viem";
import { sepolia } from "viem/chains";

const useValidOffers = ({
  offeror,
  chainId = sepolia.id,
  tokenId,
}: {
  offeror?: Address;
  chainId?: number;
  tokenId?: number;
}) => {
  const marketplaceV3 = getContractAddress("MarketplaceV3", chainId);
  const { data: totalOffers } = useReadMarketplaceV3TotalOffers({
    address: marketplaceV3,
  });
  const { data: allValidOffers } = useReadMarketplaceV3GetAllValidOffers({
    address: marketplaceV3,
    args: [0n, totalOffers ? totalOffers - 1n : 0n],
  });
  const filterOffers = (offers: any) => {
    return offers.filter((o: Offer) => {
      if (tokenId && offeror) {
        return (
          Number(o.tokenId) === Number(tokenId) &&
          isAddressEqual(offeror, o.offeror)
        );
      } else if (tokenId && !offeror) {
        return Number(o.tokenId) === Number(tokenId);
      } else if (!tokenId && offeror) {
        return isAddressEqual(offeror, o.offeror);
      } else {
        return true; // 如果沒有提供 tokenId 和 offeror，保留所有列表
      }
    });
  };

  const filteredOffers = filterOffers(allValidOffers || []);

  return { offers: filteredOffers };
};

export default useValidOffers;
