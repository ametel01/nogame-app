import styled from "@emotion/styled";
import astronaut from "../../assets/uiIcons/Astronaut.svg";

const AstronautContainer = styled.div`
  display: flex;
  padding: 8px;
  column-gap: 32px;
  align-items: center;
  justify-content: left;
  width: 100%;
  border-left: 2px solid #151a1e;
  font-weight: bold;

  img {
    maxwidth: 100%;
    height: auto;
    objectfit: "contain";
  }
`;

const HeaderWalletContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 44px;
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
        <img src={astronaut} alt="astronaut" />
        {shortenedAddress}
      </AstronautContainer>
    </HeaderWalletContainer>
  );
};

export default WalletHeader;
