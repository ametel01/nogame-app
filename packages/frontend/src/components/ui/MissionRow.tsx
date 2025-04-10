import React, { memo } from "react";
import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";
import { MissionCategory, type Mission } from "../../shared/types";
import {
  useAttackPlanet,
  useRecallFleet,
  useCollectDebris,
  useDockFleet,
} from "../../hooks/fleet";
import { usePlanetPosition } from "../../hooks/planet";
import fleetIcon from "../../assets/uiIcons/Fleet.svg";
import { StyledButton } from "../../shared/styled/Button";
import { useDestination } from "../../context/DestinationContext";

const FleetTooltipContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "10px",
});

const GridRow = styled.div`
  border-bottom: 1px solid #444;
  display: contents;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const MissionText = styled("div")({
  color: "#23CE6B",
  padding: "4px",
  textShadow: "0 0 2px rgba(152, 251, 152, 0.7)", // Glow effect
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

const ButtonContainer = styled.div`
  display: flex; // Enable flex layout
  align-items: center;
  gap: 10px;
`;

interface MissionRowProps {
  mission: Mission;
  index: number;
  countdown: string;
  decayPercentage: number;
}

export const MissionRow = memo(
  ({ mission, index, countdown, decayPercentage }: MissionRowProps) => {
    const position = usePlanetPosition(Number(mission.destination));
    const destination = position
      ? `${Number(position.system)} / ${Number(position.orbit)}`
      : "Unknown";
    const { writeAsync: recallFleet } = useRecallFleet(mission.id);
    const { writeAsync: attackPlanet } = useAttackPlanet(mission.id);
    const { writeAsync: collectDebris } = useCollectDebris(mission.id);
    const { writeAsync: dockFleet } = useDockFleet(mission.id);

    const onRecallClick = React.useCallback(async () => {
      try {
        await recallFleet();
        // Handle post-recall actions here, if needed
      } catch (error) {
        console.error(error);
      }
    }, [recallFleet]);

    const { handleDestinationClick } = useDestination();

    // Updated to handle the click event
    const onClickDestination = () => {
      handleDestinationClick(mission.destination);
    };

    const renderFleetDetails = () => (
      <FleetTooltipContent>
        <div>Carrier: {Number(mission.fleet.carrier)}</div>
        <div>Scraper: {Number(mission.fleet.scraper)}</div>
        <div>Sparrow: {Number(mission.fleet.sparrow)}</div>
        <div>Frigate: {Number(mission.fleet.frigate)}</div>
        <div>Armade: {Number(mission.fleet.armade)}</div>
      </FleetTooltipContent>
    );

    const isArrived = (Number(mission.time_arrival) + 320) * 1000 <= Date.now();
    const origin =
      mission.origin <= 500
        ? "Mother"
        : `Colony ${Number(mission.origin) % 1000}`;

    return (
      <GridRow key={index}>
        <MissionText>
          {mission.id.toString()}
          <Tooltip title={renderFleetDetails()} placement="top">
            <FleetIcon />
          </Tooltip>
        </MissionText>
        <MissionText>{origin}</MissionText>
        <MissionText onClick={onClickDestination} style={{ cursor: "pointer" }}>
          {destination}
        </MissionText>
        <MissionText>
          {mission.category == MissionCategory.Debris
            ? "Debris"
            : mission.category == MissionCategory.Attack
              ? "Attack"
              : "Transport"}
        </MissionText>
        <MissionText>{countdown || "Arrived"}</MissionText>
        <MissionText>
          <Tooltip title="Fleet will begin to decay 2 hours post-arrival unless an attack is initiated or debris is collected">
            <span>{decayPercentage ? `${decayPercentage}%` : "0%"}</span>
          </Tooltip>
        </MissionText>
        <ButtonContainer>
          {!isArrived ? (
            <StyledButton
              size="small"
              sx={{ background: "#C47E33" }}
              fullWidth
              onClick={onRecallClick}
            >
              Recall
            </StyledButton>
          ) : (
            <>
              <StyledButton
                onClick={() => {
                  if (mission.category == MissionCategory["Debris"]) {
                    collectDebris();
                  } else if (mission.category == MissionCategory["Attack"]) {
                    attackPlanet();
                  } else {
                    dockFleet();
                  }
                }}
                size="small"
                sx={{ background: "#4A63AA" }}
                fullWidth
              >
                {mission.category == MissionCategory.Debris
                  ? "Collect"
                  : mission.category == MissionCategory.Attack
                    ? "Attack"
                    : "Dock"}
              </StyledButton>
              <StyledButton
                size="small"
                sx={{ background: "#C47E33" }}
                fullWidth
                onClick={onRecallClick}
              >
                Recall
              </StyledButton>
            </>
          )}
        </ButtonContainer>
      </GridRow>
    );
  },
);

MissionRow.displayName = "MissionRow";
