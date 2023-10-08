import { Box, Button } from "@mui/material";
import styled from "@emotion/styled";
import CircularProgress from "@mui/material/CircularProgress";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useContractWrite } from "@starknet-react/core";
import { GAMEADDRESS } from "../constants/addresses";
import React from "react";

const StyledButton = styled(Button)({
  width: "100%",
  borderRadius: 8,
  padding: "16px 64px",
  textTransform: "capitalize",
  fontSize: "24px",
  fontWeight: "bold",
  letterSpacing: "0.15em",
  border: "1px solid #243B55",
  display: "flex",
  justifyContent: "center",
  background: "linear-gradient(90deg, #141E30 0%, #243B55 50%, #564D4A 100%)", // A gradient from deep space blue to galactic gray
  color: "#ECD9A0", // A golden star-like color for the text to make it stand out like a star
  "&:hover": {
    background: "linear-gradient(90deg, #0B1C2D 0%, #1E2D40 50%, #4E4140 100%)", // Darkened versions of the colors for hover state, as if journeying deeper into space
  },
});

export const GeneratePlanet = () => {
  const tx = {
    contractAddress: GAMEADDRESS,
    entrypoint: "generate_planet",
    calldata: [],
  };
  const { write, isLoading } = useContractWrite({ calls: [tx] });

  return (
    <Box position="relative" display="inline-flex">
      {isLoading && (
        <CircularProgress
          size={24}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px", // half the size
            marginLeft: "-12px", // half the size
          }}
        />
      )}
      <StyledButton
        variant="contained"
        onClick={() => write()}
        startIcon={<RocketLaunchIcon />}
        disabled={isLoading} // disable the button when loading
      >
        Mint Planet
      </StyledButton>
    </Box>
  );
};
