import { useState } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { Input } from "@mui/joy";
import armadeImg from "../../assets/gameElements/ships/armade.png";
import frigateImg from "../../assets/gameElements/ships/frigate.png";
import carrierImg from "../../assets/gameElements/ships/carrier.png";
import sparrowImg from "../../assets/gameElements/ships/sparrow.png";
import scraperImg from "../../assets/gameElements/ships/scraper.png";
// import * as Styled from "../../shared/styled/Box";

type ShipName = "Carrier" | "Scraper" | "Sparrow" | "Frigate" | "Armade";

const shipImageMapping: Record<ShipName, string> = {
  Carrier: carrierImg,
  Scraper: scraperImg,
  Sparrow: sparrowImg,
  Frigate: frigateImg,
  Armade: armadeImg,
};

const StyledBox = styled(Box)({
  fontWeight: 500,
  fontSize: 20,
  color: "#E7ECEE",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#1a2025",
  border: "1px solid #0A0C16",
  borderRadius: 16,
  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
  padding: "16px 32px", // Added top and bottom padding of 16px, keeping left and right padding at 32px
  display: "flex",
  flexDirection: "column", // Moved from inline to here
  width: "45%", // Moved from inline to here
});

const StyledButton = styled(Button)(() => ({
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
  margin: "4px",
  display: "flex", // Enable flexbox layout
  alignItems: "center", // Center items vertically in the flex container
  backgroundColor: "#222930", // Slightly lighter color than the main background
});

const StyledImageBox = styled("div")<{ imgSrc: string }>`
  width: 40px;
  height: 40px;
  background-image: url(${(props) => props.imgSrc});
  background-size: cover;
  background-position: center;
  margin-right: 16px; // Added this line to add space
  border-radius: "8px";
`;

const Text = styled("span")({
  flexGrow: 1,
  textAlign: "center",
  color: "#D0D3DA",
  fontSize: "16px", // Reduced from implicit or default value
});

const FlexContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "8px 4px", // Top and bottom margin 12px, Left and right margin 8px
  padding: "8px 16px", // Top and bottom padding 8px, Left and right padding 16px
  borderRadius: "8px", // Round the corners
  backgroundColor: "#222930", // Lighter color than the main background
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
});

const InputButtonContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "8px", // You can adjust this to control spacing
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
            <StyledBox>
              <HeaderDiv>
                Select Ships
                <CloseStyledIcon onClick={handleClose} />
              </HeaderDiv>
              <StyledUl>
                {ships.map((ship) => (
                  <FlexContainer>
                    <StyledLi key={ship}>
                      <StyledImageBox
                        imgSrc={shipImageMapping[ship as ShipName] || ""}
                      />
                      <Text>{ship}</Text>
                    </StyledLi>
                    <InputButtonContainer>
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
                    </InputButtonContainer>
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
