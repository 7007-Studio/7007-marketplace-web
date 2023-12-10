import { Model, NFT } from "./types";

export function isNFT(item: any): item is NFT {
  return (item as NFT).tokenID !== undefined;
}

export function isModel(item: any): item is Model {
  return (item as Model).modelIndex !== undefined;
}
