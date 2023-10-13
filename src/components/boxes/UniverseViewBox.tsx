import styled from "@emotion/styled";
import * as Styled from "../../shared/styled/Box";
import { ButtonSendFleet } from "../buttons/ButtonSendFleet";
import { BlurOnOutlined } from "@mui/icons-material";
import { DefenceLevels, Resources, ShipsLevels } from "../../shared/types";
import PlanetModal from "../modals/PlanetOverview";
import { CircularProgress } from "@mui/material";

export const Box = styled("div")({
  justifyContent: "space-between",
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
  planetId: number | undefined;
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
}

const UniverseViewBox = ({
  planetId,
  img,
  position,
  owner, //   functionCallName,
  points, //   debris,
  highlighted,
  spendable,
  collectible,
  fleet,
  defences,
}: Props) => {
  const boxStyle = highlighted
    ? {
        border: "1px solid #E67E51",
      }
    : {};

  const isButtonDisabled = highlighted;

  return (
    <Box style={boxStyle}>
      <Styled.ImageContainer>
        {img ? ( //&& spendable && collectible && fleet && defences ? (
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
        <Styled.InfoContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle style={{ width: "150%" }}>
              PLANET ID
            </Styled.ResourceTitle>
            <Styled.NumberContainer>{Number(planetId)}</Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>PLAYER</Styled.ResourceTitle>
            <Styled.NumberContainer>{`0x${owner}`}</Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>POINTS</Styled.ResourceTitle>
            <Styled.NumberContainer>{Number(points)}</Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>POSITION</Styled.ResourceTitle>
            <Styled.NumberContainer>{position}</Styled.NumberContainer>
          </Styled.ResourceContainer>
        </Styled.InfoContainer>
        <BlurOnOutlined />
        <Styled.ButtonContainer>
          <ButtonSendFleet noRequirements={isButtonDisabled} />
        </Styled.ButtonContainer>
      </Styled.SubBox>
    </Box>
  );
};

export default UniverseViewBox;
