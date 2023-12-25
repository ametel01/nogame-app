import { goerli, sepolia} from "@starknet-react/chains";
import {
  StarknetConfig,
  argent,
  braavos,
} from "@starknet-react/core";
import { jsonRpcProvider } from "@starknet-react/core";

function rpc() {
  return {
    nodeUrl: import.meta.env.BLAST_RPC,
  }
}

// const alchemyKey = import.meta.env.VITE_ALCHEMY_APY_KEY;

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  const chains = [goerli, sepolia];
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
