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
