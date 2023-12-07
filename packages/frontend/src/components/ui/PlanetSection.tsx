import { FC, useEffect, useState } from "react";
import { useAccount } from "@starknet-react/core";
import axios from "axios";

import { ImageIcon } from "../icons/Image";
import { dataToNumber, numberWithCommas } from "../../shared/utils";

import { styled, Box } from "@mui/system";
import { Typography } from "@mui/material";
import { RowCentered } from "./Row";
import { usePlanetPosition } from "../../hooks/usePlanetPosition";
import { HostileMissions } from "./HostileMissions";

//pink-capable-snake-964.mypinata.cloud/ipfs/QmZkpEbRphWPcZEmLZV7Z9C5jUvMUvPbRHYE42NMrgArQQ/
const IPFS_BASE_URL = "https://pink-capable-snake-964.mypinata.cloud/ipfs";
const METADATA_URL = `${IPFS_BASE_URL}/QmaqenNxdgMeRRidn5hFte5bNY4EknEPLbAwA1kYp4f56N`;
const IMG_URL = `${IPFS_BASE_URL}/QmYuu69m6ArmGq18QjC6UpqFgevFZXooupAyaxKd9XfDpW`;
// const IMG_MODULO = 10;

const DebugRowCentered = styled(RowCentered)`
  // border: 1px solid red;
  padding: 30px;
  // justify-content: flex-start;
`;

const PlanetImageWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "250px", // Reduced size
  width: "250px", // Keeping the width and height the same for a circle
  borderRadius: "8%", // Circular shape to match the planet
  background: "linear-gradient(135deg, #1b2735 0%, #090a0f 100%)", // Space-like gradient
  overflow: "hidden",
  boxShadow: "0 2px 4px rgba(0,0,0,0.25), inset 0 0 5px rgba(255,255,255,0.2)", // Slightly reduced shadow for smaller size
  position: "relative", // Needed for pseudo-element positioning
  "&:before": {
    // Creates a pseudo-element for extra styling
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "radial-gradient(circle at center, rgba(255,255,255,0.25) 0%, transparent 50%)", // Adjusted glow effect for size
    borderRadius: "inherit", // Inherits the parent's border radius
  },
  "& img": {
    // Directly style the img element within the wrapper
    display: "block", // Remove any inline behavior
    maxWidth: "100%", // Full width of the wrapper
    height: "auto", // Auto-height for aspect ratio
    borderRadius: "inherit", // Inherits the parent's border radius
  },
});

const MainContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 48,
  // justifyContent: "flex-start",
});

const PlanetInfoContainer = styled(Box)({
  gap: 6,
  color: "white",
  width: 252,
});

const PlanetInfoRowStyled = styled(Box)({
  display: "flex",
  justifyContent: "flex-start", // This ensures content starts from the left
  gap: "12px", // This will place the label closer to its value.
  width: "100%",
  alignItems: "center",
});

const PlanetInfoKey = styled(Typography)({
  textTransform: "uppercase",
  opacity: 0.5,
  fontWeight: 700,
  fontSize: 12,
  lineHeight: "16px",
  letterSpacing: "0.02em",
  margin: 0, // Make sure no external spacing
  padding: 0, // Make sure no internal spacing
  display: "flex", // Make this a flex container
  alignItems: "center", // Ensure its content is vertically centered
});

const PlanetInfoValue = styled(Box)({
  display: "flex",
  alignItems: "center", // Ensure vertical centering
  gap: "4px",
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "21px",
  letterSpacing: "0.02em",
  margin: 0, // Ensure no external spacing
  padding: 0, // Ensure no internal spacing
});

const PlanetPositionGroup = styled(Box)({
  marginTop: "32px", // Add spacing above the group
});

const PlanetPositionRowStyled = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: "8px", // Reduced from 16px or whatever it was previously to 8px.
  width: "100%",
  alignItems: "center",
});

const RadarTextStyle = styled(Box)({
  color: "#98fb98",
});

interface Props {
  trait_type: string;
}

interface Metadata {
  attributes: {
    trait_type: string;
    value: string | number; // Adjust this based on actual data structure
  }[];
}

export const getPlanetImageUrl = (imgId: number | undefined) =>
  imgId ? `${IMG_URL}/${imgId}.png` : undefined;

interface PlanetImageArgs {
  planetId: number;
}

const PlanetImage = ({ planetId }: PlanetImageArgs) => {
  const { address } = useAccount();
  const [metadata, setMetadata] = useState<Metadata | null>(null);

  const position = usePlanetPosition(planetId);

  useEffect(() => {
    if (address && !metadata) {
      const url = `${METADATA_URL}/${planetId}`;
      axios
        .get(url)
        .then((result) => {
          // Make sure result.data has the expected structure
          setMetadata(result.data as Metadata);
        })
        .catch(console.error);
    }
  }, [planetId, metadata, address]);

  // console.log(`${METADATA_URL}/${planetId}`);

  const imgId = Number(position?.orbit);

  const findAttribute = (name: string) =>
    metadata?.attributes.find((props: Props) => props.trait_type === name)
      ?.value || "-";

      console.log(planetId)
  return (
    <>
      <PlanetImageWrapper>
        {imgId ? (
          <a href={`${IMG_URL}/${planetId}`}>
            <img
              src={getPlanetImageUrl(imgId)}
              width={250}
              height={252}
              alt="planet"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </a>
        ) : (
          <ImageIcon />
        )}
      </PlanetImageWrapper>
      <PlanetInfoContainer>
        <PlanetInfoRow label="Name" value={findAttribute("name")} />
        <PlanetInfoRow
          label="Diameter"
          value={`${numberWithCommas(
            dataToNumber(findAttribute("size")) * 10 ** 4
          )} km`}
        />
        <PlanetInfoRow
          label="Avg Temp"
          value={`${findAttribute("temperature")} °C`}
        />
        <PlanetPositionGroup>
          <RadarTextStyle>
            <PlanetInfoKey>PLANET POSITION</PlanetInfoKey>
            <PlanetPositionRowStyled>
              <PlanetInfoRow label="System" value={Number(position?.system)} />
              <PlanetInfoRow label="Orbit" value={Number(position?.orbit)} />
            </PlanetPositionRowStyled>
          </RadarTextStyle>
        </PlanetPositionGroup>
      </PlanetInfoContainer>
      <HostileMissions planetId={planetId} />
    </>
  );
};

const PlanetInfoRow: FC<{
  label: string;
  icon?: JSX.Element;
  value: string | number;
}> = ({ label, icon, value }) => (
  <PlanetInfoRowStyled>
    <PlanetInfoKey>{label}</PlanetInfoKey>
    <PlanetInfoValue>
      {icon}
      {value}
    </PlanetInfoValue>
  </PlanetInfoRowStyled>
);

interface PlanetSectionArgs {
  planetId: number;
}

export const PlanetSection = ({ planetId }: PlanetSectionArgs) => (
  <DebugRowCentered>
    <MainContainer>
      <PlanetImage planetId={planetId} />
    </MainContainer>
  </DebugRowCentered>
);
