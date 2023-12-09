import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { Abi } from "viem";

import AIGC from "@/abis/AIGC.json";
import AIGC_Factory from "@/abis/AIGC_Factory.json";
import AIGT from "@/abis/AIGT.json";

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
  ],
  plugins: [react()],
});
