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
  description: string;
  image: string;
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
