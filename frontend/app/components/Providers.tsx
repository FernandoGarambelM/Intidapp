"use client";
import React from "react";
import { sepolia } from "@starknet-react/chains";
import {
  StarknetConfig,
  argent,
  braavos,
  useInjectedConnectors,
  voyager,
  jsonRpcProvider
} from "@starknet-react/core";

export function Providers({ children }: { children: React.ReactNode }) {
  // Detecta wallets instaladas (ArgentX, Braavos)
  const { connectors } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: "onlyIfNoConnectors",
    order: "random"
  });

  return (
    <StarknetConfig
      chains={[sepolia]} // Red de prueba
      provider={jsonRpcProvider({
        rpc: () => ({ nodeUrl: "https://starknet-sepolia.public.blastapi.io" })
      })}
      connectors={connectors}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  );
}
