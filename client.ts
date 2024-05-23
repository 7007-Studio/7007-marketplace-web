import { Chain, createPublicClient, http } from "viem";
import { mainnet, sepolia } from "viem/chains";

export function getPublicClient(chain?: Chain) {
  return createPublicClient({
    chain: chain || mainnet,
    transport: http(
      `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`
    ),
  });
}
