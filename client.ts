import { createPublicClient, http } from "viem";
import { mainnet, sepolia } from "viem/chains";

export const sepoliaClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

export const ethClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export function getPublicClient(chainId: number) {
  return chainId === mainnet.id ? ethClient : sepoliaClient;
}
