"use client";

import { ReactNode } from "react";
import { WagmiProvider, http } from "wagmi";
import {
  arbitrumSepolia,
  auroraTestnet,
  baseSepolia,
  bscTestnet,
  lineaTestnet,
  mainnet,
  sepolia,
} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RainbowKitProvider,
  getDefaultConfig,
  lightTheme,
} from "@rainbow-me/rainbowkit";

const wagmiConfig = getDefaultConfig({
  ssr: true,
  appName: "7007 Studio",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  chains: [
    sepolia,
    mainnet,
    arbitrumSepolia,
    baseSepolia,
    bscTestnet,
    auroraTestnet,
    lineaTestnet,
  ],
  transports: {
    [mainnet.id]: http(
      `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`
    ),
    [sepolia.id]: http(
      `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`
    ),
    [baseSepolia.id]: http(),
    [lineaTestnet.id]: http(
      `https://linea-goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`
    ),
    [arbitrumSepolia.id]: http(),
    [auroraTestnet.id]: http(),
    [bscTestnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          appInfo={{
            appName: "7007 Studio",
          }}
          theme={lightTheme({
            accentColor: "#FFC900",
            accentColorForeground: "#000000",
            borderRadius: "small",
            // fontStack: "system",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
