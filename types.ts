import { Address } from "viem";

export interface NFT {
  nftName: string;
  modelName: string;
  title: string;
  description: string;
  nftAddress: string;
  tokenID: string;
  openseaLink: string;
  imageUrl: string;
}

export interface Model {
  modelIndex: string;
  modelName: string;
  modelAddress: string;
  totalSupply: number;
  nftMint: number;
  title: string;
  description: string;
  imageUrl: string;
}

export interface MetadataAttribute {
  trait_type: string;
  value: string;
}

export interface Metadata {
  name: string;
  image: string;
  description: string;
  animation_url?: string;
  attributes: MetadataAttribute[];
}

export interface Listing {
  listingId: bigint;
  tokenId: bigint;
  quantity: bigint;
  pricePerToken: bigint;
  startTimestamp: bigint;
  endTimestamp: bigint;
  listingCreator: `0x${string}`;
  assetContract: `0x${string}`;
  currency: `0x${string}`;
  tokenType: number;
  status: number;
  reserved: boolean;
}
export interface Offer {
  offerId: bigint;
  tokenId: bigint;
  quantity: bigint;
  totalPrice: bigint;
  expirationTimestamp: bigint;
  offeror: `0x${string}`;
  assetContract: `0x${string}`;
  currency: `0x${string}`;
  tokenType: number;
  status: number;
}
export interface ModelList {
  action: string;
  id: string;
  modelAuthorID: string;
  modelName: string;
  status: string;
}

export interface ModelInfo {
  // action: string;
  // id: string;
  // modelAuthorID: string;
  // modelName: string;
  // status: string;
  baseModel: string;
  modelAuthorID: string;
  modelName: string;
}

export interface ModelDetail {
  action: string;
  id: string;
  modelAuthorID: string;
  modelName: string;
  status: string;
  NFTContract: string;
  description: string;
  type: string;
  openSeaName: string;
}
