import { Address } from "viem";
import {
  arbitrumSepolia,
  auroraTestnet,
  baseSepolia,
  bscTestnet,
  lineaTestnet,
  mainnet,
  sepolia,
} from "viem/chains";

interface IContractsIndex {
  [key: string]: Address;
}

interface IContracts {
  [key: number]: IContractsIndex;
}

//改合約要連同Graph一起改
export const Contracts: IContracts = {
  [mainnet.id]: {
    AIGCFactory: "0x0",
    StableDiffusionNFT: "0x9E35A4c1894697EB93BC781c0C5581c4E97b82A2",
    OPMLNFT: "0x491fA4D0B6eDdE8EC8252a32367093C25a9fd14b",
    MarketplaceV3: "0x743F0EBdd63FE11555FeF6F53b3213DACDb1BB23",
    SPRegistrationModule: "0x0",
    SPLicenseRegistry: "0x0",
  },
  [sepolia.id]: {
    AIGCFactory: "0x8F5B3428f0caBCCBFaD145D22DF0aEa4ba799d10",
    StableDiffusionNFT: "0x530511810d56157D50E2D215aE4fC9bC9b57df02",
    OPMLNFT: "0x0882203E8E4Df9119231897cfA386f7b8965a5f8",
    MarketplaceV3: "0x29e5E223074daD39D33327f1655f38BDD04Ba2f6",
    SPRegistrationModule: "0x8b3f6b736b520f69c37a575293d3c1ff6383d495",
    SPLicenseRegistry: "0xc2BC7a2d5784768BDEd98436f2522A4931e2FBb4",
  },
  [baseSepolia.id]: {
    AIGCFactory: "0xc2059087976C913fF09056b4a35C10d45275E023",
    MarketplaceV3: "0xA0799eBF00b33F58012acea8ad406AcBa7Ab36c1",
    SPRegistrationModule: "0x0",
    SPLicenseRegistry: "0x0",
  },
  [lineaTestnet.id]: {
    AIGCFactory: "0xDF3379d2C03941CA3D915c275791025F0eE9B4cc",
    MarketplaceV3: "0x2c86b1058a3Ba3e01f1521581e0e63D7f1b23Ab0",
    SPRegistrationModule: "0x0",
    SPLicenseRegistry: "0x0",
  },
  [arbitrumSepolia.id]: {
    AIGCFactory: "0x42537d4E19d7888D8d5A867A51911bde569d9e9D",
    MarketplaceV3: "0x51Ec374b15A19f88bE175F9bd2E8A1A162b1B930",
    SPRegistrationModule: "0x0",
    SPLicenseRegistry: "0x0",
  },
  [auroraTestnet.id]: {
    AIGCFactory: "0x42537d4E19d7888D8d5A867A51911bde569d9e9D",
    MarketplaceV3: "0x306719355050Ba90adAF21a6d88A871A296acf89",
    SPRegistrationModule: "0x0",
    SPLicenseRegistry: "0x0",
  },
  [bscTestnet.id]: {
    AIGCFactory: "0x54F4Ada25fa21aC2f4C5A63aa692bb1b8CC00952",
    MarketplaceV3: "0x0",
    SPRegistrationModule: "0x0",
    SPLicenseRegistry: "0x0",
  },
};
