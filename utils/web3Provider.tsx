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

const mainnetHttp = http(
  `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  {
    batch: {
      batchSize: 1000,
    },
  }
);
const sepoliaHttp = http(
  `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_SEPOLIA_API_KEY}`,
  {
    batch: {
      batchSize: 1000,
    },
  }
);
const devVersion = process.env.NEXT_PUBLIC_ENV === "development" ? true : false;
const wagmiConfig = getDefaultConfig({
  ssr: true,
  appName: "7007 Studio",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  chains: [devVersion ? sepolia : mainnet],
  transports: {
    [mainnet.id]: mainnetHttp,
    [sepolia.id]: sepoliaHttp,
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
