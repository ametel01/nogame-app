import * as React from "react";
import Button from "@mui/material/Button";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { useConnectors } from "@starknet-react/core";
import argentIcon from "../../assets/logos/argent.svg";

const StyledBox = styled(Box)({
  fontWeight: 800,
  fontSize: 20,
  color: "#E7ECEE", // This is a good neutral light color. Keeping it.
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#454D74", // Deep blue from the logo.
  border: "1px solid #7FA0B3", // Light blue-grey for the border.
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
  color: "#E13936", // Red as it's a close (important) action.
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
  color: "#E7ECEE", // Neutral light color for consistent readability.
});

const DisclaimerText = styled("div")({
  fontSize: "12px",
  fontWeight: "400",
  width: "70%",
  margin: "20px auto",
  textAlign: "center",
  color: "#7FA0B3", // Using light blue-grey for less important text.
});

const StyledButton = styled(Button)({
  width: "100%",
  borderRadius: 8,
  padding: "8px 32px",
  textTransform: "capitalize",
  letterSpacing: "0.1em",
  border: "1px solid #7FA0B3",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#454D74", // Deep blue from the logo.
  color: "#fff",
  "&:hover": {
    background: "#363C5C", // A slightly darker shade of the deep blue for a subtle hover effect.
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
                  {connector.id === "argentWebWallet" ? (
                    <ConnectorIcon src={argentIcon} alt={connector.id} />
                  ) : (
                    <ConnectorIcon src={connector.icon} alt={connector.id} />
                  )}
                  {/* <ConnectorIcon src={connector.icon} alt={connector.id} /> */}
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
