import { Chain, createPublicClient, http } from "viem";
import { mainnet, sepolia } from "viem/chains";

export function getPublicClient(chain?: Chain) {
  return createPublicClient({
    chain: chain || mainnet,
    batch: {
      multicall: true,
    },
    transport: http(),
  });
}
