import { StyledButton } from "../../shared/styled/Button";

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
