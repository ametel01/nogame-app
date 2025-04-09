import React from "react";
import { sepolia } from "@starknet-react/chains";
import {
  StarknetConfig,
  jsonRpcProvider,
  useInjectedConnectors,
  argent,
  braavos,
} from "@starknet-react/core";

const RPC_URL = import.meta.env.VITE_INFURA_RPC;

function rpc() {
  return {
    nodeUrl: RPC_URL,
  };
}

// const alchemyKey = import.meta.env.VITE_ALCHEMY_APY_KEY;

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  const chains = [sepolia];
  const provider = jsonRpcProvider({ rpc });

  const { connectors } = useInjectedConnectors({
    // Show these connectors if the user has no connector installed.
    recommended: [argent(), braavos()],
    // Hide recommended connectors if the user has any connector installed.
    includeRecommended: "onlyIfNoConnectors",
    // Randomize the order of the connectors.
    order: "random",
  });

  return (
    <StarknetConfig
      autoConnect
      chains={chains}
      provider={provider}
      connectors={connectors}
    >
      {children}
    </StarknetConfig>
  );
}
