import type { AppProps } from "next/app";
import "@/styles/globals.css";

import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultConfig,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, WagmiProvider } from "wagmi";
import {
  arbitrumSepolia,
  auroraTestnet,
  baseSepolia,
  bscTestnet,
  lineaTestnet,
  mainnet,
  sepolia,
} from "wagmi/chains";


const queryClient = new QueryClient();

import Layout from "@/components/layout";

const wagmiConfig = getDefaultConfig({
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

export default function App({ Component, pageProps }: AppProps) {
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
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
