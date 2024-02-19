import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { Abi, erc20Abi } from "viem";

import AIGC from "@/abis/AIGC.json";
import AIGC_Factory from "@/abis/AIGC_Factory.json";
import AIGT from "@/abis/AIGT.json";
import Token7007 from "@/abis/Token7007.json";
import Stake7007 from "@/abis/Stake7007.json";
import MarketplaceV3 from "@/abis/MarketplaceV3.json";

export default defineConfig({
  out: "generated.ts",
  contracts: [
    {
      abi: AIGC.abi as Abi,
      name: "AIGC",
    },
    {
      abi: AIGC_Factory.abi as Abi,
      name: "AIGC_Factory",
    },
    {
      abi: AIGT.abi as Abi,
      name: "AIGT",
    },
    {
      abi: Token7007.abi as Abi,
      name: "Token7007",
    },
    {
      abi: Stake7007.abi as Abi,
      name: "Stake7007",
    },
    {
      abi: MarketplaceV3 as Abi,
      name: "MarketplaceV3",
    },
    {
      abi: erc20Abi,
      name: "Erc20",
    }
  ],
  plugins: [react()],
});
