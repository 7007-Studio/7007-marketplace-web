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
  assetContract,
}: {
  offeror?: Address;
  chainId?: number;
  tokenId?: number;
  assetContract?: Address;
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
    const tokenIdExists = tokenId !== undefined;
    const offerorExists = offeror !== undefined;
    const assetContractExists = assetContract !== undefined;

    return offers.filter((o: Offer) => {
      if (tokenIdExists && offerorExists && assetContractExists) {
        return (
          Number(o.tokenId) === Number(tokenId) &&
          isAddressEqual(offeror, o.offeror) &&
          o.assetContract === assetContract
        );
      } else if (tokenIdExists && assetContractExists) {
        return (
          Number(o.tokenId) === Number(tokenId) &&
          o.assetContract === assetContract
        );
      } else if (tokenIdExists && offerorExists) {
        return (
          Number(o.tokenId) === Number(tokenId) &&
          isAddressEqual(offeror, o.offeror)
        );
      } else if (offerorExists && assetContractExists) {
        return (
          isAddressEqual(offeror, o.offeror) &&
          o.assetContract === assetContract
        );
      } else if (tokenIdExists) {
        return Number(o.tokenId) === Number(tokenId);
      } else if (offerorExists) {
        return isAddressEqual(offeror, o.offeror);
      } else if (assetContractExists) {
        return o.assetContract === assetContract;
      } else {
        return true; // 如果沒有提供 tokenId 和 listingCreator，保留所有列表
      }
    });
  };

  const filteredOffers = filterOffers(allValidOffers || []);

  return { offers: filteredOffers };
};

export default useValidOffers;
