import styled from "styled-components";
import { Person2 } from "@mui/icons-material";

const AstronautContainer = styled.div`
  display: flex;
  padding: 8px;
  gap: 32px;
  align-items: center;
  justify-content: flex-start; // More common than 'left'
  width: 100%;
  border-left: 2px solid #151a1e;
  font-weight: bold;

  img {
    max-width: 100%; // Corrected to 'max-width'
    height: auto;
    object-fit: contain; // Corrected to 'object-fit'
  }
`;

const HeaderWalletContainer = styled.div`
  display: flex;
  padding: 12px 0; // Consider padding instead of height for flexibility
  border-bottom: 2px solid #151a1e;
`;

interface WalletHeaderProps {
  account?: string;
}

const WalletHeader = ({ account }: WalletHeaderProps) => {
  const shortenedAddress = account
    ? `${account.substring(0, 6)}...${account.substring(59)}`
    : "null";

  return (
    <HeaderWalletContainer>
      <AstronautContainer>
        <Person2 />
        {shortenedAddress}
      </AstronautContainer>
    </HeaderWalletContainer>
  );
};

export default WalletHeader;
