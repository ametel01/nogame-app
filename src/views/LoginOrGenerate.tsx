import { styled } from "@mui/system";
import { FC } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import NoGameLogo from "../assets/logos/NoGameLogo.png";
import roundLogo from "../assets/logos/round-logo.png";
import { ColumnCenter } from "../shared/styled/Column";
import { RowCentered } from "../components/ui/Row";
import ConnectWalletButton from "../components/auth/ConnectWallet";
import { GeneratePlanet } from "../components/buttons/GeneratePlanet";
import { useGetPlanetPrice } from "../hooks/useGetPlanetPrice";

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
  color: white; // A golden color for the ticker text
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
  const price = useGetPlanetPrice();

  if (price === undefined) {
    return <CircularProgress />; // Or any other loading indicator.
  }

  return (
    <GeneratePlanetWrapper>
      <MainWrapper>
        <RowCentered>
          <img
            src={roundLogo}
            alt="UFO for lift off"
            width={300}
            height={300}
          />{" "}
        </RowCentered>

        <PriceText>
          Current NFT price:{" "}
          {price !== undefined ? (
            (Number(price) / 10 ** 18).toFixed(6)
          ) : (
            <CircularProgress size={24} />
          )}{" "}
          ETH
        </PriceText>
        <GeneratePlanet price={price} />
      </MainWrapper>
    </GeneratePlanetWrapper>
  );
};

export default AuthScreen;
