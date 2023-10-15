import { goerli } from "@starknet-react/chains";
import {
  StarknetConfig,
  publicProvider,
  // alchemyProvider,
  argent,
  braavos,
} from "@starknet-react/core";

// const apiKey = import.meta.env.ALCHEMY_APY_KEY as string;

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  const chains = [goerli];
  const providers = [publicProvider()];
  const connectors = [argent(), braavos()];

  return (
    <StarknetConfig
      autoConnect
      chains={chains}
      providers={providers}
      connectors={connectors}
    >
      {children}
    </StarknetConfig>
  );
}
