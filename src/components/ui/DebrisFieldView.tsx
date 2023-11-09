import { Tooltip, Box, IconButton, Modal } from "@mui/material";
import DebrisIcon from "../../assets/uiIcons/debris.svg";
import { useGetDebrisField } from "../../hooks/useGetDebrisField";
import CircularProgress from "@mui/material/CircularProgress";
import { numberWithCommas } from "../../shared/utils";
import { ButtonCollectDebris } from "../buttons/ButtonCollectDebris";
import { DebrisField, ShipsLevels } from "../../shared/types";
import React from "react";

interface Props {
  planetId?: number;
  position?: string;
  ownFleet?: ShipsLevels;
}

export function DebrisFieldView({ planetId, position, ownFleet }: Props) {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  if (!planetId && !position && !ownFleet) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  const debris: DebrisField = useGetDebrisField(Number(planetId));
  const debrisPresent = debris ? debris.steel > 0 || debris.quartz > 0 : false;
  return (
    <Box
      sx={{
        width: "1%",
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "10px",
      }}
    >
      {debrisPresent ? (
        <>
          <Tooltip
            title={
              <>
                <div>Steel</div>
                <div>Quartz</div>
                <div>Steel: {numberWithCommas(Number(debris.steel))}</div>
                <div>Quartz: {numberWithCommas(Number(debris.quartz))}</div>
              </>
            }
            arrow
          >
            <IconButton onClick={handleOpenModal} size="large">
              <img
                src={DebrisIcon}
                alt="Debris"
                style={{ width: 40, height: 40, display: "block" }}
              />
            </IconButton>
          </Tooltip>
          <Modal
            open={modalOpen}
            onClose={handleCloseModal}
            aria-labelledby="collect-debris-modal"
            aria-describedby="collect-debris-modal-description"
          >
            <ButtonCollectDebris
              playerPlanetId={Number(planetId)}
              onClose={handleCloseModal}
              position={position!}
              ownFleet={ownFleet!}
            />
          </Modal>
        </>
      ) : (
        <div style={{ width: 40, height: 40 }} />
      )}
    </Box>
  );
}
