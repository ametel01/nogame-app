import * as React from 'react';
import Button from '@mui/material/Button';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { useConnect, type Connector } from '@starknet-react/core';

const StyledBox = styled(Box)({
  fontWeight: 600,
  fontSize: 20,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#1B1E2A',
  border: '1px solid #282C3E',
  borderRadius: 16,
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
  padding: '24px 12px',
  // display: "grid",
  display: 'flex',
  flexDirection: 'column',
  width: '30%',
});

const HeaderDiv = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '12px',
  fontWeight: 'bold',
});

const CloseStyledIcon = styled(CloseIcon)({
  cursor: 'pointer',
  padding: '0 8px',
  fontSize: '2em',
  position: 'absolute',
  top: 8, // You can adjust this value as needed
  right: 8, // You can adjust this value as needed
  transition: 'boxShadow 0.3s ease', // Smooth transition for the shadow on hover

  '&:hover': {
    boxShadow: '0px 0px 10px 3px rgba(0, 0, 0, 0.2)', // Circle shadow effect
    borderRadius: '50%', // Ensures the shadow takes a circular form
  },
});

const StyledUl = styled('ul')({
  padding: '8px',
  flexGrow: 1,
});

const StyledLi = styled('li')({
  listStyleType: 'none',
  margin: '8px',
});

const ConnectorIcon = styled('img')({
  width: '20px',
});

const ConnectorText = styled('span')({
  flexGrow: 1,
  textAlign: 'center',
  fontWeight: '500',
});

const DisclaimerText = styled('div')({
  fontSize: '12px',
  fontWeight: '400',
  width: '100%',
  margin: '2px auto',
  textAlign: 'center',
});

const ToolbarButton = styled(Button)({
  width: '100%',
  borderRadius: 8,
  padding: '8px 32px',
  textTransform: 'capitalize',
  letterSpacing: '0.1em',
  backgroundColor: '#24397F', // Slightly lighter background for the button
  border: '1px solid #28408F', // Darker border for definition
  display: 'flex',
  color: '#F4F3EE',
  justifyContent: 'center',
  '&:hover': {
    background: '#1F3370', // Slightly lighter than #1B1E2A for a subtle hover effect
  },
});

const WalletButton = styled(Button)({
  width: '100%',
  borderRadius: 8,
  padding: '8px 32px',
  textTransform: 'capitalize',
  letterSpacing: '0.1em',
  backgroundColor: '#282C3E', // Slightly lighter background for the button
  display: 'flex',
  color: '#F4F3EE',
  justifyContent: 'center',
  '&:hover': {
    background: '##282C3E', // Slightly lighter than #1B1E2A for a subtle hover effect
  },
});

export default function ConnectWallet() {
  const [open, setOpen] = React.useState(false);
  const toggleModal = () => {
    setOpen((prevState) => !prevState);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { connect, connectors } = useConnect();

  const handleConnect = (connector: Connector) => {
    connect({ connector });
  };

  return (
    <>
      <ToolbarButton
        startIcon={<AccountBalanceWalletIcon />}
        onClick={toggleModal}
      >
        Connect Wallet
      </ToolbarButton>
      <Modal
        open={open}
        onClose={toggleModal}
        aria-label="Connect Wallet Modal"
        disableAutoFocus={true}
      >
        <StyledBox>
          <HeaderDiv>
            Connect a Wallet
            <CloseStyledIcon onClick={handleClose} />
          </HeaderDiv>
          <StyledUl>
            {connectors.map((connector) => (
              <StyledLi key={connector.id}>
                <WalletButton
                  size="large"
                  onClick={() => {
                    handleConnect(connector);
                  }}
                >
                  <ConnectorIcon src={connector.icon.dark} alt="argent" />
                  <ConnectorText>{connector.name}</ConnectorText>
                </WalletButton>
              </StyledLi>
            ))}
          </StyledUl>
          <DisclaimerText>
            By connecting your wallet, you acknowledge and accept all risks and
            responsibilities related to this decentralized application.
          </DisclaimerText>
        </StyledBox>
      </Modal>
    </>
  );
}
