import { Button } from "@mui/material";
import { styled } from "@mui/system";

export const StyledButton = styled(Button)(() => ({
  borderRadius: 8,
  fontWeight: 500,
  fontSize: 14,
  textTransform: "capitalize",
  size: "large",
  color: "#F4F3EE",
  letterSpacing: "0.1em",
  border: "1px solid #2E3A45",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    background: "#2E434C", // Darkened starry blue for hover state
  },
}));

export const HeaderButton = styled(Button)({
  margin: "16px",
  marginLeft: "0px",
  color: "#98fb98",
  fontWeight: "bold", // More pronounced buttons
  letterSpacing: "1px", // Space-themed typography style
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Hover effect
  },
});
