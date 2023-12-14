import { useState, useEffect } from "react";
import { keyframes, styled } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useGetHostileMissions } from "../../hooks/FleetHooks";
import WarningIcon from "@mui/icons-material/Warning";
import { usePlanetPosition } from "../../hooks/usePlanetPosition";
import { HostileMission } from "../../shared/types";

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
  flexGrow: 1,
  opacity: 0.5,
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
  fontSize: "14px",
  opacity: 0.5,
  color: "#98fb98",
}));

const RightAlignedCell = styled(Cell)({
  textAlign: "right",
});

const getTimeDifference = (arrivalTime: number) => {
  const currentTime = Date.now() / 1000; // Convert current time to seconds
  const differenceInSeconds = arrivalTime - currentTime;

  // Check if the mission has already arrived
  if (differenceInSeconds <= 0) {
    return "Arrived";
  }

  // Otherwise, calculate the time remaining
  const hours = Math.floor(differenceInSeconds / 3600);
  const minutes = Math.floor((differenceInSeconds % 3600) / 60);
  const seconds = Math.floor(differenceInSeconds % 60);

  return `${hours}h ${minutes}m ${seconds}s`;
};

interface RowProps {
  mission: HostileMission;
}

const MissionRow = ({ mission }: RowProps) => {
  const [countdown, setCountdown] = useState(
    getTimeDifference(Number(mission.time_arrival))
  );
  const position = usePlanetPosition(Number(mission.origin));
  const originCoordinates = position
    ? `${position.system} / ${position.orbit}`
    : "Unknown";

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getTimeDifference(Number(mission.time_arrival)));
    }, 1000);

    return () => clearInterval(interval);
  }, [mission.time_arrival]);

  return (
    <Row key={mission.id_at_origin}>
      <Cell>{originCoordinates}</Cell>
      <Cell>{countdown}</Cell>
      <RightAlignedCell>{Number(mission.number_of_ships)}</RightAlignedCell>
    </Row>
  );
};

interface HostileMissionsProps {
  planetId: number;
}

// Component
export const HostileMissions = ({ planetId }: HostileMissionsProps) => {
  const hostileMissions = planetId
    ? useGetHostileMissions(Number(planetId))
    : [];

  return (
    <>
      {hostileMissions === undefined ? (
          <CircularProgress />
      ) : hostileMissions.length === 0 ? null : (
        <Container>
          <TitleContainer>
            {hostileMissions && hostileMissions.length > 0 && (
              <StyledWarningIcon />
            )}
            <Title variant="h6">Hostile Missions</Title>
          </TitleContainer>
          <HeaderRow>
            <Cell>Origin</Cell>
            <Cell>Arrival</Cell>
            <RightAlignedCell>Ships</RightAlignedCell>
          </HeaderRow>
          {hostileMissions.map((mission) => (
            <MissionRow mission={mission} key={mission.id_at_origin} />
          ))}
        </Container>
      )}
    </>
  );
};
