import { styled } from "@mui/system";
import { FC } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import NoGameLogo from "../assets/logos/NoGameLogo.png";
import ufoLogo from "../assets/uiIcons/UFO.svg";
import { ColumnCenter } from "../shared/styled/Column";
import { RowCentered } from "../components/ui/Row";
import ConnectWalletButton from "../components/auth/ConnectWallet";
import { GeneratePlanet } from "../components/buttons/GeneratePlanet";

const MainWrapper = styled(ColumnCenter)`
  height: 80vh;
  justify-content: space-evenly; // Evenly distribute the child elements
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
  width: 70%;
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
  margin: 0; // Reset the margin
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

const TopRightButtonContainer = styled("div")`
  position: absolute;
  top: 20px; /* Adjust the top position as needed */
  right: 20px; /* Adjust the right position as needed */
`;

const PriceText = styled("div")`
  color: #ecd9a0; // A golden color for the ticker text
  font-weight: 500;
  font-size: 20px;
  text-align: center;
  letter-spacing: 0.02em;
  background-color: rgba(34, 36, 45, 0.8);
  padding: 8px 16px;
  border-radius: 8px;
  font-family: "Courier New", Courier, monospace;
  white-space: nowrap;
  overflow: hidden;
  opacity: 0.9;
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

// type GeneratePlanetViewProps = Omit<
//   AuthScreenProps,
//   "walletConnectLoading" | "hasGeneratedPlanets"
// >;

const AuthScreen = ({
  address,
  loading = true,
  walletConnectLoading,
  hasGeneratedPlanets = false,
}: AuthScreenProps) => {
  if (address && !hasGeneratedPlanets) {
    return <GeneratePlanetView />;
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
        <CircularProgress sx={{ color: "#ffffff", opacity: "0.5" }} />
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
      <TopRightButtonContainer>{renderButton()}</TopRightButtonContainer>
    </MainWrapper>
  );
};

const GeneratePlanetView = () => {
  return (
    <GeneratePlanetWrapper>
      <MainWrapper>
        <RowCentered>
          <img src={ufoLogo} alt="UFO for lift off" width={128} height={128} />{" "}
        </RowCentered>
        <SubText>
          In the intricate dance of the cosmos, are we not poised for ascension?
        </SubText>
        <PriceText>Latest NFT price: 0.021 ETH</PriceText>
        <GeneratePlanet />
      </MainWrapper>
    </GeneratePlanetWrapper>
  );
};

export default AuthScreen;
