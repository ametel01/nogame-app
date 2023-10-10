import styled from "@emotion/styled";
import { useAccount } from "@starknet-react/core";
import WalletHeader from "./WalletHeader";
import LogoAndRankContainer from "./LogoutAndRankContainer";
import ResourcesContainer from "./ResourcesContainer";
import { UseCollectResources } from "../buttons/CollectResources";

const BodyContainer = styled.div`
  flex: 1;
  height: 100%;
  background-color: #1a2025;
`;

const SideBar = () => {
  const { address: account } = useAccount();

  return (
    <BodyContainer>
      <WalletHeader account={account} />
      <LogoAndRankContainer />
      <ResourcesContainer />
      <UseCollectResources />
    </BodyContainer>
  );
};

export default SideBar;
