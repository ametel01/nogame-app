import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import { DefenceLevels, Resources, ShipsLevels } from "../../shared/types";
import {
  useSpendableResources,
  useCollectibleResources,
} from "../../hooks/ResourcesHooks";
import { useShipsLevels, useDefencesLevels } from "../../hooks/LevelsHooks";
import { numberWithCommas } from "../../shared/utils";

const theme = createTheme({
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.85)",
        },
      },
    },
  },
});

const ImageContainer = styled.div`
  width: 70px;
  cursor: pointer;
`;

const StyledDialogContent = styled(DialogContent)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px 20px;
  color: #d0d3da;
`;

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    border-radius: 8px;
    overflow: hidden;
    background-color: #1a2025;
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  background-color: #1a2025;
  color: #d0d3da;
`;

interface Props {
  planetId: number;
  image: string;
  spendable?: Resources;
  collectible?: Resources;
  fleet?: ShipsLevels;
  defences?: DefenceLevels;
}

export default function PlanetModal({ planetId, image }: Props) {
  const spendableResources =
    planetId !== undefined
      ? useSpendableResources(Number(planetId))
      : undefined;
  const collectibleResources =
    planetId !== undefined
      ? useCollectibleResources(Number(planetId))
      : undefined;
  const shipsLevels =
    planetId !== undefined ? useShipsLevels(Number(planetId)) : undefined;
  const defencesLevels =
    planetId !== undefined ? useDefencesLevels(Number(planetId)) : undefined;
  const [open, setOpen] = React.useState(false);
  const handleModalOpen = () => {
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <ImageContainer onClick={handleModalOpen}>
        {image ? (
          <img
            src={image}
            alt={"planet"}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        ) : (
          <CircularProgress sx={{ color: "#ffffff", opacity: "0.5" }} />
        )}
      </ImageContainer>
      <StyledDialog
        open={open}
        onClose={handleModalClose}
        maxWidth="sm"
        fullWidth
      >
        <StyledDialogTitle variant="h5">Planet Details</StyledDialogTitle>
        <StyledDialogContent>
          <div>
            <h4>Spendable Resources</h4>
            {Object.keys(spendableResources ?? {}).map((key) => (
              <h5 key={key}>{`${key}: ${numberWithCommas(
                spendableResources![key as keyof Resources]
              )}`}</h5>
            ))}
          </div>

          <div>
            <h4>Collectible Resources</h4>
            {Object.keys(collectibleResources ?? {}).map((key) => (
              <h5 key={key}>{`${key}: ${numberWithCommas(
                collectibleResources![key as keyof Resources]
              )}`}</h5>
            ))}
          </div>

          <div>
            <h4>Fleet</h4>
            {Object.keys(shipsLevels ?? {}).map((key) => (
              <h5 key={key}>{`${key}: ${numberWithCommas(
                shipsLevels![key as keyof ShipsLevels]
              )}`}</h5>
            ))}
          </div>

          <div>
            <h4>Defences</h4>
            {Object.keys(defencesLevels ?? {}).map((key) => (
              <h5 key={key}>{`${key}: ${numberWithCommas(
                defencesLevels![key as keyof DefenceLevels]
              )}`}</h5>
            ))}
          </div>
        </StyledDialogContent>
      </StyledDialog>
    </ThemeProvider>
  );
}
