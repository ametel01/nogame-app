import { Button } from "@mui/material";
import { styled } from "@mui/system";

const StyledButton = styled(Button)(() => ({
  borderRadius: 8,
  fontWeight: 600,
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

interface Props {
  callback?: () => void;
  disabled?: boolean;
  noRequirements?: boolean;
}

export function ButtonUpgrade(props: Props) {
  return (
    <div>
      {!props.disabled && !props.noRequirements && (
        <StyledButton
          onClick={props.callback}
          fullWidth={true}
          sx={{
            background: "#4A63AA",
          }}
        >
          Upgrade
        </StyledButton>
      )}
      {!props?.disabled && props?.noRequirements && (
        <StyledButton
          disabled
          fullWidth={true}
          sx={{
            background: "#3B3F53",
          }}
        >
          No Requirements
        </StyledButton>
      )}
      {props.disabled && (
        <StyledButton
          fullWidth={true}
          disabled
          sx={{
            background: "#E67E51",
          }}
        >
          Needs Resources
        </StyledButton>
      )}
    </div>
  );
}

export function ButtonBuild(props: Props) {
  return (
    <div>
      {!props.disabled && !props.noRequirements && (
        <StyledButton
          onClick={props.callback}
          fullWidth={true}
          sx={{
            background: "#4A63AA",
            color: "white",
            size: "large",
          }}
        >
          Build
        </StyledButton>
      )}
      {!props?.disabled && props?.noRequirements && (
        <StyledButton
          disabled
          fullWidth={true}
          sx={{
            background: "#3B3F53",
          }}
        >
          No Requirements
        </StyledButton>
      )}
      {props.disabled && (
        <StyledButton
          fullWidth={true}
          disabled
          sx={{
            background: "#E67E51",
          }}
        >
          Needs Resources
        </StyledButton>
      )}
    </div>
  );
}
