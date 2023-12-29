import styled from "styled-components";

const HeaderWalletContainer = styled.div`
  color: #708090;
  font-weight: 600;
  display: flex;
  padding: 12px;
  border-top: 2px solid #151a1e;
`;

interface WalletHeaderProps {
  account?: string;
}

const WalletHeader = ({ account }: WalletHeaderProps) => {
  const shortenedAddress = account
    ? `${account.substring(0, 6)}...${account.substring(61)}`
    : "null";

  return <HeaderWalletContainer>{shortenedAddress}</HeaderWalletContainer>;
};

export default WalletHeader;
