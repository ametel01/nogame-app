import React, { useState, useEffect } from "react";
import {
  useAttackPlanet,
  useGetActiveMissions,
  useCollectDebris,
} from "../../hooks/FleetHooks";
import { Box } from "@mui/system";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal"; // Import Modal
import styled from "styled-components";
import { StyledButton } from "../../shared/styled/Button";
import { calculateFleetLoss } from "../../shared/utils/Formulas";
import { usePlanetPosition } from "../../hooks/usePlanetPosition";
import { Mission } from "../../shared/types";

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
  grid-template-columns: repeat(6, 1fr); // Five columns
  gap: 10px;
`;

const GridRow = styled.div`
  border: 1px solid red;
  display: contents; // This ensures each child takes up a cell in the grid
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center; // Aligns buttons to the center of the cell vertically
  justify-content: space-between; // Aligns buttons to the start of the cell horizontally
`;

export const FixedLengthText = styled("div")({
  flex: 1,
  padding: "0 10px",
});

export const MissionText = styled("div")({
  color: "#98fb98",
  padding: "10px",
  // marginBottom: "0px",
});

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

  return (
    <GridRow key={index}>
      <MissionText>{mission.id.toString()}</MissionText>
      <MissionText>{destination}</MissionText>
      <MissionText>{mission.is_debris ? "Debris" : "Attack"}</MissionText>
      <MissionText>{countdown || "Arrived"}</MissionText>
      <MissionText>
        <Tooltip title="The fleet will start decay 2 hours after arrival if you don't attack or collect the debris">
          <span>{decayPercentage ? `${decayPercentage}%` : "0%"}</span>
        </Tooltip>
      </MissionText>
      <ButtonContainer>
        <StyledButton size="small" sx={{ background: "#E67E51" }}>
          Recall
        </StyledButton>
        <StyledButton
          onClick={() => handleAttackClick(mission)}
          size="small"
          sx={{ background: "#4A63AA" }}
          disabled={Number(mission.time_arrival) * 1000 >= Date.now()}
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

  useEffect(() => {
    if (selectedMission) {
      if (selectedMission.is_debris) {
        const { submitTx: collectDebris } = useCollectDebris(
          selectedMission.id
        );
        collectDebris();
      } else {
        const { submitTx: attackPlanet } = useAttackPlanet(selectedMission.id);
        attackPlanet();
      }
    }
  }, [selectedMission]);

  const handleAttackClick = (mission: Mission) => {
    setSelectedMission(mission);
  };

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

  const toggleModal = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <div style={{ marginRight: "16px" }}>
      <StyledButton
        variant="text"
        size="small"
        onClick={() => toggleModal(true)}
      >
        Fleet Movements
      </StyledButton>
      <Modal
        open={isOpen}
        onClose={() => toggleModal(false)}
        aria-labelledby="fleet-movements-modal-title"
        aria-describedby="fleet-movements-modal-description"
      >
        <StyledBox>
          <GridContainer>
            <FixedLengthText>
              <strong>Mission ID</strong>
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
    </div>
  );
};
