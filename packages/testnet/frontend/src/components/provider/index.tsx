import React, { sepolia } from '@starknet-react/chains';
import {
  StarknetConfig,
  argent,
  braavos,
  jsonRpcProvider,
} from '@starknet-react/core';

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

  const connectors = [argent(), braavos()];

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
