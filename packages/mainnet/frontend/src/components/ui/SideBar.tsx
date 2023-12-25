import styled from "styled-components";
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

interface Props {
  planetId: number;
}

const SideBar = ({ planetId }: Props) => {
  const { address: account } = useAccount();

  return (
    <BodyContainer>
      <WalletHeader account={account} />
      <LogoAndRankContainer planetId={planetId} />
      <ResourcesContainer planetId={planetId} />
      <UseCollectResources />
    </BodyContainer>
  );
};

export default SideBar;
