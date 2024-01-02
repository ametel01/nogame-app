import React, { useMemo } from 'react';
import styled from 'styled-components';
import * as Styled from '../../shared/styled/Box';
import { CircularProgress } from '@mui/material';
import { ButtonAttackPlanet } from '../buttons/ButtonAttackPlanet';
import {
  type DefenceLevels,
  type Resources,
  type ShipsLevels,
} from '../../shared/types';
import PlanetModal from '../modals/PlanetOverview';
import {
  convertPositionToNumbers,
  convertTechLevelsToNumbers,
  numberWithCommas,
} from '../../shared/utils';
import { DebrisFieldView } from '../ui/DebrisFieldView';
import { useTechsLevels } from '../../hooks/LevelsHooks';
import { usePlanetPosition } from '../../hooks/usePlanetPosition';

const InfoContainer = styled(Styled.InfoContainer)({
  width: '45%',
});

export const Box = styled('div')({
  justifyContent: 'space-evenly',
  alignItems: 'center', // Ensures vertically center aligned
  padding: '0 5px', // Reduce horizontal padding slightly
  width: '100%',
  maxHeight: '70px',
  height: '100%', // Ensuring the Box takes full height up to the max-height
  display: 'flex',
  flexDirection: 'row',
  marginBottom: '10px',
  backgroundColor: '#1A2025',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

export const ImageContainer = styled('div')({
  flexShrink: 0, // Ensure the images don't shrink
  display: 'flex', // To center the image vertically
  alignItems: 'center', // Centering the image inside this container
  width: '60px', // reduced width
  flex: '0 0 auto', // Allows this container to not shrink and to not grow beyond its content size
  margin: '0 10px', // Gives horizontal space
  marginRight: '5px', // Reduce margin to push elements closer
  marginLeft: '0', // Remove the left margin
});

interface Props {
  planetId: number;
  // address: string;
  img: string | undefined;
  owner?: string;
  functionCallName?: string;
  position: string;
  debris?: { steel: number; quartz: number };
  points: number;
  highlighted: boolean;
  spendable?: Resources;
  collectible?: Resources;
  fleet?: ShipsLevels;
  defences?: DefenceLevels;
  ownPlanetId: number;
  ownFleet?: ShipsLevels;
  isNoobProtected?: boolean;
  lastActive: number;
}

const UniverseViewBox = ({
  planetId,
  img,
  position,
  owner,
  points,
  highlighted,
  ownPlanetId,
  ownFleet,
  isNoobProtected,
  lastActive,
}: Props) => {
  const boxStyle = highlighted
    ? {
        border: '1px solid #23CE6B',
      }
    : {};

  const isButtonDisabled = highlighted;
  // TODO: implement StarkName once on mainnet
  const techs = useTechsLevels(Number(ownPlanetId));
  const ownPlanetPosition = usePlanetPosition(Number(ownPlanetId));

  const getLastActiveTime = (lastActiveTimestamp: number) => {
    if (!lastActiveTimestamp) return 'Unknown';

    // Convert lastActiveTimestamp from seconds to milliseconds
    const lastActiveDate = new Date(lastActiveTimestamp * 1000);

    // Adjust for the 8-hour difference
    const adjustedLastActiveDate = new Date(
      lastActiveDate.getTime() + 8 * 60 * 60 * 1000
    );

    // Get the current time
    const now = new Date();

    const differenceInSeconds = Math.floor(
      (now.getTime() - adjustedLastActiveDate.getTime()) / 1000
    );

    if (differenceInSeconds < 3600) {
      // Less than 1 hour
      return `${Math.floor(differenceInSeconds / 60)} min ago`;
    } else if (differenceInSeconds < 86400) {
      // Less than 24 hours
      return `${Math.floor(differenceInSeconds / 3600)} hours ago`;
    } else {
      // More than 24 hours
      return `${Math.floor(differenceInSeconds / 86400)} days ago`;
    }
  };

  const lastActiveString = useMemo(
    () => getLastActiveTime(lastActive),
    [lastActive]
  );

  // Derived states or memoized values should handle the conditional logic
  const techsNumberised = useMemo(() => {
    return techs ? convertTechLevelsToNumbers(techs) : undefined;
  }, [techs]);

  const ownPositionNumberised = useMemo(() => {
    return ownPlanetPosition
      ? convertPositionToNumbers(ownPlanetPosition)
      : undefined;
  }, [ownPlanetPosition]);

  return (
    <Styled.Box style={boxStyle}>
      <Styled.ImageContainer>
        {img && planetId ? (
          <PlanetModal
            planetId={planetId}
            image={img}
            position={position || ''}
          />
        ) : (
          <CircularProgress sx={{ color: '#ffffff', opacity: '0.5' }} />
        )}
      </Styled.ImageContainer>
      <Styled.SubBox>
        <Styled.Title>
          <Styled.ResourceTitle>PLAYER</Styled.ResourceTitle>
          <Styled.NumberContainer
            style={{ fontSize: '14px' }}
          >{`${owner}`}</Styled.NumberContainer>
        </Styled.Title>
        <InfoContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle style={{ width: '200%' }}>
              LAST ACTIVE
            </Styled.ResourceTitle>
            <Styled.NumberContainer style={{ fontSize: '14px' }}>
              {lastActiveString}
            </Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>POINTS</Styled.ResourceTitle>
            <Styled.NumberContainer style={{ fontSize: '14px' }}>
              {numberWithCommas(Number(points))}
            </Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>POSITION</Styled.ResourceTitle>
            <Styled.NumberContainer style={{ fontSize: '14px' }}>
              {position}
            </Styled.NumberContainer>
          </Styled.ResourceContainer>
        </InfoContainer>
        <DebrisFieldView
          planetId={planetId}
          position={position}
          ownFleet={ownFleet}
          techs={techsNumberised}
          ownPosition={ownPositionNumberised}
        />
        <Styled.ButtonContainer>
          <ButtonAttackPlanet
            noRequirements={isButtonDisabled}
            isNoobProtected={isNoobProtected}
            destination={position}
            ownFleet={ownFleet!}
            techs={techsNumberised}
            ownPosition={ownPositionNumberised}
            planetId={planetId}
          />
        </Styled.ButtonContainer>
      </Styled.SubBox>
    </Styled.Box>
  );
};

export default UniverseViewBox;
