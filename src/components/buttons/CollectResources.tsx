import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import { GAMEADDRESS } from "../../constants/addresses";
import { useContractWrite } from "@starknet-react/core";

const StyledBox = styled(Box)(() => ({
  position: "relative",
  display: "flex",
  justifyContent: "center", // center horizontally
  alignItems: "center", // center vertically
}));

const StyleCircProgress = styled(CircularProgress)(() => ({
  position: "absolute",
  zIndex: 1, // ensure it's above the button
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: "4px",
  borderRadius: 8,
  padding: theme.spacing(1, 2),
  fontSize: 14,
  fontWeight: 600,
  textTransform: "capitalize",
  background: "#4A63AA",
  color: "white",
  letterSpacing: "0.1em",
  border: "1px solid #2E3A45",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    background: "#2E434C",
  },
}));

export function UseCollectResources() {
  const tx = {
    contractAddress: GAMEADDRESS,
    entrypoint: "collect_resources",
    calldata: [],
  };
  const { write, isLoading, status } = useContractWrite({ calls: [tx] });

  return (
    <>
      <StyledBox>
        {(isLoading || (status !== "success" && status !== "idle")) && (
          <StyleCircProgress size={24} />
        )}
        <StyledButton fullWidth onClick={() => write()} variant="contained">
          Collect Resources
        </StyledButton>
      </StyledBox>
    </>
  );
}
