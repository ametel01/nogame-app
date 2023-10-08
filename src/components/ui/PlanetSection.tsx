import { FC, useEffect, useMemo, useState } from "react";
import { useAccount } from "@starknet-react/core";
import axios from "axios";

import { ImageIcon } from "../icons/Image";
import { PlanetIcon } from "../icons/Planet";
import { ScaleIcon } from "../icons/Scale";
import { TemperatureIcon } from "../icons/Temperature";
import { dataToNumber, numberWithCommas } from "../../shared/utils";
import { useTokenOf } from "../../hooks/useTokenOf";

import { styled, Box } from "@mui/system";
import { Typography } from "@mui/material";
import { RowCentered } from "./Row";

const IPFS_BASE_URL =
  "https://scarlet-biological-chipmunk-168.mypinata.cloud/ipfs";
const IMG_URL = `${IPFS_BASE_URL}/QmbmsALmobAaTKDLVmPyC1j1Z1nABn7MfNCNXbYvFMrx3m`;
const IMG_MODULO = 17;

const PlanetImageWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 250,
  width: 250,
  borderRadius: 35,
  background: "#192125",
  overflow: "hidden",
});

const MainContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 48,
});

const PlanetInfoContainer = styled(Box)({
  gap: 6,
  color: "white",
  width: 252,
});

const PlanetInfoRowStyled = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: 16,
  width: "100%",
});

const PlanetInfoKey = styled(Typography)({
  textTransform: "uppercase",
  opacity: 0.5,
  fontWeight: 700,
  fontSize: 12,
  lineHeight: "16px",
  letterSpacing: "0.02em",
});

const PlanetInfoValue = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontWeight: 400,
  fontSize: 14,
  lineHeight: "21px",
  letterSpacing: "0.02em",
});

interface Props {
  trait_type: string;
}

interface Metadata {
  attributes: {
    trait_type: string;
    value: string | number; // Adjust this based on actual data structure
  }[];
  // ... add other properties as needed
}

const PlanetImage: FC = () => {
  const { address } = useAccount();
  const tokenId = useTokenOf(address);
  const [metadata, setMetadata] = useState<Metadata | null>(null);

  useEffect(() => {
    if (address && !metadata) {
      const url = `${IPFS_BASE_URL}/${tokenId}.json`;
      axios
        .get(url)
        .then((result) => {
          // Make sure result.data has the expected structure
          setMetadata(result.data as Metadata);
        })
        .catch(console.error);
    }
  }, [tokenId, metadata, address]);

  const imgId = useMemo(
    () => (tokenId !== undefined ? Number(tokenId) % IMG_MODULO : undefined),
    [tokenId]
  );

  const findAttribute = (name: string) =>
    metadata?.attributes.find((props: Props) => props.trait_type === name)
      ?.value || "-";

  const getPlanetImageUrl = () =>
    imgId ? `${IMG_URL}/${imgId}.png` : undefined;

  return (
    <>
      <PlanetImageWrapper>
        {imgId ? (
          <a href={`${IPFS_BASE_URL}/${tokenId}.json`}>
            <img
              src={getPlanetImageUrl()}
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
        <PlanetInfoRow
          label="Type"
          icon={<PlanetIcon />}
          value={findAttribute("type")}
        />
        <PlanetInfoRow
          label="Diameter"
          icon={<ScaleIcon />}
          value={`${numberWithCommas(
            dataToNumber(findAttribute("size")) * 10 ** 4
          )} km`}
        />
        <PlanetInfoRow
          label="Avg Temp"
          icon={<TemperatureIcon />}
          value={`${findAttribute("temperature")} °C`}
        />
      </PlanetInfoContainer>
    </>
  );
};

const PlanetInfoRow: FC<{
  label: string;
  icon: JSX.Element;
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

export const PlanetSection: FC = () => (
  <RowCentered>
    <MainContainer>
      <PlanetImage />
    </MainContainer>
  </RowCentered>
);
