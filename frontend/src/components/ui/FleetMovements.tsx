import React, { useState, useEffect } from "react";
import { useAttackPlanet, useGetActiveMissions } from "../../hooks/FleetHooks";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal"; // Import Modal
import styled from "styled-components";

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
  width: "65%",
});

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); // Five columns
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

const StyledButton = styled(Button)({
  margin: "16px",
  marginLeft: "0px",
  color: "white", // Spacing between the StyledButtons
});

interface Props {
  planetId: number;
}

export const FleetMovements = ({ planetId }: Props) => {
  const missions = useGetActiveMissions(planetId);

  const [isOpen, setIsOpen] = useState(false);
  const [countdowns, setCountdowns] = useState<string[]>([]);

  useEffect(() => {
    if (missions) {
      const timers = missions.map((mission, index) => {
        return setInterval(() => {
          setCountdowns((prev) => {
            const updatedCountdowns = [...prev];
            updatedCountdowns[index] = getTimeDifference(
              Number(mission.time_arrival) * 1000
            );
            return updatedCountdowns;
          });
        }, 1000);
      });

      return () => timers.forEach((timer) => clearInterval(timer));
    }
  }, [missions]);

  const [selectedMissionId, setSelectedMissionId] = useState<number | null>(
    null
  );

  // This useEffect hook ensures that useAttackPlanet is called with the correct missionId
  useEffect(() => {
    if (selectedMissionId != null) {
      attackPlanet();
    }
  }, [selectedMissionId]);

  const { submitTx: attackPlanet } = useAttackPlanet(selectedMissionId);
  // const { submitTx: CollectDebris } = useCollectDebris(selectedMissionId);

  const handleAttackClick = (missionIndex: number) => {
    setSelectedMissionId(missionIndex + 1);
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
    <div>
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
              <strong>Time to Arrival</strong>
            </FixedLengthText>
            <div></div> {/* Placeholder for the button column */}
            {missions?.map((mission, index) => (
              <GridRow key={index}>
                <MissionText>{index + 1}</MissionText>
                <MissionText>{String(mission.destination)}</MissionText>
                <MissionText>
                  {mission.is_debris ? "Debris" : "Attack"}
                </MissionText>
                <MissionText>{countdowns[index]}</MissionText>
                <ButtonContainer>
                  <StyledButton size="small" sx={{ background: "#E67E51" }}>
                    Recall
                  </StyledButton>
                  <StyledButton
                    onClick={() => handleAttackClick(index)}
                    size="small"
                    sx={{ background: "#4A63AA" }}
                    disabled={Number(mission.time_arrival) * 1000 >= Date.now()}
                  >
                    {mission.is_debris ? "Collect" : "Attack"}
                  </StyledButton>
                </ButtonContainer>
              </GridRow>
            ))}
          </GridContainer>
        </StyledBox>
      </Modal>
    </div>
  );
};
