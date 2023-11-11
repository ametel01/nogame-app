import { FC, useEffect, useMemo, useState } from "react";
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
const METADATA_URL = `${IPFS_BASE_URL}/Qmd5j1gnUBtbfpHCMnWDE8HRHu1G3ghuXSxjKW2pzy3PAk`;
const IMG_URL = `${IPFS_BASE_URL}/QmZkpEbRphWPcZEmLZV7Z9C5jUvMUvPbRHYE42NMrgArQQ`;
const IMG_MODULO = 17;

const DebugRowCentered = styled(RowCentered)`
  // border: 1px solid red;
  padding: 30px;
  // justify-content: flex-start;
`;

const PlanetImageWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 250,
  width: 250,
  borderRadius: 10,
  background: "#192125",
  overflow: "hidden",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
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
  color: "#0F0",
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
      const url = `${METADATA_URL}/${planetId}.json`;
      axios
        .get(url)
        .then((result) => {
          // Make sure result.data has the expected structure
          setMetadata(result.data as Metadata);
        })
        .catch(console.error);
    }
  }, [planetId, metadata, address]);

  const imgId = useMemo(
    () =>
      planetId !== undefined ? dataToNumber(planetId) % IMG_MODULO : undefined,
    [planetId]
  );

  const findAttribute = (name: string) =>
    metadata?.attributes.find((props: Props) => props.trait_type === name)
      ?.value || "-";

  return (
    <>
      <PlanetImageWrapper>
        {imgId ? (
          <a href={`${IMG_URL}/${planetId}.json`}>
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
        <PlanetInfoRow label="Type" value={findAttribute("type")} />
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
