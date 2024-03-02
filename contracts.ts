import { Address } from "viem";
import { baseSepolia, mainnet, sepolia } from "viem/chains";

interface IContractsIndex {
  [key: string]: Address;
}

interface IContracts {
  [key: number]: IContractsIndex;
}

export const Contracts: IContracts = {
  [mainnet.id]: {
    AIGCFactory: "0x0",
    MarketplaceV3: "0x0",
    SPRegistrationModule: "0x0",
    SPLicenseRegistry: "0x0",
  },
  [sepolia.id]: {
    AIGCFactory: "0x8F5B3428f0caBCCBFaD145D22DF0aEa4ba799d10",
    MarketplaceV3: "0x29e5E223074daD39D33327f1655f38BDD04Ba2f6",
    SPRegistrationModule: "0x8b3f6b736b520f69c37a575293d3c1ff6383d495",
    SPLicenseRegistry: "0xc2BC7a2d5784768BDEd98436f2522A4931e2FBb4",
  },
  [baseSepolia.id]: {},
};
