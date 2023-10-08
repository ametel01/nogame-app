import { useEffect, useState } from "react";
import { useAccount } from "@starknet-react/core";
import { useTokenOf } from "../../hooks/useTokenOf";
import AuthScreen from "../../views/LoginOrGenerate";
import Dashboard from "../../views/DashBoard";

const AuthController = () => {
  console.log("Auth Controller");
  const { address } = useAccount();
  console.log(address);
  const [walletConnectLoading, setWalletConnectLoading] =
    useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setWalletConnectLoading(false), 1000);
  }, []);

  const { data, isLoading } = useTokenOf(address);

  const planetIdBN = Number(data);
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
