import { Model, NFT } from "./types";

// AIGC#AIGC - 0xc7A7576DAfBB542669547a0a02C770b8f9Fa55df
// AIGC_Factory#AIGC_Factory - 0x8F5B3428f0caBCCBFaD145D22DF0aEa4ba799d10
// Token7007#Token7007 - 0x6aa8BAE94DbEC32CbeE952c9f7f4248D2103eD5B
// Stake7007#Stake7007 - 0xBD3F603028b5aF623644DB76275209C90a86f319

export const AIGC_FACTORY_CONTRACT_ADDRESS =
  // "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // hardhat
  "0x8F5B3428f0caBCCBFaD145D22DF0aEa4ba799d10"; // sepolia

export const TOKEN7007_CONTRACT_ADDRESS =
  "0x6aa8BAE94DbEC32CbeE952c9f7f4248D2103eD5B";
export const STAKE7007_CONTRACT_ADDRESS =
  "0xBD3F603028b5aF623644DB76275209C90a86f319";

export const AIGC_CONTRACT_ADDRESS =
  "0xc7bcb472e29668f5d02fd68d15ba17f01498c6c0";
export const AIGT_CONTRACT_ADDRESS =
  "0x18c3054389d370da05ba00bba589ddce3e8cf8c2";

export const NFT_MARKETPLACE_ADDRESS =
  "0x7e1792c4CFd76971b6Db9662f7Ffe08eFBf60842";

export const MOCK_MODEL_DATA = {
  modelIndex: "0xe0290A759D12266f43a91b1BDa79E47F5065c42A",
  modelName: "NOV 012",
  modelAddress: "0x123...abc",
  totalSupply: 1200,
  nftMint: 1000,
  title: "Genesis Model",
  description:
    "Use stable diffusion model to generate image and music from text",
  imageUrl: "/nft1.png",
};

export const MOCK_MARKETPLACE_DATA: (NFT | Model)[] = [MOCK_MODEL_DATA];
