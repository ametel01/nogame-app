import styled from "styled-components";
import * as Styled from "../../shared/styled/Box";
import { CircularProgress } from "@mui/material";
// import { useStarkName } from "@starknet-react/core";
import { ButtonAttackPlanet } from "../buttons/ButtonAttackPlanet";
import { DefenceLevels, Resources, ShipsLevels } from "../../shared/types";
import PlanetModal from "../modals/PlanetOverview";
import { numberWithCommas } from "../../shared/utils";
import { DebrisFieldView } from "../ui/DebrisFieldView";

const InfoContainer = styled(Styled.InfoContainer)({
  width: "45%",
});

export const Box = styled("div")({
  justifyContent: "space-evenly",
  alignItems: "center", // Ensures vertically center aligned
  padding: "0 5px", // Reduce horizontal padding slightly
  width: "100%",
  maxHeight: "70px",
  height: "100%", // Ensuring the Box takes full height up to the max-height
  display: "flex",
  flexDirection: "row",
  marginBottom: "10px",
  backgroundColor: "#1A2025",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
});

export const ImageContainer = styled("div")({
  flexShrink: 0, // Ensure the images don't shrink
  display: "flex", // To center the image vertically
  alignItems: "center", // Centering the image inside this container
  width: "60px", // reduced width
  flex: "0 0 auto", // Allows this container to not shrink and to not grow beyond its content size
  margin: "0 10px", // Gives horizontal space
  marginRight: "5px", // Reduce margin to push elements closer
  marginLeft: "0", // Remove the left margin
});

interface Props {
  planetId: number;
  // address: string;
  img: string | undefined;
  owner?: string;
  functionCallName?: string;
  position?: string;
  debris?: { steel: number; quartz: number };
  points?: number;
  highlighted: boolean;
  spendable?: Resources;
  collectible?: Resources;
  fleet?: ShipsLevels;
  defences?: DefenceLevels;
  ownFleet?: ShipsLevels;
  isNoobProtected?: boolean;
}

const UniverseViewBox = ({
  planetId,
  img,
  position,
  owner,
  points,
  highlighted,
  spendable,
  collectible,
  fleet,
  defences,
  ownFleet,
  isNoobProtected,
}: Props) => {
  const boxStyle = highlighted
    ? {
        border: "1px solid #E67E51",
      }
    : {};

  const isButtonDisabled = highlighted;
  // TODO: implement StarkName once on mainnet

  return (
    <Box style={boxStyle}>
      <Styled.ImageContainer>
        {img ? (
          <PlanetModal
            planetId={planetId!}
            image={img}
            spendable={spendable}
            collectible={collectible}
            fleet={fleet}
            defences={defences}
          />
        ) : (
          <CircularProgress sx={{ color: "#ffffff", opacity: "0.5" }} />
        )}
      </Styled.ImageContainer>
      <Styled.SubBox>
        <Styled.Title>
          <Styled.ResourceTitle>PLAYER</Styled.ResourceTitle>
          <Styled.NumberContainer>{`0x${owner}`}</Styled.NumberContainer>
        </Styled.Title>
        <InfoContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle style={{ width: "200%" }}>
              LAST ONLINE
            </Styled.ResourceTitle>
            <Styled.NumberContainer>Oct 13</Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>POINTS</Styled.ResourceTitle>
            <Styled.NumberContainer>
              {numberWithCommas(Number(points))}
            </Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>POSITION</Styled.ResourceTitle>
            <Styled.NumberContainer>{position}</Styled.NumberContainer>
          </Styled.ResourceContainer>
        </InfoContainer>
        <DebrisFieldView
          planetId={Number(planetId)}
          position={position!}
          ownFleet={ownFleet!}
        />
        <Styled.ButtonContainer>
          <ButtonAttackPlanet
            noRequirements={isButtonDisabled}
            isNoobProtected={isNoobProtected}
            destination={position!}
            ownFleet={ownFleet!}
          />
        </Styled.ButtonContainer>
      </Styled.SubBox>
    </Box>
  );
};

export default UniverseViewBox;
