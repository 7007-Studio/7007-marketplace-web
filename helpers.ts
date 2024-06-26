import { Address, isAddress, isAddressEqual } from "viem";
import { Model, NFT } from "./types";
import { Contracts } from "./contracts";
import { mainnet, sepolia } from "viem/chains";
import { modelData } from "./constants/constants";

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

export function openseaUrl(
  chainId: number,
  address: string,
  tokenId: string | number | bigint
): string {
  if (chainId === mainnet.id) {
    return `https://opensea.io/assets/ethereum/${address}/${tokenId}`;
  } else if (chainId === sepolia.id) {
    return `https://testnets.opensea.io/assets/sepolia/${address}/${tokenId}`;
  }
  return "";
}

export function formatDaysLeft(ms: number): string {
  const currentDate = new Date();
  const targetDate = new Date(ms);
  const timeDifference = targetDate.getTime() - currentDate.getTime();
  const daysLeft = Math.ceil(timeDifference / (60 * 60 * 24 * 1000));
  return daysLeft > 0 ? `${daysLeft} days left` : "Ended";
}

export function getContractAddress(
  contract: string,
  chainId: number = mainnet.id
) {
  if (!chainId) {
    return undefined;
  }

  if (Object.keys(Contracts).indexOf(chainId.toString()) === -1) {
    return undefined;
  }

  return Contracts[chainId][contract];
}
export function getModelsData(chainId: number = mainnet.id) {
  if (!chainId) {
    return undefined;
  }

  if (Object.keys(modelData).indexOf(chainId.toString()) === -1) {
    return undefined;
  }

  return modelData[chainId];
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
