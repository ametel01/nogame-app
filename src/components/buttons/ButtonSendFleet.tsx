import { useState } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const StyledBox = styled(Box)({
  fontWeight: 800,
  fontSize: 20,
  color: "#E7ECEE", // This is a good neutral light color. Keeping it.
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#1B1E2A",
  border: "1px solid #0A0C16",
  borderRadius: 16,
  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
  padding: "8px 32px",
  display: "grid",
});

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

export function ButtonSendFleet(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      {!props.disabled && !props.noRequirements && (
        <>
          <StyledButton
            onClick={handleButtonClick}
            fullWidth={true}
            sx={{
              background: "#4A63AA",
            }}
          >
            Send Fleet
          </StyledButton>
          <Modal open={isModalOpen} onClose={handleClose}>
            <StyledBox
              sx={{ display: "flex", flexDirection: "column", width: "45%" }}
            ></StyledBox>
          </Modal>
        </>
      )}
      {!props?.disabled && props?.noRequirements && (
        <StyledButton
          disabled
          fullWidth={true}
          sx={{
            background: "#3B3F53",
          }}
        >
          Own Planet
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
          Noob Protected
        </StyledButton>
      )}
    </div>
  );
}
