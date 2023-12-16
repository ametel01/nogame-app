import styled from "styled-components";
import { FC } from "react";
import { CircularProgress } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDisconnect } from "@starknet-react/core";
import NoGameLogo from "../assets/logos/NoGameLogo.png";
import { ColumnCenter } from "../shared/styled/Column";
import { RowCentered } from "../components/ui/Row";
import ConnectWalletButton from "../components/auth/ConnectWallet";
import { GeneratePlanet } from "../components/buttons/GeneratePlanet";
import { useGetPlanetPrice } from "../hooks/useGetPlanetPrice";
import WarningIcon from "@mui/icons-material/Warning";

const MainWrapper = styled(ColumnCenter)`
  height: 100vh;
  justify-content: space-evenly; // Evenly distribute the child elements
  gap: 16px;
`;

const SubTextBefore = styled("div")`
  color: #ffffff;
  margin-top: 24px;
  // margin-bottom: 24px;
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

const StyledLogo = styled("img")`
  width: 600px;
  margin-top: 100px;
`;

const TopRightButtonContainer = styled("div")`
  position: absolute;
  top: 20px; /* Adjust the top position as needed */
  right: 20px; /* Adjust the right position as needed */
`;

const PriceText = styled("div")`
  color: #ffd700; // A golden color for the ticker text
  font-weight: 500;
  font-size: 20px;
  text-align: center;
  letter-spacing: 0.02em;
  background-color: rgba(0, 0, 0, 0.85); // Dark background for contrast
  margin-bottom: 12px;
  border-radius: 8px;
  font-family: "Courier New", Courier, monospace; // Monospaced font for the ticker effect
  white-space: nowrap;
  overflow: hidden;
  opacity: 0.9;
  padding: 8px 16px; // Adjust padding for better appearance
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); // Add a subtle shadow for depth
`;

const CenteredProgress = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // This makes the container take the full viewport height
`;

const StyledAddress = styled("div")`
  display: flex;
  align-items: center;
  position: absolute;
  top: 20px;
  right: 20px;
  color: #ffffff;
  font-size: 16px;
  background-color: rgba(34, 36, 45, 0.8); // Optional: Add background color
  padding: 8px; // Optional: Add padding
  border-radius: 8px; // Optional: Round corners
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); // Optional: Add shadow for depth
`;

const RotatedLogoutIcon = styled(LogoutIcon)`
  transform: rotate(180deg);
  cursor: pointer;
  margin-right: 8px;
`;

const InfoBox = styled("div")(() => ({
  display: "flex",
  alignItems: "flex-start", // Align items to the top of the flex container
  position: "absolute",
  bottom: "20px",
  right: "20px",
  width: "400px",
  height: "120px",
  backgroundColor: "rgba(0, 0, 0, 0.85)",
  color: "#ffffff",
  opacity: "0.5",
  letterSpacing: "inherit",
  padding: "10px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
  fontSize: "14px",
  overflow: "auto",
  textAlign: "left",
}));

const StyledInfoIcon = styled(WarningIcon)`
  color: #ffd700; // A golden color for the ticker text
  margin-right: 10px; // Space between icon and text
  align-self: flex-start; // Align to the top of the flex container
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

const AuthScreen = ({
  address,
  loading = true,
  walletConnectLoading,
  hasGeneratedPlanets = false,
}: AuthScreenProps) => {
  if (address && !hasGeneratedPlanets) {
    return <GeneratePlanetView address={address} />;
  }

  return (
    <ConnectWalletView
      address={address}
      loading={loading}
      walletConnectLoading={walletConnectLoading}
    />
  );
};

const ConnectWalletLogo = styled(StyledLogo)`
  margin-top: 20px;
`;

const ConnectWalletText = styled(SubTextBefore)`
  margin-top: 0px;
`;

const ConnectWalletView: FC<ConnectWalletViewProps> = ({
  address,
  walletConnectLoading,
}) => {
  const renderButton = () => {
    if (!address) {
      return walletConnectLoading ? (
        <CenteredProgress>
          <CircularProgress sx={{ color: "#ffffff", opacity: "0.5" }} />
        </CenteredProgress>
      ) : (
        <ConnectWalletButton />
      );
    }
    return null;
  };

  return (
    <MainWrapper>
      <ConnectWalletLogo src={NoGameLogo} alt="No Game Logo" />
      <ConnectWalletText>
        Welcome to NoGame, an intergalactic, real-time multiplayer game set in
        the vastness of the cosmos, powered by Starknet technology. Connect your
        digital wallet to initiate the creation of your very own celestial body!
      </ConnectWalletText>
      <TopRightButtonContainer>{renderButton()}</TopRightButtonContainer>
    </MainWrapper>
  );
};

// Step 2: Function to format the address
const formatAddress = (address: string) => {
  if (address && address.length > 10) {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  }
  return address; // Return the original address if it's too short
};

interface PlanetViewProp {
  address: string;
}

const GeneratePlanetView = ({ address }: PlanetViewProp) => {
  const price = useGetPlanetPrice();
  const { disconnect } = useDisconnect();

  const handleLogout = () => {
    disconnect();
  };

  if (price === undefined) {
    return <CircularProgress />;
  }

  return (
    <MainWrapper>
      <StyledAddress>
        <RotatedLogoutIcon onClick={handleLogout} />
        {formatAddress(address)}
      </StyledAddress>
      <RowCentered>
        <StyledLogo src={NoGameLogo} alt="No Game Logo" />
      </RowCentered>
      <SubTextBefore>
        In NoGame each participant can mint a single planet NFT per wallet,
        granting access to the game. Prices for minting are set by a reverse
        Dutch auction: high demand increases prices, while lower demand reduces
        them. These prices, updated in real time by a smart contract, can
        fluctuate, so check back later if they're currently too high.
      </SubTextBefore>

      <PriceText>
        Current NFT price:{" "}
        {price !== undefined ? (
          (Number(price) / 10 ** 18).toFixed(6)
        ) : (
          <CenteredProgress>
            <CircularProgress size={24} />
          </CenteredProgress>
        )}{" "}
        ETH
      </PriceText>
      <GeneratePlanet price={price} />
      <InfoBox>
        <StyledInfoIcon sx={{ fontSize: "100px" }} />
        <span>
          Please allow a few minutes for the minting process to complete. If
          you've successfully minted but are still unable to access the game,
          refreshing the page may resolve the issue
        </span>
      </InfoBox>
    </MainWrapper>
  );
};

export default AuthScreen;
