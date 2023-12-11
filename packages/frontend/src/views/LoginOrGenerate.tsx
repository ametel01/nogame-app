import { styled } from "@mui/system";
import { FC } from "react";
import { CircularProgress } from "@mui/material";
import { Person } from "@mui/icons-material";
import NoGameLogo from "../assets/logos/NoGameLogo.png";
// import roundLogo from "../assets/logos/round-logo.png";
import { ColumnCenter } from "../shared/styled/Column";
import { RowCentered } from "../components/ui/Row";
import ConnectWalletButton from "../components/auth/ConnectWallet";
import { GeneratePlanet } from "../components/buttons/GeneratePlanet";
import { useGetPlanetPrice } from "../hooks/useGetPlanetPrice";

const MainWrapper = styled(ColumnCenter)`
  height: 100vh;
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
  color: white; // A golden color for the ticker text
  font-weight: 500;
  font-size: 20px;
  text-align: center;
  letter-spacing: 0.02em;
  background-color: rgba(34, 36, 45, 0.8);
  padding: 8px 16px;
  margin-bottom: 24px;
  border-radius: 8px;
  font-family: "Courier New", Courier, monospace;
  white-space: nowrap;
  overflow: hidden;
  opacity: 0.9;
`;

const CenteredProgress = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // This makes the container take the full viewport height
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

const SubTextAfter = styled(SubTextBefore)`
  margin-bottom: 30px;
  padding-bottom: 20px;
  font-size: 13px;
`;

const StyledAddress = styled("div")`
  display: flex; // Use flexbox for alignment
  align-items: center; // Vertically center the items
  position: absolute;
  top: 20px;
  right: 20px;
  color: #ffffff;
  font-size: 16px;

  & > svg {
    // Target the Person icon specifically
    margin-right: 8px; // Add some space between the icon and the text
  }
`;

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

  if (price === undefined) {
    return <CircularProgress />;
  }

  return (
    <MainWrapper>
      <StyledAddress>
        <Person />
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
      <SubTextAfter>
        It may take a short while for the NFT to show up in your wallet. Once it
        does, please refresh the page to gain access to the game.
      </SubTextAfter>
    </MainWrapper>
  );
};

export default AuthScreen;
