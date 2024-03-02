import { Chain, createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

export function getPublicClient(chain?: Chain) {
  return createPublicClient({
    chain: chain || sepolia,
    transport: http(),
  });
}
