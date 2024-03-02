import { Address, isAddress, isAddressEqual } from "viem";
import { Model, NFT } from "./types";
import { Contracts } from "./contracts";
import { SP } from "next/dist/shared/lib/utils";

export function isNFT(item: any): item is NFT {
  return (item as NFT).tokenID !== undefined;
}

export function isModel(item: any): item is Model {
  return (item as Model).modelIndex !== undefined;
}

export function concatAddress(
  address: string | Address,
  head = 6,
  tail = 4
): string {
  return address.slice(0, head) + "..." + address.slice(-tail);
}

export function openseaUrl(address: string, tokenId: string | number): string {
  return `https://testnets.opensea.io/assets/sepolia/${address}/${tokenId}`;
}

export function formatDaysLeft(ms: number): string {
  const currentDate = new Date();
  const targetDate = new Date(ms);
  const timeDifference = targetDate.getTime() - currentDate.getTime();
  const daysLeft = Math.ceil(timeDifference / (60 * 60 * 24 * 1000));
  return daysLeft > 0 ? `${daysLeft} days left` : "Ended";
}

export function getContractAddress(contract: string, chainId?: number) {
  if (!chainId) {
    return undefined;
  }

  if (Object.keys(Contracts).indexOf(chainId.toString()) === -1) {
    return undefined;
  }

  return Contracts[chainId][contract];
}

export function is7007Token(concatAddress: Address) {
  return isAddressEqual(
    concatAddress,
    "0x42537d4e19d7888d8d5a867a51911bde569d9e9d"
  );
}

export function isSPLicenseRegistry(concatAddress: Address, chainId?: number) {
  const SPLicenseRegistry = getContractAddress("SPLicenseRegistry", chainId);

  return (
    typeof SPLicenseRegistry === "string" &&
    isAddress(SPLicenseRegistry) &&
    isAddressEqual(concatAddress, SPLicenseRegistry)
  );
}

export function formatDate(timestamp: number) {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
}
