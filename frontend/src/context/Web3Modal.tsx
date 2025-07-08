"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { WagmiProvider } from "wagmi";
import { config} from "../configs";

const queryClient = new QueryClient();

createWeb3Modal({
  wagmiConfig: config,
  projectId:"0b397a880f3bc7a516a41df1483797aa",
  enableAnalytics: true,
  enableOnramp: true,
  themeMode: "dark",
  themeVariables: {
    '--w3m-accent': '#7c3aed',
    '--w3m-border-radius-master': '8px',
  }
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}