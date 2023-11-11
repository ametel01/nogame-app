import { Button } from "@mui/material";
import { styled } from "@mui/system";

export const StyledButton = styled(Button)(() => ({
  borderRadius: 8,
  fontWeight: 500,
  fontSize: 14,
  textTransform: "capitalize",
  color: "white", // Changing the text color to white for better readability against cosmic colors
  size: "large",
  letterSpacing: "0.1em",
  border: "1px solid #2E3A45",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    background: "#2E434C", // Darkened starry blue for hover state
  },
}));
