import React, { useState, useEffect } from "react";
import {
  useAttackPlanet,
  // useCollectDebris,
  useGetActiveMissions,
} from "../../hooks/FleetHooks";
import { styled, Box } from "@mui/system";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { StyledButton } from "../../shared/styled/Button";
import * as Styled from "../../shared/styled/Box";

const FleetMovementsContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  color: "white",
  padding: "10px",
  backgroundColor: "#151a1e",
  width: "calc(100% - 20px)",
});

export const FixedLengthText = styled("div")({
  flex: 1,
  padding: "0 10px",
});

export const MissionText = styled("div")({
  flex: 1,
  color: "#FFA500",
  padding: "0 10px",
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

  const toggleDrawer = (open: boolean | ((prevState: boolean) => boolean)) => {
    setIsOpen(open);
  };

  return (
    <div>
      <Button onClick={() => toggleDrawer(true)}>Fleet Movements</Button>
      <Drawer anchor="top" open={isOpen} onClose={() => toggleDrawer(false)}>
        <FleetMovementsContainer>
          <Box
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              mb: 2,
              fontSize: "24px ",
            }}
          >
            Active Missions
          </Box>
          <Styled.SubBox
            sx={{
              padding: 1,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
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
            <FixedLengthText></FixedLengthText>{" "}
            {/* Placeholder for the button column */}
          </Styled.SubBox>
          {missions?.map((mission, index) => (
            <Styled.Box
              key={index}
              sx={{
                padding: 1,
                alignItems: "center",
              }}
            >
              <MissionText>{index + 1}</MissionText>
              <MissionText>{String(mission.destination)}</MissionText>
              <MissionText>
                {mission.is_debris ? "Debris Collection" : "Attack Mission"}
              </MissionText>
              <MissionText>{countdowns[index]}</MissionText>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <StyledButton
                  sx={{
                    background: "#E67E51",
                  }}
                >
                  Recall Fleet
                </StyledButton>
                <StyledButton
                  onClick={() => handleAttackClick(index)}
                  sx={{
                    background: "#4A63AA",
                  }}
                  disabled={Number(mission.time_arrival) * 1000 >= Date.now()}
                >
                  {mission.is_debris ? "Collect Debris" : "Launch Attack"}
                </StyledButton>
              </Box>
            </Styled.Box>
          ))}
        </FleetMovementsContainer>
      </Drawer>
    </div>
  );
};
