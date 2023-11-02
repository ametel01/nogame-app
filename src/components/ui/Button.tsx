import { useState } from "react";
import { StyledButton } from "../../shared/styled/Button";
import { TransactionStatus } from "./TransactionStatus";
interface Props {
  name: string;
  callback: () => void;
  hashes: string[];
  disabled?: boolean;
  noRequirements?: boolean;
}

export function ButtonUpgrade({
  name,
  callback,
  hashes,
  disabled,
  noRequirements,
}: Props) {
  const [isClicked, setIsClicked] = useState(false);

  const handleOnClick = () => {
    callback();
    setIsClicked(true);
  };

  console.log(hashes);

  return (
    <div>
      {!disabled && !noRequirements && (
        <StyledButton
          onClick={handleOnClick}
          fullWidth={true}
          sx={{
            background: "#4A63AA",
          }}
        >
          Upgrade
        </StyledButton>
      )}
      {isClicked ? (
        hashes.map((hash) => (
          <TransactionStatus name={name} key={hash} hash={hash} />
        ))
      ) : (
        <></>
      )}
      {!disabled && noRequirements && (
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
      {disabled && (
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
