import { styled } from "@mui/system";
import { FC } from "react";

import NoGameLogo from "../assets/NoGameLogo.png";
import ufoLogo from "../assets/icons/UFO.svg";
import { Button } from "@mui/base";
import { ColumnCenter } from "../shared/styled/Column";
import { RowCentered } from "../components/ui/Row";
import ConnectWalletButton from "../components/auth/ConnectWallet";
import { GeneratePlanet } from "../components/buttons/GeneratePlanet";
import React from "react";

const MainWrapper = styled(ColumnCenter)`
  height: 80vh;
  justify-content: center;
  gap: 16px;
`;

const SubTextBefore = styled("div")`
  color: #ffffff;
  margin-top: 24px;
  margin-bottom: 24px;
  font-weight: 400;
  font-size: 20px;
  line-height: 42px;
  text-align: center;
  letter-spacing: 0.02em;
  padding: 0 15px 16px;
  width: 80%;
  opacity: 0.5;
  margin-y: 80px;
`;

const SubText = styled("div")`
  color: #ffffff;
  font-weight: 400;
  font-size: 24px;
  line-height: 42px;
  text-align: center;
  letter-spacing: 0.02em;
  padding: 0 15px 16px;
  width: 50%;
  opacity: 0.5;
  margin-y: 80px;
`;

const GeneratePlanetWrapper = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100vh;
`;

const StyledLogo = styled("img")`
  width: 600px;
`;

interface AuthScreenProps {
  address?: string;
  loading: boolean;
  walletConnectLoading: boolean;
  hasGeneratedPlanets?: boolean;
}

type ConnectWalletViewProps = Omit<
  AuthScreenProps,
  "generatePlanet" | "hasGeneratedPlanets"
>;

type GeneratePlanetViewProps = Omit<
  AuthScreenProps,
  "walletConnectLoading" | "hasGeneratedPlanets"
>;

const AuthScreen = ({
  address,
  loading = true,
  walletConnectLoading,
  hasGeneratedPlanets = false,
}: AuthScreenProps) => {
  if (address && !hasGeneratedPlanets) {
    return <GeneratePlanetView address={address} loading={loading} />;
  }

  return (
    <ConnectWalletView
      address={address}
      loading={loading}
      walletConnectLoading={walletConnectLoading}
    />
  );
};

const ConnectWalletView: FC<ConnectWalletViewProps> = ({
  address,
  walletConnectLoading,
}) => {
  const renderButton = () => {
    if (!address) {
      return walletConnectLoading ? (
        <Button disabled>Loading...</Button>
      ) : (
        <ConnectWalletButton />
      );
    }
    return null;
  };

  return (
    <MainWrapper>
      <RowCentered>
        <StyledLogo src={NoGameLogo} alt="No Game Logo" />
      </RowCentered>
      <SubTextBefore>
        In the vast tapestry of the cosmos, the game of NoGame beckons. It's not
        merely about conquests, nor just about new worlds. It is an intellectual
        pursuit: discovering unprecedented technologies, forging alliances that
        defy the very fabric of space-time, and engaging in cosmic battles with
        countless emperors, each vying for the very essence of universal
        dominance.
      </SubTextBefore>
      <div>{renderButton()}</div>
    </MainWrapper>
  );
};

const GeneratePlanetView: FC<GeneratePlanetViewProps> = () => {
  return (
    <GeneratePlanetWrapper>
      <MainWrapper>
        <RowCentered>
          <img src={ufoLogo} alt="UFO for lift off" width={128} height={128} />{" "}
          {/* Increased the width and height */}
        </RowCentered>
        <SubText>
          In the intricate dance of the cosmos, are we not poised for ascension?
        </SubText>
        <GeneratePlanet />
      </MainWrapper>
    </GeneratePlanetWrapper>
  );
};

export default AuthScreen;
