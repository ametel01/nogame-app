import * as React from "react";
import Button from "@mui/material/Button";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { useConnect } from "@starknet-react/core";
import argent from "../../assets/uiIcons/argent.png";
import braavos from "../../assets/uiIcons/braavos.png";

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
  padding: "24px 12px",
  display: "grid",
});

const HeaderDiv = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#D0D3DA",
  marginBottom: "12px",
});

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

const StyledUl = styled("ul")({
  padding: "8px",
  flexGrow: 1,
});

const StyledLi = styled("li")({
  listStyleType: "none",
  margin: "8px",
});

const ConnectorIcon = styled("img")({
  width: "20px",
});

const ConnectorText = styled("span")({
  flexGrow: 1,
  textAlign: "center",
  color: "#D0D3DA",
  fontWeight: "600",
});

const DisclaimerText = styled("div")({
  fontSize: "12px",
  fontWeight: "400",
  width: "70%",
  margin: "2px auto",
  textAlign: "center",
  color: "#D0D3DA",
});

const StyledButton = styled(Button)({
  width: "100%",
  borderRadius: 8,
  padding: "8px 32px",
  textTransform: "capitalize",
  letterSpacing: "0.1em",
  backgroundColor: "#2A2D3A", // Slightly lighter background for the button
  border: "1px solid #0F111A", // Darker border for definition
  display: "flex",
  justifyContent: "center",
  color: "#D0D3DA",
  "&:hover": {
    background: "#212530", // Slightly lighter than #1B1E2A for a subtle hover effect
  },
});

export default function ConnectWallet() {
  const [open, setOpen] = React.useState(false);
  const toggleModal = () => setOpen((prevState) => !prevState);
  const handleClose = () => setOpen(false);
  const { connect, connectors } = useConnect();

  return (
    <>
      <StyledButton
        startIcon={<AccountBalanceWalletIcon />}
        onClick={toggleModal}
      >
        Connect Wallet
      </StyledButton>
      <Modal
        open={open}
        onClose={toggleModal}
        aria-label="Connect Wallet Modal"
      >
        <StyledBox
          sx={{ display: "flex", flexDirection: "column", width: "35%" }}
        >
          <HeaderDiv>
            CONNECT A WALLET
            <CloseStyledIcon onClick={handleClose} />
          </HeaderDiv>
          <StyledUl>
            {connectors.map((connector) => (
              <StyledLi key={connector.id}>
                <StyledButton
                  size="large"
                  onClick={() => connect({ connector })}
                >
                  {connector.id === "argentX" ? (
                    <>
                      <ConnectorIcon src={argent} alt="argent" />
                      <ConnectorText>Argent X</ConnectorText>
                    </>
                  ) : (
                    <>
                      <ConnectorIcon src={braavos} alt="braavos" />
                      <ConnectorText>Braavos</ConnectorText>
                      {/* <ConnectorIcon
                        src={connector.icon.light}
                        alt={connector.id}
                      />
                      <ConnectorText>{connector.id}</ConnectorText> */}
                    </>
                  )}
                </StyledButton>
              </StyledLi>
            ))}
          </StyledUl>
          <DisclaimerText>
            By connecting a wallet, you agree to NoGame Terms & Conditions and
            acknowledge that you have read and understood the NoGame Protocol
            Disclaimer.
          </DisclaimerText>
        </StyledBox>
      </Modal>
    </>
  );
}
