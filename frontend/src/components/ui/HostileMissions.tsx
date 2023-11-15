import { keyframes, styled } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useGetHostileMissions } from "../../hooks/FleetHooks";
import WarningIcon from "@mui/icons-material/Warning";

// Styled components
const Container = styled(Box)(({ theme }) => ({
  backgroundColor: "#1a2025", // Assuming a dark theme from the image
  color: "white",
  borderRadius: "8px",
  boxshadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const TitleContainer = styled(Box)({
  display: "flex",
  alignItems: "center", // Aligns children vertically in the middle
  justifyContent: "center", // Centers children horizontally
  flexWrap: "nowrap", // Prevents wrapping
  marginBottom: "16px",
});

const Title = styled(Typography)({
  fontWeight: "bold",
  textAlign: "center",
  flexGrow: 1, // Takes up available space
});

const blinkAnimation = keyframes`
  50% {
    opacity: 0;
  }
`;

const StyledWarningIcon = styled(WarningIcon)({
  fontSize: "32px", // Adjust size as needed
  marginRight: "8px", // Assuming default theme spacing
  color: "red", // Icon color
  animation: `${blinkAnimation} 1s linear infinite`, // Apply the animation
});

const HeaderRow = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "8px",
  paddingBottom: "8px",
  borderBottom: "1px solid #30363d",
});

const Row = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "8px",
  padding: "8px 0",
});

const Cell = styled(Typography)(() => ({
  opacity: 0.5,
  color: "#98fb98",
}));

const getTimeDifference = (arrivalTime: number) => {
  const currentTime = Date.now();
  const differenceInSeconds = (arrivalTime - currentTime) / 1000;

  if (differenceInSeconds <= 0) {
    return `Arrived`;
  }

  const hours = Math.floor(differenceInSeconds / 3600);
  const minutes = Math.floor((differenceInSeconds % 3600) / 60);
  const seconds = Math.floor(differenceInSeconds % 60);

  return `${hours}h ${minutes}m ${seconds}s`;
};

interface Props {
  planetId: number;
}

// Component
export const HostileMissions = ({ planetId }: Props) => {
  const hostileMissions = planetId
    ? useGetHostileMissions(Number(planetId))
    : [];

  return (
    <>
      {hostileMissions === undefined ? (
        <CircularProgress />
      ) : hostileMissions.length === 0 ? null : (
        hostileMissions.map((mission) => (
          <Container>
            <TitleContainer>
              {hostileMissions && hostileMissions.length > 0 && (
                <StyledWarningIcon />
              )}
              <Title variant="h6">Hostile Missions</Title>
            </TitleContainer>
            <HeaderRow>
              <Cell>Origin</Cell>
              <Cell>Time to Arrival</Cell>
              <Cell>Number of Ships</Cell>
            </HeaderRow>
            <Row key={mission.id_at_origin}>
              <Cell>{Number(mission.origin)}</Cell>
              <Cell>{getTimeDifference(Number(mission.time_arrival))}</Cell>
              <Cell>{Number(mission.number_of_ships)}</Cell>
            </Row>
          </Container>
        ))
      )}
    </>
  );
};
