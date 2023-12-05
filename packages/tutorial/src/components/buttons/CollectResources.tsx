import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { StyledButton } from "../../../../frontend/src/shared/styled/Button";

const StyledBox = styled(Box)(() => ({
  position: "relative",
  display: "flex",
  justifyContent: "center", // center horizontally
  alignItems: "center", // center vertically
}));

export function UseCollectResources() {
  return (
    <>
      <StyledBox>
        <StyledButton
          fullWidth
          style={{ margin: "4px", background: "#4A63AA" }}
          variant="contained"
        >
          Collect Resources
        </StyledButton>
      </StyledBox>
    </>
  );
}
