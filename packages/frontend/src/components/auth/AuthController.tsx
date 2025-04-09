import React, { useEffect, useState } from "react";
import { useTokenOf } from "../../hooks/erc721";
import AuthScreen from "../../views/LoginOrGenerate";
import Dashboard from "../../views/DashBoard";
import { useAccount } from "@starknet-react/core";
import Header from "../ui/Header";
import { DestinationProvider } from "../../context/DestinationContext";

const AuthController = () => {
  const { address } = useAccount();
  const [walletConnectLoading, setWalletConnectLoading] = useState(true);

  const { planetId, isLoading: isTokenOfLoading } = useTokenOf(address);

  useEffect(() => {
    if (address) {
      setWalletConnectLoading(false);
    }
  }, [address]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setWalletConnectLoading(false);
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const hasGeneratedPlanets = planetId > 0;
  const isOverallLoading = isTokenOfLoading || walletConnectLoading;

  const shouldRenderAuthScreen =
    !address || !hasGeneratedPlanets || isOverallLoading;

  return shouldRenderAuthScreen ? (
    <AuthScreen
      address={address}
      walletConnectLoading={walletConnectLoading}
      loading={isOverallLoading}
      hasGeneratedPlanets={hasGeneratedPlanets}
    />
  ) : (
    <>
      <DestinationProvider>
        <Header planetId={Number(planetId)} />
        <Dashboard planetId={Number(planetId)} />
      </DestinationProvider>
    </>
  );
};

export default AuthController;
