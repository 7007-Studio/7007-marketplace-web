import { Address } from "viem";
import { mainnet, sepolia } from "viem/chains";

interface IContractsIndex {
  [key: string]: Address;
}

interface IContracts {
  [key: number]: IContractsIndex;
}

export const Contracts: IContracts = {
  [mainnet.id]: {
    MarketplaceV3: "0x44F4312369d4AC08EA3dCaCF2505EFB0f896686a",
    SPRegistrationModule: "0x0",
  },
  [sepolia.id]: {
    MarketplaceV3: "0x29e5E223074daD39D33327f1655f38BDD04Ba2f6",
    SPRegistrationModule: "0x8b3f6b736b520f69c37a575293d3c1ff6383d495",
  },
};
