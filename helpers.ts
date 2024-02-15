import { Model, NFT } from "./types";

export function isNFT(item: any): item is NFT {
  return (item as NFT).tokenID !== undefined;
}

export function isModel(item: any): item is Model {
  return (item as Model).modelIndex !== undefined;
}

export function concatAddress(address: string): string {
  return address.slice(0, 6) + "..." + address.slice(-4);
}

export function openseaUrl(address: string, tokenId: string | number): string {
  return `https://testnets.opensea.io/assets/sepolia/${address}/${tokenId}`;
}
