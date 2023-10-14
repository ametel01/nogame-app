import { useEffect, useState } from "react";
import { useTokenOf } from "../../hooks/useTokenOf";
import AuthScreen from "../../views/LoginOrGenerate";
import Dashboard from "../../views/DashBoard";
import { useAccount } from "@starknet-react/core";
import Header from "../ui/Header";

const AuthController = () => {
  const { address } = useAccount();
  const [walletConnectLoading, setWalletConnectLoading] =
    useState<boolean>(true);

  const { planetId, isLoading } = useTokenOf();
  useEffect(() => {
    setTimeout(() => setWalletConnectLoading(false), 3000);
  }, []);
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

  return (
    <>
      <Header />
      <Dashboard />
    </>
  );
};

export default AuthController;
