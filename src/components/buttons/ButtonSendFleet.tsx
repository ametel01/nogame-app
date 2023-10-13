import { useState } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { Input } from "@mui/joy";
// import * as Styled from "../../shared/styled/Box";

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

const CloseStyledIcon = styled(CloseIcon)({
  cursor: "pointer",
  padding: "0 8px",
  fontSize: "2em",
  color: "#D0D3DA",
  position: "absolute",
  top: 8, // You can adjust this value as needed
  right: 8, // You can adjust this value as needed
  transition: "boxShadow 0.3s ease", // Smooth transition for the shadow on hover

  "&:hover": {
    boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.2)", // Circle shadow effect
    borderRadius: "50%", // Ensures the shadow takes a circular form
  },
});

const HeaderDiv = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#D0D3DA",
  marginBottom: "12px",
});

const StyledUl = styled("ul")({
  padding: "8px",
  flexGrow: 1,
});

const StyledLi = styled("li")({
  listStyleType: "none",
  margin: "8px",
});

const Text = styled("span")({
  flexGrow: 1,
  textAlign: "center",
  color: "#D0D3DA",
});

const FlexContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "8px",
});

interface Props {
  callback?: () => void;
  disabled?: boolean;
  noRequirements?: boolean;
}

export function ButtonSendFleet(props: Props) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const ships = ["Carrier", "Scraper", "Sparrow", "Frigate", "Armade"];

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
            >
              <HeaderDiv>
                Select Ships
                <CloseStyledIcon onClick={handleClose} />
              </HeaderDiv>
              <StyledUl>
                {ships.map((ship) => (
                  <FlexContainer>
                    <StyledLi key={ship}>
                      <Text>{ship}</Text>
                    </StyledLi>
                    <Input
                      type="text"
                      value={quantities[ship] || 0}
                      onChange={(e) => {
                        const value =
                          e.target.value === ""
                            ? 0
                            : parseInt(e.target.value, 10);
                        setQuantities({ ...quantities, [ship]: value });
                      }}
                      size="sm"
                      color="neutral"
                      variant="soft"
                      style={{ width: "80px" }}
                    />
                  </FlexContainer>
                ))}
              </StyledUl>
            </StyledBox>
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
