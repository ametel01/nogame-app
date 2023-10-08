import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import { GAMEADDRESS } from "../constants/addresses";
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
  fontSize: 16,
  fontWeight: 700,
  textTransform: "capitalize",
  background: "#45A85A",
  color: "black",
  letterSpacing: "0.1em",
  border: "1px solid #2E3A45",
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
  const { write, isLoading } = useContractWrite({ calls: [tx] });

  return (
    <>
      <StyledBox>
        {isLoading && <StyleCircProgress size={24} />}
        <StyledButton fullWidth onClick={() => write()} variant="contained">
          Collect Resources
        </StyledButton>
      </StyledBox>
    </>
  );
}
