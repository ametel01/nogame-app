import { createTheme } from "@mui/material/styles";
import { Button } from "@mui/material";

interface Props {
  callback?: () => void;
  disabled?: boolean;
  noRequirements?: boolean;
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#6cbd6a",
    },
    warning: {
      main: "#815042",
    },
    info: {
      main: "#524c4c",
    },
  },
});

export function ButtonCollect(props: Props) {
  return (
    <Button
      onClick={props.callback}
      fullWidth={true}
      sx={{
        background: "#6cbd6a",
        color: "black",
        size: "large",
      }}
    >
      Collect Resources
    </Button>
  );
}

export function ButtonUpgrade(props: Props) {
  return (
    <div>
      {!props.disabled && !props.noRequirements && (
        <Button
          onClick={props.callback}
          fullWidth={true}
          sx={{
            background: "#45A85A",
            color: "black",
            size: "large",
          }}
        >
          Upgrade
        </Button>
      )}
      {!props?.disabled && props?.noRequirements && (
        <Button
          disabled
          fullWidth={true}
          sx={{
            background: "#524c4c",
            color: "white",
            size: "large",
          }}
        >
          No Requirements
        </Button>
      )}
      {props.disabled && (
        <Button
          fullWidth={true}
          disabled
          sx={{
            background: "#FFC107",
            color: "black",
            size: "large",
          }}
        >
          Needs Resources
        </Button>
      )}
    </div>
  );
}

export function ButtonBuild(props: Props) {
  return (
    <div>
      {!props.disabled && !props.noRequirements && (
        <Button
          onClick={props.callback}
          fullWidth={true}
          sx={{
            background: "#45A85A",
            color: "black",
            size: "large",
          }}
        >
          Build
        </Button>
      )}
      {!props?.disabled && props?.noRequirements && (
        <Button
          disabled
          fullWidth={true}
          sx={{
            background: "#524c4c",
            color: "black",
            size: "large",
          }}
        >
          No Requirements
        </Button>
      )}
      {props.disabled && (
        <Button
          fullWidth={true}
          disabled
          sx={{
            background: "#815042",
            color: "black",
            size: "large",
          }}
        >
          Needs Resources
        </Button>
      )}
    </div>
  );
}
