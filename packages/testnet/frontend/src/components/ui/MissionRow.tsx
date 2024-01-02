import React, { memo } from 'react';
import styled from 'styled-components';
import Tooltip from '@mui/material/Tooltip';
import { type Mission } from '../../shared/types';
import { useRecallFleet } from '../../hooks/FleetHooks';
import { usePlanetPosition } from '../../hooks/usePlanetPosition';
import fleetIcon from '../../assets/uiIcons/Fleet.svg';
import { StyledButton } from '../../shared/styled/Button';

const FleetTooltipContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '10px',
});

const GridRow = styled.div`
  border-bottom: 1px solid #444;
  display: contents;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const MissionText = styled('div')({
  color: '#23CE6B',
  padding: '4px',
  textShadow: '0 0 5px rgba(152, 251, 152, 0.7)', // Glow effect
});

const FleetIcon = styled.img.attrs({
  src: fleetIcon,
  alt: 'Fleet',
})`
  width: 20px;
  height: 20px;
  margin-left: 32px; // Add some space between the mission ID and the icon
  cursor: pointer;
  vertical-align: middle; // Align with the text
`;

const ButtonContainer = styled.div`
  // display: flex;
  align-items: center;
`;

interface MissionRowProps {
  mission: Mission;
  index: number;
  countdown: string;
  decayPercentage: number;
  handleAttackClick: (mission: Mission) => void;
}

export const MissionRow = memo(
  ({
    mission,
    index,
    countdown,
    decayPercentage,
    handleAttackClick,
  }: MissionRowProps) => {
    const position = usePlanetPosition(Number(mission.destination));
    const destination = position
      ? `${Number(position.system)} / ${Number(position.orbit)}`
      : 'Unknown';
    const { writeAsync: recallFleet } = useRecallFleet(mission.id);

    const onRecallClick = React.useCallback(() => {
      recallFleet().then(() => {
        // Handle post-recall actions here, if needed
      });
    }, [recallFleet]);

    const renderFleetDetails = () => (
      <FleetTooltipContent>
        <div>Carrier: {Number(mission.fleet.carrier)}</div>
        <div>Scraper: {Number(mission.fleet.scraper)}</div>
        <div>Sparrow: {Number(mission.fleet.sparrow)}</div>
        <div>Frigate: {Number(mission.fleet.frigate)}</div>
        <div>Armade: {Number(mission.fleet.armade)}</div>
      </FleetTooltipContent>
    );

    const isArrived = Number(mission.time_arrival) * 1000 >= Date.now();

    return (
      <GridRow key={index}>
        <MissionText>
          {mission.id.toString()}
          <Tooltip title={renderFleetDetails()} placement="top">
            <FleetIcon />
          </Tooltip>
        </MissionText>
        <MissionText>{destination}</MissionText>
        <MissionText>{mission.is_debris ? 'Debris' : 'Attack'}</MissionText>
        <MissionText>{countdown || 'Arrived'}</MissionText>
        <MissionText>
          <Tooltip title="Fleet will begin to decay 2 hours post-arrival unless an attack is initiated or debris is collected">
            <span>{decayPercentage ? `${decayPercentage}%` : '0%'}</span>
          </Tooltip>
        </MissionText>
        <ButtonContainer>
        {isArrived ? 
          <StyledButton
          size="small"
          sx={{ background: '#883606' }}
            fullWidth
            onClick={onRecallClick}
          >
            Recall
          </StyledButton> :
          <StyledButton
            onClick={() => {
              handleAttackClick(mission);
            }}
            size="small"
            sx={{ background: '#4A63AA' }}
            fullWidth
          >
            {mission.is_debris ? 'Collect' : 'Attack'}
          </StyledButton>
      }
        </ButtonContainer>
      </GridRow>
    );
  }
);

MissionRow.displayName = 'MissionRow';
