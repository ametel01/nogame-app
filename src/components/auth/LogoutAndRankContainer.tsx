import { useMemo } from "react";
import styled from "@emotion/styled";
import { useContractRead } from "@starknet-react/core";
import nogameLogo from "../../assets/logos/NoGameLogo.png";
import { numberWithCommas } from "../../shared/utils";
import { SportsScore } from "@mui/icons-material";
import { GAMEADDRESS } from "../../constants/addresses";
import game from "../../constants/nogame.json";
import { useTokenOf } from "../../hooks/useTokenOf";

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export const RankLineContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
`;

export const TitleContainer = styled.div`
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.02em;
  color: grey;
  margin-left: 4px;
`;

const TrophyDiv = styled.div`
  display: flex;
  alignitems: "center";
`;

const StyledImage = styled.img`
  width: 200px;
  maxwidth: 100%;
  height: auto;
  objectfit: contain;
`;

const LogoAndRankContainer = () => {
  const data = useTokenOf();
  const planetId = Number(data.planetId);

  const { data: points } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: "get_planet_points",
    args: [planetId],
    watch: false,
  });

  const score = useMemo(() => {
    return points ? numberWithCommas(Number(points)) : "";
  }, [points]);

  return (
    <LogoContainer>
      <StyledImage src={nogameLogo} alt="NoGame Logo" />
      <RankContainer>
        <RankLineContainer>
          <TrophyDiv>
            <SportsScore />
            <TitleContainer>Score</TitleContainer>
          </TrophyDiv>
          {Number(score)}
        </RankLineContainer>
      </RankContainer>
    </LogoContainer>
  );
};

export default LogoAndRankContainer;
