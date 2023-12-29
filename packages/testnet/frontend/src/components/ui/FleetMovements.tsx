import React, { useState, useEffect } from "react";
import {
  useAttackPlanet,
  useGetActiveMissions,
  useCollectDebris,
  useRecallFleet,
} from "../../hooks/FleetHooks";
import { Box } from "@mui/system";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal"; // Import Modal
import styled from "styled-components";
import { StyledButton } from "../../shared/styled/Button";
import { calculateFleetLoss } from "../../shared/utils/Formulas";
import { usePlanetPosition } from "../../hooks/usePlanetPosition";
import { Mission } from "../../shared/types";
import fleetIcon from "../../assets/uiIcons/Fleet.svg";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { HeaderButton } from "../../shared/styled/Button";

export const StyledBox = styled(Box)({
  fontWeight: 400,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#1a2025",
  borderRadius: 16,
  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
  padding: "16px 32px",
  display: "flex",
  flexDirection: "column",
  width: "70%",
});

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  background-size: cover;
  padding: 20px;
  border-radius: 10px;
`;

const GridRow = styled.div`
  border-bottom: 1px solid #444;
  display: contents;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  button {
    &:hover {
      border-color: #4a63aa;
    }
  }
`;

export const FixedLengthText = styled("div")({
  flex: 1,
  padding: "0 10px",
});

export const MissionText = styled("div")({
  color: "#23CE6B",
  padding: "10px",
  textShadow: "0 0 5px rgba(152, 251, 152, 0.7)", // Glow effect
});

interface ActionProps {
  missionId: number;
  onAction: () => void;
}

const CollectDebrisAction = ({ missionId, onAction }: ActionProps) => {
  const { submitTx: collectDebris } = useCollectDebris(missionId);
  useEffect(() => {
    collectDebris();
    onAction();
  }, [collectDebris, onAction]);

  return null; // This component does not render anything
};

const AttackPlanetAction = ({ missionId, onAction }: ActionProps) => {
  const { submitTx: attackPlanet } = useAttackPlanet(missionId);
  useEffect(() => {
    attackPlanet();
    onAction();
  }, [attackPlanet, onAction]);

  return null; // This component does not render anything
};

const FleetTooltipContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "10px",
});

const FleetIcon = styled.img.attrs({
  src: fleetIcon,
  alt: "Fleet",
})`
  width: 20px;
  height: 20px;
  margin-left: 32px; // Add some space between the mission ID and the icon
  cursor: pointer;
  vertical-align: middle; // Align with the text
`;

interface MissionRowProps {
  mission: Mission;
  index: number;
  countdown: string;
  decayPercentage: number;
  handleAttackClick: (mission: Mission) => void;
}

const MissionRow = ({
  mission,
  index,
  countdown,
  decayPercentage,
  handleAttackClick,
}: MissionRowProps) => {
  const position = usePlanetPosition(Number(mission.destination));
  const destination = position
    ? `${position.system} / ${position.orbit}`
    : "Unknown";

  const { submitTx: recallFleet } = useRecallFleet(mission.id);

  const onRecallClick = () => {
    recallFleet().then(() => {
      // Handle post-recall actions here, if needed
    });
  };

  const fleetDetails = (
    <FleetTooltipContent>
      <div>Carrier: {Number(mission.fleet.carrier)}</div>
      <div>Scraper: {Number(mission.fleet.scraper)}</div>
      <div>Sparrow: {Number(mission.fleet.sparrow)}</div>
      <div>Frigate: {Number(mission.fleet.frigate)}</div>
      <div>Armade: {Number(mission.fleet.armade)}</div>
    </FleetTooltipContent>
  );

  return (
    <GridRow key={index}>
      <MissionText>
        {mission.id.toString()}
        <Tooltip title={fleetDetails} placement="top">
          <FleetIcon />
        </Tooltip>
      </MissionText>
      <MissionText>{destination}</MissionText>
      <MissionText>{mission.is_debris ? "Debris" : "Attack"}</MissionText>
      <MissionText>{countdown || "Arrived"}</MissionText>
      <MissionText>
        <Tooltip title="Fleet will begin to decay 2 hours post-arrival unless an attack is initiated or debris is collected">
          <span>{decayPercentage ? `${decayPercentage}%` : "0%"}</span>
        </Tooltip>
      </MissionText>
      <ButtonContainer>
        <StyledButton
          size="small"
          sx={{ background: "#E67E51" }}
          onClick={() => onRecallClick()} // Bind the recall handler
        >
          Recall
        </StyledButton>
        <StyledButton
          onClick={() => handleAttackClick(mission)}
          size="small"
          sx={{ background: "#4A63AA" }}
          disabled={Number(mission.time_arrival) * 1000 + 240 >= Date.now()}
        >
          {mission.is_debris ? "Collect" : "Attack"}
        </StyledButton>
      </ButtonContainer>
    </GridRow>
  );
};
interface Props {
  planetId: number;
}

interface Props {
  planetId: number;
}

export const FleetMovements = ({ planetId }: Props) => {
  const missions = useGetActiveMissions(planetId) || [];
  const [isOpen, setIsOpen] = useState(false);
  const [countdowns, setCountdowns] = useState<string[]>([]);
  const [decayPercentages, setDecayPercentages] = useState<number[]>([]);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  useEffect(() => {
    // Ensure missions is defined and is an array before mapping
    if (missions && missions.length > 0) {
      const timers = missions.map((mission, index) => {
        return setInterval(() => {
          setCountdowns((prev) => {
            const updatedCountdowns = [...prev];
            updatedCountdowns[index] = getTimeDifference(
              Number(mission.time_arrival) * 1000
            );
            return updatedCountdowns;
          });

          const timeSinceArrival =
            Date.now() / 1000 - Number(mission.time_arrival);
          if (timeSinceArrival > 7200) {
            // 2 hours in seconds
            const decay = calculateFleetLoss(timeSinceArrival - 7200);
            setDecayPercentages((prev) => {
              const updatedDecays = [...prev];
              updatedDecays[index] = decay;
              return updatedDecays;
            });
          }
        }, 1000);
      });

      // Clear the timers when the component unmounts or missions change
      return () => timers.forEach((timer) => clearInterval(timer));
    }
  }, [missions]);

  const handleAttackClick = (mission: Mission) => {
    setSelectedMission(mission);
  };

  const getTimeDifference = (arrivalTime: number) => {
    const currentTime = Date.now();
    const differenceInSeconds = (arrivalTime - currentTime) / 1000 + 240;

    if (differenceInSeconds <= 0) {
      return `Arrived`;
    }

    const hours = Math.floor(differenceInSeconds / 3600);
    const minutes = Math.floor((differenceInSeconds % 3600) / 60);
    const seconds = Math.floor(differenceInSeconds % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const toggleModal = (open: boolean) => {
    setIsOpen(open);
  };

  // In the FleetMovements component, before the return statement
  missions.sort((a, b) => Number(a.time_arrival) - Number(b.time_arrival));

  return (
    <div>
      <HeaderButton
        variant="text"
        // size="large"
        onClick={() => toggleModal(true)}
      >
        <RocketLaunchIcon
          fontSize="small"
          sx={{ color: "#708090", marginRight: "4px" }}
        />
        FLEET MOVEMENTS
      </HeaderButton>

      <Modal
        open={isOpen}
        onClose={() => toggleModal(false)}
        aria-labelledby="fleet-movements-modal-title"
        aria-describedby="fleet-movements-modal-description"
        disableAutoFocus={true}
      >
        <StyledBox>
          <GridContainer>
            <FixedLengthText>
              <strong>Mission</strong>
            </FixedLengthText>
            <FixedLengthText>
              <strong>Destination</strong>
            </FixedLengthText>
            <FixedLengthText>
              <strong>Mission Type</strong>
            </FixedLengthText>
            <FixedLengthText>
              <strong>Arrival</strong>
            </FixedLengthText>
            <FixedLengthText>
              <strong>Fleet decay %</strong>
            </FixedLengthText>
            <div></div> {/* Placeholder for the button column */}
            {missions?.map((mission, index) => (
              <MissionRow
                key={mission.id}
                mission={mission}
                index={index}
                countdown={countdowns[index]}
                decayPercentage={decayPercentages[index]}
                handleAttackClick={handleAttackClick}
              />
            ))}
          </GridContainer>
        </StyledBox>
      </Modal>

      {/* Conditional rendering of action components */}
      {selectedMission &&
        (selectedMission.is_debris ? (
          <CollectDebrisAction
            missionId={selectedMission.id}
            onAction={() => setSelectedMission(null)}
          />
        ) : (
          <AttackPlanetAction
            missionId={selectedMission.id}
            onAction={() => setSelectedMission(null)}
          />
        ))}
    </div>
  );
};
