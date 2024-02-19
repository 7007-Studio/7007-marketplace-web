import type { AppProps } from "next/app";
import "@/styles/globals.css";

import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultConfig,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";

const queryClient = new QueryClient();

import Layout from "@/components/layout";

const wagmiConfig = getDefaultConfig({
  appName: "7007 Studio",
  projectId: "YOUR_PROJECT_ID",
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
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
