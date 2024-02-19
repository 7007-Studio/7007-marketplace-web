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
  attributes: MetadataAttribute[];
}



export interface Listing {
  assetContract: Address;
  currency: Address;
  endTimestamp: bigint;
  listingCreator: Address;
  listingId: bigint;
  pricePerToken: bigint;
  quantity: bigint;
  reserved: boolean;
  startTimestamp: bigint;
  stats: number;
  tokenId: bigint;
  tokenType: number;
}