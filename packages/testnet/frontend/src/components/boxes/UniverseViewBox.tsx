import React, { useMemo, useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Styled from '../../shared/styled/Box';
import { CircularProgress } from '@mui/material';
import ButtonAttackPlanet from '../buttons/ButtonAttackPlanet';
import {
  TechLevels,
  type DefenceLevels,
  type Resources,
  type ShipsLevels,
} from '../../shared/types';
import PlanetModal from '../modals/PlanetOverview';
import { convertPositionToNumbers, numberWithCommas } from '../../shared/utils';
import DebrisFieldView from '../ui/DebrisFieldView';
import fetchUpgradesData from '../../api/fetchUpgradesData';
import { usePlanetPosition } from '../../hooks/usePlanetPosition';

const InfoContainer = styled(Styled.InfoContainer)({
  width: '45%',
});

export const Box = styled('div')({
  justifyContent: 'space-evenly',
  alignItems: 'center',
  padding: '0 5px',
  width: '100%',
  maxHeight: '70px',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  marginBottom: '10px',
  backgroundColor: '#1A2025',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

export const ImageContainer = styled('div')({
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  width: '60px',
  flex: '0 0 auto',
  margin: '0 10px',
  marginRight: '5px',
  marginLeft: '0',
});

interface Props {
  planetId: number;
  img: string | undefined;
  owner?: string;
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
  const [techLevels, setTechLevels] = useState<TechLevels | null>(null);
  const boxStyle = highlighted ? { border: '1px solid #23CE6B' } : {};

  // Calculate the time difference in seconds
  const timeNow = new Date().getTime() / 1000;
  const timeDifference = timeNow - lastActive;
  const oneWeekInSeconds = 7 * 24 * 60 * 60;

  // Override isNoobProtected based on the lastActive time
  const updatedIsNoobProtected =
    isNoobProtected && timeDifference < oneWeekInSeconds;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUpgradesData({ planetId });
        setTechLevels(data.techLevels);
      } catch (error) {
        console.error('Error fetching upgrades data:', error);
        // Handle the error appropriately
      }
    };

    fetchData();
  }, [planetId]);
  const ownPlanetPosition = usePlanetPosition(Number(ownPlanetId));

  const getLastActiveTime = useMemo(() => {
    if (!lastActive || timeDifference > oneWeekInSeconds) return 'Inactive';
    const lastActiveDate = new Date(lastActive * 1000);
    const adjustedLastActiveDate = new Date(
      lastActiveDate.getTime() + 8 * 60 * 60 * 1000
    );
    const now = new Date();
    const differenceInSeconds = Math.floor(
      (now.getTime() - adjustedLastActiveDate.getTime()) / 1000
    );

    if (differenceInSeconds < 3600)
      return `${Math.floor(differenceInSeconds / 60)} min ago`;
    if (differenceInSeconds < 86400)
      return `${Math.floor(differenceInSeconds / 3600)} hours ago`;
    return `${Math.floor(differenceInSeconds / 86400)} days ago`;
  }, [lastActive, oneWeekInSeconds, timeDifference]);

  console.log(ownPlanetPosition);
  const ownPositionNumberised = useMemo(
    () => convertPositionToNumbers(ownPlanetPosition),
    [ownPlanetPosition]
  );

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
              {getLastActiveTime}
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
          techs={techLevels!}
          ownPosition={ownPositionNumberised}
        />
        <Styled.ButtonContainer>
          <ButtonAttackPlanet
            noRequirements={highlighted}
            isNoobProtected={updatedIsNoobProtected}
            destination={position}
            ownFleet={ownFleet!}
            techs={techLevels!}
            ownPosition={ownPositionNumberised}
            planetId={planetId}
          />
        </Styled.ButtonContainer>
      </Styled.SubBox>
    </Styled.Box>
  );
};

export default UniverseViewBox;
