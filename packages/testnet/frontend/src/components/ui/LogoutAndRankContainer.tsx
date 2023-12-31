import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import { useContractRead } from '@starknet-react/core';
import nogameLogo from '../../assets/logos/NoGameLogo.webp';
// import { numberWithCommas } from "../../shared/utils";
import { GAMEADDRESS } from '../../constants/addresses';
import game from '../../constants/nogame.json';
import { numberWithCommas } from '../../shared/utils';

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  padding: 16px 18px 18px;
  gap: 16px;
`;

const RankContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4px 16px;
  gap: 10px;
  width: 192px;
`;

const RankLineContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center; // Vertically align content in the middle
  font-weight: 500;
`;

const TitleContainer = styled(Typography)({
  fontWeight: 500,
  lineHeight: '18px',
  letterSpacing: '0.02em',
  color: 'grey',
  marginLeft: '4px',
});

const TrophyDiv = styled.div`
  display: flex;
  align-items: center; // Vertically align content in the middle
  gap: 8px; // Gap between icon and title for better spacing
`;

const StyledImage = styled.img`
  width: 200px;
  maxwidth: 100%;
  height: auto;
  objectfit: contain;
`;

interface Props {
  planetId: number;
}

const LogoAndRankContainer = ({ planetId }: Props) => {
  const { data: points } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: 'get_planet_points',
    args: [Number(planetId)],
    watch: false,
  });

  const score = useMemo(() => {
    return points ? Number(points) : '';
  }, [points]);

  return (
    <LogoContainer>
      <StyledImage src={nogameLogo} alt="NoGame Logo" />
      <RankContainer>
        <RankLineContainer>
          <TrophyDiv>
            <TitleContainer>Score</TitleContainer>
          </TrophyDiv>
          {numberWithCommas(Number(score))}
        </RankLineContainer>
      </RankContainer>
    </LogoContainer>
  );
};

export default LogoAndRankContainer;
