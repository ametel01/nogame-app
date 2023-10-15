import { Box } from "@mui/material";
import { styled } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import { GAMEADDRESS } from "../../constants/addresses";
import { useContractWrite } from "@starknet-react/core";
import { StyledButton } from "../../shared/styled/Button";

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

export function UseCollectResources() {
  const tx = {
    contractAddress: GAMEADDRESS,
    entrypoint: "collect_resources",
    calldata: [],
  };
  const { isLoading, status } = useContractWrite({ calls: [tx] });

  const handleCollect = () => {
    useContractWrite({ calls: [tx] });
  };

  return (
    <>
      <StyledBox>
        {(isLoading || (status !== "success" && status !== "idle")) && (
          <StyleCircProgress size={24} />
        )}
        <StyledButton
          fullWidth
          style={{ margin: "4px", background: "#4A63AA" }}
          onClick={handleCollect}
          variant="contained"
        >
          Collect Resources
        </StyledButton>
      </StyledBox>
    </>
  );
}
