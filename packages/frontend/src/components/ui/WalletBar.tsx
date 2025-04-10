import React, { useMemo } from "react";
import { useAccount, useConnect } from "@starknet-react/core";

function WalletConnected() {
  const { address } = useAccount();

  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  return (
    <div>
      <span>Connected: {shortenedAddress}</span>
      {/* <button onClick={disconnect}>Disconnect</button> */}
    </div>
  );
}

function ConnectWallet() {
  const { connectors } = useConnect();

  return (
    <div>
      <span>Choose a wallet:</span>
      {connectors.map((connector) => {
        return (
          <button key={connector.id} onClick={() => connector.connect}>
            {connector.id}
          </button>
        );
      })}
    </div>
  );
}

export default function WalletBar() {
  const { address } = useAccount();

  return address ? <WalletConnected /> : <ConnectWallet />;
}
