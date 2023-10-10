import { useEffect, useState } from "react";
import { useTokenOf } from "../../hooks/useTokenOf";
import AuthScreen from "../../views/LoginOrGenerate";
import Dashboard from "../../views/DashBoard";
import { useAccount } from "@starknet-react/core";

const AuthController = () => {
  const { address } = useAccount();
  const [walletConnectLoading, setWalletConnectLoading] =
    useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setWalletConnectLoading(false), 3500);
  }, []);

  const { planetId, isLoading } = useTokenOf();
  const planetIdBN = Number(planetId);
  const hasGeneratedPlanets = planetIdBN > 0;
  const isOverallLoading = isLoading || walletConnectLoading;

  const shouldRenderAuthScreen =
    !address || !hasGeneratedPlanets || isOverallLoading;

  if (shouldRenderAuthScreen) {
    const authProps = {
      address,
      walletConnectLoading,
      loading: isOverallLoading,
      hasGeneratedPlanets,
    };
    return <AuthScreen {...authProps} />;
  }
  return <Dashboard />;
};

export default AuthController;
