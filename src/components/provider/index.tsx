import { goerli } from "@starknet-react/chains";
import {
  StarknetConfig,
  // publicProvider,
  // alchemyProvider,
  infuraProvider,
  argent,
  braavos,
} from "@starknet-react/core";

// const alchemyKey = import.meta.env.VITE_ALCHEMY_APY_KEY;
const infuraKey = import.meta.env.VITE_INFURA_APY_KEY;
export function StarknetProvider({ children }: { children: React.ReactNode }) {
  const chains = [goerli];
  const providers = [
    infuraProvider({ apiKey: infuraKey }),
    // alchemyProvider({ apiKey: alchemyKey }),
    // publicProvider(),
  ];
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
