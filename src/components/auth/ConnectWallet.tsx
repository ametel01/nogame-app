import * as React from "react";
import Button from "@mui/material/Button";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { useConnectors } from "@starknet-react/core";

const StyledBox = styled(Box)({
  fontWeight: 800,
  fontSize: 20,
  color: "#E7ECEE",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#1E272F",
  border: "1px solid #2E3A45",
  borderRadius: 16,
  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
  padding: "8px 32px",
  display: "grid",
});

const HeaderDiv = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const CloseStyledIcon = styled(CloseIcon)({
  cursor: "pointer",
  padding: "0 8px",
  fontSize: "2em",
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
});

const DisclaimerText = styled("div")({
  fontSize: "12px",
  fontWeight: "400",
  width: "70%",
  margin: "20px auto", // auto margin on the sides will center it horizontally
  textAlign: "center", // center the text itself
});

const StyledButton = styled(Button)({
  width: "100%",
  borderRadius: 8,
  padding: "8px 32px",
  textTransform: "capitalize",
  letterSpacing: "0.1em",
  border: "1px solid #2E3A45",
  display: "flex",
  justifyContent: "center",
  bgcolor: "#007bff",
  color: "#fff",
  "&:hover": {
    background: "#2E434C",
  },
});

export default function ConnectWallet() {
  const [open, setOpen] = React.useState(false);
  const toggleModal = () => setOpen((prevState) => !prevState);
  const handleClose = () => setOpen(false);
  const { connect, connectors } = useConnectors();

  return (
    <>
      <StyledButton
        variant="contained"
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
          sx={{ display: "flex", flexDirection: "column", width: "30%" }}
        >
          <HeaderDiv>
            Connect a Wallet
            <CloseStyledIcon onClick={handleClose} />
          </HeaderDiv>
          <StyledUl>
            {connectors.map((connector) => (
              <StyledLi key={connector.id}>
                <StyledButton size="large" onClick={() => connect(connector)}>
                  <ConnectorIcon src={connector.icon} alt={connector.id} />
                  <ConnectorText>{connector.id}</ConnectorText>
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
